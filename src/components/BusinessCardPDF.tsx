import {
  Document, Page, Text, View, StyleSheet,
  Svg, Defs, LinearGradient, Stop, Rect,
} from '@react-pdf/renderer'
import type { CardData } from '../types'

// 85 × 55 mm → 241.89 × 155.91 pt
const W = 241.89
const H = 155.91

// ── Sweep (dark) gradients ─────────────────────────────────────

function GradientSweepFront() {
  return (
    <Svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id="gf" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%"   stopColor="#4c1d95" stopOpacity="1" />
          <Stop offset="35%"  stopColor="#7c3aed" stopOpacity="1" />
          <Stop offset="65%"  stopColor="#1a0533" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0a0814" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="shadow" x1="0%" y1="100%" x2="60%" y2="30%">
          <Stop offset="0%"  stopColor="#000000" stopOpacity="0.35" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0"   />
        </LinearGradient>
      </Defs>
      <Rect width={W} height={H} fill="url(#gf)" />
      <Rect width={W} height={H} fill="url(#shadow)" />
    </Svg>
  )
}

function GradientSweepBack() {
  return (
    <Svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id="gb" x1="100%" y1="100%" x2="0%" y2="0%">
          <Stop offset="0%"   stopColor="#4c1d95" stopOpacity="1" />
          <Stop offset="35%"  stopColor="#7c3aed" stopOpacity="1" />
          <Stop offset="65%"  stopColor="#1a0533" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0a0814" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="shadowB" x1="100%" y1="0%" x2="40%" y2="70%">
          <Stop offset="0%"  stopColor="#000000" stopOpacity="0.28" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0"   />
        </LinearGradient>
      </Defs>
      <Rect width={W} height={H} fill="url(#gb)" />
      <Rect width={W} height={H} fill="url(#shadowB)" />
    </Svg>
  )
}

// ── Pearl (white) gradients ────────────────────────────────────

function GradientPearlFront() {
  return (
    <Svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id="gpa" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%"   stopColor="#7c3aed" stopOpacity="1" />
          <Stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="gpb" x1="100%" y1="100%" x2="60%" y2="40%">
          <Stop offset="0%"  stopColor="#a78bfa" stopOpacity="0.1" />
          <Stop offset="100%" stopColor="#a78bfa" stopOpacity="0"  />
        </LinearGradient>
      </Defs>
      {/* White background */}
      <Rect width={W} height={H} fill="#ffffff" />
      {/* Top accent bar */}
      <Rect x={0} y={0} width={W} height={4} fill="url(#gpa)" />
      {/* Subtle blush */}
      <Rect width={W} height={H} fill="url(#gpb)" />
    </Svg>
  )
}

function GradientPearlBack() {
  return (
    <Svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id="gpa2" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%"   stopColor="#7c3aed" stopOpacity="1" />
          <Stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="gpa3" x1="100%" y1="0%" x2="0%" y2="0%">
          <Stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
        </LinearGradient>
      </Defs>
      <Rect width={W} height={H} fill="#ffffff" />
      <Rect x={0} y={0} width={W} height={4} fill="url(#gpa2)" />
      <Rect x={0} y={H - 4} width={W} height={4} fill="url(#gpa3)" />
    </Svg>
  )
}

// ── Frost (lavender) gradients ─────────────────────────────────

function GradientFrostFront() {
  return (
    <Svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id="gfrost" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%"   stopColor="#f5f3ff" stopOpacity="1" />
          <Stop offset="50%"  stopColor="#ede9fe" stopOpacity="1" />
          <Stop offset="100%" stopColor="#ddd6fe" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="gfrostAccent" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%"   stopColor="#7c3aed" stopOpacity="0" />
          <Stop offset="50%"  stopColor="#7c3aed" stopOpacity="1" />
          <Stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect width={W} height={H} fill="url(#gfrost)" />
      {/* Left accent stripe */}
      <Rect x={0} y={0} width={2.5} height={H} fill="url(#gfrostAccent)" />
    </Svg>
  )
}

function GradientFrostBack() {
  return (
    <Svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id="gfrost2" x1="100%" y1="100%" x2="0%" y2="0%">
          <Stop offset="0%"   stopColor="#f5f3ff" stopOpacity="1" />
          <Stop offset="50%"  stopColor="#ede9fe" stopOpacity="1" />
          <Stop offset="100%" stopColor="#ddd6fe" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect width={W} height={H} fill="url(#gfrost2)" />
    </Svg>
  )
}

