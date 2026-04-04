import { useState, useCallback, useEffect } from 'react'
import AttendeeRow from './components/AttendeeRow'
import MeetingForm from './components/MeetingForm'
import CostDisplay from './components/CostDisplay'
import AnalyzeButton from './components/AnalyzeButton'
import VerdictPanel from './components/VerdictPanel'
import SettingsModal from './components/SettingsModal'
import MeetingHistory from './components/MeetingHistory'
import MeetingTemplates from './components/MeetingTemplates'
import TeamModal from './components/TeamModal'
import DemoScenarioModal from './components/DemoScenarioModal'
import DemoBadge from './components/DemoBadge'
import CalendarImportModal from './components/CalendarImportModal'

import {
  loadTeamMembers,
  addTeamMember,
  deleteTeamMember,
  isFirebaseConfigured,
} from './lib/firebase'

import { isGoogleCalendarConfigured } from './lib/googleCalendar'
import { isDemoEnv, getDemoVerdict } from './utils/demoMode'

const RECURRENCE_MULTIPLIERS = {
  'one-time': 1,
  daily: 260,
  weekly: 52,
  'bi-weekly': 26,
  monthly: 12,
}

const DEFAULT_ATTENDEES = [
  { id: 1, role: 'Product Manager', salary: 110000 },
]

let nextId = 2

