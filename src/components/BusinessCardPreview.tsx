import type { CSSProperties } from 'react'
import type { CardData } from '../types'

// 85×55 mm @ 3.5 px/mm → 297 × 192 px base
const W = 297
const H = 192

interface Props { data: CardData; scale?: number }

function Card({ scale: s = 1, style, children }: {
  scale?: number; style?: CSSProperties; children: React.ReactNode
}) {
  return (
    <div style={{
      width: W * s, height: H * s, borderRadius: 7 * s,
      position: 'relative', overflow: 'hidden',
      fontFamily: 'Poppins, sans-serif', flexShrink: 0,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── SWEEP (dark purple) ────────────────────────────────────────

export function BusinessCardFront({ data, scale: s = 1 }: Props) {
  const fs = data.nameFontSize ?? 24

  if (data.theme === 'pearl') return <PearlFront data={data} scale={s} />
  if (data.theme === 'frost') return <FrostFront data={data} scale={s} />
  if (data.theme === 'aurora') return <AuroraFront data={data} scale={s} />

  const ifs = data.infoFontSize ?? 8

  return (
    <Card scale={s} style={{
      background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 35%, #1a0533 65%, #0a0814 100%)',
      boxShadow: '0 8px 36px rgba(76,29,149,.5), 0 0 0 1px rgba(124,58,237,.3)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(0,0,0,0.3), transparent)' }} />

      {/* Logo – top left */}
      <div style={{ position: 'absolute', top: 16 * s, left: 16 * s, display: 'flex', alignItems: 'baseline', opacity: 0.65 }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>lumin</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>AI</span>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>re</span>
      </div>

      {/* Name */}
      <div style={{
        position: 'absolute', bottom: 30 * s, left: 16 * s, right: 16 * s,
        color: '#ffffff', fontWeight: 700,
        fontSize: fs * s, lineHeight: 1.0, letterSpacing: -0.8,
      }}>
        {data.name || 'Ihr Name'}
      </div>

      {/* Title + contacts */}
      <div style={{
        position: 'absolute', bottom: 14 * s, left: 16 * s, right: 16 * s,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: (ifs + 0.5) * s, fontWeight: 400, letterSpacing: 0.8, textTransform: 'uppercase' }}>
          {data.title || 'Position'}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: ifs * s, textAlign: 'right', lineHeight: 1.75 }}>
          {data.email   && <div>{data.email}</div>}
          {data.website && <div>{data.website}</div>}
          {data.address && <div>{data.address}</div>}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2 * s, background: 'rgba(255,255,255,0.08)' }} />
    </Card>
  )
}

export function BusinessCardBack({ data, scale: s = 1 }: Props) {
  if (data.theme === 'pearl') return <PearlBack data={data} scale={s} />
  if (data.theme === 'frost') return <FrostBack data={data} scale={s} />
  if (data.theme === 'aurora') return <AuroraBack data={data} scale={s} />

  return (
    <Card scale={s} style={{
      background: 'linear-gradient(315deg, #4c1d95 0%, #7c3aed 35%, #1a0533 65%, #0a0814 100%)',
      boxShadow: '0 8px 36px rgba(76,29,149,.5), 0 0 0 1px rgba(124,58,237,.3)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 80% 20%, rgba(0,0,0,0.25), transparent)' }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 11 * s }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>lumin</span>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>AI</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>re</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8 * s, fontStyle: 'italic', textAlign: 'center', maxWidth: 200 * s, lineHeight: 1.55 }}>
          {data.tagline || 'Das Teuerste an KI ist, sie nicht zu nutzen.'}
        </div>
      </div>
    </Card>
  )
}

// ── PEARL (white with purple accent) ─────────────────────────

