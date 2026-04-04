import { useState, useRef, useEffect } from 'react'
import { getSuggestedSalary, getRoleNames } from '../data/salaryBenchmarks'

const SALARY_PRESETS = [
  { label: 'Junior Engineer', salary: 90000 },
  { label: 'Engineer', salary: 120000 },
  { label: 'Senior Engineer', salary: 150000 },
  { label: 'Product Manager', salary: 110000 },
  { label: 'Designer', salary: 100000 },
  { label: 'Manager', salary: 140000 },
  { label: 'Director', salary: 180000 },
  { label: 'VP / Executive', salary: 250000 },
  { label: 'Custom', salary: null },
]

const ROLE_NAMES = getRoleNames()

function TeamPicker({ teamMembers, onSelect, onClose }) {
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const filtered = teamMembers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 8)

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 mt-1 rounded-xl z-30 overflow-hidden"
      style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      <div className="p-2 border-b border-white/10">
        <input
          type="text"
          className="input-field text-xs py-1.5"
          placeholder="Search team members..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
      </div>
      {filtered.length === 0 ? (
        <p className="text-white/30 text-xs text-center py-3">No matches</p>
      ) : (
        <div className="max-h-48 overflow-y-auto">
          {filtered.map(m => (
            <button
              key={m.id}
              className="w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
              onClick={() => { onSelect(m); onClose() }}
            >
              <div>
                <p className="text-white text-sm font-medium">{m.name}</p>
                <p className="text-white/40 text-xs">{m.role} · {m.department}</p>
              </div>
              <p className="text-white/50 text-xs">${m.salary.toLocaleString()}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AttendeeRow({ attendee, onUpdate, onRemove, canRemove, teamMembers = [], city, industry }) {
  const [showTeamPicker, setShowTeamPicker] = useState(false)
  const isCustom = !SALARY_PRESETS.some(p => p.salary === attendee.salary && p.label !== 'Custom')

  const handlePresetChange = (e) => {
    const label = e.target.value
    const preset = SALARY_PRESETS.find(p => p.label === label)
    if (preset && preset.salary !== null) {
      onUpdate(attendee.id, 'salary', preset.salary)
    }
  }

  const selectedLabel = () => {
    if (isCustom) return 'Custom'
    const match = SALARY_PRESETS.find(p => p.salary === attendee.salary)
    return match ? match.label : 'Custom'
  }

  const handleSelectTeamMember = (member) => {
    onUpdate(attendee.id, 'role', member.name + ' (' + member.role + ')')
    onUpdate(attendee.id, 'salary', member.salary)
  }

  // Benchmark suggestion
  const benchmarkSalary = getSuggestedSalary(attendee.role, city, industry)
  const showBenchmark = benchmarkSalary && Math.abs(benchmarkSalary - attendee.salary) > 8000

  return (
    <div className="flex items-start gap-2 group">
      <div className="flex-1 space-y-2">
        {/* Role row with team picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="relative">
            <input
              type="text"
              className="input-field pr-16"
              placeholder="Role or name"
              value={attendee.role}
              onChange={e => onUpdate(attendee.id, 'role', e.target.value)}
            />
            {teamMembers.length > 0 && (
              <button
                onClick={() => setShowTeamPicker(!showTeamPicker)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-0.5 rounded-md transition-all"
                style={{ color: '#00ff87', background: 'rgba(0,255,135,0.1)' }}
              >
                👥
              </button>
            )}
            {showTeamPicker && teamMembers.length > 0 && (
              <TeamPicker
                teamMembers={teamMembers}
                onSelect={handleSelectTeamMember}
                onClose={() => setShowTeamPicker(false)}
              />
            )}
          </div>

          <div className="space-y-1.5">
            <select
              className="select-field"
              style={{ fontSize: '14px', height: '40px' }}
              value={selectedLabel()}
              onChange={handlePresetChange}
            >
              {SALARY_PRESETS.map(p => (
                <option key={p.label} value={p.label}>
                  {p.label}{p.salary ? ` — $${p.salary.toLocaleString()}/yr` : ''}
                </option>
              ))}
            </select>
            {(isCustom || selectedLabel() === 'Custom') && (
              <input
                type="number"
                className="input-field"
                placeholder="Annual salary"
                value={attendee.salary || ''}
                onChange={e => onUpdate(attendee.id, 'salary', Number(e.target.value) || 0)}
                min={0}
              />
            )}
          </div>
        </div>

        {/* Benchmark hint */}
        {showBenchmark && (
          <div className="flex items-center justify-between text-xs px-2">
            <span style={{ color: 'rgba(245,158,11,0.7)' }}>
              💡 Market rate for this role in {city || 'Remote'}: ${benchmarkSalary.toLocaleString()}/yr
            </span>
            <button
              className="underline text-xs ml-2"
              style={{ color: 'rgba(245,158,11,0.7)' }}
              onClick={() => onUpdate(attendee.id, 'salary', benchmarkSalary)}
            >
              Use this
            </button>
          </div>
        )}
      </div>

      {canRemove && (
        <button
          onClick={() => onRemove(attendee.id)}
          className="mt-1.5 w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  )
}
