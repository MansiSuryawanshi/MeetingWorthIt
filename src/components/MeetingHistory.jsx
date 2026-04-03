function scoreColor(score) {
  if (score >= 7) return '#00ff87'
  if (score >= 4) return '#f59e0b'
  return '#ef4444'
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function MeetingHistory({ history }) {
  return (
    <div className="card">
      <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Recent Meetings
      </h2>
      <div className="space-y-2">
        {history.map(entry => (
          <div
            key={entry.id}
            className="flex items-center justify-between gap-4 py-2.5 px-3 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{entry.title}</p>
              <p className="text-white/30 text-xs">{timeAgo(entry.timestamp)} · {entry.recurrence}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <p className="text-white text-sm font-semibold">${entry.cost.toLocaleString()}</p>
                {entry.recurrence !== 'one-time' && (
                  <p className="text-white/30 text-xs">${entry.annualCost.toLocaleString()}/yr</p>
                )}
              </div>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: `${scoreColor(entry.score)}15`,
                  color: scoreColor(entry.score),
                  border: `1px solid ${scoreColor(entry.score)}30`,
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                {entry.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
