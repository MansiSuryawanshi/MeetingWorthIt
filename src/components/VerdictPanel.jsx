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

function SavingsCalculator({ annualCost, recurrence }) {
  if (recurrence === 'one-time' || annualCost < 500) return null
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
    >
      <p className="text-white/50 text-xs uppercase tracking-widest mb-1 font-medium">
        Cancel This Meeting → Save
      </p>
      <p
        className="font-black text-3xl"
        style={{ fontFamily: 'Outfit, sans-serif', color: '#ef4444' }}
      >
        ${Math.round(annualCost).toLocaleString()}
        <span className="text-base font-normal text-white/30 ml-1">/year</span>
      </p>
    </div>
  )
}

export default function VerdictPanel({ verdict, attendees, annualCost, recurrence }) {
  const [showAsyncTooltip, setShowAsyncTooltip] = useState(false)
  const [markedWorthIt, setMarkedWorthIt] = useState(false)
  const showSavings = verdict.necessityScore <= 4 && recurrence !== 'one-time'

  return (
    <div className="card space-y-5 verdict-animate">
      {/* Score */}
      <ScoreBadge score={verdict.necessityScore} label={verdict.scoreLabel} />

      {/* Savings calculator — only shown for low scores */}
      {showSavings && (
        <SavingsCalculator annualCost={annualCost} recurrence={recurrence} />
      )}

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
              className="flex items-start justify-between gap-3 p-3 rounded-lg"
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
