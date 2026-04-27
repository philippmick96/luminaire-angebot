import { useState, useMemo, useRef, useEffect } from 'react'
import type { QuoteData } from '../types'
import { PLAN_YEAR, PLAN_MONTH, DEFAULT_MONTHS, SM_POSTING, SM_PILLARS, SM_KPIS, PHASES } from '../planData'

interface SavedInvoice { savedAt: string; data: QuoteData; fileName: string }
interface ZieleProps { saved: SavedInvoice[] }

function fmt(n: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback }
  catch { return fallback }
}

// ── Main component ─────────────────────────────────────────────

export default function Ziele({ saved }: ZieleProps) {
  const [view, setView]         = useState<'uebersicht' | 'kalender'>('uebersicht')
  const [activePhase, setPhase] = useState(0)

  const [checked, setChecked]           = useState<Set<string>>(() => new Set(load<string[]>('luminaire_todos', [])))
  const [customTargets, setCustomTargets] = useState<Record<number,number>>(() => load('luminaire_targets', {}))
  const [customTodos, setCustomTodos]   = useState<Record<string,string[]>>(() => load('luminaire_custom_todos', {}))

  const [editingTarget, setEditingTarget] = useState<number | null>(null)
  const [editTargetVal, setEditTargetVal] = useState('')
  const [addingWeek, setAddingWeek]     = useState<string | null>(null)
  const [newTodoText, setNewTodoText]   = useState('')
  const [showSM, setShowSM]             = useState(false)

  function toggleTodo(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem('luminaire_todos', JSON.stringify([...next]))
      return next
    })
  }

  function saveTarget(idx: number, val: string) {
    const n = parseInt(val.replace(/\D/g, ''), 10)
    if (!isNaN(n) && n > 0) {
      const next = { ...customTargets, [idx]: n }
      setCustomTargets(next)
      localStorage.setItem('luminaire_targets', JSON.stringify(next))
    }
    setEditingTarget(null)
  }

  function resetTarget(idx: number) {
    const next = { ...customTargets }
    delete next[idx]
    setCustomTargets(next)
    localStorage.setItem('luminaire_targets', JSON.stringify(next))
    setEditingTarget(null)
  }

  function addCustomTodo(weekKey: string) {
    const text = newTodoText.trim()
    if (!text) return
    const next = { ...customTodos, [weekKey]: [...(customTodos[weekKey] ?? []), text] }
    setCustomTodos(next)
    localStorage.setItem('luminaire_custom_todos', JSON.stringify(next))
    setNewTodoText('')
    setAddingWeek(null)
  }

  function deleteCustomTodo(weekKey: string, i: number) {
    const arr = [...(customTodos[weekKey] ?? [])]
    arr.splice(i, 1)
    const next = { ...customTodos, [weekKey]: arr }
    setCustomTodos(next)
    localStorage.setItem('luminaire_custom_todos', JSON.stringify(next))
  }

  const months = DEFAULT_MONTHS.map((m, i) => ({
    ...m, target: customTargets[i] ?? m.target,
  }))

  const yearTarget = months.reduce((s, m) => s + m.target, 0)

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

  const totalActual     = Object.values(actualByMonth).reduce((s, v) => s + v, 0)
  const now             = new Date()
  const currentMonthIdx = (now.getFullYear() - PLAN_YEAR) * 12 + (now.getMonth() - PLAN_MONTH)
  const planStart       = new Date(PLAN_YEAR, PLAN_MONTH, 1)
  const currentWeek     = Math.max(1, Math.min(52, Math.ceil((now.getTime() - planStart.getTime()) / (7 * 86400000))))

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
        ? <UebersichtView
            months={months} yearTarget={yearTarget}
            actualByMonth={actualByMonth} totalActual={totalActual}
            currentMonthIdx={currentMonthIdx}
            editingTarget={editingTarget} editTargetVal={editTargetVal}
            setEditingTarget={setEditingTarget} setEditTargetVal={setEditTargetVal}
            saveTarget={saveTarget} resetTarget={resetTarget}
            customTargets={customTargets}
          />
        : <KalenderView
            activePhase={activePhase} setPhase={setPhase}
            checked={checked} toggleTodo={toggleTodo}
            currentWeek={currentWeek}
            customTodos={customTodos} addingWeek={addingWeek}
            newTodoText={newTodoText} setNewTodoText={setNewTodoText}
            setAddingWeek={setAddingWeek} addCustomTodo={addCustomTodo}
            deleteCustomTodo={deleteCustomTodo}
            showSM={showSM} setShowSM={setShowSM}
          />
      }
    </div>
  )
}

// ── Übersicht ──────────────────────────────────────────────────

