import type { CSSProperties } from 'react'

interface Props {
  onNavigate: (view: 'angebot') => void
}

const C = {
  bg:       '#0d1117',
  surface:  'rgba(22,27,34,0.8)',
  border:   'rgba(48,54,61,0.9)',
  text:     '#e6edf3',
  muted:    '#8b949e',
  dim:      '#484f58',
  purple:   '#7c3aed',
  purpleMid:'#a78bfa',
  purpleDim:'rgba(124,58,237,0.15)',
}

const T: Record<string, CSSProperties> = {
  h1: { fontSize: 'clamp(30px,6vw,72px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: C.text },
  h2: { fontSize: 'clamp(22px,4vw,48px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: C.text },
  h3: { fontSize: 18, fontWeight: 600, color: C.text },
  body: { fontSize: 16, lineHeight: 1.6, color: C.muted },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: C.purpleMid },
}

function Glow({ style }: { style: CSSProperties }) {
  return (
    <div style={{
      position: 'absolute', borderRadius: '50%',
      pointerEvents: 'none', zIndex: 0,
      filter: 'blur(80px)', opacity: 0.5,
      ...style,
    }} />
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(22,27,34,0.6)',
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      backdropFilter: 'blur(12px)',
      ...style,
    }}>
      {children}
    </div>
  )
}

function OfferMockup() {
  return (
    <div style={{
      background: '#161b22',
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: '20px 24px',
      fontFamily: 'monospace',
      fontSize: 12,
      color: C.muted,
      lineHeight: 1.7,
      width: '100%',
      maxWidth: 480,
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <div style={{ marginLeft: 8, color: C.dim, fontSize: 11 }}>Rechnung_LUM-RE-2026-409.pdf</div>
      </div>
      {[
        { label: 'luminAIre',       color: C.purpleMid, bold: true, size: 15 },
        { label: 'RECHNUNG',        color: C.text,      bold: true, size: 13 },
        { label: '───────────────', color: C.dim },
        { label: 'Rechnungsnr.',    color: C.muted,     val: 'LUM-RE-2026-409' },
        { label: 'Datum',           color: C.muted,     val: '23.04.2026' },
        { label: 'Fällig am',       color: C.muted,     val: '07.05.2026' },
        { label: '───────────────', color: C.dim },
        { label: 'KI-Führerschein', color: C.text,      val: '149,00 €', bold: true },
        { label: 'KI Einstieg',     color: C.text,      val: '149,00 €', bold: true },
        { label: '───────────────', color: C.dim },
        { label: 'Netto',           color: C.muted,     val: '298,00 €' },
        { label: 'MwSt. 19%',       color: C.muted,     val: '56,62 €' },
        { label: 'GESAMT',          color: C.purpleMid, val: '354,62 €', bold: true },
      ].map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: row.size ?? 12, fontWeight: row.bold ? 700 : 400, color: row.color, marginBottom: 2 }}>
          <span>{row.label}</span>
          {row.val && <span style={{ color: row.bold ? C.purpleMid : C.muted }}>{row.val}</span>}
        </div>
      ))}
    </div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: C.purpleDim, border: `1px solid rgba(124,58,237,0.3)`,
      borderRadius: 20, padding: '4px 12px',
      fontSize: 12, fontWeight: 500, color: C.purpleMid,
      marginRight: 8, marginBottom: 8,
    }}>
      {label}
    </span>
  )
}

