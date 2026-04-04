import DEMO_SCENARIOS from '../data/demoScenarios'

function RecurrenceLabel({ value }) {
  const map = {
    'one-time': 'One-time',
    daily: 'Daily',
    weekly: 'Weekly',
    'bi-weekly': 'Bi-weekly',
    monthly: 'Monthly',
  }
  return map[value] || value
}

export default function DemoScenarioModal({ onSelect, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl p-6 md:p-8 space-y-6"
        style={{
          background: 'linear-gradient(165deg, #1e2235, #151923)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,135,0.03)',
          animation: 'fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(0,255,135,0.1)', color: '#00ff87', border: '1px solid rgba(0,255,135,0.2)' }}>
            ✨ Demo Mode
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Choose a Sample Meeting
          </h2>
          <p className="text-white/35 text-sm max-w-md mx-auto">
            Pick a scenario to auto-fill the form with realistic data.
            You can edit anything before analyzing.
          </p>
        </div>

        {/* Scenario Cards */}
        <div className="space-y-3">
          {DEMO_SCENARIOS.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => onSelect(scenario)}
              className="w-full text-left p-5 rounded-xl transition-all duration-200 group"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,255,135,0.06)'
                e.currentTarget.style.borderColor = 'rgba(0,255,135,0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{scenario.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-white font-bold text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {scenario.label}
                    </span>
                  </div>
                  <p className="text-white/35 text-sm mb-3 leading-relaxed">
                    {scenario.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}>
                      👥 {scenario.attendees.length} attendees
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}>
                      ⏱ {scenario.duration} min
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}>
                      🔄 <RecurrenceLabel value={scenario.recurrence} />
                    </span>
                  </div>
                </div>
                <span className="text-white/15 group-hover:text-[#00ff87] transition-colors text-lg flex-shrink-0 mt-2">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-1">
          <button
            onClick={onClose}
            className="text-white/25 text-sm hover:text-white/50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
