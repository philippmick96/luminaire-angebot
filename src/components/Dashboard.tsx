import { useMemo } from 'react'
import { PHASES, DEFAULT_MONTHS, PLAN_YEAR, PLAN_MONTH } from '../planData'
import type { QuoteData } from '../types'

interface SavedInvoice { savedAt: string; data: QuoteData; fileName: string }
interface DashboardProps {
  saved: SavedInvoice[]
  onNavigate: (p: 'angebot' | 'ziele' | 'produkte' | 'wissen') => void
}

function fmt(n: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export default function Dashboard({ saved, onNavigate }: DashboardProps) {
  const now        = new Date()
  const planStart  = new Date(PLAN_YEAR, PLAN_MONTH, 1)
  const currentWeek = Math.max(1, Math.min(52, Math.ceil((now.getTime() - planStart.getTime()) / (7 * 86400000))))
  const currentMonthIdx = (now.getFullYear() - PLAN_YEAR) * 12 + (now.getMonth() - PLAN_MONTH)

  const currentPhase = PHASES.find(p => currentWeek >= p.weeks[0] && currentWeek <= p.weeks[1]) ?? PHASES[0]
  const currentMilestone = currentPhase.milestones.find(ms => ms.week === currentWeek)
    ?? currentPhase.milestones.reduce((closest, ms) => {
        const d = Math.abs(ms.week - currentWeek)
        const dc = Math.abs(closest.week - currentWeek)
        return d < dc ? ms : closest
    })

  const { totalActual, monthActual } = useMemo(() => {
    let total = 0
    let month = 0
    for (const inv of saved) {
      if (inv.data.docType !== 'rechnung') continue
      const gross = inv.data.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0) * (1 + inv.data.vatRate / 100)
      total += gross
      const d = new Date(inv.data.date)
      const idx = (d.getFullYear() - PLAN_YEAR) * 12 + (d.getMonth() - PLAN_MONTH)
      if (idx === currentMonthIdx) month += gross
    }
    return { totalActual: total, monthActual: month }
  }, [saved, currentMonthIdx])

  const monthTarget = currentMonthIdx >= 0 && currentMonthIdx < 12 ? DEFAULT_MONTHS[currentMonthIdx].target : 0
  const monthLabel  = currentMonthIdx >= 0 && currentMonthIdx < 12 ? DEFAULT_MONTHS[currentMonthIdx].label : '–'
  const progress100k = Math.min(100, (totalActual / 100000) * 100)

  const checkedSet = useMemo(() => {
    try { return new Set<string>(JSON.parse(localStorage.getItem('luminaire_todos') ?? '[]')) }
    catch { return new Set<string>() }
  }, [])

  const weekKey = `w${currentMilestone.week}`
  const todos   = currentMilestone.todos
  const doneCount = todos.filter((_, ti) => checkedSet.has(`${weekKey}-t${ti}`)).length

  return (
    <div className="dashboard">

      {/* Hero */}
      <div className="dash-hero">
        <div className="dash-hero-left">
          <div className="dash-greeting">luminAIre · Internes Dashboard</div>
          <div className="dash-date">{now.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <div className="dash-week-badge">
          <span className="dash-week-num">KW {currentWeek}</span>
          <span className="dash-phase-name">{currentPhase.shortName}</span>
        </div>
      </div>

      {/* Status bar */}
      <div className="dash-status-bar">
        <div className="status-chip status-pending">
          <span className="status-dot" />
          AZAV – ausstehend (Steuer-ID)
        </div>
        <div className="status-chip status-pending">
          <span className="status-dot" />
          BAFA – ausstehend (Steuer-ID)
        </div>
        <div className="status-chip status-active">
          <span className="status-dot" />
          BNI – aktiv
        </div>
        <div className="status-chip status-active">
          <span className="status-dot" />
          Pillar-Hosting: lumi-angebot.netlify.app
        </div>
      </div>

      {/* KPI row */}
      <div className="dash-kpi-row">
        <div className="dash-kpi-card">
          <div className="dkpi-label">100k Fortschritt</div>
          <div className="dkpi-value">{Math.round(progress100k)} %</div>
          <div className="dkpi-bar-track">
            <div className="dkpi-bar-fill" style={{ width: `${progress100k}%` }} />
          </div>
          <div className="dkpi-sub">{fmt(totalActual)} von 100.000 €</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dkpi-label">{monthLabel}</div>
          <div className="dkpi-value accent">{fmt(monthActual)}</div>
          <div className="dkpi-sub">Ziel: {fmt(monthTarget)}</div>
          {monthTarget > 0 && (
            <div className="dkpi-bar-track">
              <div className="dkpi-bar-fill" style={{ width: `${Math.min(100, (monthActual / monthTarget) * 100)}%` }} />
            </div>
          )}
        </div>
        <div className="dash-kpi-card">
          <div className="dkpi-label">Phase {currentPhase.id} – {currentPhase.shortName}</div>
          <div className="dkpi-value">{fmt(currentPhase.target)}</div>
          <div className="dkpi-sub">KW {currentPhase.weeks[0]}–{currentPhase.weeks[1]} · Ad-Budget: {currentPhase.adBudget}</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dkpi-label">Rechnungen gesamt</div>
          <div className="dkpi-value">{saved.filter(s => s.data.docType === 'rechnung').length}</div>
          <div className="dkpi-sub">{saved.length} Dokumente gespeichert</div>
        </div>
      </div>

      {/* Two-column: todos + routine */}
      <div className="dash-cols">

        {/* This week */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Diese Woche – KW {currentWeek}</span>
            <span className="dash-card-meta">{doneCount}/{todos.length} erledigt</span>
          </div>
          <div className="dash-todos">
            {todos.map((todo, ti) => {
              const id   = `${weekKey}-t${ti}`
              const done = checkedSet.has(id)
              return (
                <div key={id} className={`dash-todo-item${done ? ' done' : ''}`}>
                  <span className="dash-todo-dot">{done ? '✓' : '○'}</span>
                  <span>{todo}</span>
                </div>
              )
            })}
          </div>
          <button className="dash-link-btn" onClick={() => onNavigate('ziele')}>
            Zum Wochenplan →
          </button>
        </div>

        {/* Daily routine */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Wöchentliche Routine</span>
            <span className="dash-card-meta" style={{ color: currentPhase.color }}>Phase {currentPhase.id}</span>
          </div>
          <div className="dash-routine">
            {currentPhase.routine.map((r, i) => (
              <div key={i} className="dash-routine-item">
                <span className="dash-routine-dot" style={{ background: currentPhase.color }} />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="dash-quickactions">
        <div className="dash-qa-title">Schnellzugriff</div>
        <div className="dash-qa-row">
          <button className="dash-qa-btn" onClick={() => onNavigate('angebot')}>
            <span className="dash-qa-icon">◻</span>
            <span>Angebot erstellen</span>
          </button>
          <button className="dash-qa-btn" onClick={() => onNavigate('produkte')}>
            <span className="dash-qa-icon">◈</span>
            <span>Produkte & Preise</span>
          </button>
          <button className="dash-qa-btn" onClick={() => onNavigate('wissen')}>
            <span className="dash-qa-icon">◉</span>
            <span>Didaktische IP</span>
          </button>
          <button className="dash-qa-btn" onClick={() => onNavigate('ziele')}>
            <span className="dash-qa-icon">◎</span>
            <span>Jahresplan & KPIs</span>
          </button>
        </div>
      </div>

      {/* Company contacts */}
      <div className="dash-contacts">
        <div className="dash-qa-title">Kontakt & Erreichbarkeit</div>
        <div className="dash-contact-row">
          <div className="dash-contact-card">
            <div className="dash-contact-name">Philipp Mick</div>
            <div className="dash-contact-role">GF · Vertrieb · Trainer</div>
            <div className="dash-contact-detail">+49 179 1327191</div>
            <div className="dash-contact-detail">info@luminaire.training</div>
          </div>
          <div className="dash-contact-card">
            <div className="dash-contact-name">Max Mick</div>
            <div className="dash-contact-role">Technik · Konzept</div>
            <div className="dash-contact-detail">maximilian.mick23@gmail.com</div>
            <div className="dash-contact-detail">max.luminaire@gmail.com (shared)</div>
          </div>
          <div className="dash-contact-card dash-contact-pending">
            <div className="dash-contact-name">Niklas</div>
            <div className="dash-contact-role">Vertrieb · Marketing (offen)</div>
            <div className="dash-contact-detail">Status: Gespräch läuft</div>
          </div>
        </div>
      </div>

    </div>
  )
}
