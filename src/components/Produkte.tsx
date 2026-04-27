interface ProdukteProp {
  onCreateAngebot: () => void
}

const PRODUKTE = [
  {
    id: 'ki-fuehrerschein',
    name: 'KI-Führerschein',
    badge: 'Zertifikat',
    badgeColor: '#7c3aed',
    zielgruppe: 'Arbeitnehmer · Einsteiger ohne KI-Erfahrung',
    format: 'Präsenz · ~3 Stunden · max. 15 TN',
    preis: [
      { label: 'Pro Person', value: '299 €' },
      { label: 'Firmenbuchung (pauschal)', value: '2.500 €' },
      { label: 'Mindest-Gruppengröße', value: '8 TN empfohlen' },
    ],
    inhalte: [
      'Was ist KI / Was kann sie wirklich?',
      'Sichere und verantwortungsvolle KI-Nutzung',
      'EU AI Act – Grundlagen & Pflichten',
      'Datenschutz & DSGVO im KI-Kontext',
      'Praktische Übungen mit gängigen Tools',
      'Abschlusstest + Zertifikat',
    ],
    besonderheiten: [
      'Teilnehmerzertifikat nach Abschluss',
      'EU AI Act konform',
      'Zukunftig AZAV-förderfähig (Steuer-ID ausstehend)',
    ],
  },
  {
    id: 'unternehmervortrag',
    name: 'KI im Arbeitsalltag',
    badge: 'Premium',
    badgeColor: '#0ea5e9',
    zielgruppe: 'Unternehmer · Selbstständige · Führungskräfte',
    format: 'Präsenz · eigene Räume (Saarbrücken) · max. 12 TN',
    preis: [
      { label: 'Pro Person', value: 'ab 399 €' },
      { label: 'Exklusiv-Termin (8–12 TN)', value: '3.200–4.800 €' },
    ],
    inhalte: [
      'KI-Canvas: Eigene Use-Cases ableiten (7 Fragen)',
      'Prompt-Formel: Professionelle Prompts in 5 Schritten',
      'Reifegrad-Modell: Assistent → Workflow → Agent',
      'Konkrete Branchenlösungen & Workflow-Demos',
      'Agentenbau: Was ist möglich, was lohnt sich?',
      'EU AI Act: Compliance für Unternehmen',
    ],
    besonderheiten: [
      'Doppelfunktion als Beratungs-Funnel',
      'Nur Präsenz — kein Online-Format',
      'Zukünftig BAFA-förderfähig',
    ],
  },
  {
    id: 'branchenlosung',
    name: 'Branchenlösung',
    badge: 'Individuell',
    badgeColor: '#10b981',
    zielgruppe: 'Unternehmen · KMU · Mittelstand',
    format: 'Projekt-/Beratungsarbeit · individueller Scope',
    preis: [
      { label: 'KI-Analyse', value: '1.500 €', desc: 'Ist-Analyse + Potenzial-Report + Handlungsempfehlung' },
      { label: 'KI-Start',   value: '4.900 €', desc: '1 Use-Case implementiert + Team-Training' },
      { label: 'KI-Transformation', value: 'ab 9.900 €', desc: '3 Use-Cases + vollständige Implementierung + 3 Monate Support' },
    ],
    inhalte: [
      'Ist-Analyse: Welche Prozesse lassen sich automatisieren?',
      'Use-Case-Priorisierung nach ROI',
      'Implementierung von KI-Workflows & Agenten',
      'Tool-Integration (GPT-4o, Claude, n8n, etc.)',
      'Team-Training & Change Management',
      'Fortlaufender Support (je nach Tier)',
    ],
    besonderheiten: [
      'Kein Kurs — echte Unternehmensimplementierung',
      'Höchste Margen im Portfolio',
      'Leads kommen primär aus Unternehmervortrag',
    ],
  },
]

export default function Produkte({ onCreateAngebot }: ProdukteProp) {
  return (
    <div className="produkte-panel">
      <div className="produkte-header">
        <h1 className="produkte-title">Produkte & Preise</h1>
        <p className="produkte-subtitle">luminAIre Portfolio · Stand Apr 2026</p>
      </div>

      <div className="produkte-grid">
        {PRODUKTE.map(p => (
          <div key={p.id} className="produkt-card">
            <div className="produkt-card-head">
              <div className="produkt-name">{p.name}</div>
              <span className="produkt-badge" style={{ background: `${p.badgeColor}22`, color: p.badgeColor, borderColor: `${p.badgeColor}55` }}>
                {p.badge}
              </span>
            </div>

            <div className="produkt-meta-row">
              <div className="produkt-meta-item">
                <span className="produkt-meta-label">Zielgruppe</span>
                <span className="produkt-meta-val">{p.zielgruppe}</span>
              </div>
              <div className="produkt-meta-item">
                <span className="produkt-meta-label">Format</span>
                <span className="produkt-meta-val">{p.format}</span>
              </div>
            </div>

            <div className="produkt-section-title">Preise</div>
            <div className="produkt-preise">
              {p.preis.map((pr, i) => (
                <div key={i} className="produkt-preis-row">
                  <div className="produkt-preis-left">
                    <span className="produkt-preis-label">{pr.label}</span>
                    {'desc' in pr && pr.desc && <span className="produkt-preis-desc">{pr.desc}</span>}
                  </div>
                  <span className="produkt-preis-val" style={{ color: p.badgeColor }}>{pr.value}</span>
                </div>
              ))}
            </div>

            <div className="produkt-section-title">Inhalte</div>
            <ul className="produkt-inhalte">
              {p.inhalte.map((item, i) => (
                <li key={i} className="produkt-inhalt-item">
                  <span className="produkt-check" style={{ color: p.badgeColor }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="produkt-section-title">Besonderheiten</div>
            <ul className="produkt-besonderheiten">
              {p.besonderheiten.map((item, i) => (
                <li key={i} className="produkt-besonderheit-item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="produkte-actions">
        <button className="btn btn-primary" onClick={onCreateAngebot}>
          Angebot erstellen →
        </button>
      </div>

      {/* Regulatory status */}
      <div className="produkte-regulatory">
        <div className="reg-title">Regulatorischer Status</div>
        <div className="reg-row">
          <div className="reg-card reg-pending">
            <div className="reg-name">AZAV-Zertifizierung</div>
            <div className="reg-status">Ausstehend – Steuer-ID erforderlich</div>
            <div className="reg-effect">Schaltet Bildungsgutschein-finanzierte Buchungen frei</div>
          </div>
          <div className="reg-card reg-pending">
            <div className="reg-name">BAFA-Akkreditierung</div>
            <div className="reg-status">Ausstehend – Steuer-ID erforderlich</div>
            <div className="reg-effect">Schaltet KMU-Beratungsförderung frei (bis 80 % Zuschuss)</div>
          </div>
          <div className="reg-card reg-active">
            <div className="reg-name">EU AI Act</div>
            <div className="reg-status">Inhalte integriert</div>
            <div className="reg-effect">KI-Führerschein ist EU AI Act konform gestaltet</div>
          </div>
        </div>
      </div>
    </div>
  )
}