function UebersichtView({
  months, yearTarget, actualByMonth, totalActual, currentMonthIdx,
  editingTarget, editTargetVal, setEditingTarget, setEditTargetVal,
  saveTarget, resetTarget, customTargets,
}: {
  months: typeof DEFAULT_MONTHS
  yearTarget: number
  actualByMonth: Record<number, number>
  totalActual: number
  currentMonthIdx: number
  editingTarget: number | null
  editTargetVal: string
  setEditingTarget: (i: number | null) => void
  setEditTargetVal: (v: string) => void
  saveTarget: (i: number, v: string) => void
  resetTarget: (i: number) => void
  customTargets: Record<number, number>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (editingTarget !== null) inputRef.current?.focus() }, [editingTarget])

  const progress100k = Math.min(100, (totalActual / 100000) * 100)
  const quarters = [
    { label: 'Q1 – Apr–Jun', indices: [0,1,2] },
    { label: 'Q2 – Jul–Sep', indices: [3,4,5] },
    { label: 'Q3 – Okt–Dez', indices: [6,7,8] },
    { label: 'Q4 – Jan–Mär', indices: [9,10,11] },
  ]

  return (
    <div className="uebersicht-content">

      {/* KPI strip */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">Jahresziel</div>
          <div className="kpi-value">{fmt(yearTarget)}</div>
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
        <div className="kpi-card">
          <div className="kpi-label">{currentMonthIdx >= 0 && currentMonthIdx < 12 ? months[currentMonthIdx].label : 'Aktuell'}</div>
          <div className="kpi-value">{fmt(currentMonthIdx >= 0 ? (actualByMonth[currentMonthIdx] ?? 0) : 0)}</div>
          <div className="kpi-sub">Ziel: {fmt(currentMonthIdx >= 0 && currentMonthIdx < 12 ? months[currentMonthIdx].target : 0)}</div>
        </div>
      </div>

      {/* Monthly grid */}
      <div className="ziele-section-title">Monatliche Umsatzziele <span style={{color:'var(--purple-light)',fontWeight:400,letterSpacing:0}}>— Klick auf Betrag zum Anpassen</span></div>
      <div className="month-grid">
        {months.map((m, idx) => {
          const actual  = actualByMonth[idx] ?? 0
          const pct     = Math.min(100, actual > 0 ? (actual / m.target) * 100 : 0)
          const isCur   = idx === currentMonthIdx
          const isPast  = idx < currentMonthIdx
          const isFut   = idx > currentMonthIdx
          const isCustom = customTargets[idx] !== undefined

          return (
            <div key={idx} className={`month-card${isCur ? ' month-current' : ''}${isPast ? ' month-past' : ''}`}>
              {m.milestone100k && <div className="month-milestone-badge">★ 100k Meilenstein</div>}
              <div className="month-header">
                <span className="month-label">{m.label}</span>
                {isCur && <span className="month-now-tag">Jetzt</span>}
              </div>

              {/* Editable target */}
              {editingTarget === idx ? (
                <div className="month-edit-row">
                  <input
                    ref={inputRef}
                    className="month-edit-input"
                    value={editTargetVal}
                    onChange={e => setEditTargetVal(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveTarget(idx, editTargetVal)
                      if (e.key === 'Escape') setEditingTarget(null)
                    }}
                    onBlur={() => saveTarget(idx, editTargetVal)}
                    placeholder="Ziel in €"
                  />
                  {isCustom && (
                    <button className="month-reset-btn" onMouseDown={() => resetTarget(idx)} title="Zurücksetzen">↺</button>
                  )}
                </div>
              ) : (
                <button
                  className={`month-target-btn${isCustom ? ' month-target-custom' : ''}`}
                  onClick={() => { setEditingTarget(idx); setEditTargetVal(String(m.target)) }}
                  title="Ziel anpassen"
                >
                  {fmt(m.target)}
                  <span className="month-edit-icon">✎</span>
                </button>
              )}

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
          const qTarget = q.indices.reduce((s, i) => s + months[i].target, 0)
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

      {/* SM KPI Ziele */}
      <div className="ziele-section-title">Social Media KPI-Ziele</div>
      <div className="sm-kpi-row">
        {SM_KPIS.map((kpi, i) => (
          <div key={i} className="sm-kpi-card">
            <div className="sm-kpi-label">{kpi.label}</div>
            <div className="sm-kpi-ziel">{kpi.ziel}</div>
            <div className="sm-kpi-when">{kpi.when}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

// ── Wochenplan ─────────────────────────────────────────────────

function KalenderView({
  activePhase, setPhase, checked, toggleTodo, currentWeek,
  customTodos, addingWeek, newTodoText, setNewTodoText,
  setAddingWeek, addCustomTodo, deleteCustomTodo,
  showSM, setShowSM,
}: {
  activePhase: number
  setPhase: (i: number) => void
  checked: Set<string>
  toggleTodo: (id: string) => void
  currentWeek: number
  customTodos: Record<string, string[]>
  addingWeek: string | null
  newTodoText: string
  setNewTodoText: (v: string) => void
  setAddingWeek: (w: string | null) => void
  addCustomTodo: (weekKey: string) => void
  deleteCustomTodo: (weekKey: string, i: number) => void
  showSM: boolean
  setShowSM: (v: boolean) => void
}) {
  const phase      = PHASES[activePhase]
  const addInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (addingWeek) addInputRef.current?.focus() }, [addingWeek])

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

      {/* Social Media Referenz – collapsible */}
      <div className="sm-ref-card">
        <button className="sm-ref-toggle" onClick={() => setShowSM(!showSM)}>
          <span>Social Media Strategie</span>
          <span className="sm-ref-arrow">{showSM ? '▲' : '▼'}</span>
        </button>
        {showSM && (
          <div className="sm-ref-body">
            <div className="sm-ref-section">
              <div className="sm-ref-title">Wöchentlicher Posting-Plan (LinkedIn)</div>
              <div className="sm-posting-grid">
                {SM_POSTING.map((p, i) => (
                  <div key={i} className="sm-posting-row">
                    <span className="sm-day">{p.day}</span>
                    <span className="sm-content">{p.content}</span>
                    <span className="sm-kanal">{p.kanal}</span>
                  </div>
                ))}
                <div className="sm-posting-row sm-daily">
                  <span className="sm-day">tägl.</span>
                  <span className="sm-content">15 Min Kommentare beantworten</span>
                  <span className="sm-kanal">erste 60 Min nach Post!</span>
                </div>
              </div>
            </div>
            <div className="sm-ref-section">
              <div className="sm-ref-title">5 Content-Pillars</div>
              <div className="sm-pillars-grid">
                {SM_PILLARS.map((p, i) => (
                  <div key={i} className="sm-pillar-row">
                    <span className="sm-pillar-id">{p.id}</span>
                    <span className="sm-pillar-name">{p.name}</span>
                    <span className="sm-pillar-freq">{p.freq}</span>
                    <span className="sm-pillar-desc">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm-ref-hint">
              Keine externen Links im Post-Text — Link in den ersten Kommentar!
              &nbsp;·&nbsp; Max &amp; Philipp kommentieren gegenseitig.
              &nbsp;·&nbsp; Instagram frühestens nach 6–8 Wochen stabilem LinkedIn-Rhythmus.
            </div>
          </div>
        )}
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
          const weekKey = `w${ms.week}`
          const isCur   = currentWeek === ms.week
          const isPast  = currentWeek > ms.week
          const custom  = customTodos[weekKey] ?? []
          const allTodos = ms.todos.length + custom.length
          const doneTodos = ms.todos.filter((_, ti) => checked.has(`${weekKey}-t${ti}`)).length
                          + custom.filter((_, ci) => checked.has(`${weekKey}-c${ci}`)).length

          return (
            <div key={ms.week} className={`milestone-card${isCur ? ' milestone-current' : ''}${isPast ? ' milestone-past' : ''}`}>
              <div className="milestone-header">
                <div className="milestone-week-info">
                  <span className="milestone-kw">KW {ms.week}</span>
                  {isCur && <span className="milestone-now-badge">Aktuelle Woche</span>}
                </div>
                <span className="milestone-count">{doneTodos}/{allTodos}</span>
              </div>

              {/* System todos */}
              <div className="milestone-todos">
                {ms.todos.map((todo, ti) => {
                  const id   = `${weekKey}-t${ti}`
                  const done = checked.has(id)
                  return (
                    <label key={id} className={`todo-item${done ? ' todo-done' : ''}`}>
                      <input type="checkbox" className="todo-checkbox" checked={done} onChange={() => toggleTodo(id)} />
                      <span>{todo}</span>
                    </label>
                  )
                })}

                {/* Custom todos */}
                {custom.map((todo, ci) => {
                  const id   = `${weekKey}-c${ci}`
                  const done = checked.has(id)
                  return (
                    <div key={ci} className="todo-item-custom">
                      <label className={`todo-item${done ? ' todo-done' : ''}`}>
                        <input type="checkbox" className="todo-checkbox" checked={done} onChange={() => toggleTodo(id)} />
                        <span>{todo}</span>
                      </label>
                      <button className="todo-delete-btn" onClick={() => deleteCustomTodo(weekKey, ci)} title="Löschen">×</button>
                    </div>
                  )
                })}
              </div>

              {/* Add todo */}
              {addingWeek === weekKey ? (
                <div className="todo-add-row">
                  <input
                    ref={addInputRef}
                    className="todo-add-input"
                    value={newTodoText}
                    onChange={e => setNewTodoText(e.target.value)}
                    placeholder="Neues Todo..."
                    onKeyDown={e => {
                      if (e.key === 'Enter') addCustomTodo(weekKey)
                      if (e.key === 'Escape') { setAddingWeek(null); setNewTodoText('') }
                    }}
                    onBlur={() => { if (!newTodoText.trim()) setAddingWeek(null) }}
                  />
                  <button className="todo-add-confirm" onMouseDown={() => addCustomTodo(weekKey)}>✓</button>
                  <button className="todo-add-cancel" onMouseDown={() => { setAddingWeek(null); setNewTodoText('') }}>✕</button>
                </div>
              ) : (
                <button className="todo-add-btn" onClick={() => setAddingWeek(weekKey)}>+ Todo</button>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
