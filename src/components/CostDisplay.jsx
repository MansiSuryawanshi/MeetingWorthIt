const COMPARISONS = [
  { max: 200, text: "That's a team lunch — but is it as productive?" },
  { max: 500, text: "That's a round-trip flight — burned in one meeting" },
  { max: 1000, text: "That's a new MacBook — gone in a conference room" },
  { max: 2500, text: "That's a month of rent — spent sitting in chairs" },
  { max: 5000, text: "That's a vacation — but nobody's relaxing" },
  { max: 15000, text: "That's a used car — and it happens every year" },
  { max: 50000, text: "That's a new car — just for this recurring meeting" },
  { max: Infinity, text: "That's a year of college tuition — every single year" },
]

const ANNUAL_COMPARISONS = [
  { max: 2000, text: "a designer's monthly tooling budget" },
  { max: 5000, text: "a team offsite" },
  { max: 10000, text: "a junior engineer's quarterly salary" },
  { max: 25000, text: "a full-time intern for a year" },
  { max: 50000, text: "a mid-level engineer's salary" },
  { max: 100000, text: "a senior hire with equity" },
  { max: Infinity, text: "multiple full-time salaries" },
]

function getComparison(cost) {
  return COMPARISONS.find(c => cost < c.max)?.text || COMPARISONS[COMPARISONS.length - 1].text
}

function getAnnualComparison(cost) {
  return ANNUAL_COMPARISONS.find(c => cost < c.max)?.text || ANNUAL_COMPARISONS[ANNUAL_COMPARISONS.length - 1].text
}

function formatCost(n) {
  return '$' + Math.round(n).toLocaleString()
}

function getScoreColor(score) {
  if (!score) return '#00ff87'
  if (score >= 7) return '#00ff87'
  if (score >= 4) return '#f59e0b'
  return '#ef4444'
}

const RECURRENCE_LABELS = {
  'one-time': null,
  daily: 'every business day',
  weekly: 'every week',
  'bi-weekly': 'every two weeks',
  monthly: 'every month',
}

export default function CostDisplay({ totalCost, annualCost, recurrence, score, isAnalyzing }) {
  const color = getScoreColor(score)
  const comparison = getComparison(totalCost)
  const annualComparison = getAnnualComparison(annualCost)
  const recurrenceLabel = RECURRENCE_LABELS[recurrence]
  const isRecurring = recurrence !== 'one-time'

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${color}, transparent 65%)`,
        }}
      />

      {/* Per-meeting cost */}
      <div className="relative text-center pt-8 pb-4 px-6">
        <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] mb-3 font-semibold">
          {isRecurring ? 'Each Meeting Costs Your Team' : 'This Meeting Costs Your Team'}
        </p>
        <div
          className={`cost-number mb-2 transition-all duration-300 ${isAnalyzing ? 'analyzing-pulse' : ''}`}
          style={{ color }}
        >
          {formatCost(totalCost)}
        </div>
        {totalCost > 0 && (
          <p className="text-white/25 text-xs italic max-w-xs mx-auto leading-relaxed">{comparison}</p>
        )}
        {totalCost === 0 && (
          <p className="text-white/20 text-sm mt-2">Add attendees to see the real cost</p>
        )}
      </div>

      {/* Annual cost — the hero section of the card for recurring meetings */}
      {isRecurring && totalCost > 0 && (
        <div
          className="relative mx-4 mb-4 rounded-xl px-5 py-5 text-center"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] font-semibold mb-2">
            Annual Cost · {recurrenceLabel}
          </p>
          <p
            className="font-black text-4xl md:text-5xl leading-none mb-2"
            style={{ fontFamily: 'Outfit, sans-serif', color }}
          >
            {formatCost(annualCost)}
            <span className="text-lg font-normal text-white/25 ml-1">/yr</span>
          </p>
          <p className="text-white/30 text-xs mt-2">
            That's equivalent to <span className="text-white/50 font-medium">{annualComparison}</span>
          </p>
        </div>
      )}

      {/* Analyzing state */}
      {isAnalyzing && (
        <div className="px-6 pb-5 text-center">
          <div className="inline-flex items-center gap-2 text-white/40 text-xs">
            <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            AI is evaluating if this cost is justified…
          </div>
        </div>
      )}

      {/* Score pill */}
      {score && !isAnalyzing && (
        <div className="px-6 pb-5 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full"
            style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            Necessity Score: {score}/10
          </div>
        </div>
      )}

      {/* Empty state footer for non-recurring */}
      {!isRecurring && totalCost > 0 && !isAnalyzing && !score && (
        <div className="px-6 pb-5 text-center">
          <p className="text-white/20 text-xs">One-time meeting — no recurring cost</p>
        </div>
      )}
    </div>
  )
}
