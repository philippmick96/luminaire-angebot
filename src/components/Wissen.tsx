import { useState } from 'react'

type Section = 'prompt' | 'canvas' | 'reifegrad' | 'euaiact'

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: 'prompt',   label: 'Prompt-Formel',     icon: '◈' },
  { id: 'canvas',   label: 'KI-Canvas',          icon: '◉' },
  { id: 'reifegrad',label: 'Reifegrad-Modell',   icon: '⬡' },
  { id: 'euaiact',  label: 'EU AI Act',           icon: '◻' },
]

function PromptFormel() {
  const schritte = [
    {
      nr: '01', name: 'Rolle',
      desc: 'Weise der KI eine klare Expertenrolle zu.',
      beispiel: '"Du bist ein erfahrener Steuerberater mit Fokus auf KMU."',
      warum: 'Legt den Kontext und die Fachlichkeit der Antwort fest.',
    },
    {
      nr: '02', name: 'Kontext',
      desc: 'Gib relevante Hintergrundinformationen.',
      beispiel: '"Ich betreibe ein kleines Handelsunternehmen in Saarbrücken mit 5 Mitarbeitern."',
      warum: 'Je mehr relevanter Kontext, desto präzisere Antwort.',
    },
    {
      nr: '03', name: 'Ziel',
      desc: 'Beschreibe das konkrete gewünschte Ergebnis.',
      beispiel: '"Erstelle eine kurze Übersicht der 3 wichtigsten Steuervorteile für mein Unternehmen."',
      warum: 'Verhindert allgemeine Antworten — fokussiert die KI auf dein Problem.',
    },
    {
      nr: '04', name: 'Format',
      desc: 'Gib das gewünschte Ausgabeformat an.',
      beispiel: '"Als nummerierte Liste, max. 3 Punkte, je max. 2 Sätze."',
      warum: 'Spart Nachfragen und macht das Ergebnis direkt verwendbar.',
    },
    {
      nr: '05', name: 'Qualitätskriterien',
      desc: 'Nenne Maßstäbe für eine gute Antwort.',
      beispiel: '"Erkläre es so, dass ein Nicht-Jurist es versteht. Vermeide Fachbegriffe."',
      warum: 'Verhindert, dass die KI oberflächlich oder zu technisch antwortet.',
    },
  ]

  return (
    <div className="wissen-content">
      <div className="wissen-section-intro">
        <h2 className="wissen-h2">Die 5-teilige Prompt-Formel</h2>
        <p className="wissen-intro-text">
          Entwickelt von luminAIre für den Einsatz im KI-Führerschein und Unternehmervortrag.
          Strukturierte Prompts liefern konsistent bessere Ergebnisse als Ad-hoc-Anfragen.
        </p>
      </div>
      <div className="prompt-steps">
        {schritte.map(s => (
          <div key={s.nr} className="prompt-step">
            <div className="prompt-step-num">{s.nr}</div>
            <div className="prompt-step-body">
              <div className="prompt-step-name">{s.name}</div>
              <div className="prompt-step-desc">{s.desc}</div>
              <div className="prompt-example">
                <span className="prompt-example-label">Beispiel</span>
                <span className="prompt-example-text">{s.beispiel}</span>
              </div>
              <div className="prompt-warum">{s.warum}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="wissen-tip">
        Tipp für den Kurs: Lass Teilnehmer zuerst ohne Formel promten, dann mit — der Unterschied überzeugt sofort.
      </div>
    </div>
  )
}

function KICanvas() {
  const fragen = [
    { nr: '1', frage: 'Aufgabe', desc: 'Welche Aufgabe soll die KI übernehmen oder unterstützen?', hinweis: 'So konkret wie möglich formulieren' },
    { nr: '2', frage: 'Input',   desc: 'Welche Daten / Informationen stehen der KI zur Verfügung?', hinweis: 'Eigene Daten? Öffentliche Quellen?' },
    { nr: '3', frage: 'Output',  desc: 'Was soll am Ende herauskommen?', hinweis: 'Text, Tabelle, Entscheidung, Aktion?' },
    { nr: '4', frage: 'Qualität',desc: 'Woran erkennst du eine gute Ausgabe?', hinweis: 'Kriterien definieren — Grundlage für Prompt-Formel Schritt 5' },
    { nr: '5', frage: 'Risiken', desc: 'Was könnte schiefgehen oder Schaden anrichten?', hinweis: 'Datenschutz, Fehler, Bias?' },
    { nr: '6', frage: 'Mensch',  desc: 'Wo muss immer ein Mensch involviert bleiben?', hinweis: 'Human-in-the-Loop definieren' },
    { nr: '7', frage: 'Nutzen',  desc: 'Was ist der konkrete Mehrwert — Zeit, Geld, Qualität?', hinweis: 'ROI-Argumentation für Entscheider' },
  ]

  return (
    <div className="wissen-content">
      <div className="wissen-section-intro">
        <h2 className="wissen-h2">Der KI-Canvas – 7 Fragen für eigene Use-Cases</h2>
        <p className="wissen-intro-text">
          Werkzeug aus dem Unternehmervortrag. Teilnehmer leiten damit in 20 Minuten ihre eigenen,
          konkreten KI-Anwendungsfälle ab — keine Theorie, direkte Praxis.
        </p>
      </div>
      <div className="canvas-grid">
        {fragen.map(f => (
          <div key={f.nr} className="canvas-card">
            <div className="canvas-nr">{f.nr}</div>
            <div className="canvas-body">
              <div className="canvas-frage">{f.frage}</div>
              <div className="canvas-desc">{f.desc}</div>
              <div className="canvas-hinweis">{f.hinweis}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="wissen-tip">
        Einsatz im Seminar: Jeder Teilnehmer füllt den Canvas für seinen eigenen Betrieb aus.
        Ergebnis ist ein konkreter Use-Case, den er direkt umsetzen kann.
      </div>
    </div>
  )
}

function ReifegradModell() {
  const stufen = [
    {
      nr: '1', name: 'Assistent', color: '#7c3aed',
      desc: 'KI als intelligentes Hilfsmittel im Alltag',
      beispiele: ['Texte schreiben & optimieren', 'Recherche & Zusammenfassungen', 'E-Mails formulieren', 'Bilder generieren'],
      eignung: 'Jeder Mitarbeiter · sofort starbar · kein IT-Aufwand',
    },
    {
      nr: '2', name: 'Workflow', color: '#0ea5e9',
      desc: 'KI in automatisierte Prozesse eingebunden',
      beispiele: ['Angebots-Erstellung automatisiert', 'Meeting-Follow-up-Workflow', 'Rechnungsverarbeitung', 'Lead-Qualifizierung'],
      eignung: 'IT-affine Teams · braucht Prozess-Denken · mittlerer Aufwand',
    },
    {
      nr: '3', name: 'Agent', color: '#10b981',
      desc: 'Autonome KI-Systeme, die eigenständig handeln',
      beispiele: ['Backoffice-Agent (Ablage, Kalender, E-Mail)', 'Angebots-Workflow-Agent', 'Recherche-Agent mit Aktionen'],
      eignung: 'Klare Regeln nötig · Human-in-the-Loop empfohlen · hoher ROI',
    },
  ]

  const agentKriterien = [
    'Aufgabe klar definierbar (Input/Output eindeutig)',
    'Regel-basiert — wenig kreative Ausnahmen',
    'Wiederholend (mindestens wöchentlich)',
    'Fehler sind reversibel oder human-kontrolliert',
    'Daten sind digital vorhanden',
    'ROI messbar (Zeit oder Geld)',
  ]

  const useCases = [
    { name: 'Meeting-Follow-up', stufe: 2, desc: 'Transkript → Zusammenfassung → Aufgaben → CRM-Eintrag' },
    { name: 'Angebots-Workflow',  stufe: 2, desc: 'Lead-Info → Angebots-PDF → E-Mail → Kalender-Reminder' },
    { name: 'Backoffice-Agent',   stufe: 3, desc: 'E-Mails kategorisieren → Ablage → Prioritäten setzen → Draft antworten' },
  ]

  return (
    <div className="wissen-content">
      <div className="wissen-section-intro">
        <h2 className="wissen-h2">Reifegrad-Modell: Assistent → Workflow → Agent</h2>
        <p className="wissen-intro-text">
          3-Stufen-Modell aus dem Unternehmervortrag. Hilft Unternehmern zu verstehen,
          wo sie heute stehen und wie der nächste sinnvolle Schritt aussieht.
        </p>
      </div>

      <div className="reifegrad-stufen">
        {stufen.map(s => (
          <div key={s.nr} className="reifegrad-card" style={{ borderColor: `${s.color}44` }}>
            <div className="reifegrad-head" style={{ borderColor: `${s.color}44` }}>
              <span className="reifegrad-nr" style={{ background: `${s.color}22`, color: s.color }}>Stufe {s.nr}</span>
              <span className="reifegrad-name" style={{ color: s.color }}>{s.name}</span>
            </div>
            <div className="reifegrad-desc">{s.desc}</div>
            <div className="reifegrad-beispiele">
              {s.beispiele.map((b, i) => (
                <span key={i} className="reifegrad-beispiel">{b}</span>
              ))}
            </div>
            <div className="reifegrad-eignung">{s.eignung}</div>
          </div>
        ))}
      </div>

      <div className="reifegrad-section-title">Wann lohnt sich ein Agent? (6 Kriterien)</div>
      <div className="agent-kriterien">
        {agentKriterien.map((k, i) => (
          <div key={i} className="agent-kriterium">
            <span className="agent-check">✓</span>
            <span>{k}</span>
          </div>
        ))}
      </div>

      <div className="reifegrad-section-title">Konkrete Use-Cases aus dem Seminar</div>
      <div className="usecase-row">
        {useCases.map((uc, i) => (
          <div key={i} className="usecase-card">
            <div className="usecase-name">{uc.name}</div>
            <div className="usecase-stufe">Stufe {uc.stufe} – {stufen[uc.stufe - 1].name}</div>
            <div className="usecase-desc">{uc.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EUAIAct() {
  const klassen = [
    {
      name: 'Verboten', color: '#ef4444',
      desc: 'Anwendungen, die in der EU grundsätzlich nicht erlaubt sind',
      beispiele: ['Social Scoring durch Behörden', 'Biometrische Massenüberwachung in Echtzeit', 'Manipulative KI-Systeme gegen freien Willen'],
    },
    {
      name: 'Hochrisiko', color: '#f59e0b',
      desc: 'Erlaubt, aber strenge Auflagen: Transparenz, Dokumentation, menschliche Aufsicht',
      beispiele: ['KI in Bildung / Beurteilung', 'KI in Personalentscheidungen', 'KI in kritischer Infrastruktur', 'Kreditwürdigkeit & Versicherung'],
    },
    {
      name: 'Transparenzpflicht', color: '#0ea5e9',
      desc: 'Nutzer müssen wissen, dass sie mit KI interagieren',
      beispiele: ['Chatbots & virtuelle Assistenten', 'KI-generierte Texte / Deepfakes', 'Emotionserkennung'],
    },
  ]

  const grundregeln = [
    { nr: '1', regel: 'Keine verbotenen Anwendungen nutzen', detail: 'Social Scoring, manipulative Systeme, biometrische Überwachung in Echtzeit' },
    { nr: '2', regel: 'Transparenz gegenüber Nutzern', detail: 'Immer offenlegen, wenn KI-generierte Inhalte oder KI-Systeme eingesetzt werden' },
    { nr: '3', regel: 'Mensch bleibt verantwortlich', detail: 'KI unterstützt, entscheidet aber nicht alleine in sensiblen Bereichen' },
    { nr: '4', regel: 'Daten schützen', detail: 'Keine personenbezogenen Daten ohne Einwilligung in externe KI-Systeme einspeisen' },
    { nr: '5', regel: 'Qualität sicherstellen', detail: 'KI-Outputs immer prüfen — Halluzinationen und Fehler sind möglich' },
  ]

  return (
    <div className="wissen-content">
      <div className="wissen-section-intro">
        <h2 className="wissen-h2">EU AI Act – Compliance im Überblick</h2>
        <p className="wissen-intro-text">
          Seit August 2024 in Kraft. Vollständig anwendbar ab August 2026.
          luminAIre vermittelt die Grundregeln im KI-Führerschein und gibt Unternehmern
          konkrete Handlungsempfehlungen.
        </p>
      </div>

      <div className="euaiact-klassen">
        {klassen.map((k, i) => (
          <div key={i} className="euaiact-klasse" style={{ borderColor: `${k.color}44` }}>
            <div className="euaiact-klasse-head" style={{ color: k.color }}>
              <span className="euaiact-klasse-name">{k.name}</span>
            </div>
            <div className="euaiact-klasse-desc">{k.desc}</div>
            <ul className="euaiact-beispiele">
              {k.beispiele.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="wissen-section-title">Luminaires 5 Grundregeln für den Alltag</div>
      <div className="euaiact-grundregeln">
        {grundregeln.map(g => (
          <div key={g.nr} className="euaiact-grundregel">
            <div className="euaiact-grundregel-nr">{g.nr}</div>
            <div className="euaiact-grundregel-body">
              <div className="euaiact-grundregel-titel">{g.regel}</div>
              <div className="euaiact-grundregel-detail">{g.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="wissen-tip">
        Im Kurs: Teilnehmer bekommen die 5 Grundregeln als Handout. Konkrete Alltagsbeispiele
        aus ihrer Branche machen die Compliance greifbar.
      </div>
    </div>
  )
}

export default function Wissen() {
  const [active, setActive] = useState<Section>('prompt')

  return (
    <div className="wissen-panel">
      <div className="wissen-header">
        <h1 className="wissen-title">Wissensbasis & Didaktische IP</h1>
        <p className="wissen-subtitle">Kernkonzepte aus den luminAIre-Seminaren</p>
      </div>

      <div className="wissen-nav">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`wissen-nav-btn${active === s.id ? ' active' : ''}`}
            onClick={() => setActive(s.id)}
          >
            <span className="wissen-nav-icon">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {active === 'prompt'    && <PromptFormel />}
      {active === 'canvas'    && <KICanvas />}
      {active === 'reifegrad' && <ReifegradModell />}
      {active === 'euaiact'   && <EUAIAct />}
    </div>
  )
}