// ── Aurora (dark noir + vibrant gradient left panel) ──────────

const AURORA_PANEL_W = 97  // ~40 % of card width

function GradientAuroraFront() {
  return (
    <Svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id="gaF" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%"   stopColor="#ec4899" stopOpacity="1" />
          <Stop offset="48%"  stopColor="#a855f7" stopOpacity="1" />
          <Stop offset="100%" stopColor="#f97316" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={AURORA_PANEL_W} height={H} fill="url(#gaF)" />
    </Svg>
  )
}

function GradientAuroraBack() {
  return (
    <Svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        <LinearGradient id="gaB" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%"   stopColor="#ec4899" stopOpacity="1" />
          <Stop offset="50%"  stopColor="#a855f7" stopOpacity="1" />
          <Stop offset="100%" stopColor="#f97316" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={H - 2.5} width={W} height={2.5} fill="url(#gaB)" />
    </Svg>
  )
}

// ── Styles ─────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: { width: W, height: H, backgroundColor: '#ffffff' },
  pageDark: { width: W, height: H, backgroundColor: '#0a0814' },

  logoRow: { position: 'absolute', top: 12, left: 13, flexDirection: 'row', alignItems: 'flex-end' },

  // sweep
  logoText:   { fontFamily: 'Helvetica-Bold', fontSize: 9, color: 'rgba(255,255,255,0.6)'  },
  logoAccent: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: 'rgba(255,255,255,0.25)' },
  // pearl
  logoTextP:   { fontFamily: 'Helvetica-Bold', fontSize: 9, color: '#4c1d95' },
  logoAccentP: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: '#a78bfa' },
  // frost
  logoTextF:   { fontFamily: 'Helvetica-Bold', fontSize: 9, color: '#5b21b6' },
  logoAccentF: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: '#8b5cf6' },

  // name placeholder (fontSize overridden inline)
  name: { position: 'absolute', bottom: 28, left: 13, right: 13, fontFamily: 'Helvetica-Bold', letterSpacing: -0.5 },

  titleText: { position: 'absolute', bottom: 14, left: 13, fontFamily: 'Helvetica', fontSize: 7.5, letterSpacing: 0.8 },
  contactsBlock: { position: 'absolute', bottom: 13, right: 13, alignItems: 'flex-end' },
  contactLine: { fontFamily: 'Helvetica', fontSize: 7, marginBottom: 1.5 },

  backCenter: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  backLogoRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 11 },
  backLogoText:    { fontFamily: 'Helvetica-Bold', fontSize: 22, letterSpacing: -0.5 },
  tagline: { fontFamily: 'Helvetica-Oblique', fontSize: 7, textAlign: 'center', maxWidth: 160, lineHeight: 1.5 },
})

// ── Component ──────────────────────────────────────────────────

