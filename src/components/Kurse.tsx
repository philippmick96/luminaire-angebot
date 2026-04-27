import { useState } from 'react'

type KursView = 'seminar' | 'trainer'

export default function Kurse() {
  const [view, setView] = useState<KursView>('seminar')

  return (
    <div className="kurse-panel">
      <div className="kurse-header">
        <div className="kurse-header-left">
          <h1 className="kurse-title">Kurse & Präsentationen</h1>
          <p className="kurse-subtitle">KI im Arbeitsalltag · Unternehmervortrag</p>
        </div>
        <div className="kurse-tabs">
          <button
            className={`kurse-tab${view === 'seminar' ? ' active' : ''}`}
            onClick={() => setView('seminar')}
          >
            Teilnehmer-Ansicht
          </button>
          <button
            className={`kurse-tab${view === 'trainer' ? ' active' : ''}`}
            onClick={() => setView('trainer')}
          >
            Trainer-Ansicht
          </button>
        </div>
      </div>

      <div className="kurse-frame-wrap">
        {view === 'seminar' && (
          <iframe
            key="seminar"
            src="/seminar.html"
            className="kurse-frame"
            title="KI im Arbeitsalltag – Seminar"
          />
        )}
        {view === 'trainer' && (
          <iframe
            key="trainer"
            src="/seminar-trainer.html"
            className="kurse-frame"
            title="KI im Arbeitsalltag – Trainer"
          />
        )}
      </div>
    </div>
  )
}
