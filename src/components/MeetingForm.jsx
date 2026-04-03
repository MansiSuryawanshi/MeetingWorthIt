const DURATIONS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '1.5 hours', value: 90 },
  { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },
]

const RECURRENCES = [
  { label: 'One-time', value: 'one-time' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Bi-weekly', value: 'bi-weekly' },
  { label: 'Monthly', value: 'monthly' },
]

const SUGGESTIONS = [
  { keywords: ['standup', 'stand-up', 'daily', 'sync'], hint: 'Tip: Standups work best with 5 or fewer people.' },
  { keywords: ['sprint', 'planning'], hint: 'Tip: Invite the full delivery team — PM, engineers, designer.' },
  { keywords: ['design', 'review', 'critique'], hint: 'Tip: Keep it to designer + PM + 1 engineer. Fewer opinions = faster decisions.' },
  { keywords: ['brainstorm', 'ideation', 'creative'], hint: 'Tip: 4–5 people max. Too many voices kill good ideas.' },
  { keywords: ['incident', 'outage', 'down', 'crisis', 'emergency'], hint: 'Tip: Only people who can actively fix or decide. Everyone else gets a written update.' },
  { keywords: ['roadmap', 'strategy', 'planning', 'quarterly', 'q1', 'q2', 'q3', 'q4'], hint: 'Tip: Decision-makers only. Engineers join to advise, not attend the whole thing.' },
  { keywords: ['budget', 'finance', 'cost', 'spend'], hint: 'Tip: Director/VP + Finance. Engineers rarely need to be in budget meetings.' },
  { keywords: ['hiring', 'interview', 'debrief', 'candidate'], hint: 'Tip: Only people who interviewed the candidate.' },
  { keywords: ['1:1', 'one on one', 'check-in', 'checkin'], hint: 'Tip: Just the two people. Never add a third.' },
  { keywords: ['demo', 'presentation', 'showcase'], hint: 'Tip: Presenter + decision-makers. Skip the whole team.' },
  { keywords: ['knowledge', 'transfer', 'onboarding', 'training'], hint: 'Tip: 1 expert + the people who need to learn. Keep it small.' },
  { keywords: ['client', 'customer', 'account'], hint: 'Tip: Only the people the client actually needs to talk to.' },
]

function getSuggestion(title) {
  if (!title || title.length < 4) return null
  const lower = title.toLowerCase()
  return SUGGESTIONS.find(s => s.keywords.some(k => lower.includes(k)))?.hint || null
}

export default function MeetingForm({
  meetingTitle, setMeetingTitle,
  duration, setDuration,
  recurrence, setRecurrence,
  agenda, setAgenda,
  context, setContext,
}) {
  const suggestion = getSuggestion(meetingTitle)

  return (
    <div className="card space-y-4">
      <h2 className="text-white font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
        Meeting Details
      </h2>

      {/* Title */}
      <div>
        <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
          Meeting Title / Purpose
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. Weekly product sync, Q3 planning review"
          value={meetingTitle}
          onChange={e => setMeetingTitle(e.target.value)}
        />
        {suggestion && (
          <div
            className="mt-2 flex items-start gap-2 text-xs px-3 py-2 rounded-lg"
            style={{ background: 'rgba(0,255,135,0.07)', border: '1px solid rgba(0,255,135,0.2)', color: 'rgba(0,255,135,0.8)' }}
          >
            <span className="flex-shrink-0">💡</span>
            <span>{suggestion}</span>
          </div>
        )}
      </div>

      {/* Duration + Recurrence */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
            Duration
          </label>
          <select
            className="select-field"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
          >
            {DURATIONS.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
            Recurrence
          </label>
          <select
            className="select-field"
            value={recurrence}
            onChange={e => setRecurrence(e.target.value)}
          >
            {RECURRENCES.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Agenda */}
      <div>
        <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
          Agenda <span className="normal-case text-white/20 ml-1">(optional — improves AI accuracy)</span>
        </label>
        <textarea
          className="input-field resize-none"
          rows={3}
          placeholder={`e.g.\n1. Review Q3 metrics\n2. Decide on new tooling\n3. Hiring plan discussion`}
          value={agenda}
          onChange={e => setAgenda(e.target.value)}
        />
      </div>

      {/* Context */}
      <div>
        <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
          Context <span className="normal-case text-white/20 ml-1">(optional — why does this meeting exist?)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. Started 6 months ago, nobody has questioned it since"
          value={context}
          onChange={e => setContext(e.target.value)}
        />
      </div>
    </div>
  )
}
