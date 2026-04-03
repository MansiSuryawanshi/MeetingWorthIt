import { useState } from 'react'
import { addTeamMember, deleteTeamMember, updateTeamMember } from '../lib/firebase'
import { getRoleNames, getSuggestedSalary } from '../data/salaryBenchmarks'

const BUILTIN_ROLES = getRoleNames()
const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations', 'Finance', 'HR', 'Legal', 'Customer Success']

// Load + save custom roles from localStorage
function getCustomRoles() {
  return JSON.parse(localStorage.getItem('mwi_custom_roles') || '[]')
}
function saveCustomRole(role) {
  const existing = getCustomRoles()
  if (!existing.includes(role)) {
    localStorage.setItem('mwi_custom_roles', JSON.stringify([...existing, role]))
  }
}

function MemberRow({ member, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const handleDelete = async () => {
    setDeleting(true)
    try { await onDelete(member.id) }
    finally { setDeleting(false) }
  }

  return (
    <div
      className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
        style={{ background: 'rgba(0,255,135,0.15)', color: '#00ff87' }}>
        {member.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{member.name}</p>
        <p className="text-white/40 text-xs">{member.role} · {member.department}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-white/70 text-sm">${member.salary.toLocaleString()}</p>
        <p className="text-white/30 text-xs">/year</p>
      </div>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
      >
        {deleting ? '...' : '✕'}
      </button>
    </div>
  )
}

function RoleSelector({ value, onChange }) {
  const [customRoles, setCustomRoles] = useState(getCustomRoles())
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customInput, setCustomInput] = useState('')

  const allRoles = [...BUILTIN_ROLES, ...customRoles]

  const handleSelect = (e) => {
    if (e.target.value === '__add_custom__') {
      setShowCustomInput(true)
    } else {
      onChange(e.target.value)
    }
  }

  const handleAddCustom = () => {
    const trimmed = customInput.trim()
    if (!trimmed) return
    saveCustomRole(trimmed)
    const updated = getCustomRoles()
    setCustomRoles(updated)
    onChange(trimmed)
    setCustomInput('')
    setShowCustomInput(false)
  }

  if (showCustomInput) {
    return (
      <div className="flex gap-1">
        <input
          type="text"
          className="input-field flex-1"
          placeholder="e.g. Scrum Master, Tech Lead..."
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleAddCustom()
            if (e.key === 'Escape') setShowCustomInput(false)
          }}
          autoFocus
        />
        <button
          onClick={handleAddCustom}
          className="px-3 rounded-lg text-sm font-medium flex-shrink-0"
          style={{ background: 'rgba(0,255,135,0.15)', color: '#00ff87' }}
        >
          Add
        </button>
        <button
          onClick={() => setShowCustomInput(false)}
          className="px-2 rounded-lg text-sm text-white/30 hover:text-white/60 flex-shrink-0"
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <select className="select-field" value={value} onChange={handleSelect}>
      <optgroup label="Standard Roles">
        {BUILTIN_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
      </optgroup>
      {customRoles.length > 0 && (
        <optgroup label="Custom Roles">
          {customRoles.map(r => <option key={r} value={r}>{r}</option>)}
        </optgroup>
      )}
      <option value="__add_custom__">＋ Add custom role...</option>
    </select>
  )
}

function AddMemberForm({ onAdd, city, industry }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('Engineer')
  const [department, setDepartment] = useState('Engineering')
  const [salary, setSalary] = useState(120000)
  const [saving, setSaving] = useState(false)

  const suggested = getSuggestedSalary(role, city, industry)

  const handleRoleChange = (r) => {
    setRole(r)
    const s = getSuggestedSalary(r, city, industry)
    if (s) setSalary(s)
  }

  const handleAdd = async () => {
    if (!name.trim()) return
    setSaving(true)
    try {
      await onAdd({ name: name.trim(), role, department, salary })
      setName('')
      setRole('Engineer')
      setDepartment('Engineering')
      setSalary(120000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="space-y-3 p-4 rounded-xl"
      style={{ background: 'rgba(0,255,135,0.04)', border: '1px solid rgba(0,255,135,0.15)' }}
    >
      <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'rgba(0,255,135,0.6)' }}>
        Add Team Member
      </p>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          className="input-field"
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <select className="select-field" value={department} onChange={e => setDepartment(e.target.value)}>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        {/* Flexible role selector */}
        <RoleSelector value={role} onChange={handleRoleChange} />

        <div>
          <input
            type="number"
            className="input-field"
            placeholder="Salary"
            value={salary}
            onChange={e => setSalary(Number(e.target.value))}
            min={0}
          />
          {suggested && Math.abs(suggested - salary) > 5000 && (
            <p className="text-xs mt-1 cursor-pointer" style={{ color: 'rgba(0,255,135,0.5)' }}
              onClick={() => setSalary(suggested)}>
              Benchmark: ${suggested.toLocaleString()} — use this
            </p>
          )}
        </div>
      </div>
      <button
        className="btn-primary py-2.5"
        onClick={handleAdd}
        disabled={!name.trim() || saving}
      >
        {saving ? 'Adding...' : '+ Add Member'}
      </button>
    </div>
  )
}

export default function TeamModal({ members, onClose, onAdd, onDelete, city, industry }) {
  const [search, setSearch] = useState('')

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.department?.toLowerCase().includes(search.toLowerCase())
  )

  const totalPayroll = members.reduce((s, m) => s + m.salary, 0)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-lg rounded-2xl flex flex-col"
        style={{ background: '#16192a', border: '1px solid rgba(255,255,255,0.12)', maxHeight: '90vh' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Team Database
            </h2>
            <p className="text-white/30 text-xs mt-0.5">
              {members.length} members · ${totalPayroll.toLocaleString()} total payroll
            </p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors text-lg">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AddMemberForm onAdd={onAdd} city={city} industry={industry} />

          {members.length > 0 && (
            <input
              type="text"
              className="input-field"
              placeholder="Search by name, role, or department..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          )}

          {members.length === 0 ? (
            <div className="text-center py-8 text-white/20 text-sm">
              No team members yet. Add your first one above.
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map(m => (
                <MemberRow key={m.id} member={m} onDelete={onDelete} />
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-white/20 text-sm py-4">No matches for "{search}"</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
