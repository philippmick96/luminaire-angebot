import { useState, useMemo } from 'react'
import type { QuoteData } from '../types'

interface SavedInvoice { savedAt: string; data: QuoteData; fileName: string }
interface ZieleProps { saved: SavedInvoice[] }

// ── Plan constants ─────────────────────────────────────────────

const PLAN_YEAR  = 2026
const PLAN_MONTH = 3   // April (0-indexed)

const MONTHS = [
  { label: 'Apr 2026', target: 3500,  kurse: '1 KI-Führerschein',               branche: '–' },
  { label: 'Mai 2026', target: 8000,  kurse: '2 Kurse',                          branche: '–' },
  { label: 'Jun 2026', target: 9500,  kurse: '2 Kurse',                          branche: '1× KI-Analyse' },
  { label: 'Jul 2026', target: 13000, kurse: '2 Kurse',                          branche: '1× KI-Start' },
  { label: 'Aug 2026', target: 15000, kurse: '3 Kurse',                          branche: '1× KI-Start' },
  { label: 'Sep 2026', target: 15000, kurse: '3 Kurse',                          branche: '1× KI-Start' },
  { label: 'Okt 2026', target: 17000, kurse: '3 Kurse',                          branche: '2× Branchenlösung' },
  { label: 'Nov 2026', target: 22000, kurse: '4 Kurse',                          branche: '1× KI-Transformation', milestone100k: true },
  { label: 'Dez 2026', target: 17000, kurse: '4 Kurse',                          branche: '1× KI-Start' },
  { label: 'Jan 2027', target: 13000, kurse: '3 Kurse',                          branche: '1× KI-Start' },
  { label: 'Feb 2027', target: 17000, kurse: '4 Kurse',                          branche: '1× KI-Start' },
  { label: 'Mär 2027', target: 9500,  kurse: '3 Kurse',                          branche: '1× Analyse' },
]

const YEAR_TARGET = MONTHS.reduce((s, m) => s + m.target, 0)