export default function Landing({ onNavigate }: Props) {
  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'Poppins, sans-serif', color: C.text, overflowX: 'hidden' }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${C.border}`,
        padding: '0 20px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 18, fontWeight: 700, letterSpacing: 0.3 }}>
            <span style={{ color: C.text }}>lumin</span>
            <span style={{ color: C.purpleMid }}>AI</span>
            <span style={{ color: C.text }}>re</span>
          </div>
          <div className="landing-nav-links">
            <button onClick={() => onNavigate('angebot')} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: C.muted, fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
              padding: '6px 14px', borderRadius: 6, transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >
              Angebot & Rechnung
            </button>
            <a href="/seminar.html" style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: C.muted, fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
              padding: '6px 14px', borderRadius: 6, transition: 'color 0.15s',
              textDecoration: 'none', display: 'inline-block',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >
              Seminar
            </a>
            <a href="/seminar-trainer.html" style={{
              background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.25)',
              cursor: 'pointer', color: 'rgba(129,140,248,0.85)', fontSize: 12, fontWeight: 600,
              fontFamily: 'inherit', padding: '4px 12px', borderRadius: 6, transition: 'all 0.15s',
              textDecoration: 'none', display: 'inline-block', letterSpacing: '0.04em',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#a5b4fc'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.10)'; e.currentTarget.style.color = 'rgba(129,140,248,0.85)'; }}
            >
              Trainer
            </a>
          </div>
        </div>

        <button
          onClick={() => onNavigate('angebot')}
          style={{
            background: C.purple, color: '#fff', border: 'none',
            borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#6d28d9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = C.purple; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Jetzt starten
        </button>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: 'clamp(60px,8vw,100px) 20px 60px', textAlign: 'center', overflow: 'hidden' }}>
        <Glow style={{ width: 600, height: 400, background: 'radial-gradient(circle, #7c3aed, transparent)', top: -100, left: '50%', transform: 'translateX(-50%)' }} />
        <Glow style={{ width: 300, height: 300, background: 'radial-gradient(circle, #4c1d95, transparent)', top: 50, left: '15%' }} />
        <Glow style={{ width: 250, height: 250, background: 'radial-gradient(circle, #6d28d9, transparent)', top: 100, right: '12%' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 20, padding: '5px 14px', marginBottom: 28,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.purpleMid }} />
            <span style={{ fontSize: 13, color: C.purpleMid, fontWeight: 500 }}>KI-Training & Beratung · Saarbrücken</span>
          </div>

          <h1 style={{ ...T.h1, marginBottom: 24 }}>
            Angebote & Rechnungen<br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in Sekunden.
            </span>
          </h1>

          <p style={{ ...T.body, fontSize: 'clamp(15px,2vw,18px)' as any, maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Erstelle druckfertige Angebots- und Rechnungs-PDFs —
            direkt im Browser, ohne Software, mit Verlaufsspeicher.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('angebot')}
              style={{
                background: C.purple, color: '#fff', border: 'none',
                borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 0 30px rgba(124,58,237,0.45)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.45)' }}
            >
              → Jetzt starten
            </button>
          </div>
        </div>

        <div className="landing-hero-visuals" style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '72px auto 0', gap: 32, justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{ transform: 'rotate(-1.5deg)', filter: 'drop-shadow(0 32px 80px rgba(124,58,237,0.3))' }}>
            <OfferMockup />
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)', margin: '0 20px' }} />

      {/* ── FEATURE: ANGEBOT & RECHNUNG ─────────────────────── */}
      <section style={{ padding: 'clamp(48px,6vw,96px) 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="landing-feature-grid">
          <div>
            <p style={T.label}>Angebot & Rechnung</p>
            <h2 style={{ ...T.h2, marginTop: 12, marginBottom: 20 }}>
              Vom Kundengespräch<br />zum PDF — in Minuten.
            </h2>
            <p style={{ ...T.body, marginBottom: 28 }}>
              Wechsle per Knopfdruck zwischen Angebot und Rechnung. Das Dokument
              wird in Echtzeit als professionelles PDF gerendert — mit Luminaire-Branding,
              Bankverbindung und Steuernummer.
            </p>
            <div style={{ marginBottom: 32 }}>
              {['Angebot & Rechnung', 'Live-PDF-Vorschau', 'Produktkatalog', 'MwSt. automatisch', 'Verlaufsspeicher'].map(f => (
                <Chip key={f} label={f} />
              ))}
            </div>
            <button
              onClick={() => onNavigate('angebot')}
              style={{
                background: 'transparent', color: C.purpleMid,
                border: `1px solid rgba(124,58,237,0.4)`,
                borderRadius: 8, padding: '10px 22px', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.purpleDim; e.currentTarget.style.borderColor = C.purple }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)' }}
            >
              Öffnen →
            </button>
          </div>
          <Card style={{ padding: 28, overflow: 'hidden' }}>
            <OfferMockup />
          </Card>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(48,54,61,0.8), transparent)', margin: '0 20px' }} />

      {/* ── FEATURE: SEMINAR ────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px,6vw,96px) 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="landing-feature-grid">
          <div>
            <p style={T.label}>KI-Führerschein Seminar</p>
            <h2 style={{ ...T.h2, marginTop: 12, marginBottom: 20 }}>
              Vom Einsteiger zum<br />
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                KI-Profi in 3 Stunden.
              </span>
            </h2>
            <p style={{ ...T.body, marginBottom: 28 }}>
              Der vollständige Seminarplan für den KI-Führerschein — 9 Blöcke, praxisnah
              strukturiert. Präsentiere ihn direkt im Browser, Slide für Slide.
            </p>
            <div style={{ marginBottom: 32 }}>
              {['9 Blöcke', 'Prompt Engineering', 'Hands-on Übungen', 'EU-AI Act', 'Action-Plan'].map(f => (
                <Chip key={f} label={f} />
              ))}
            </div>
            <a
              href="/seminar.html"
              style={{
                display: 'inline-block',
                background: 'transparent', color: C.purpleMid,
                border: `1px solid rgba(124,58,237,0.4)`,
                borderRadius: 8, padding: '10px 22px', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.purpleDim; (e.currentTarget as HTMLElement).style.borderColor = C.purple }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.4)' }}
            >
              Präsentation öffnen →
            </a>
          </div>
          <Card style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { time: '14:00', label: 'Begrüßung & Icebreaker', min: '15 Min' },
              { time: '14:15', label: 'Wow-Demo', min: '20 Min' },
              { time: '14:35', label: 'Prompt Engineering', min: '30 Min' },
              { time: '15:05', label: 'Hands-on: App, Voice, Bilder', min: '20 Min' },
              { time: '15:25', label: 'Pause', min: '15 Min' },
              { time: '15:40', label: 'Use-Cases & Workshop', min: '35 Min' },
              { time: '16:15', label: 'Modelle, Tools & Agentic AI', min: '25 Min' },
              { time: '16:40', label: 'EU-AI Act & Rechtliches', min: '15 Min' },
              { time: '16:55', label: 'Action-Plan & Abschluss', min: '5 Min' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 8 ? `1px solid rgba(48,54,61,0.6)` : 'none' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.purpleMid, minWidth: 40, letterSpacing: 0.3 }}>{item.time}</span>
                <span style={{ fontSize: 13, color: C.text, flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: 11, color: C.dim }}>{item.min}</span>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="landing-stats-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,4vw,48px) 20px' }}>
          {[
            { num: '< 60s', desc: 'Vom Ausfüllen zum fertigen PDF' },
            { num: '2-in-1',   desc: 'Angebot & Rechnung in einem Tool' },
            { num: '100%', desc: 'Im Browser, keine Software nötig' },
          ].map(stat => (
            <div key={stat.num}>
              <div style={{ fontSize: 'clamp(28px,4vw,36px)', fontWeight: 700, color: C.text, marginBottom: 8, letterSpacing: -1 }}>{stat.num}</div>
              <div style={{ fontSize: 14, color: C.muted }}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,6vw,96px) 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Glow style={{ width: 500, height: 300, background: 'radial-gradient(circle, #4c1d95, transparent)', top: -50, left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ ...T.h2, marginBottom: 20 }}>Bereit loszulegen?</h2>
          <p style={{ ...T.body, marginBottom: 40, fontSize: 17 }}>
            Erstelle dein erstes professionelles Angebot oder deine Rechnung — kostenlos, sofort, ohne Anmeldung.
          </p>
          <button
            onClick={() => onNavigate('angebot')}
            style={{
              background: C.purple, color: '#fff', border: 'none',
              borderRadius: 8, padding: '14px 36px', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 0 30px rgba(124,58,237,0.5)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            → Jetzt starten
          </button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '28px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 15, fontWeight: 700 }}>
          <span style={{ color: C.text }}>lumin</span>
          <span style={{ color: C.purpleMid }}>AI</span>
          <span style={{ color: C.text }}>re</span>
        </div>
        <div style={{ fontSize: 13, color: C.dim }}>
          © 2026 luminAIre · KI-Training & Beratung · Saarbrücken
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <button onClick={() => onNavigate('angebot')} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: C.muted, fontSize: 13, fontFamily: 'inherit', transition: 'color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            Angebot & Rechnung
          </button>
          <a href="/seminar.html" style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: C.muted, fontSize: 13, fontFamily: 'inherit', transition: 'color 0.15s',
            textDecoration: 'none',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            Seminar
          </a>
        </div>
      </footer>
    </div>
  )
}
