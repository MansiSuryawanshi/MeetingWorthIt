const SCOPE = 'https://www.googleapis.com/auth/calendar'

let accessToken = null
let tokenExpiry = null

export function getGoogleClientId() {
  return localStorage.getItem('mwi_google_client_id') || ''
}

export function saveGoogleClientId(id) {
  localStorage.setItem('mwi_google_client_id', id.trim())
  accessToken = null
  tokenExpiry = null
}

export function clearGoogleClientId() {
  localStorage.removeItem('mwi_google_client_id')
  accessToken = null
  tokenExpiry = null
}

export function isGoogleCalendarConfigured() {
  return !!getGoogleClientId()
}

export function isConnected() {
  return !!(accessToken && tokenExpiry && Date.now() < tokenExpiry)
}

export function disconnect() {
  accessToken = null
  tokenExpiry = null
}

function requestToken(clientId) {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.oauth2) {
      reject(new Error('Google Identity Services not loaded yet. Try again in a moment.'))
      return
    }
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error_description || response.error))
          return
        }
        accessToken = response.access_token
        tokenExpiry = Date.now() + (Number(response.expires_in) - 60) * 1000
        resolve(accessToken)
      },
    })
    client.requestAccessToken()
  })
}

export async function getAccessToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) return accessToken
  const clientId = getGoogleClientId()
  if (!clientId) throw new Error('Google Calendar not configured')
  return requestToken(clientId)
}

export async function fetchUpcomingEvents() {
  const token = await getAccessToken()
  const now = new Date().toISOString()
  const twoWeeksLater = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()

  const params = new URLSearchParams({
    timeMin: now,
    timeMax: twoWeeksLater,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '20',
  })

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!response.ok) {
    if (response.status === 401) { accessToken = null; tokenExpiry = null }
    throw new Error('Failed to fetch calendar events')
  }

  const data = await response.json()
  return (data.items || []).filter(e => e.status !== 'cancelled' && e.summary)
}

export function getEventDuration(event) {
  if (!event.start?.dateTime || !event.end?.dateTime) return 60
  const start = new Date(event.start.dateTime)
  const end = new Date(event.end.dateTime)
  const mins = Math.round((end - start) / 60000)
  const valid = [15, 30, 45, 60, 90, 120, 180]
  return valid.reduce((a, b) => Math.abs(b - mins) < Math.abs(a - mins) ? b : a)
}

export function getEventRecurrence(event) {
  if (!event.recurrence?.length) return 'one-time'
  const rule = event.recurrence.find(r => r.startsWith('RRULE:')) || ''
  if (rule.includes('FREQ=DAILY')) return 'daily'
  if (rule.includes('FREQ=WEEKLY') && rule.includes('INTERVAL=2')) return 'bi-weekly'
  if (rule.includes('FREQ=WEEKLY')) return 'weekly'
  if (rule.includes('FREQ=MONTHLY')) return 'monthly'
  return 'one-time'
}

export function matchAttendeesToTeam(calendarAttendees, teamMembers) {
  const all = (calendarAttendees || []).filter(a => a.responseStatus !== 'declined')
  if (all.length === 0) return []

  return all.map(a => {
    const displayName = a.displayName || a.email?.split('@')[0] || 'Attendee'
    const emailLower = (a.email || '').toLowerCase()
    const firstNameLower = displayName.split(' ')[0].toLowerCase()

    // Try email match first (most reliable)
    const emailMatch = teamMembers.find(m =>
      m.email && m.email.toLowerCase() === emailLower
    )
    if (emailMatch) {
      return { role: emailMatch.role, salary: emailMatch.salary, name: emailMatch.name }
    }

    // Try first name match
    const nameMatch = teamMembers.find(m =>
      m.name.toLowerCase().includes(firstNameLower) ||
      firstNameLower.includes(m.name.split(' ')[0].toLowerCase())
    )
    if (nameMatch) {
      return { role: nameMatch.role, salary: nameMatch.salary, name: nameMatch.name }
    }

    // No match — use display name as role
    return { role: displayName, salary: 100000 }
  })
}

export function formatEventDate(event) {
  const dt = event.start?.dateTime || event.start?.date
  if (!dt) return ''
  return new Date(dt).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}
