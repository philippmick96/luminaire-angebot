// Shared plan constants used by Dashboard and Ziele

export const PLAN_YEAR  = 2026
export const PLAN_MONTH = 3   // April = index 3

export const DEFAULT_MONTHS = [
  { label: 'Apr 2026', target: 3500,  kurse: '1 KI-Führerschein',  branche: '–' },
  { label: 'Mai 2026', target: 8000,  kurse: '2 Kurse',            branche: '–' },
  { label: 'Jun 2026', target: 9500,  kurse: '2 Kurse',            branche: '1× KI-Analyse' },
  { label: 'Jul 2026', target: 13000, kurse: '2 Kurse',            branche: '1× KI-Start' },
  { label: 'Aug 2026', target: 15000, kurse: '3 Kurse',            branche: '1× KI-Start' },
  { label: 'Sep 2026', target: 15000, kurse: '3 Kurse',            branche: '1× KI-Start' },
  { label: 'Okt 2026', target: 17000, kurse: '3 Kurse',            branche: '2× Branchenlösung' },
  { label: 'Nov 2026', target: 22000, kurse: '4 Kurse',            branche: '1× KI-Transformation', milestone100k: true },
  { label: 'Dez 2026', target: 17000, kurse: '4 Kurse',            branche: '1× KI-Start' },
  { label: 'Jan 2027', target: 13000, kurse: '3 Kurse',            branche: '1× KI-Start' },
  { label: 'Feb 2027', target: 17000, kurse: '4 Kurse',            branche: '1× KI-Start' },
  { label: 'Mär 2027', target: 9500,  kurse: '3 Kurse',            branche: '1× Analyse' },
]

export const SM_POSTING = [
  { day: 'Mo', content: 'KI-Praxis-Tipp',         kanal: 'Personal Profil' },
  { day: 'Mi', content: 'Hot Take / Meinung',      kanal: 'Personal Profil' },
  { day: 'Do', content: 'KI-Praxis-Tipp',          kanal: 'Company Page' },
  { day: 'Fr', content: 'Pillar 2 / 4 / 5 rot.',  kanal: 'Personal Profil' },
]

export const SM_PILLARS = [
  { id: 'P1', name: 'KI-Praxis-Tipps',         freq: '2×/Wo',     desc: 'Konkrete KI-Anwendungen aus dem Alltag' },
  { id: 'P2', name: 'Seminare live',            freq: 'nach Kurs', desc: 'Behind-the-Scenes, Social Proof' },
  { id: 'P3', name: 'Meinung / Hot Take',       freq: '1×/Wo',     desc: 'Polarisierend, generiert Reichweite' },
  { id: 'P4', name: 'Regulierung & Compliance', freq: '2×/Mo',     desc: 'EU AI Act, AZAV, Fördermöglichkeiten' },
  { id: 'P5', name: 'Kunden-Erfolge',           freq: '1–2×/Mo',   desc: 'Stärkster Lead-Treiber: Zitate & Ergebnisse' },
]

export const SM_KPIS = [
  { label: 'LinkedIn Impressions', ziel: '10.000 / Monat', when: 'nach 3 Monaten' },
  { label: 'Engagement Rate',      ziel: '> 3 %',          when: 'nach 3 Monaten' },
  { label: 'Lead-Magnet Downloads',ziel: '20 / Monat',     when: 'nach 3 Monaten' },
  { label: 'Seminar-Anfragen',     ziel: '3–5 / Monat',    when: 'via Social Media' },
]

