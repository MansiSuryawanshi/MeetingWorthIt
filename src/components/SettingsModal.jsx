import { useState } from 'react'
import { CITIES, INDUSTRIES } from '../data/salaryBenchmarks'

export default function SettingsModal({ apiKey, onSave, onClose, city, industry, onSavePrefs }) {
  const [tab, setTab] = useState('api')
  const [apiInput, setApiInput] = useState(apiKey)
  const [cityInput, setCityInput] = useState(city || 'Remote')
  const [industryInput, setIndustryInput] = useState(industry || 'Tech')

  const handleSaveAll = () => {
    onSave(apiInput.trim())
    onSavePrefs({ city: cityInput, industry: industryInput })
    onClose()
  }

  const TABS = [
    { id: 'api', label: '🤖 Claude API' },
    { id: 'prefs', label: '📍 Location' },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: '#16192a', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>Settings</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors text-lg">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 px-6">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="pb-3 px-3 text-xs font-medium transition-all border-b-2 -mb-px"
              style={{
                color: tab === t.id ? '#00ff87' : 'rgba(255,255,255,0.3)',
                borderColor: tab === t.id ? '#00ff87' : 'transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-4">
          {tab === 'api' && (
            <>
              <p className="text-white/40 text-sm leading-relaxed">
                Required for AI meeting analysis. Stored locally in your browser.
              </p>
              <div>
                <label className="block text-xs text-white/30 mb-1.5 uppercase tracking-wider font-medium">
                  Anthropic API Key
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="sk-ant-..."
                  value={apiInput}
                  onChange={e => setApiInput(e.target.value)}
                  autoFocus
                />
              </div>
              <div
                className="flex items-center gap-2 p-3 rounded-lg text-xs"
                style={{ background: 'rgba(0,255,135,0.06)', border: '1px solid rgba(0,255,135,0.15)' }}
              >
                <span>🍃</span>
                <span style={{ color: 'rgba(0,255,135,0.7)' }}>
                  Team database powered by Firebase Firestore — connected automatically.
                </span>
              </div>
              <p className="text-white/20 text-xs">Get your Claude key at console.anthropic.com</p>
            </>
          )}

          {tab === 'prefs' && (
            <>
              <p className="text-white/40 text-sm leading-relaxed">
                Used to show accurate market salary benchmarks for your location and industry.
              </p>
              <div>
                <label className="block text-xs text-white/30 mb-1.5 uppercase tracking-wider font-medium">
                  City / Location
                </label>
                <select className="select-field" value={cityInput} onChange={e => setCityInput(e.target.value)}>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/30 mb-1.5 uppercase tracking-wider font-medium">
                  Industry
                </label>
                <select className="select-field" value={industryInput} onChange={e => setIndustryInput(e.target.value)}>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div
                className="rounded-lg p-3 text-xs"
                style={{ background: 'rgba(0,255,135,0.06)', border: '1px solid rgba(0,255,135,0.15)' }}
              >
                <p style={{ color: 'rgba(0,255,135,0.7)' }}>
                  💡 Benchmarks set to {cityInput} · {industryInput}
                </p>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            <button className="btn-secondary flex-1" onClick={onClose}>Cancel</button>
            <button className="btn-primary flex-1" onClick={handleSaveAll}>Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  )
}