const PHASES = [
  {
    id: 1, shortName: 'Fundament', weeks: [1, 8] as [number, number],
    target: 11500, color: '#7c3aed', adBudget: '0 €',
    routine: [
      'Mo: 10 LinkedIn-Kontakte anschreiben',
      'Di: BNI Meeting + 1 Follow-up',
      'Mi: 1× LinkedIn Post + 1× Instagram Reel',
      'Do: 3 Kaltakquise-Anrufe + Kursinhalt vorbereiten',
      'Fr: Alle offenen Leads nachfassen + Wochenreview',
    ],
    milestones: [
      { week: 1,  todos: ['LinkedIn-Profil auf Luminaire optimieren', 'Google Analytics auf Website aktivieren', 'Kurskonzepte finalisieren'] },
      { week: 2,  todos: ['KI-Führerschein Termin fixieren & über BNI ankündigen', 'Content-Kalender für 4 Wochen vorplanen'] },
      { week: 3,  todos: ['Meta Business Account anlegen', 'Kurs auf LinkedIn ankündigen'] },
      { week: 4,  todos: ['Ersten Kurs (KI-Führerschein) durchführen', 'Feedback einholen & Testimonials anfragen'] },
      { week: 5,  todos: ['Google Search Console einrichten', 'Erstes Testimonial auf LinkedIn veröffentlichen'] },
      { week: 6,  todos: ['Unternehmervortrag Termin fixieren & ankündigen', 'Corporate-Mindestpreise festlegen (2.200€ / 2.900€)'] },
      { week: 7,  todos: ['Ersten Branchenlösungs-Pitch vorbereiten (KI-Analyse 1.500 €)', 'Preisliste fertigstellen'] },
      { week: 8,  todos: ['Zweiten Kurs (Unternehmervortrag) durchführen', 'Meta Ads Kampagne aufsetzen (noch nicht live)'] },
    ],
  },
  {
    id: 2, shortName: 'Traktion', weeks: [9, 20] as [number, number],
    target: 37500, color: '#0ea5e9', adBudget: '800 €/Monat',
    routine: [
      'Mo: 15 LinkedIn-Kontakte + Ad-Performance der Vorwoche prüfen',
      'Di: BNI + 1 Branchenlösungs-Gespräch (Erst- oder Follow-up)',
      'Mi: 2× LinkedIn Posts + 1× Reel + 1× Story',
      'Do: Kurs vorbereiten oder liefern + Angebote nachfassen',
      'Fr: Ads optimieren + Wochenreview + nächste Woche planen',
    ],
    milestones: [
      { week: 9,  todos: ['Meta Ads live schalten (KI-Führerschein, Arbeitnehmer 25-50, Saarland)'] },
      { week: 10, todos: ['Ersten Branchenlösungs-Kunden pitchen (KI-Analyse als Einstieg)'] },
      { week: 12, todos: ['Corporate-Buchungsmodell aktiv anbieten (mind. 2.200 € / 2.900 €)'] },
      { week: 14, todos: ['Google Ads live ("KI Schulung Unternehmen", "KI Beratung Saarland")'] },
      { week: 16, todos: ['Erste Branchenlösung KI-Start abschließen (Ziel: 4.900 €)'] },
      { week: 18, todos: ['2 Kurse/Monat als Standardrhythmus etabliert – Review: Läuft es?'] },
      { week: 20, todos: ['Testimonial-Video für Ads produzieren', 'Q2-Check: Kumuliert ~49.000 € erreicht?'] },
    ],
  },
  {
    id: 3, shortName: 'Wachstum', weeks: [21, 36] as [number, number],
    target: 54000, color: '#10b981', adBudget: '2.000 €/Monat',
    routine: [
      'Mo: Ad-Review + 10 LinkedIn-Kontakte + Pipeline-Check',
      'Di: BNI + 1 Kundengespräch (Branchenlösung oder Corporate)',
      'Mi: Content (2× Posts, 1× Reel, 1× monatlicher Artikel)',
      'Do: Kurs liefern oder Branchenlösung-Arbeit',
      'Fr: Angebote rausschicken (Tool nutzen!) + Wochenreview',
    ],
    milestones: [
      { week: 22, todos: ['Zweites Ad-Creative testen (Video vs. Bild)'] },
      { week: 24, todos: ['Erste KI-Transformation abschließen (9.900 €+)'] },
      { week: 26, todos: ['Halbjahresziel-Check: ~64.000 € kumuliert erreicht?', 'LinkedIn Ads starten (Unternehmervortrag, 300 €/Mo)'] },
      { week: 28, todos: ['LinkedIn-Follower >500 Ziel', 'Monatlichen Newsletter starten'] },
      { week: 30, todos: ['100k-Prognose validieren', 'Ads-Budget ggf. erhöhen'] },
      { week: 32, todos: ['Partnertrainer evaluieren (falls Kapazität limitiert wird)'] },
      { week: 36, todos: ['100.000 € Umsatzziel erreicht ★', 'Makler-Tätigkeit auf 10–20 % reduzieren'] },
    ],
  },
  {
    id: 4, shortName: 'Skalierung', weeks: [37, 52] as [number, number],
    target: 56500, color: '#f59e0b', adBudget: '2.500 €/Monat',
    routine: [
      'Mo: Ad-Review + Strategie-Check (Was funktioniert?)',
      'Di: BNI + Bestandskundenpflege',
      'Mi: Content + 1× monatlicher Strategie-Review',
      'Do: Kurs liefern oder Beratung',
      'Fr: Wochenreview + Pipeline für nächste Woche planen',
    ],
    milestones: [
      { week: 40, todos: ['Testimonial-Kampagne für Q4 starten'] },
      { week: 44, todos: ['Jahresangebote für Firmenkunden entwickeln (Retainer / Jahreslizenz)'] },
      { week: 48, todos: ['Jahresplan 2027 erstellen', 'Partnertrainer-Entscheidung finalisieren'] },
      { week: 52, todos: ['Jahresabschluss & KPI-Review', 'Luminaire Vollzeit – Makler-Status offiziell prüfen'] },
    ],
  },
]