export function BusinessCardPDF({ data }: { data: CardData }) {
  const theme = data.theme ?? 'sweep'
  const namePt = (data.nameFontSize ?? 24) * 0.85
  const infoPt = (data.infoFontSize ?? 8) * 0.85

  const isDark   = theme === 'sweep'
  const isPearl  = theme === 'pearl'
  const isFrost  = theme === 'frost'
  const isAurora = theme === 'aurora'

  const nameColor   = isDark ? '#ffffff' : '#1e0a3c'
  const titleColor  = isDark ? 'rgba(255,255,255,0.5)' : (isFrost ? '#6d28d9' : '#7c3aed')
  const contactColor = isDark ? 'rgba(255,255,255,0.28)' : (isFrost ? 'rgba(109,40,217,0.7)' : '#9ca3af')

  const backNameColor   = isDark ? '#ffffff' : '#2e1065'
  const backAccentColor = isDark ? 'rgba(255,255,255,0.45)' : '#7c3aed'
  const taglineColor    = isDark ? 'rgba(255,255,255,0.32)' : (isFrost ? 'rgba(109,40,217,0.7)' : '#9ca3af')

  return (
    <Document title="Luminaire Visitenkarte" author="Luminaire">

      {/* ── FRONT ─────────────────────────────── */}
      <Page size={[W, H]} style={(isDark || isAurora) ? s.pageDark : s.page}>
        {isDark  && <GradientSweepFront />}
        {isPearl && <GradientPearlFront />}
        {isFrost && <GradientFrostFront />}
        {isAurora && <GradientAuroraFront />}

        {!isAurora && (
          <>
            <View style={s.logoRow}>
              <Text style={isDark ? s.logoText : (isFrost ? s.logoTextF : s.logoTextP)}>lumin</Text>
              <Text style={isDark ? s.logoAccent : (isFrost ? s.logoAccentF : s.logoAccentP)}>AI</Text>
              <Text style={isDark ? s.logoText : (isFrost ? s.logoTextF : s.logoTextP)}>re</Text>
            </View>
            <Text style={[s.name, { fontSize: namePt, color: nameColor }]}>
              {data.name || 'Ihr Name'}
            </Text>
            <Text style={[s.titleText, { color: titleColor, fontSize: infoPt + 0.5 }]}>
              {data.title || ''}
            </Text>
            <View style={s.contactsBlock}>
              {data.email   ? <Text style={[s.contactLine, { color: contactColor, fontSize: infoPt }]}>{data.email}</Text>   : null}
              {data.website ? <Text style={[s.contactLine, { color: contactColor, fontSize: infoPt }]}>{data.website}</Text> : null}
              {data.address ? <Text style={[s.contactLine, { color: contactColor, fontSize: infoPt }]}>{data.address}</Text> : null}
            </View>
          </>
        )}

        {isAurora && (
          <>
            {/* Logo – top right */}
            <View style={{ position: 'absolute', top: 12, right: 13, flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>lumin</Text>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 7, color: 'rgba(255,255,255,0.2)' }}>AI</Text>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>re</Text>
            </View>
            {/* Name centred in gradient panel */}
            <View style={{ position: 'absolute', left: 0, top: 0, width: AURORA_PANEL_W, bottom: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: namePt, color: '#ffffff', letterSpacing: 1.5, textAlign: 'center' }}>
                {data.name || 'Ihr Name'}
              </Text>
            </View>
            {/* Title + contacts in right dark panel */}
            <View style={{ position: 'absolute', left: AURORA_PANEL_W + 10, right: 12, top: 0, bottom: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
              {data.title ? <Text style={{ fontFamily: 'Helvetica', fontSize: infoPt + 0.5, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5, marginBottom: 8, textAlign: 'right' }}>{data.title}</Text> : null}
              {data.email   ? <Text style={{ fontFamily: 'Helvetica', fontSize: infoPt, color: 'rgba(255,255,255,0.28)', marginBottom: 2, textAlign: 'right' }}>{data.email}</Text>   : null}
              {data.website ? <Text style={{ fontFamily: 'Helvetica', fontSize: infoPt, color: 'rgba(255,255,255,0.28)', marginBottom: 2, textAlign: 'right' }}>{data.website}</Text> : null}
              {data.address ? <Text style={{ fontFamily: 'Helvetica', fontSize: infoPt, color: 'rgba(255,255,255,0.28)', textAlign: 'right' }}>{data.address}</Text>                 : null}
            </View>
          </>
        )}
      </Page>

      {/* ── BACK ──────────────────────────────── */}
      <Page size={[W, H]} style={(isDark || isAurora) ? s.pageDark : s.page}>
        {isDark  && <GradientSweepBack />}
        {isPearl && <GradientPearlBack />}
        {isFrost && <GradientFrostBack />}
        {isAurora && <GradientAuroraBack />}

        <View style={s.backCenter}>
          <View style={s.backLogoRow}>
            <Text style={[s.backLogoText, { color: isAurora ? '#ffffff' : backNameColor }]}>lumin</Text>
            <Text style={[s.backLogoText, { color: isAurora ? 'rgba(255,255,255,0.32)' : backAccentColor }]}>AI</Text>
            <Text style={[s.backLogoText, { color: isAurora ? '#ffffff' : backNameColor }]}>re</Text>
          </View>
          <Text style={[s.tagline, { color: isAurora ? 'rgba(255,255,255,0.32)' : taglineColor }]}>
            {data.tagline || 'Das Teuerste an KI ist, sie nicht zu nutzen.'}
          </Text>
        </View>
      </Page>

    </Document>
  )
}
