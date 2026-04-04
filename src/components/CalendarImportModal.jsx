import { useState } from 'react'
import {
  fetchUpcomingEvents,
  getEventDuration,
  getEventRecurrence,
  formatEventDate,
} from '../lib/googleCalendar'

function EventCard({ event, onSelect }) {
  const duration = getEventDuration(event)
  const recurrence = getEventRecurrence(event)
  const attendeeCount = (event.attendees || []).filter(a => !a.self && a.responseStatus !== 'declined').length
  const hasMeet = !!event.hangoutLink

  return (
    <button
      onClick={() => onSelect(event)}
      className="w-full text-left p-3 rounded-xl transition-all"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,135,0.08)'; e.currentTarget.style.borderColor = 'rgba(0,255,135,0.25)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm truncate">{event.summary}</p>
          <p className="text-white/40 text-xs mt-0.5">{formatEventDate(event)}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-white/30 text-xs">⏱ {duration}m</span>
            {attendeeCount > 0 && <span className="text-white/30 text-xs">👥 {attendeeCount}</span>}
            {recurrence !== 'one-time' && <span className="text-white/30 text-xs capitalize">🔄 {recurrence}</span>}
            {hasMeet && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(66,133,244,0.15)', color: '#93c5fd' }}>📹 Meet</span>}
          </div>
        </div>
        <span className="text-white/30 text-sm flex-shrink-0">→</span>
      </div>
    </button>
  )
}

export default function CalendarImportModal({ onClose, onImport, teamMembers }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const loadEvents = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchUpcomingEvents()
      setEvents(data)
      setLoaded(true)
    } catch (err) {
      setError(err.message || 'Could not load calendar events')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (event) => {
    const duration = getEventDuration(event)
    const recurrence = getEventRecurrence(event)
    onImport({
      title: event.summary, duration, recurrence,
      agenda: event.description || '',
      meetLink: event.hangoutLink || null,
    })
    onClose()
  }

  return (
    <div className="card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
            📅 Import from Google Calendar
          </h2>
          <p className="text-white/30 text-xs mt-0.5">Imports title, duration, recurrence & description</p>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">✕</button>
      </div>

      {/* Initial state */}
      {!loaded && !loading && !error && (
        <div className="text-center py-8 space-y-4">
          <p className="text-white/50 text-sm">Click below to sign in and load your upcoming meetings.</p>
          <button className="btn-primary px-8 py-3" onClick={loadEvents}>
            Load My Meetings
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-8 text-white/40 text-sm animate-pulse">
          Loading your meetings...
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="p-3 rounded-xl text-sm"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
          {error}
          <button onClick={loadEvents} className="block mt-1 underline text-xs">Try again</button>
        </div>
      )}

      {/* Empty */}
      {loaded && !loading && events.length === 0 && (
        <p className="text-center text-white/30 text-sm py-4">No upcoming meetings in the next 2 weeks.</p>
      )}

      {/* Events */}
      {events.length > 0 && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.map(event => (
            <EventCard key={event.id} event={event} onSelect={handleSelect} teamMembers={teamMembers} />
          ))}
        </div>
      )}
    </div>
  )
}