function fmt(n: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

// ── Main component ─────────────────────────────────────────────

export default function Ziele({ saved }: ZieleProps) {
  const [view, setView]           = useState<'uebersicht' | 'kalender'>('uebersicht')
  const [activePhase, setPhase]   = useState(0)
  const [checked, setChecked]     = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('luminaire_todos') ?? '[]')) }
    catch { return new Set() }
  })

  function toggleTodo(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem('luminaire_todos', JSON.stringify([...next]))
      return next
    })
  }

  const actualByMonth = useMemo(() => {
    const map: Record<number, number> = {}
    for (const inv of saved) {
      const d   = new Date(inv.data.date)
      const idx = (d.getFullYear() - PLAN_YEAR) * 12 + (d.getMonth() - PLAN_MONTH)
      if (idx >= 0 && idx < 12) {
        const gross = inv.data.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
                    * (1 + inv.data.vatRate / 100)
        map[idx] = (map[idx] ?? 0) + gross
      }
    }
    return map
  }, [saved])

  const totalActual    = Object.values(actualByMonth).reduce((s, v) => s + v, 0)
  const now            = new Date()
  const currentMonthIdx = (now.getFullYear() - PLAN_YEAR) * 12 + (now.getMonth() - PLAN_MONTH)
  const planStart      = new Date(PLAN_YEAR, PLAN_MONTH, 1)
  const currentWeek    = Math.max(1, Math.min(52, Math.ceil((now.getTime() - planStart.getTime()) / (7 * 86400000))))

  return (
    <div className="ziele-panel">
      <div className="ziele-subnav">
        <button className={`ziele-nav-btn${view === 'uebersicht' ? ' active' : ''}`} onClick={() => setView('uebersicht')}>
          Übersicht
        </button>
        <button className={`ziele-nav-btn${view === 'kalender' ? ' active' : ''}`} onClick={() => setView('kalender')}>
          Wochenplan
        </button>
      </div>

      {view === 'uebersicht'
        ? <UebersichtView actualByMonth={actualByMonth} totalActual={totalActual} currentMonthIdx={currentMonthIdx} />
        : <KalenderView   activePhase={activePhase} setPhase={setPhase} checked={checked} toggleTodo={toggleTodo} currentWeek={currentWeek} />
      }
    </div>
  )
}

// ── Übersicht ──────────────────────────────────────────────────

