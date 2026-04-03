const COMPARISONS = [
  { max: 500, text: 'About the cost of a nice dinner' },
  { max: 1000, text: 'About the cost of a flight within the US' },
  { max: 2500, text: 'About the cost of a flight to Europe' },
  { max: 5000, text: 'About the cost of a weekend vacation' },
  { max: 15000, text: 'About the cost of a used car' },
  { max: 50000, text: 'About the cost of a new car' },
  { max: Infinity, text: 'About the cost of a year of college tuition' },
]

function getComparison(cost) {
  return COMPARISONS.find(c => cost < c.max)?.text || COMPARISONS[COMPARISONS.length - 1].text
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
  daily: 'per year (daily)',
  weekly: 'per year (weekly)',
  'bi-weekly': 'per year (bi-weekly)',
  monthly: 'per year (monthly)',
}

export default function CostDisplay({ totalCost, annualCost, recurrence, score, isAnalyzing }) {
  const color = getScoreColor(score)
  const comparison = getComparison(totalCost)
  const annualLabel = RECURRENCE_LABELS[recurrence]

  return (
    <div
      className="card text-center py-8 relative overflow-hidden"
      style={{ minHeight: '220px' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
        }}
      />

      <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-medium">
        This Meeting Costs
      </p>

      <div
        className={`cost-number mb-1 transition-all duration-300 ${isAnalyzing ? 'analyzing-pulse' : ''}`}
        style={{ color }}
      >
        {formatCost(totalCost)}
      </div>

      {annualLabel && totalCost > 0 && (
        <div className="text-white/50 text-sm mt-2 mb-1">
          <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {formatCost(annualCost)}
          </span>
          {' '}
          <span className="text-white/40">{annualLabel}</span>
        </div>
      )}

      {totalCost > 0 && (
        <p className="text-white/30 text-xs mt-3 italic">{comparison}</p>
      )}

      {totalCost === 0 && (
        <p className="text-white/20 text-sm mt-4">Add attendees to see cost</p>
      )}

      {isAnalyzing && (
        <p className="text-white/40 text-xs mt-4">AI is analyzing your meeting...</p>
      )}

      {score && !isAnalyzing && (
        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
          style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
          <span>Score {score}/10</span>
        </div>
      )}
    </div>
  )
}