export const PHASES = [
  {
    id: 1, shortName: 'Fundament', weeks: [1, 8] as [number, number],
    target: 11500, color: '#7c3aed', adBudget: '0 €',
    routine: [
      'Mo: KI-Praxis-Tipp posten (LinkedIn Personal) + 10 Kontakte anschreiben',
      'Di: BNI Meeting + 1 Follow-up',
      'Mi: Hot Take / Meinung posten (LinkedIn Personal) + Woche planen',
      'Do: KI-Praxis-Tipp (Company Page) + 3 Kaltakquise-Anrufe',
      'Fr: Pillar 2/4/5 rotierend + Leads nachfassen + Wochenreview (15 Min)',
      'Täglich: 15 Min Kommentare beantworten — erste 60 Min nach Post zählen!',
    ],
    milestones: [
      { week: 1,  todos: [
        'LinkedIn-Profile optimieren: Headline → "KI-Trainer | Co-Founder @luminAIre"',
        'Google Analytics auf luminaire.training aktivieren',
        'Kurskonzepte finalisieren',
      ]},
      { week: 2,  todos: [
        'KI-Führerschein Termin fixieren & über BNI ankündigen',
        'Content-Backlog anlegen: Google Sheet, 10 Ideen (je 2 pro Pillar)',
        'Ersten Hot-Take verfassen: "Warum die meisten KI-Schulungen nichts bringen"',
      ]},
      { week: 3,  todos: [
        'Meta Business Account anlegen',
        'LinkedIn Company Page optimieren: Banner, Beschreibung, CTA → luminaire.training',
        'Lead-Magnet #1 starten: KI-Canvas als PDF (Canva) + Download via Tally/Typeform',
      ]},
      { week: 4,  todos: [
        'Ersten KI-Führerschein Kurs durchführen',
        'Feedback einholen & Testimonials anfragen',
        'Seminar-Post veröffentlichen (Pillar 2: Behind-the-Scenes + Ergebnis)',
      ]},
      { week: 5,  todos: [
        'Google Search Console einrichten',
        'Erstes Testimonial als LinkedIn-Post + Mailchimp-Account einrichten (Free)',
      ]},
      { week: 6,  todos: [
        'Unternehmervortrag Termin fixieren & ankündigen',
        'E-Mail-Automation aufsetzen: 3-Mail-Sequenz über 2 Wochen (Tag 0 / 5 / 12)',
        'Corporate-Mindestpreise festlegen: 2.200 € / 2.900 €',
      ]},
      { week: 7,  todos: [
        'Branchenlösungs-Pitch vorbereiten (KI-Analyse 1.500 €)',
        'Lead-Magnet #2: Prompt-Formel Cheatsheet (Canva + Tally)',
      ]},
      { week: 8,  todos: [
        'Unternehmervortrag durchführen + Seminar-Post',
        'Meta Ads Kampagne aufsetzen (noch nicht live)',
        'Ersten Kommentar-Batch: 5 Zielgruppen-Posts kommentieren',
      ]},
    ],
  },
  {
    id: 2, shortName: 'Traktion', weeks: [9, 20] as [number, number],
    target: 37500, color: '#0ea5e9', adBudget: '800 €/Monat',
    routine: [
      'Mo: KI-Praxis-Tipp posten + 15 LinkedIn-Kontakte + Ad-Performance prüfen',
      'Di: BNI + Hot Take posten + 1 Branchenlösungs-Gespräch',
      'Mi: KI-Praxis-Tipp Company Page + 2× Reels + 1× Story (Instagram wenn aktiv)',
      'Do: Kurs liefern oder vorbereiten + Seminar-Post danach',
      'Fr: Pillar 4/5 rotierend + Ads optimieren + Wochenreview',
      'Täglich: 15 Min Engagement — Max & Philipp kommentieren gegenseitig!',
    ],
    milestones: [
      { week: 9,  todos: [
        'Meta Ads live: KI-Führerschein, Zielgruppe Arbeitnehmer 25–50, Saarland',
        'Kein externer Link im Post — immer in den ersten Kommentar!',
      ]},
      { week: 10, todos: [
        'Ersten Branchenlösungs-Kunden pitchen (KI-Analyse 1.500 € als Einstieg)',
        'Lead-Magnet #3: "Ist mein Team KI-ready?" Checkliste → führt zu KI-Führerschein',
      ]},
      { week: 12, todos: [
        'Corporate-Buchungsmodell aktiv anbieten (mind. 2.200 € / 2.900 €)',
        'E-Mail-Liste reviewen: Wie viele Leads wurden zu Anfragen?',
      ]},
      { week: 14, todos: [
        'Google Ads live: "KI Schulung Unternehmen", "KI Beratung Saarland"',
      ]},
      { week: 16, todos: [
        'Erste Branchenlösung KI-Start abschließen (Ziel: 4.900 €)',
      ]},
      { week: 18, todos: [
        '2 Kurse/Monat als Standardrhythmus etabliert — Review: Läuft es?',
        'LinkedIn Company Follower prüfen: +50/Monat erreicht?',
      ]},
      { week: 20, todos: [
        'Testimonial-Video für Ads produzieren',
        'Q2-Check: ~49.000 € kumuliert? Engagement Rate >3 %?',
        'Lead-Magnet Downloads prüfen: 20/Monat erreicht?',
      ]},
    ],
  },
  {
    id: 3, shortName: 'Wachstum', weeks: [21, 36] as [number, number],
    target: 54000, color: '#10b981', adBudget: '2.000 €/Monat',
    routine: [
      'Mo: Ad-Review + KI-Praxis-Tipp posten + 10 LinkedIn-Kontakte + Pipeline-Check',
      'Di: BNI + Hot Take posten + 1 Kundengespräch',
      'Mi: Content-Batch (2× Posts, 1× Reel) + 1× monatlicher LinkedIn-Artikel',
      'Do: Kurs liefern oder Branchenlösung-Arbeit',
      'Fr: Angebote rausschicken (Tool nutzen!) + Wochenreview + Content-Planung',
      'Täglich: Kommentare + 5–10 Min in Zielgruppen-Posts kommentieren',
    ],
    milestones: [
      { week: 22, todos: [
        'Instagram aktivieren: nach 8 Wochen stabilem LinkedIn-Rhythmus',
        'Zweites Ad-Creative testen (Video vs. Bild)',
      ]},
      { week: 24, todos: [
        'Erste KI-Transformation abschließen (9.900 €+)',
      ]},
      { week: 26, todos: [
        'Halbjahresziel-Check: ~64.000 € kumuliert erreicht?',
        'LinkedIn Ads starten (Unternehmervortrag, 300 €/Mo)',
        'Quartals-Review Social Media: Top-3 Posts, Lead-Conversion, nächstes Quartal',
      ]},
      { week: 28, todos: [
        'LinkedIn Follower Personal: 500+ Ziel',
        'Monatlichen Newsletter starten (Mailchimp)',
      ]},
      { week: 30, todos: [
        '100k-Prognose validieren',
        'Ads-Budget ggf. erhöhen, Evergreen-Posts wiederholen',
      ]},
      { week: 32, todos: [
        'Partnertrainer evaluieren (falls Kapazität limitiert wird)',
      ]},
      { week: 36, todos: [
        '100.000 € Umsatzziel erreicht ★',
        'Makler-Tätigkeit auf 10–20 % reduzieren',
      ]},
    ],
  },
  {
    id: 4, shortName: 'Skalierung', weeks: [37, 52] as [number, number],
    target: 56500, color: '#f59e0b', adBudget: '2.500 €/Monat',
    routine: [
      'Mo: Ad-Review + Strategie-Check (Was funktioniert? Was recyceln?)',
      'Di: BNI + Bestandskundenpflege',
      'Mi: Content-Batch + monatlicher Strategie-Review',
      'Do: Kurs liefern oder Beratung',
      'Fr: Wochenreview + Pipeline + Autor-Rotation für nächste Woche planen',
      'Täglich: Engagement — Max & Philipp wechseln sich als "Autor der Woche" ab',
    ],
    milestones: [
      { week: 40, todos: [
        'Testimonial-Kampagne für Q4 starten',
        'Social Media KPIs prüfen: 10k Impressions/Mo, >3 % Engagement, 20 Downloads/Mo',
      ]},
      { week: 44, todos: [
        'Jahresangebote für Firmenkunden entwickeln (Retainer / Jahreslizenz)',
      ]},
      { week: 48, todos: [
        'Jahresplan 2027 erstellen',
        'Partnertrainer-Entscheidung finalisieren',
      ]},
      { week: 52, todos: [
        'Jahresabschluss & KPI-Review',
        'Luminaire Vollzeit — Makler-Status offiziell prüfen',
      ]},
    ],
  },
]
