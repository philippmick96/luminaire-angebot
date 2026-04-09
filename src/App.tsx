import { useState } from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import type { QuoteData, LineItem, CardData } from './types'
import { LuminairePDF } from './components/PDFTemplate'
import { BusinessCardPDF } from './components/BusinessCardPDF'
import { BusinessCardFront, BusinessCardBack } from './components/BusinessCardPreview'
import Landing from './components/Landing'

type View = 'landing' | 'tool'

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

const DEFAULT_CARD: CardData = {
  name:         '',
  title:        'KI-Trainer & Berater',
  email:        'info@luminaire.training',
  phone:        '+49 179 1327191',
  website:      'www.luminaire.training',
  address:      'Kaiserstraße 26a, 66111 Saarbrücken',
  tagline:      'Das Teuerste an KI ist, sie nicht zu nutzen.',
  theme:        'sweep',
  nameFontSize: 24,
  infoFontSize: 8,
}

export default function App() {
  const [view, setView]       = useState<View>('landing')
  const [tab, setTab]         = useState<'angebot' | 'visitenkarte'>('angebot')
  const [data, setData]       = useState<QuoteData>(DEFAULT)
  const [card, setCard]       = useState<CardData>(DEFAULT_CARD)
  const [lightMode, setLight] = useState(false)

  function navigate(target: 'angebot' | 'visitenkarte') {
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
            className={`tab-btn${tab === 'visitenkarte' ? ' active' : ''}`}
            onClick={() => setTab('visitenkarte')}
          >
            Visitenkarte
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

        {tab === 'visitenkarte' && (
          <>
            {/* ── CARD FORM ────────────────────────────── */}
            <div className="form-panel">
              <div className="form-section">
                <h3>Person</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={card.name}
                    onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                    placeholder="Max Mustermann"
                  />
                </div>
                <div className="form-group">
                  <label>Titel / Position</label>
                  <input
                    value={card.title}
                    onChange={e => setCard(c => ({ ...c, title: e.target.value }))}
                    placeholder="KI-Trainer & Berater"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Kontakt</h3>
                <div className="form-group">
                  <label>Telefon</label>
                  <input
                    value={card.phone}
                    onChange={e => setCard(c => ({ ...c, phone: e.target.value }))}
                    placeholder="+49 179 1327191"
                  />
                </div>
                <div className="form-group">
                  <label>E-Mail</label>
                  <input
                    type="email"
                    value={card.email}
                    onChange={e => setCard(c => ({ ...c, email: e.target.value }))}
                    placeholder="info@luminaire.training"
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    value={card.website}
                    onChange={e => setCard(c => ({ ...c, website: e.target.value }))}
                    placeholder="www.luminaire.training"
                  />
                </div>
                <div className="form-group">
                  <label>Adresse</label>
                  <input
                    value={card.address}
                    onChange={e => setCard(c => ({ ...c, address: e.target.value }))}
                    placeholder="Kaiserstraße 26a, 66111 Saarbrücken"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Design</h3>
                <div className="form-group">
                  <label>Farbvariante</label>
                  <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                    {(['sweep', 'pearl', 'frost'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setCard(c => ({ ...c, theme: t }))}
                        style={{
                          flex: 1, padding: '6px 0', borderRadius: 8, border: '1px solid',
                          fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                          transition: 'all 0.15s',
                          background: card.theme === t
                            ? (t === 'sweep' ? '#7c3aed' : t === 'pearl' ? '#ffffff' : '#ede9fe')
                            : 'rgba(20,15,35,0.8)',
                          color: card.theme === t
                            ? (t === 'sweep' ? '#ffffff' : '#2e1065')
                            : '#94a3b8',
                          borderColor: card.theme === t
                            ? (t === 'sweep' ? '#7c3aed' : '#a78bfa')
                            : 'rgba(124,58,237,0.22)',
                        }}
                      >
                        {t === 'sweep' ? 'Dunkel' : t === 'pearl' ? 'Weiß' : 'Lavendel'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Schriftgröße Name</span>
                    <span style={{ color: '#a78bfa', fontWeight: 600 }}>{card.nameFontSize}px</span>
                  </label>
                  <input
                    type="range"
                    min={14}
                    max={38}
                    step={1}
                    value={card.nameFontSize}
                    onChange={e => setCard(c => ({ ...c, nameFontSize: Number(e.target.value) }))}
                    style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Schriftgröße Infos</span>
                    <span style={{ color: '#a78bfa', fontWeight: 600 }}>{card.infoFontSize}px</span>
                  </label>
                  <input
                    type="range"
                    min={6}
                    max={14}
                    step={0.5}
                    value={card.infoFontSize}
                    onChange={e => setCard(c => ({ ...c, infoFontSize: Number(e.target.value) }))}
                    style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Rückseite</h3>
                <div className="form-group">
                  <label>Tagline</label>
                  <textarea
                    value={card.tagline}
                    onChange={e => setCard(c => ({ ...c, tagline: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>

              <div className="form-section">
                <PDFDownloadLink
                  document={<BusinessCardPDF data={card} />}
                  fileName={`Visitenkarte_${(card.name || 'Luminaire').replace(/\s+/g, '_')}.pdf`}
                  className="btn btn-primary download-btn"
                >
                  ↓ Visitenkarte herunterladen
                </PDFDownloadLink>
              </div>
            </div>

            {/* ── CARD PREVIEW + DESIGN GALLERY ────────── */}
            <div className="preview-panel card-preview-panel">
              <div className="preview-toolbar">
                <span>Visitenkarte – Vorder- & Rückseite (85 × 55 mm)</span>
                <span className="quote-num">Europäisches Format</span>
              </div>

              {/* Large preview */}
              <div className="card-large-preview">
                <div className="card-preview-pair">
                  <div className="card-preview-item">
                    <div className="card-preview-label">Vorderseite</div>
                    <BusinessCardFront data={card} scale={0.95} />
                  </div>
                  <div className="card-preview-item">
                    <div className="card-preview-label">Rückseite</div>
                    <BusinessCardBack data={card} scale={0.95} />
                  </div>
                </div>
              </div>

            </div>
          </>
        )}

        {tab === 'angebot' && (
        <>
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
              document={<LuminairePDF data={data} lightMode={lightMode} />}
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
              <LuminairePDF data={data} lightMode={lightMode} />
            </PDFViewer>
          </div>
        </div>
        </>
        )}

      </div>
    </div>
  )
}
