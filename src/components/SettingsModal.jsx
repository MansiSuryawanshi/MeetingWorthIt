import { useState } from 'react'
import { CITIES, INDUSTRIES } from '../data/salaryBenchmarks'
import { saveFirebaseConfig, clearFirebaseConfig, getStoredFirebaseConfig, testFirebaseConnection } from '../lib/firebase'
import { getGoogleClientId, saveGoogleClientId, clearGoogleClientId, isGoogleCalendarConfigured } from '../lib/googleCalendar'

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
  const [fbStatus, setFbStatus] = useState(null) // null | 'testing' | 'success' | 'error'
  const [fbConnected, setFbConnected] = useState(!!existingFb?.apiKey)

  const handleSaveAll = () => {
    onSave(apiInput.trim())
    onSavePrefs({ city: cityInput, industry: industryInput })
    onClose()
  }

  const handleRemoveApiKey = () => {
    localStorage.removeItem('mwi_api_key')
    setApiInput('')
    onSave('')
  }

  const handleConnectFirebase = async () => {
    if (!fbApiKey || !fbProjectId) return
    setFbStatus('testing')
    saveFirebaseConfig({
      apiKey: fbApiKey.trim(),
      projectId: fbProjectId.trim(),
      authDomain: fbAuthDomain.trim() || `${fbProjectId.trim()}.firebaseapp.com`,
      appId: fbAppId.trim(),
    })
    try {
      await testFirebaseConnection()
      setFbStatus('success')
      setFbConnected(true)
    } catch {
      setFbStatus('error')
      clearFirebaseConfig()
      setFbConnected(false)
    }
  }

  const handleDisconnectFirebase = () => {
    clearFirebaseConfig()
    setFbApiKey('')
    setFbProjectId('')
    setFbAuthDomain('')
    setFbAppId('')
    setFbStatus(null)
    setFbConnected(false)
  }

  const [gclientId, setGclientId] = useState(getGoogleClientId())
  const [gcSaved, setGcSaved] = useState(false)

  const handleSaveGoogleClient = () => {
    if (!gclientId.trim()) return
    saveGoogleClientId(gclientId.trim())
    setGcSaved(true)
    setTimeout(() => setGcSaved(false), 2000)
  }

  const handleDisconnectGoogle = () => {
    clearGoogleClientId()
    setGclientId('')
  }

  const TABS = [
    { id: 'api', label: '🤖 Claude API' },
    { id: 'firebase', label: '🔥 Firebase' },
    { id: 'gcal', label: '📅 Google Cal' },
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

          {/* CLAUDE API TAB */}
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

              {apiInput && (
                <button
                  onClick={handleRemoveApiKey}
                  className="w-full py-2 rounded-lg text-sm transition-all"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
                >
                  Remove API Key
                </button>
              )}

              <p className="text-white/20 text-xs">Get your Claude key at console.anthropic.com</p>

              <div className="flex gap-3 pt-2">
                <button className="btn-secondary flex-1" onClick={onClose}>Cancel</button>
                <button className="btn-primary flex-1" onClick={handleSaveAll}>Save</button>
              </div>
            </>
          )}

          {/* FIREBASE TAB */}
          {tab === 'firebase' && (
            <>
              {/* Status banner */}
              {fbConnected ? (
                <div className="flex items-center gap-2 p-3 rounded-lg text-xs"
                  style={{ background: 'rgba(0,255,135,0.06)', border: '1px solid rgba(0,255,135,0.2)' }}>
                  <span>🔥</span>
                  <span style={{ color: 'rgba(0,255,135,0.8)' }}>
                    Connected to: <strong>{existingFb?.projectId || fbProjectId}</strong>
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 rounded-lg text-xs"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span>⚠️</span>
                  <span className="text-white/40">No database connected. Team features are disabled.</span>
                </div>
              )}

              <p className="text-white/40 text-sm leading-relaxed">
                Connect your Firebase Firestore to enable the team database. Get these values from Firebase Console → Project Settings → Your apps.
              </p>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-white/30 mb-1 uppercase tracking-wider font-medium">Firebase API Key</label>
                  <input type="text" className="input-field" placeholder="AIzaSy..." value={fbApiKey} onChange={e => { setFbApiKey(e.target.value); setFbStatus(null) }} />
                </div>
                <div>
                  <label className="block text-xs text-white/30 mb-1 uppercase tracking-wider font-medium">Project ID</label>
                  <input type="text" className="input-field" placeholder="my-project-id" value={fbProjectId} onChange={e => { setFbProjectId(e.target.value); setFbStatus(null) }} />
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

              {fbStatus === 'error' && (
                <p className="text-xs" style={{ color: '#fca5a5' }}>
                  ✕ Could not connect. Check your API key and Project ID.
                </p>
              )}
              {fbStatus === 'success' && (
                <p className="text-xs" style={{ color: '#00ff87' }}>
                  ✓ Connected successfully! Close and reopen the app to load your team.
                </p>
              )}

              <button
                className="btn-primary w-full py-2.5"
                onClick={handleConnectFirebase}
                disabled={!fbApiKey || !fbProjectId || fbStatus === 'testing'}
              >
                {fbStatus === 'testing' ? 'Connecting...' : fbConnected ? 'Reconnect' : 'Connect Firebase'}
              </button>

              {fbConnected && (
                <button
                  onClick={handleDisconnectFirebase}
                  className="w-full py-2 rounded-lg text-sm transition-all"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
                >
                  Disconnect Database
                </button>
              )}
            </>
          )}

          {/* GOOGLE CALENDAR TAB */}
          {tab === 'gcal' && (
            <>
              {isGoogleCalendarConfigured() ? (
                <div className="flex items-center gap-2 p-3 rounded-lg text-xs"
                  style={{ background: 'rgba(0,255,135,0.06)', border: '1px solid rgba(0,255,135,0.2)' }}>
                  <span>📅</span>
                  <span style={{ color: 'rgba(0,255,135,0.8)' }}>Google Calendar connected. Import meetings from the header.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 rounded-lg text-xs"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span>⚠️</span>
                  <span className="text-white/40">Not connected. Add your OAuth Client ID below.</span>
                </div>
              )}
              <p className="text-white/40 text-sm leading-relaxed">
                Paste your Google OAuth Client ID to import meetings directly from Google Calendar.
              </p>
              <div
                className="p-3 rounded-lg text-xs space-y-1"
                style={{ background: 'rgba(66,133,244,0.06)', border: '1px solid rgba(66,133,244,0.15)' }}
              >
                <p className="font-medium" style={{ color: '#93c5fd' }}>Where to get it:</p>
                <p className="text-white/40">Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID</p>
              </div>
              <div>
                <label className="block text-xs text-white/30 mb-1.5 uppercase tracking-wider font-medium">Google OAuth Client ID</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="123456789-abc.apps.googleusercontent.com"
                  value={gclientId}
                  onChange={e => { setGclientId(e.target.value); setGcSaved(false) }}
                />
              </div>
              <button
                className="btn-primary w-full py-2.5"
                onClick={handleSaveGoogleClient}
                disabled={!gclientId.trim()}
              >
                {gcSaved ? '✓ Saved!' : isGoogleCalendarConfigured() ? 'Update Client ID' : 'Connect Google Calendar'}
              </button>
              {isGoogleCalendarConfigured() && (
                <button
                  onClick={handleDisconnectGoogle}
                  className="w-full py-2 rounded-lg text-sm transition-all"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
                >
                  Disconnect Google Calendar
                </button>
              )}
            </>
          )}

          {/* LOCATION TAB */}
          {tab === 'prefs' && (
            <>
              <p className="text-white/40 text-sm leading-relaxed">
                Used to show accurate market salary benchmarks for your location and industry.
              </p>
              <div>
                <label className="block text-xs text-white/30 mb-1.5 uppercase tracking-wider font-medium">City / Location</label>
                <select className="select-field" value={cityInput} onChange={e => setCityInput(e.target.value)}>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/30 mb-1.5 uppercase tracking-wider font-medium">Industry</label>
                <select className="select-field" value={industryInput} onChange={e => setIndustryInput(e.target.value)}>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="rounded-lg p-3 text-xs"
                style={{ background: 'rgba(0,255,135,0.06)', border: '1px solid rgba(0,255,135,0.15)' }}>
                <p style={{ color: 'rgba(0,255,135,0.7)' }}>💡 Benchmarks set to {cityInput} · {industryInput}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="btn-secondary flex-1" onClick={onClose}>Cancel</button>
                <button className="btn-primary flex-1" onClick={handleSaveAll}>Save</button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
