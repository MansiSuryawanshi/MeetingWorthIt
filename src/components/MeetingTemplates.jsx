const TEMPLATES = [
  {
    emoji: '☀️',
    label: 'Daily Standup',
    title: 'Daily Team Standup',
    duration: 15,
    recurrence: 'daily',
    attendees: [
      { role: 'Engineer', salary: 120000 },
      { role: 'Engineer', salary: 120000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Product Manager', salary: 110000 },
    ],
  },
  {
    emoji: '🧠',
    label: 'Knowledge Transfer',
    title: 'Knowledge Transfer Session',
    duration: 60,
    recurrence: 'one-time',
    attendees: [
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Engineer', salary: 120000 },
      { role: 'Engineer', salary: 120000 },
      { role: 'Junior Engineer', salary: 90000 },
    ],
  },
  {
    emoji: '📞',
    label: 'Client Call',
    title: 'Client sync call',
    duration: 30,
    recurrence: 'weekly',
    attendees: [
      { role: 'Sales Manager', salary: 105000 },
      { role: 'Product Manager', salary: 110000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Manager', salary: 140000 },
    ],
  },
  {
    emoji: '🎯',
    label: 'Interview',
    title: 'Technical interview — engineering candidate',
    duration: 45,
    recurrence: 'one-time',
    attendees: [
      { role: 'Manager', salary: 140000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Senior Engineer', salary: 150000 },
    ],
  },
  {
    emoji: '🗓️',
    label: 'Sprint Planning',
    title: 'Sprint Planning',
    duration: 120,
    recurrence: 'bi-weekly',
    attendees: [
      { role: 'Product Manager', salary: 110000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Engineer', salary: 120000 },
      { role: 'Engineer', salary: 120000 },
      { role: 'Designer', salary: 100000 },
      { role: 'Manager', salary: 140000 },
    ],
  },
  {
    emoji: '🎨',
    label: 'Design Review',
    title: 'Design Review',
    duration: 60,
    recurrence: 'weekly',
    attendees: [
      { role: 'Designer', salary: 100000 },
      { role: 'Product Manager', salary: 110000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Manager', salary: 140000 },
    ],
  },
  {
    emoji: '💡',
    label: 'Brainstorm',
    title: 'Product Brainstorming Session',
    duration: 90,
    recurrence: 'one-time',
    attendees: [
      { role: 'Product Manager', salary: 110000 },
      { role: 'Designer', salary: 100000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Senior Engineer', salary: 150000 },
    ],
  },
  {
    emoji: '🚨',
    label: 'Incident Response',
    title: 'Production outage — payment system down',
    duration: 60,
    recurrence: 'one-time',
    attendees: [
      { role: 'VP / Executive', salary: 250000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Manager', salary: 140000 },
    ],
  },
  {
    emoji: '🗺️',
    label: 'Roadmap Planning',
    title: 'Q3 roadmap prioritization — build vs buy decision',
    duration: 90,
    recurrence: 'monthly',
    attendees: [
      { role: 'VP / Executive', salary: 250000 },
      { role: 'Product Manager', salary: 110000 },
      { role: 'Director', salary: 180000 },
      { role: 'Senior Engineer', salary: 150000 },
    ],
  },
  {
    emoji: '🤝',
    label: '1:1 Check-in',
    title: 'Weekly 1:1 check-in',
    duration: 30,
    recurrence: 'weekly',
    attendees: [
      { role: 'Manager', salary: 140000 },
      { role: 'Engineer', salary: 120000 },
    ],
  },
]

function formatDuration(min) {
  if (min < 60) return `${min}m`
  if (min % 60 === 0) return `${min / 60}h`
  return `${Math.floor(min / 60)}h${min % 60}m`
}

export default function MeetingTemplates({ onApply }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Quick Templates
      </p>
      <div className="grid grid-cols-5 gap-2">
        {TEMPLATES.map(t => (
          <button
            key={t.label}
            onClick={() => onApply(t)}
            className="group flex flex-col items-center gap-1 py-3 px-1 rounded-xl text-center transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,255,135,0.07)'
              e.currentTarget.style.borderColor = 'rgba(0,255,135,0.25)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span className="text-lg mb-0.5">{t.emoji}</span>
            <span className="text-white/70 text-[11px] font-medium leading-tight">{t.label}</span>
            <span className="text-white/25 text-[10px] leading-tight mt-0.5">
              {t.attendees.length}p · {formatDuration(t.duration)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