function UebersichtView({
  actualByMonth, totalActual, currentMonthIdx,
}: {
  actualByMonth: Record<number, number>
  totalActual: number
  currentMonthIdx: number
}) {
  const progress100k = Math.min(100, (totalActual / 100000) * 100)
  const currentMonth = MONTHS[currentMonthIdx]
  const currentActual = actualByMonth[currentMonthIdx] ?? 0

  const quarters = [
    { label: 'Q1 – Apr bis Jun', indices: [0, 1, 2] },
    { label: 'Q2 – Jul bis Sep', indices: [3, 4, 5] },
    { label: 'Q3 – Okt bis Dez', indices: [6, 7, 8] },
    { label: 'Q4 – Jan bis Mär', indices: [9, 10, 11] },
  ]

  return (
    <div className="uebersicht-content">

      {/* KPI strip */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">Jahresziel</div>
          <div className="kpi-value">{fmt(YEAR_TARGET)}</div>
          <div className="kpi-sub">100k-Meilenstein: Nov 2026</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Aktueller Umsatz</div>
          <div className="kpi-value kpi-accent">{fmt(totalActual)}</div>
          <div className="kpi-sub">{Object.values(actualByMonth).filter(v => v > 0).length} Monate mit Umsatz</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">100k Fortschritt</div>
          <div className="kpi-value">{Math.round(progress100k)} %</div>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill" style={{ width: `${progress100k}%` }} />
          </div>
        </div>
        {currentMonth ? (
          <div className="kpi-card">
            <div className="kpi-label">{currentMonth.label}</div>
            <div className="kpi-value">{fmt(currentActual)}</div>
            <div className="kpi-sub">Ziel: {fmt(currentMonth.target)}</div>
          </div>
        ) : (
          <div className="kpi-card">
            <div className="kpi-label">Status</div>
            <div className="kpi-value" style={{ fontSize: 14 }}>Plan nicht aktiv</div>
            <div className="kpi-sub">Startet Apr 2026</div>
          </div>
        )}
      </div>

      {/* Monthly grid */}
      <div className="ziele-section-title">Monatliche Umsatzziele</div>
      <div className="month-grid">
        {MONTHS.map((m, idx) => {
          const actual  = actualByMonth[idx] ?? 0
          const pct     = Math.min(100, actual > 0 ? (actual / m.target) * 100 : 0)
          const isCur   = idx === currentMonthIdx
          const isPast  = idx < currentMonthIdx
          const isFut   = idx > currentMonthIdx

          return (
            <div key={idx} className={`month-card${isCur ? ' month-current' : ''}${isPast ? ' month-past' : ''}`}>
              {m.milestone100k && <div className="month-milestone-badge">★ 100k Meilenstein</div>}
              <div className="month-header">
                <span className="month-label">{m.label}</span>
                {isCur && <span className="month-now-tag">Jetzt</span>}
              </div>
              <div className="month-target-val">{fmt(m.target)}</div>

              {!isFut && (
                <>
                  <div className="month-actual-val">{fmt(actual)} IST</div>
                  <div className="month-bar-track">
                    <div className={`month-bar-fill${pct >= 100 ? ' bar-done' : ''}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="month-pct-label">{Math.round(pct)} %</div>
                </>
              )}
              {isFut && (
                <div className="month-plan-info">
                  <span>{m.kurse}</span>
                  {m.branche !== '–' && <span className="month-branche-tag">{m.branche}</span>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quarterly summary */}
      <div className="ziele-section-title">Quartalsziele</div>
      <div className="q-row">
        {quarters.map((q, qi) => {
          const qTarget = q.indices.reduce((s, i) => s + MONTHS[i].target, 0)
          const qActual = q.indices.reduce((s, i) => s + (actualByMonth[i] ?? 0), 0)
          const qPct    = Math.min(100, qActual > 0 ? (qActual / qTarget) * 100 : 0)
          return (
            <div key={qi} className="q-card">
              <div className="q-label">{q.label}</div>
              <div className="q-target">{fmt(qTarget)}</div>
              {qActual > 0 && (
                <>
                  <div className="q-actual">{fmt(qActual)} IST</div>
                  <div className="month-bar-track" style={{ marginTop: 8 }}>
                    <div className={`month-bar-fill${qPct >= 100 ? ' bar-done' : ''}`} style={{ width: `${qPct}%` }} />
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}

// ── Wochenplan ─────────────────────────────────────────────────

function KalenderView({
  activePhase, setPhase, checked, toggleTodo, currentWeek,
}: {
  activePhase: number
  setPhase: (i: number) => void
  checked: Set<string>
  toggleTodo: (id: string) => void
  currentWeek: number
}) {
  const phase = PHASES[activePhase]

  return (
    <div className="kalender-content">

      {/* Phase tabs */}
      <div className="phase-tabs">
        {PHASES.map((p, i) => (
          <button
            key={i}
            className={`phase-tab${activePhase === i ? ' phase-tab-active' : ''}`}
            style={activePhase === i ? { borderColor: p.color, color: p.color, background: `${p.color}1a` } : {}}
            onClick={() => setPhase(i)}
          >
            <span className="phase-tab-num">Phase {p.id}</span>
            <span className="phase-tab-name">{p.shortName}</span>
            <span className="phase-tab-weeks">KW {p.weeks[0]}–{p.weeks[1]}</span>
          </button>
        ))}
      </div>

      {/* Phase meta */}
      <div className="phase-meta-row">
        <div className="phase-meta-card">
          <span className="phase-meta-label">Wochen</span>
          <span className="phase-meta-val">KW {phase.weeks[0]} – {phase.weeks[1]}</span>
        </div>
        <div className="phase-meta-card">
          <span className="phase-meta-label">Umsatzziel</span>
          <span className="phase-meta-val">{fmt(phase.target)}</span>
        </div>
        <div className="phase-meta-card">
          <span className="phase-meta-label">Ad-Budget</span>
          <span className="phase-meta-val">{phase.adBudget}</span>
        </div>
      </div>

      {/* Weekly routine */}
      <div className="routine-card">
        <div className="routine-title">Wöchentliche Routine (jede Woche)</div>
        <div className="routine-list">
          {phase.routine.map((r, i) => (
            <div key={i} className="routine-item">{r}</div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="ziele-section-title">Meilensteine dieser Phase</div>
      <div className="milestones-grid">
        {phase.milestones.map(ms => {
          const isCur  = currentWeek === ms.week
          const isPast = currentWeek > ms.week
          const done   = ms.todos.filter((_, ti) => checked.has(`w${ms.week}-t${ti}`)).length
          return (
            <div key={ms.week} className={`milestone-card${isCur ? ' milestone-current' : ''}${isPast ? ' milestone-past' : ''}`}>
              <div className="milestone-header">
                <div className="milestone-week-info">
                  <span className="milestone-kw">KW {ms.week}</span>
                  {isCur && <span className="milestone-now-badge">Aktuelle Woche</span>}
                </div>
                <span className="milestone-count">{done}/{ms.todos.length}</span>
              </div>
              <div className="milestone-todos">
                {ms.todos.map((todo, ti) => {
                  const id   = `w${ms.week}-t${ti}`
                  const done = checked.has(id)
                  return (
                    <label key={id} className={`todo-item${done ? ' todo-done' : ''}`}>
                      <input type="checkbox" className="todo-checkbox" checked={done} onChange={() => toggleTodo(id)} />
                      <span>{todo}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
