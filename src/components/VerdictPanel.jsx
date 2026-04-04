import { useState } from 'react'

function ScoreBadge({ score, label }) {
  let color, bg, border
  if (score >= 8) {
    color = '#00ff87'; bg = 'rgba(0,255,135,0.1)'; border = 'rgba(0,255,135,0.3)'
  } else if (score >= 5) {
    color = '#f59e0b'; bg = 'rgba(245,158,11,0.1)'; border = 'rgba(245,158,11,0.3)'
  } else {
    color = '#ef4444'; bg = 'rgba(239,68,68,0.1)'; border = 'rgba(239,68,68,0.3)'
  }

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <div
        className="text-5xl font-black leading-none"
        style={{ fontFamily: 'Outfit, sans-serif', color }}
      >
        {score}
        <span className="text-2xl text-white/30">/10</span>
      </div>
      <div>
        <div className="font-bold text-base text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {label}
        </div>
        <div className="text-xs mt-0.5" style={{ color }}>Necessity Score</div>
      </div>
    </div>
  )
}

function StatusChip({ status }) {
  const styles = {
    'Essential': { color: '#00ff87', bg: 'rgba(0,255,135,0.1)' },
    'Optional': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    'Could Receive Notes Instead': { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
  }
  const s = styles[status] || styles['Optional']
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
      style={{ color: s.color, background: s.bg }}
    >
      {status}
    </span>
  )
}

function Section({ title, children }) {
  return (
    <div className="space-y-2">
      <h3
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function SavingsCard({ annualCost, recurrence, score }) {
  if (recurrence === 'one-time' || annualCost < 500) return null

  // Calculate potential savings based on score
  // Low score = high savings potential, high score = low savings
  let savingsPercent, savingsLabel, savingsBg, savingsBorder, savingsColor
  if (score <= 3) {
    savingsPercent = 0.85
    savingsLabel = 'Cancel or replace with async — recover most of this cost'
    savingsBg = 'rgba(239,68,68,0.08)'
    savingsBorder = 'rgba(239,68,68,0.2)'
    savingsColor = '#ef4444'
  } else if (score <= 5) {
    savingsPercent = 0.50
    savingsLabel = 'Cut attendees and shorten — save half the annual spend'
    savingsBg = 'rgba(245,158,11,0.08)'
    savingsBorder = 'rgba(245,158,11,0.2)'
    savingsColor = '#f59e0b'
  } else if (score <= 7) {
    savingsPercent = 0.25
    savingsLabel = 'Optimize attendees — reduce cost by up to 25%'
    savingsBg = 'rgba(0,255,135,0.06)'
    savingsBorder = 'rgba(0,255,135,0.15)'
    savingsColor = '#00ff87'
  } else {
    return null // high score = meeting is justified, no savings to show
  }

  const potentialSavings = Math.round(annualCost * savingsPercent)

  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{ background: savingsBg, border: `1px solid ${savingsBorder}` }}
    >
      <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] font-semibold mb-2">
        Potential Annual Savings
      </p>
      <p
        className="font-black text-3xl leading-none mb-2"
        style={{ fontFamily: 'Outfit, sans-serif', color: savingsColor }}
      >
        ${potentialSavings.toLocaleString()}
        <span className="text-sm font-normal text-white/25 ml-1">/year</span>
      </p>
      <p className="text-white/35 text-xs leading-relaxed max-w-xs mx-auto">
        {savingsLabel}
      </p>
    </div>
  )
}

