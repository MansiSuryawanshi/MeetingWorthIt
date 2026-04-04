export default function DemoBadge({ onExit }) {
  return (
    <div
      className="fixed top-0 left-1/2 z-40 flex items-center gap-3 px-4 py-2 rounded-b-xl"
      style={{
        transform: 'translateX(-50%)',
        background: 'rgba(15,17,23,0.92)',
        border: '1px solid rgba(0,255,135,0.2)',
        borderTop: 'none',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        animation: 'slideDown 0.4s ease forwards',
      }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: '#00ff87', boxShadow: '0 0 6px rgba(0,255,135,0.5)' }}
      />
      <span className="text-xs text-white/60 font-medium whitespace-nowrap">
        <span style={{ color: '#00ff87' }}>Demo Mode</span>
        <span className="hidden sm:inline"> — using sample meeting data and simulated AI output</span>
      </span>
      <button
        onClick={onExit}
        className="text-xs px-2 py-0.5 rounded-md transition-all font-medium flex-shrink-0"
        style={{
          color: 'rgba(255,255,255,0.5)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#ef4444'
          e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
          e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
        }}
      >
        ✕ Exit Demo
      </button>
    </div>
  )
}
