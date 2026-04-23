import { useState } from 'react'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import type { QuoteData, LineItem, BankDetails } from './types'
import { LuminairePDF } from './components/PDFTemplate'
import Landing from './components/Landing'

type View = 'landing' | 'tool'
type Tab  = 'angebot' | 'verlauf'

interface SavedInvoice {
  savedAt: string
  data: QuoteData
  fileName: string
}

const STORAGE_KEY = 'luminaire_rechnungen'

function loadSaved(): SavedInvoice[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') } catch { return [] }
}

function persistSaved(list: SavedInvoice[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

// ── Helpers ────────────────────────────────────────────────────

function generateQuoteNumber(type: 'angebot' | 'rechnung' = 'angebot'): string {
  const year = new Date().getFullYear()
  const num  = String(Math.floor(Math.random() * 900) + 100)
  const prefix = type === 'rechnung' ? 'RE' : 'AN'
  return `LUM-${prefix}-${year}-${num}`
}

function toInput(d: Date): string {
  return d.toISOString().split('T')[0]
}

function fmtCurrency(n: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n)
}

// ── Product catalog ────────────────────────────────────────────

const CATALOG = [
  {
    description: 'KI-Führerschein',
    details: 'Zertifizierter Präsenzkurs (3 Stunden) · EU AI Act konform · Datenschutz & Ethik',
    unit: 'Teilnehmer',
    unitPrice: 149,
  },
  {
    description: 'KI Einstieg',
    details: 'Einführungskurs ChatGPT-Basics (90 Min) · Sichere KI-Nutzung im Berufsalltag',
    unit: 'Teilnehmer',
    unitPrice: 149,
  },
  {
    description: 'KI Fortgeschrittene',
    details: 'Ganztages-Workshop · Deep Learning, KI-Sicherheit, Automatisierung & Prozessoptimierung',
    unit: 'Teilnehmer',
    unitPrice: 499,
  },
  {
    description: 'Branchenlösung (individuell)',
    details: 'Maßgeschneidertes KI-Training für Ihre Branche · Individuelle Inhalte & Praxisbeispiele',
    unit: 'Stunde',
    unitPrice: 199,
  },
]

// ── Default state ──────────────────────────────────────────────

const today = new Date()
const validUntil = new Date(today)
validUntil.setDate(validUntil.getDate() + 30)

const DEFAULT: QuoteData = {
  docType: 'angebot',
  quoteNumber: generateQuoteNumber('angebot'),
  date: toInput(today),
  validUntil: toInput(validUntil),
  customer: {
    salutation: 'Herr',
    name: '',
    company: '',
    street: '',
    zip: '',
    city: '',
    email: '',
    phone: '',
  },
  items: [
    {
      id: '1',
      description: CATALOG[0].description,
      details: CATALOG[0].details,
      quantity: 1,
      unit: CATALOG[0].unit,
      unitPrice: CATALOG[0].unitPrice,
    },
  ],
  notes:
    'Das Angebot ist 30 Tage gültig.\nZahlungsziel: 14 Tage nach Rechnungsstellung.',
  vatRate: 19,
  bankDetails: {
    accountHolder: 'Philipp Mick',
    iban: 'DE40 5919 0000 0219 2070 18',
    bic: 'SABADE5SXXX',
    bank: 'Bank 1 Saar',
  },
}

export default function App() {
  const [view, setView]       = useState<View>('landing')
  const [tab, setTab]         = useState<Tab>('angebot')
  const [data, setData]       = useState<QuoteData>(DEFAULT)
  const [lightMode, setLight] = useState(false)
  const [saved, setSaved]     = useState<SavedInvoice[]>(loadSaved)

  function navigate(target: 'angebot') {
    setTab(target)
    setView('tool')
  }

  if (view === 'landing') {
    return <Landing onNavigate={navigate} />
  }

  function set<K extends keyof QuoteData>(key: K, value: QuoteData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function setCustomer(field: keyof QuoteData['customer'], value: string) {
    setData(prev => ({ ...prev, customer: { ...prev.customer, [field]: value } }))
  }

  function setBank(field: keyof BankDetails, value: string) {
    setData(prev => ({ ...prev, bankDetails: { ...prev.bankDetails, [field]: value } }))
  }

  function switchDocType(type: 'angebot' | 'rechnung') {
    const dueDate = new Date(today)
    dueDate.setDate(dueDate.getDate() + (type === 'rechnung' ? 14 : 30))
    setData(prev => ({
      ...prev,
      docType: type,
      quoteNumber: generateQuoteNumber(type),
      validUntil: toInput(dueDate),
      notes: type === 'rechnung'
        ? 'Bitte überweisen Sie den Rechnungsbetrag innerhalb von 14 Tagen ohne Abzug.'
        : 'Das Angebot ist 30 Tage gültig.\nZahlungsziel: 14 Tage nach Rechnungsstellung.',
    }))
  }

  function setItem(id: string, field: keyof LineItem, value: string | number) {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
  }

  function addItem(catalogIdx?: number) {
    const cat = catalogIdx !== undefined ? CATALOG[catalogIdx] : null
    const newItem: LineItem = {
      id: String(Date.now()),
      description: cat?.description ?? 'Neue Position',
      details: cat?.details ?? '',
      quantity: 1,
      unit: cat?.unit ?? 'Stück',
      unitPrice: cat?.unitPrice ?? 0,
    }
    setData(prev => ({ ...prev, items: [...prev.items, newItem] }))
  }

  function removeItem(id: string) {
    setData(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }))
  }

  async function downloadPDF(invoiceData: QuoteData, name: string) {
    const blob = await pdf(<LuminairePDF data={invoiceData} lightMode={lightMode} />).toBlob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = name; a.click()
    URL.revokeObjectURL(url)
    if (invoiceData.docType === 'rechnung') {
      setSaved(prev => {
        const entry: SavedInvoice = { savedAt: new Date().toISOString(), data: { ...invoiceData }, fileName: name }
        const updated = [entry, ...prev.filter(i => i.data.quoteNumber !== invoiceData.quoteNumber)].slice(0, 100)
        persistSaved(updated)
        return updated
      })
    }
  }

  function deleteSaved(quoteNumber: string) {
    setSaved(prev => {
      const updated = prev.filter(i => i.data.quoteNumber !== quoteNumber)
      persistSaved(updated)
      return updated
    })
  }

  const net   = data.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
  const vat   = net * (data.vatRate / 100)
  const gross = net + vat

  const docLabel = data.docType === 'rechnung' ? 'Rechnung' : 'Angebot'
  const fileName = `${docLabel}_${data.quoteNumber}_${
    (data.customer.company || data.customer.name || 'Kunde').replace(/[^\w\s-]/g, '').trim()
  }.pdf`

  return (
    <div className={`app${lightMode ? ' light' : ''}`}>

      {/* ── HEADER ─────────────────────────────────── */}
      <header className="app-header">
        <button className="back-btn" onClick={() => setView('landing')}>← Start</button>
        <div className="logo-text">lumin<span>AI</span>re</div>
        <nav className="tab-nav">
          <button
            className={`tab-btn${tab === 'angebot' ? ' active' : ''}`}
            onClick={() => setTab('angebot')}
          >
            Angebot
          </button>
          <button
            className={`tab-btn${tab === 'verlauf' ? ' active' : ''}`}
            onClick={() => setTab('verlauf')}
          >
            Verlauf {saved.length > 0 && <span className="tab-badge">{saved.length}</span>}
          </button>
        </nav>
        <button
          className="mode-toggle"
          onClick={() => setLight(l => !l)}
          title={lightMode ? 'Dunkelmodus' : 'Hellmodus'}
        >
          {lightMode ? '🌙' : '☀️'}
        </button>
      </header>

      <div className="main-content">

        {tab === 'angebot' && (
        <>
        {/* ── FORM PANEL ─────────────────────────────── */}
        <div className="form-panel">

          {/* Dokumenttyp */}
          <div className="form-section">
            <h3>Dokumenttyp</h3>
            <div className="doc-type-toggle">
              <button
                className={`doc-type-btn${data.docType === 'angebot' ? ' active' : ''}`}
                onClick={() => switchDocType('angebot')}
              >
                Angebot
              </button>
              <button
                className={`doc-type-btn${data.docType === 'rechnung' ? ' active' : ''}`}
                onClick={() => switchDocType('rechnung')}
              >
                Rechnung
              </button>
            </div>
          </div>

          {/* Dokument­daten */}
          <div className="form-section">
            <h3>{docLabel}</h3>
            <div className="form-row">
              <div className="form-group">
                <label>{docLabel}snummer</label>
                <input
                  value={data.quoteNumber}
                  onChange={e => set('quoteNumber', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>MwSt.</label>
                <select
                  value={data.vatRate}
                  onChange={e => set('vatRate', Number(e.target.value))}
                >
                  <option value={19}>19 %</option>
                  <option value={7}>7 %</option>
                  <option value={0}>0 % (steuerfrei)</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Datum</label>
                <input
                  type="date"
                  value={data.date}
                  onChange={e => set('date', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>{data.docType === 'rechnung' ? 'Fällig am' : 'Gültig bis'}</label>
                <input
                  type="date"
                  value={data.validUntil}
                  onChange={e => set('validUntil', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Kundendaten */}
          <div className="form-section">
            <h3>Kunde</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Anrede</label>
                <select
                  value={data.customer.salutation}
                  onChange={e => setCustomer('salutation', e.target.value)}
                >
                  <option>Herr</option>
                  <option>Frau</option>
                  <option>Divers</option>
                  <option>Firma</option>
                </select>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  value={data.customer.name}
                  onChange={e => setCustomer('name', e.target.value)}
                  placeholder="Max Mustermann"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Unternehmen</label>
              <input
                value={data.customer.company}
                onChange={e => setCustomer('company', e.target.value)}
                placeholder="Musterfirma GmbH"
              />
            </div>
            <div className="form-group">
              <label>Straße & Hausnummer</label>
              <input
                value={data.customer.street}
                onChange={e => setCustomer('street', e.target.value)}
                placeholder="Musterstraße 1"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>PLZ</label>
                <input
                  value={data.customer.zip}
                  onChange={e => setCustomer('zip', e.target.value)}
                  placeholder="66111"
                />
              </div>
              <div className="form-group">
                <label>Ort</label>
                <input
                  value={data.customer.city}
                  onChange={e => setCustomer('city', e.target.value)}
                  placeholder="Saarbrücken"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>E-Mail</label>
                <input
                  type="email"
                  value={data.customer.email}
                  onChange={e => setCustomer('email', e.target.value)}
                  placeholder="kontakt@firma.de"
                />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input
                  type="tel"
                  value={data.customer.phone}
                  onChange={e => setCustomer('phone', e.target.value)}
                  placeholder="+49 ..."
                />
              </div>
            </div>
          </div>

          {/* Leistungen */}
          <div className="form-section">
            <h3>Leistungen</h3>

            {data.items.map((item, idx) => (
              <div key={item.id} className="item-card">
                <div className="item-header">
                  <span className="item-pos">Position {idx + 1}</span>
                  <button
                    className="btn-danger"
                    onClick={() => removeItem(item.id)}
                    title="Position entfernen"
                  >
                    ✕
                  </button>
                </div>
                <div className="form-group">
                  <label>Bezeichnung</label>
                  <input
                    value={item.description}
                    onChange={e => setItem(item.id, 'description', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Details / Beschreibung</label>
                  <textarea
                    value={item.details}
                    onChange={e => setItem(item.id, 'details', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="form-row three-col">
                  <div className="form-group">
                    <label>Menge</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => setItem(item.id, 'quantity', Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Einheit</label>
                    <input
                      value={item.unit}
                      onChange={e => setItem(item.id, 'unit', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nettopreis (€)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={e => setItem(item.id, 'unitPrice', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="add-item-row">
              <button className="btn btn-ghost" onClick={() => addItem()}>
                + Leere Position
              </button>
              <select
                className="catalog-select"
                defaultValue=""
                onChange={e => {
                  if (e.target.value !== '') {
                    addItem(Number(e.target.value))
                    e.currentTarget.value = ''
                  }
                }}
              >
                <option value="" disabled>+ Aus Katalog...</option>
                {CATALOG.map((p, i) => (
                  <option key={i} value={i}>{p.description}</option>
                ))}
              </select>
            </div>

            <div className="totals-preview">
              <div className="totals-row-preview">
                <span>Nettobetrag</span>
                <span>{fmtCurrency(net)}</span>
              </div>
              <div className="totals-row-preview">
                <span>MwSt. {data.vatRate} %</span>
                <span>{fmtCurrency(vat)}</span>
              </div>
              <div className="totals-row-preview grand">
                <span>Gesamtbetrag</span>
                <span>{fmtCurrency(gross)}</span>
              </div>
            </div>
          </div>

          {/* Hinweise */}
          <div className="form-section">
            <h3>Hinweise & Bedingungen</h3>
            <div className="form-group">
              <textarea
                value={data.notes}
                onChange={e => set('notes', e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {/* Bankverbindung (nur Rechnung) */}
          {data.docType === 'rechnung' && (
            <div className="form-section">
              <h3>Bankverbindung</h3>
              <div className="form-group">
                <label>Kontoinhaber</label>
                <input
                  value={data.bankDetails.accountHolder}
                  onChange={e => setBank('accountHolder', e.target.value)}
                  placeholder="Luminaire"
                />
              </div>
              <div className="form-group">
                <label>IBAN</label>
                <input
                  value={data.bankDetails.iban}
                  onChange={e => setBank('iban', e.target.value)}
                  placeholder="DE00 0000 0000 0000 0000 00"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>BIC</label>
                  <input
                    value={data.bankDetails.bic}
                    onChange={e => setBank('bic', e.target.value)}
                    placeholder="BELADEBEXXX"
                  />
                </div>
                <div className="form-group">
                  <label>Bank</label>
                  <input
                    value={data.bankDetails.bank}
                    onChange={e => setBank('bank', e.target.value)}
                    placeholder="Sparkasse Saarbrücken"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Download */}
          <div className="form-section">
            <button
              className="btn btn-primary download-btn"
              onClick={() => downloadPDF(data, fileName)}
            >
              ↓ {docLabel} herunterladen
            </button>
          </div>

        </div>

        {/* ── PREVIEW PANEL ──────────────────────────── */}
        <div className="preview-panel">
          <div className="preview-toolbar">
            <span>Live-Vorschau</span>
            <span className="quote-num">{data.quoteNumber}</span>
          </div>
          <div className="pdf-wrapper">
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              <LuminairePDF data={data} lightMode={lightMode} />
            </PDFViewer>
          </div>
        </div>
        </>
        )}

        {tab === 'verlauf' && (
          <div className="verlauf-panel">
            <div className="verlauf-header">
              <h2>Gespeicherte Rechnungen</h2>
              <span className="verlauf-count">{saved.length} Einträge</span>
            </div>
            {saved.length === 0 ? (
              <div className="verlauf-empty">
                Noch keine Rechnungen erstellt. Wechsle zum Angebot-Tab, wähle „Rechnung" und lade die PDF herunter.
              </div>
            ) : (
              <div className="verlauf-list">
                {saved.map(entry => {
                  const net   = entry.data.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
                  const gross = net * (1 + entry.data.vatRate / 100)
                  return (
                    <div key={entry.data.quoteNumber} className="verlauf-card">
                      <div className="verlauf-card-main">
                        <div className="verlauf-num">{entry.data.quoteNumber}</div>
                        <div className="verlauf-customer">
                          {entry.data.customer.company || entry.data.customer.name || 'Kein Kunde'}
                        </div>
                        <div className="verlauf-meta">
                          <span>{new Date(entry.data.date).toLocaleDateString('de-DE')}</span>
                          <span>Fällig: {new Date(entry.data.validUntil).toLocaleDateString('de-DE')}</span>
                          <span className="verlauf-amount">{fmtCurrency(gross)}</span>
                        </div>
                      </div>
                      <div className="verlauf-card-actions">
                        <button
                          className="btn btn-ghost"
                          onClick={() => downloadPDF(entry.data, entry.fileName)}
                        >
                          ↓ PDF
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => deleteSaved(entry.data.quoteNumber)}
                          title="Löschen"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