export default function App() {
  const [attendees, setAttendees] = useState(DEFAULT_ATTENDEES)
  const [meetingTitle, setMeetingTitle] = useState('')
  const [duration, setDuration] = useState(60)
  const [recurrence, setRecurrence] = useState('weekly')
  const [agenda, setAgenda] = useState('')
  const [context, setContext] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [verdict, setVerdict] = useState(null)
  const [apiKey, setApiKey] = useState(localStorage.getItem('mwi_api_key') || '')
  const [showSettings, setShowSettings] = useState(false)
  const [showTeam, setShowTeam] = useState(false)
  const [showCalendarImport, setShowCalendarImport] = useState(false)
  const [meetLink, setMeetLink] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('mwi_history') || '[]')
  )

  const [demoMode, setDemoMode] = useState(false)
  const [demoScenarioId, setDemoScenarioId] = useState(null)
  const [showDemoModal, setShowDemoModal] = useState(false)

  const [teamMembers, setTeamMembers] = useState([])
  const [, setTeamLoading] = useState(false)

  const [city, setCity] = useState(localStorage.getItem('mwi_city') || 'Remote')
  const [industry, setIndustry] = useState(localStorage.getItem('mwi_industry') || 'Tech')

  const refreshTeam = useCallback(async () => {
    if (!isFirebaseConfigured()) {
      setTeamMembers([])
      return
    }

    setTeamLoading(true)
    try {
      const data = await loadTeamMembers()
      setTeamMembers(data)
    } catch {
      setTeamMembers([])
    } finally {
      setTeamLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshTeam()
  }, [refreshTeam])

  useEffect(() => {
    if (isDemoEnv()) {
      setShowDemoModal(true)
    }
  }, [])

  const totalCost = attendees.reduce((sum, attendee) => {
    const hourlyRate = attendee.salary / 2080
    return sum + hourlyRate * (duration / 60)
  }, 0)

  const annualCost = totalCost * RECURRENCE_MULTIPLIERS[recurrence]

  const addAttendee = useCallback(() => {
    setAttendees(prev => [
      ...prev,
      { id: nextId++, role: 'Engineer', salary: 120000 },
    ])
  }, [])

  const removeAttendee = useCallback((id) => {
    setAttendees(prev => prev.filter(attendee => attendee.id !== id))
  }, [])

  const updateAttendee = useCallback((id, field, value) => {
    setAttendees(prev =>
      prev.map(attendee =>
        attendee.id === id ? { ...attendee, [field]: value } : attendee
      )
    )
  }, [])

  const applyTemplate = useCallback((template) => {
    setMeetingTitle(template.title)
    setDuration(template.duration)
    setRecurrence(template.recurrence)
    setVerdict(null)
    setApiError(null)
    setAgenda(template.agenda || '')
    setContext(template.context || '')
    setMeetLink(null)
    setAttendees(template.attendees.map(attendee => ({ ...attendee, id: nextId++ })))
  }, [])

  const enterDemo = useCallback((scenario) => {
    setDemoMode(true)
    setDemoScenarioId(scenario.id)
    setShowDemoModal(false)
    setVerdict(null)
    setApiError(null)
    setMeetingTitle(scenario.title)
    setDuration(scenario.duration)
    setRecurrence(scenario.recurrence)
    setAgenda(scenario.agenda || '')
    setContext(scenario.context || '')
    setMeetLink(null)
    setAttendees(scenario.attendees.map(attendee => ({ ...attendee, id: nextId++ })))
  }, [])

  const exitDemo = useCallback(() => {
    setDemoMode(false)
    setDemoScenarioId(null)
    setVerdict(null)
    setApiError(null)
    setMeetingTitle('')
    setDuration(60)
    setRecurrence('weekly')
    setAgenda('')
    setContext('')
    setMeetLink(null)
    setAttendees([{ id: 1, role: 'Product Manager', salary: 110000 }])
    nextId = 2
  }, [])

  const handleCalendarImport = useCallback(({ title, duration, recurrence, agenda, meetLink }) => {
    setMeetingTitle(title || '')
    setDuration(duration || 60)
    setRecurrence(recurrence || 'weekly')
    setAgenda(agenda || '')
    setContext('')
    setVerdict(null)
    setApiError(null)
    setMeetLink(meetLink || null)
  }, [])

  const saveApiKey = useCallback((key) => {
    localStorage.setItem('mwi_api_key', key)
    setApiKey(key)
  }, [])

  const savePrefs = useCallback(({ city: selectedCity, industry: selectedIndustry }) => {
    localStorage.setItem('mwi_city', selectedCity)
    localStorage.setItem('mwi_industry', selectedIndustry)
    setCity(selectedCity)
    setIndustry(selectedIndustry)
  }, [])

  const handleAddTeamMember = useCallback(async (member) => {
    const added = await addTeamMember(member)
    setTeamMembers(prev =>
      [...prev, added].sort((a, b) => a.name.localeCompare(b.name))
    )
  }, [])

  const handleDeleteTeamMember = useCallback(async (id) => {
    await deleteTeamMember(id)
    setTeamMembers(prev => prev.filter(member => member.id !== id))
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (demoMode) {
      setIsAnalyzing(true)
      setVerdict(null)
      setApiError(null)

      await new Promise(resolve => setTimeout(resolve, 1500))

      const result = getDemoVerdict(demoScenarioId)
      setVerdict(result)

      const entry = {
        id: Date.now(),
        title: meetingTitle,
        cost: Math.round(totalCost),
        annualCost: Math.round(annualCost),
        score: result.necessityScore,
        recurrence,
        timestamp: new Date().toISOString(),
      }

      const newHistory = [entry, ...history].slice(0, 5)
      setHistory(newHistory)
      localStorage.setItem('mwi_history', JSON.stringify(newHistory))
      setIsAnalyzing(false)
      return
    }

    if (!apiKey) {
      setShowSettings(true)
      return
    }

    setIsAnalyzing(true)
    setVerdict(null)
    setApiError(null)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a brutally honest meeting effectiveness coach at a top tech company.
You evaluate whether meetings are worth their dollar cost.
Always respond with valid JSON only. No markdown, no explanation outside the JSON.`,
          messages: [
            {
              role: 'user',
              content: `Evaluate this meeting:

Meeting: "${meetingTitle}"
Duration: ${duration} minutes
Total cost: $${Math.round(totalCost)}
Annual cost: $${Math.round(annualCost)} (recurrence: ${recurrence})
Attendees: ${attendees.map(attendee => attendee.role).join(', ')}${agenda ? `\nAgenda:\n${agenda}` : ''}${context ? `\nContext: ${context}` : ''}

Use the agenda and context heavily in your evaluation. They should significantly influence the necessity score and recommendations.

Respond with this exact JSON structure:
{
  "necessityScore": <number 1-10>,
  "scoreLabel": "<Worth Every Dollar | Borderline | This Could Have Been An Email>",
  "keyQuestion": "<the single most important question this meeting must answer to justify its cost>",
  "attendeeAnalysis": [
    {"role": "<role name>", "status": "<Essential | Optional | Could Receive Notes Instead>", "reason": "<one short reason>"}
  ],
  "couldBeAsync": <true|false>,
  "asyncReason": "<one sentence explanation>",
  "asyncFormat": "<specific format if async: Slack thread | Shared Google Doc | Loom video | Email update | null>",
  "actionableFix": "<the single most impactful 1-2 sentence change to make this meeting more valuable>"
}`,
            },
          ],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'API error')
      }

      const result = JSON.parse(data.content[0].text)
      setVerdict(result)

      const entry = {
        id: Date.now(),
        title: meetingTitle,
        cost: Math.round(totalCost),
        annualCost: Math.round(annualCost),
        score: result.necessityScore,
        recurrence,
        timestamp: new Date().toISOString(),
      }

      const newHistory = [entry, ...history].slice(0, 5)
      setHistory(newHistory)
      localStorage.setItem('mwi_history', JSON.stringify(newHistory))
    } catch (err) {
      setApiError(
        err instanceof SyntaxError
          ? 'AI analysis returned unexpected format. The cost calculation above is still accurate.'
          : err.message || 'AI analysis temporarily unavailable. The cost calculation above is still accurate.'
      )
    } finally {
      setIsAnalyzing(false)
    }
  }, [
    demoMode,
    demoScenarioId,
    apiKey,
    meetingTitle,
    duration,
    totalCost,
    attendees,
    history,
    annualCost,
    recurrence,
    agenda,
    context,
  ])

  const canAnalyze = meetingTitle.trim().length > 0 && attendees.length > 0

  return (
    <div className="min-h-screen" style={{ background: '#0f1117' }}>
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg, #00ff87, #00cc6a)' }}
            >
              💸
            </div>
            <span
              className="font-black text-xl tracking-tight text-white"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              MeetingWorthIt
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isGoogleCalendarConfigured() && (
              <button
                onClick={() => setShowCalendarImport(true)}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all"
                style={{
                  color: '#93c5fd',
                  background: 'rgba(66,133,244,0.08)',
                  border: '1px solid rgba(66,133,244,0.2)',
                }}
              >
                📅 Import from Calendar
              </button>
            )}

            <button
              onClick={() => setShowTeam(true)}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all"
              style={{
                color: teamMembers.length > 0 ? '#00ff87' : 'rgba(255,255,255,0.4)',
                background: teamMembers.length > 0 ? 'rgba(0,255,135,0.08)' : 'transparent',
                border: '1px solid',
                borderColor: teamMembers.length > 0 ? 'rgba(0,255,135,0.2)' : 'rgba(255,255,255,0.1)',
              }}
            >
              👥 {teamMembers.length > 0 ? `Team (${teamMembers.length})` : 'Add Team'}
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: apiKey ? '#00ff87' : 'rgba(255,255,255,0.4)' }}
            >
              {apiKey ? '🔒 API Key Set' : '⚙ Settings'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1
          className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight leading-[1.1]"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Is this meeting worth it?
        </h1>

        <p className="text-white/35 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          That weekly meeting you never question? It might be quietly costing your team{' '}
          <span className="text-white/60 font-medium">thousands every year</span>.
        </p>

        {city !== 'Remote' && (
          <p className="text-white/15 text-xs mt-2">
            Salary benchmarks: {city} · {industry}
          </p>
        )}

        {!demoMode && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <button
              onClick={() => setShowDemoModal(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,135,0.15), rgba(0,255,135,0.08))',
                border: '1px solid rgba(0,255,135,0.3)',
                color: '#00ff87',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, rgba(0,255,135,0.22), rgba(0,255,135,0.12))'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,135,0.12)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, rgba(0,255,135,0.15), rgba(0,255,135,0.08))'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ▶ Try Demo
            </button>

            <span className="text-white/20 text-xs">
              Try a real scenario in seconds. No API key needed
            </span>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="space-y-5">
            <MeetingTemplates onApply={applyTemplate} />

            <MeetingForm
              meetingTitle={meetingTitle}
              setMeetingTitle={setMeetingTitle}
              duration={duration}
              setDuration={setDuration}
              recurrence={recurrence}
              setRecurrence={setRecurrence}
              agenda={agenda}
              setAgenda={setAgenda}
              context={context}
              setContext={setContext}
            />

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-white font-semibold"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Attendees
                </h2>

                <div className="flex items-center gap-2">
                  {teamMembers.length > 0 && (
                    <span className="text-xs" style={{ color: 'rgba(0,255,135,0.6)' }}>
                      👥 tap to pick from team
                    </span>
                  )}
                  <span className="text-white/40 text-xs">
                    {attendees.length} person{attendees.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {attendees.map(attendee => (
                  <AttendeeRow
                    key={attendee.id}
                    attendee={attendee}
                    onUpdate={updateAttendee}
                    onRemove={removeAttendee}
                    canRemove={attendees.length > 1}
                    teamMembers={teamMembers}
                    city={city}
                    industry={industry}
                  />
                ))}
              </div>

              <button
                onClick={addAttendee}
                className="mt-4 w-full py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: 'rgba(0,255,135,0.08)',
                  border: '1px dashed rgba(0,255,135,0.3)',
                  color: '#00ff87',
                }}
              >
                + Add Attendee
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-6">
          <CostDisplay
            totalCost={totalCost}
            annualCost={annualCost}
            recurrence={recurrence}
            score={verdict?.necessityScore}
            isAnalyzing={isAnalyzing}
          />

          <AnalyzeButton
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            isAnalyzing={isAnalyzing}
            hasApiKey={!!apiKey}
            demoMode={demoMode}
          />

          {apiError && (
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#fca5a5',
              }}
            >
              {apiError}
            </div>
          )}

          {verdict && (
            <VerdictPanel
              verdict={verdict}
              attendees={attendees}
              annualCost={annualCost}
              recurrence={recurrence}
              meetingTitle={meetingTitle}
              duration={duration}
              totalCost={totalCost}
              meetLink={meetLink}
            />
          )}
        </div>
      </div>

      {history.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 pb-16">
          <MeetingHistory history={history} />
        </div>
      )}

      {demoMode && <DemoBadge onExit={exitDemo} />}

      {showCalendarImport && (
        <CalendarImportModal
          onClose={() => setShowCalendarImport(false)}
          onImport={handleCalendarImport}
        />
      )}

      {showDemoModal && (
        <DemoScenarioModal
          onSelect={enterDemo}
          onClose={() => setShowDemoModal(false)}
        />
      )}

      {showSettings && (
        <SettingsModal
          apiKey={apiKey}
          onSave={saveApiKey}
          onClose={() => {
            setShowSettings(false)
            refreshTeam()
          }}
          city={city}
          industry={industry}
          onSavePrefs={savePrefs}
        />
      )}

      {showTeam && (
        <TeamModal
          members={teamMembers}
          onClose={() => setShowTeam(false)}
          onAdd={handleAddTeamMember}
          onDelete={handleDeleteTeamMember}
          city={city}
          industry={industry}
        />
      )}
    </div>
  )
}