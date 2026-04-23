import { useState } from 'react'

const PASSWORD     = 'LuminAIre123#a'
const STORAGE_KEY  = 'luminaire_auth'

function isUnlocked() {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(isUnlocked)
  const [input, setInput]       = useState('')
  const [error, setError]       = useState(false)
  const [shake, setShake]       = useState(false)

  if (unlocked) return <>{children}</>

  function attempt() {
    if (input === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true')
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="pg-overlay">
      <div className={`pg-card${shake ? ' pg-shake' : ''}`}>
        <div className="pg-logo">
          lumin<span>AI</span>re
        </div>
        <p className="pg-sub">KI-SCHULUNGEN</p>
        <p className="pg-hint">Bitte Passwort eingeben</p>
        <input
          className={`pg-input${error ? ' pg-error' : ''}`}
          type="password"
          value={input}
          placeholder="Passwort"
          autoFocus
          onChange={e => { setInput(e.target.value); setError(false) }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
        />
        {error && <p className="pg-error-msg">Falsches Passwort</p>}
        <button className="pg-btn" onClick={attempt}>
          Einloggen
        </button>
      </div>
    </div>
  )
}
