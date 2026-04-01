import { useState } from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import type { QuoteData, LineItem } from './types'
import { LuminairePDF } from './components/PDFTemplate'

// ── Helpers ────────────────────────────────────────────────────

function generateQuoteNumber(): string {
  const year = new Date().getFullYear()
  const num  = String(Math.floor(Math.random() * 900) + 100)
  return `LUM-${year}-${num}`
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
  quoteNumber: generateQuoteNumber(),
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
}

// ── Component ──────────────────────────────────────────────────

export default function App() {
  const [data, setData] = useState<QuoteData>(DEFAULT)

  function set<K extends keyof QuoteData>(key: K, value: QuoteData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function setCustomer(field: keyof QuoteData['customer'], value: string) {
    setData(prev => ({ ...prev, customer: { ...prev.customer, [field]: value } }))
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

  const net   = data.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
  const vat   = net * (data.vatRate / 100)
  const gross = net + vat

  const fileName = `Angebot_${data.quoteNumber}_${
    (data.customer.company || data.customer.name || 'Kunde').replace(/[^\w\s-]/g, '').trim()
  }.pdf`

  return (
    <div className="app">

      {/* ── HEADER ─────────────────────────────────── */}
      <header className="app-header">
        <div className="logo-text">lumin<span>AI</span>re</div>
        <h2>Angebotsgenerator</h2>
      </header>

      <div className="main-content">

        {/* ── FORM PANEL ─────────────────────────────── */}
        <div className="form-panel">

          {/* Angebotsdaten */}
          <div className="form-section">
            <h3>Angebot</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Angebotsnummer</label>
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
                <label>Gültig bis</label>
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

          {/* Download */}
          <div className="form-section">
            <PDFDownloadLink
              document={<LuminairePDF data={data} />}
              fileName={fileName}
              className="btn btn-primary download-btn"
            >
              ↓ PDF herunterladen
            </PDFDownloadLink>
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
              <LuminairePDF data={data} />
            </PDFViewer>
          </div>
        </div>

      </div>
    </div>
  )
}
