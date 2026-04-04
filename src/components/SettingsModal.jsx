import { useState } from 'react'
import { CITIES, INDUSTRIES } from '../data/salaryBenchmarks'
import { saveFirebaseConfig, clearFirebaseConfig, getStoredFirebaseConfig } from '../lib/firebase'

export default function SettingsModal({ apiKey, onSave, onClose, city, industry, onSavePrefs }) {
  const [tab, setTab] = useState('api')
  const [apiInput, setApiInput] = useState(apiKey)
  const [cityInput, setCityInput] = useState(city || 'Remote')
  const [industryInput, setIndustryInput] = useState(industry || 'Tech')

  const existingFb = getStoredFirebaseConfig()
  const [fbApiKey, setFbApiKey] = useState(existingFb?.apiKey || '')
  const [fbProjectId, setFbProjectId] = useState(existingFb?.projectId || '')
  const [fbAuthDomain, setFbAuthDomain] = useState(existingFb?.authDomain || '')
  const [fbAppId, setFbAppId] = useState(existingFb?.appId || '')
  const [fbSaved, setFbSaved] = useState(false)

  const handleSaveAll = () => {
    onSave(apiInput.trim())
    onSavePrefs({ city: cityInput, industry: industryInput })
    onClose()
  }

  const handleSaveFirebase = () => {
    if (fbApiKey && fbProjectId) {
      saveFirebaseConfig({
        apiKey: fbApiKey.trim(),
        projectId: fbProjectId.trim(),
        authDomain: fbAuthDomain.trim() || `${fbProjectId.trim()}.firebaseapp.com`,
        appId: fbAppId.trim(),
      })
      setFbSaved(true)
      setTimeout(() => setFbSaved(false), 2000)
    }
  }

  const handleClearFirebase = () => {
    clearFirebaseConfig()
    setFbApiKey('')
    setFbProjectId('')
    setFbAuthDomain('')
    setFbAppId('')
  }

  const usingCustomFirebase = !!existingFb?.apiKey

  const TABS = [
    { id: 'api', label: '🤖 Claude API' },
    { id: 'firebase', label: '🔥 Firebase' },
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
              <p className="text-white/20 text-xs">Get your Claude key at console.anthropic.com</p>
            </>
          )}

          {tab === 'firebase' && (
            <>
              <div
                className="flex items-start gap-2 p-3 rounded-lg text-xs"
                style={{
                  background: usingCustomFirebase ? 'rgba(0,255,135,0.06)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${usingCustomFirebase ? 'rgba(0,255,135,0.2)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span>{usingCustomFirebase ? '🔥' : '🍃'}</span>
                <span style={{ color: usingCustomFirebase ? 'rgba(0,255,135,0.8)' : 'rgba(255,255,255,0.3)' }}>
                  {usingCustomFirebase
                    ? `Using your Firebase project: ${existingFb.projectId}`
                    : 'Using default shared database. Connect your own Firebase below.'}
                </span>
              </div>

              <p className="text-white/40 text-sm leading-relaxed">
                Connect your own Firebase Firestore so your team data is private. Get these values from Firebase Console → Project Settings → Your apps.
              </p>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-white/30 mb-1 uppercase tracking-wider font-medium">Firebase API Key</label>
                  <input type="text" className="input-field" placeholder="AIzaSy..." value={fbApiKey} onChange={e => setFbApiKey(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-white/30 mb-1 uppercase tracking-wider font-medium">Project ID</label>
                  <input type="text" className="input-field" placeholder="my-project-id" value={fbProjectId} onChange={e => setFbProjectId(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-white/30 mb-1 uppercase tracking-wider font-medium">Auth Domain <span className="normal-case text-white/20">(optional)</span></label>
                  <input type="text" className="input-field" placeholder="my-project.firebaseapp.com" value={fbAuthDomain} onChange={e => setFbAuthDomain(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-white/30 mb-1 uppercase tracking-wider font-medium">App ID <span className="normal-case text-white/20">(optional)</span></label>
                  <input type="text" className="input-field" placeholder="1:123456:web:abc..." value={fbAppId} onChange={e => setFbAppId(e.target.value)} />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn-primary flex-1 py-2.5"
                  onClick={handleSaveFirebase}
                  disabled={!fbApiKey || !fbProjectId}
                >
                  {fbSaved ? '✓ Saved — reload app' : 'Connect My Firebase'}
                </button>
                {usingCustomFirebase && (
                  <button
                    className="btn-secondary px-4 py-2.5 text-sm"
                    onClick={handleClearFirebase}
                  >
                    Use Default
                  </button>
                )}
              </div>
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

          {tab !== 'firebase' && (
            <div className="flex gap-3 pt-2">
              <button className="btn-secondary flex-1" onClick={onClose}>Cancel</button>
              <button className="btn-primary flex-1" onClick={handleSaveAll}>Save Settings</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