export default function VerdictPanel({ verdict, attendees, annualCost, recurrence, meetLink }) {
  const [showAsyncTooltip, setShowAsyncTooltip] = useState(false)
  const [markedWorthIt, setMarkedWorthIt] = useState(false)

  return (
    <div className="card space-y-5 verdict-animate">
      {/* Score */}
      <ScoreBadge score={verdict.necessityScore} label={verdict.scoreLabel} />

      {/* Savings card — shown for low/medium scores with recurring meetings */}
      <SavingsCard annualCost={annualCost} recurrence={recurrence} score={verdict.necessityScore} />

      {/* Key Question */}
      <Section title="Key Question to Answer">
        <p
          className="text-white text-sm leading-relaxed italic"
          style={{ borderLeft: '2px solid rgba(0,255,135,0.4)', paddingLeft: '12px' }}
        >
          "{verdict.keyQuestion}"
        </p>
      </Section>

      {/* Attendee Analysis */}
      <Section title="Who Actually Needs to Attend">
        <div className="space-y-2">
          {verdict.attendeeAnalysis?.map((a, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/[0.04]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <span className="text-white text-sm font-medium">{a.role}</span>
                <p className="text-white/40 text-xs mt-0.5">{a.reason}</p>
              </div>
              <StatusChip status={a.status} />
            </div>
          ))}
        </div>
      </Section>

      {/* Async */}
      <Section title="Could This Be Async?">
        <div
          className="flex items-start gap-3 p-3 rounded-lg"
          style={{
            background: verdict.couldBeAsync ? 'rgba(245,158,11,0.08)' : 'rgba(0,255,135,0.08)',
            border: verdict.couldBeAsync ? '1px solid rgba(245,158,11,0.2)' : '1px solid rgba(0,255,135,0.2)',
          }}
        >
          <span className="text-2xl flex-shrink-0">{verdict.couldBeAsync ? '⚠️' : '✅'}</span>
          <div>
            <div
              className="font-bold text-sm mb-1"
              style={{ color: verdict.couldBeAsync ? '#f59e0b' : '#00ff87' }}
            >
              {verdict.couldBeAsync ? 'Yes — Go Async' : 'No — Meeting Needed'}
            </div>
            <p className="text-white/60 text-xs leading-relaxed">{verdict.asyncReason}</p>
            {verdict.couldBeAsync && verdict.asyncFormat && (
              <p className="text-white/40 text-xs mt-1">
                Suggested format: <span className="text-white/70 font-medium">{verdict.asyncFormat}</span>
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Actionable Fix */}
      <Section title="One Actionable Fix">
        <div
          className="p-3 rounded-lg text-sm text-white/80 leading-relaxed"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          💡 {verdict.actionableFix}
        </div>
      </Section>

      {/* Google Meet button — only if imported from Google Calendar */}
      {meetLink && (
        <a
          href={meetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all"
          style={{
            background: verdict.necessityScore >= 5
              ? 'linear-gradient(135deg, rgba(0,255,135,0.15), rgba(0,204,106,0.1))'
              : 'rgba(255,255,255,0.05)',
            border: `1px solid ${verdict.necessityScore >= 5 ? 'rgba(0,255,135,0.3)' : 'rgba(255,255,255,0.1)'}`,
            color: verdict.necessityScore >= 5 ? '#00ff87' : 'rgba(255,255,255,0.4)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {verdict.necessityScore >= 5 ? 'Join Google Meet — Worth It ✓' : 'Join Google Meet Anyway'}
        </a>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        <button
          className="btn-secondary flex-1 flex items-center justify-center gap-2"
          onClick={() => setMarkedWorthIt(!markedWorthIt)}
          style={markedWorthIt ? {
            background: 'rgba(0,255,135,0.1)',
            borderColor: 'rgba(0,255,135,0.4)',
            color: '#00ff87',
          } : {}}
        >
          {markedWorthIt ? '✓ Worth It' : 'Worth It ✓'}
        </button>

        {verdict.couldBeAsync && (
          <div className="relative flex-1">
            <button
              className="btn-secondary w-full flex items-center justify-center gap-2"
              onClick={() => setShowAsyncTooltip(!showAsyncTooltip)}
            >
              Convert to Async →
            </button>
            {showAsyncTooltip && verdict.asyncFormat && (
              <div
                className="absolute bottom-full mb-2 left-0 right-0 p-3 rounded-lg text-xs text-white/80 z-10"
                style={{
                  background: '#1a1f2e',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
              >
                <strong className="text-white block mb-1">Use: {verdict.asyncFormat}</strong>
                {verdict.asyncReason}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