function PearlFront({ data, scale: s = 1 }: Props) {
  const fs = data.nameFontSize ?? 24
  const ifs = data.infoFontSize ?? 8
  return (
    <Card scale={s} style={{
      background: '#ffffff',
      boxShadow: '0 8px 36px rgba(124,58,237,.18), 0 0 0 1px rgba(124,58,237,.15)',
    }}>
      {/* Purple accent bar at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4 * s,
        background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
      }} />

      {/* Subtle purple blush bottom-right */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 100 * s, height: 80 * s,
        background: 'radial-gradient(ellipse at 80% 100%, rgba(167,139,250,0.12), transparent)',
      }} />

      {/* Logo – top left */}
      <div style={{ position: 'absolute', top: 16 * s, left: 16 * s, display: 'flex', alignItems: 'baseline' }}>
        <span style={{ color: '#4c1d95', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>lumin</span>
        <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>AI</span>
        <span style={{ color: '#4c1d95', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>re</span>
      </div>

      {/* Name */}
      <div style={{
        position: 'absolute', bottom: 30 * s, left: 16 * s, right: 16 * s,
        color: '#1e0a3c', fontWeight: 700,
        fontSize: fs * s, lineHeight: 1.0, letterSpacing: -0.8,
      }}>
        {data.name || 'Ihr Name'}
      </div>

      {/* Title + contacts */}
      <div style={{
        position: 'absolute', bottom: 14 * s, left: 16 * s, right: 16 * s,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div style={{ color: '#7c3aed', fontSize: (ifs + 0.5) * s, fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase' }}>
          {data.title || 'Position'}
        </div>
        <div style={{ color: '#9ca3af', fontSize: ifs * s, textAlign: 'right', lineHeight: 1.75 }}>
          {data.email   && <div>{data.email}</div>}
          {data.website && <div>{data.website}</div>}
          {data.address && <div>{data.address}</div>}
        </div>
      </div>
    </Card>
  )
}

function PearlBack({ data, scale: s = 1 }: Props) {
  return (
    <Card scale={s} style={{
      background: '#ffffff',
      boxShadow: '0 8px 36px rgba(124,58,237,.18), 0 0 0 1px rgba(124,58,237,.15)',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4 * s,
        background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4 * s,
        background: 'linear-gradient(90deg, #a78bfa, #7c3aed)',
        opacity: 0.4,
      }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 11 * s }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ color: '#1e0a3c', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>lumin</span>
          <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>AI</span>
          <span style={{ color: '#1e0a3c', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>re</span>
        </div>
        <div style={{ color: '#9ca3af', fontSize: 8 * s, fontStyle: 'italic', textAlign: 'center', maxWidth: 200 * s, lineHeight: 1.55 }}>
          {data.tagline || 'Das Teuerste an KI ist, sie nicht zu nutzen.'}
        </div>
      </div>
    </Card>
  )
}

// ── FROST (soft lavender gradient) ───────────────────────────

function FrostFront({ data, scale: s = 1 }: Props) {
  const fs = data.nameFontSize ?? 24
  const ifs = data.infoFontSize ?? 8
  return (
    <Card scale={s} style={{
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)',
      boxShadow: '0 8px 36px rgba(124,58,237,.2), 0 0 0 1px rgba(167,139,250,.3)',
    }}>
      {/* Subtle glow top-right */}
      <div style={{
        position: 'absolute', top: -20 * s, right: -20 * s,
        width: 100 * s, height: 100 * s,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)',
      }} />

      {/* Logo – top left */}
      <div style={{ position: 'absolute', top: 16 * s, left: 16 * s, display: 'flex', alignItems: 'baseline' }}>
        <span style={{ color: '#5b21b6', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>lumin</span>
        <span style={{ color: '#8b5cf6', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>AI</span>
        <span style={{ color: '#5b21b6', fontWeight: 700, fontSize: 11 * s, letterSpacing: 0.3 }}>re</span>
      </div>

      {/* Thin purple border-left accent */}
      <div style={{
        position: 'absolute', left: 0, top: 25 * s, bottom: 25 * s, width: 2.5 * s,
        background: 'linear-gradient(to bottom, transparent, #7c3aed, transparent)',
        borderRadius: 2,
      }} />

      {/* Name */}
      <div style={{
        position: 'absolute', bottom: 30 * s, left: 16 * s, right: 16 * s,
        color: '#2e1065', fontWeight: 700,
        fontSize: fs * s, lineHeight: 1.0, letterSpacing: -0.8,
      }}>
        {data.name || 'Ihr Name'}
      </div>

      {/* Title + contacts */}
      <div style={{
        position: 'absolute', bottom: 14 * s, left: 16 * s, right: 16 * s,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div style={{ color: '#6d28d9', fontSize: (ifs + 0.5) * s, fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase' }}>
          {data.title || 'Position'}
        </div>
        <div style={{ color: '#7c3aed', fontSize: ifs * s, textAlign: 'right', lineHeight: 1.75, opacity: 0.7 }}>
          {data.email   && <div>{data.email}</div>}
          {data.website && <div>{data.website}</div>}
          {data.address && <div>{data.address}</div>}
        </div>
      </div>
    </Card>
  )
}

function FrostBack({ data, scale: s = 1 }: Props) {
  return (
    <Card scale={s} style={{
      background: 'linear-gradient(315deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)',
      boxShadow: '0 8px 36px rgba(124,58,237,.2), 0 0 0 1px rgba(167,139,250,.3)',
    }}>
      <div style={{
        position: 'absolute', bottom: -20 * s, left: -20 * s,
        width: 100 * s, height: 100 * s,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)',
      }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 11 * s }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ color: '#2e1065', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>lumin</span>
          <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>AI</span>
          <span style={{ color: '#2e1065', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>re</span>
        </div>
        <div style={{ color: '#6d28d9', fontSize: 8 * s, fontStyle: 'italic', textAlign: 'center', maxWidth: 200 * s, lineHeight: 1.55, opacity: 0.7 }}>
          {data.tagline || 'Das Teuerste an KI ist, sie nicht zu nutzen.'}
        </div>
      </div>
    </Card>
  )
}

// ── AURORA (dark noir + vibrant gradient panel) ───────────────

const AURORA_PANEL_RATIO = 0.40  // 40 % of card width

function AuroraFront({ data, scale: s = 1 }: Props) {
  const fs = data.nameFontSize ?? 24
  const ifs = data.infoFontSize ?? 8
  const panel = AURORA_PANEL_RATIO * W * s

  return (
    <Card scale={s} style={{
      background: '#0a0a0a',
      boxShadow: '0 8px 36px rgba(0,0,0,.75), 0 0 0 1px rgba(236,72,153,.18)',
    }}>
      {/* Left gradient panel */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: panel, bottom: 0,
        background: 'linear-gradient(160deg, #ec4899 0%, #a855f7 48%, #f97316 100%)',
      }} />

      {/* Subtle separator */}
      <div style={{
        position: 'absolute', left: panel, top: 20 * s, bottom: 20 * s, width: 1,
        background: 'rgba(255,255,255,0.06)',
      }} />

      {/* Name centred in gradient panel */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: panel, bottom: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: `0 ${10 * s}px`,
      }}>
        <div style={{
          color: '#ffffff', fontWeight: 700, fontSize: fs * s,
          letterSpacing: 2 * s, textAlign: 'center', lineHeight: 1.1,
          textTransform: 'uppercase',
        }}>
          {data.name || 'Ihr Name'}
        </div>
      </div>

      {/* Logo – top right */}
      <div style={{
        position: 'absolute', top: 14 * s, right: 14 * s,
        display: 'flex', alignItems: 'baseline', opacity: 0.45,
      }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 9 * s }}>lumin</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: 9 * s }}>AI</span>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 9 * s }}>re</span>
      </div>

      {/* Title + contacts – right panel, centred vertically */}
      <div style={{
        position: 'absolute', left: panel + 12 * s, right: 14 * s, top: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end',
      }}>
        {data.title && (
          <div style={{
            color: 'rgba(255,255,255,0.55)', fontSize: (ifs + 0.5) * s,
            fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase',
            textAlign: 'right', marginBottom: 10 * s,
          }}>
            {data.title}
          </div>
        )}
        <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: ifs * s, textAlign: 'right', lineHeight: 1.75 }}>
          {data.email   && <div>{data.email}</div>}
          {data.website && <div>{data.website}</div>}
          {data.address && <div>{data.address}</div>}
        </div>
      </div>
    </Card>
  )
}

function AuroraBack({ data, scale: s = 1 }: Props) {
  return (
    <Card scale={s} style={{
      background: '#0a0a0a',
      boxShadow: '0 8px 36px rgba(0,0,0,.75), 0 0 0 1px rgba(236,72,153,.18)',
    }}>
      {/* Thin gradient accent line at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2.5 * s,
        background: 'linear-gradient(90deg, #ec4899, #a855f7, #f97316)',
      }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 11 * s }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>lumin</span>
          <span style={{ color: 'rgba(255,255,255,0.32)', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>AI</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 26 * s, letterSpacing: -0.5 }}>re</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 8 * s, fontStyle: 'italic', textAlign: 'center', maxWidth: 200 * s, lineHeight: 1.55 }}>
          {data.tagline || 'Das Teuerste an KI ist, sie nicht zu nutzen.'}
        </div>
      </div>
    </Card>
  )
}
