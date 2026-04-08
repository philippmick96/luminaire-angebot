import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import type { CardData } from '../types'
import PoppinsRegular from '../fonts/Poppins-Regular.ttf'
import PoppinsSemiBold from '../fonts/Poppins-SemiBold.ttf'
import PoppinsBold from '../fonts/Poppins-Bold.ttf'

Font.register({
  family: 'Poppins',
  fonts: [
    { src: PoppinsRegular,  fontWeight: 400 },
    { src: PoppinsSemiBold, fontWeight: 600 },
    { src: PoppinsBold,     fontWeight: 700 },
  ],
})

// European business card: 85 × 55 mm at 72 dpi = ~241 × 156 pt
const W = 241.89
const H = 155.91

const C = {
  bg:          '#0a0a14',
  card:        '#120b1e',
  purple:      '#7c3aed',
  purpleLight: '#a78bfa',
  purpleDim:   '#1a1035',
  white:       '#ffffff',
  muted:       '#94a3b8',
  light:       '#64748b',
  border:      '#3b1f7a',
}

const P = 'Poppins'

const s = StyleSheet.create({
  page: {
    width: W,
    height: H,
    fontFamily: P,
    backgroundColor: C.bg,
  },

  // ── FRONT ────────────────────────────────────────────────
  front: {
    width: W,
    height: H,
    backgroundColor: C.bg,
    padding: 18,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  // top accent bar
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: C.purple,
  },

  // logo wordmark
  logoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
  },
  logoWhite: {
    fontFamily: P,
    fontWeight: 700,
    fontSize: 14,
    color: C.white,
    letterSpacing: 0.3,
  },
  logoPurple: {
    fontFamily: P,
    fontWeight: 700,
    fontSize: 14,
    color: C.purpleLight,
    letterSpacing: 0.3,
  },

  // contact block bottom-left
  contactBlock: {},
  personName: {
    fontFamily: P,
    fontWeight: 700,
    fontSize: 9.5,
    color: C.white,
    marginBottom: 1.5,
  },
  personTitle: {
    fontFamily: P,
    fontWeight: 400,
    fontSize: 7,
    color: C.purpleLight,
    marginBottom: 6,
  },
  contactLine: {
    fontFamily: P,
    fontWeight: 400,
    fontSize: 6.5,
    color: C.muted,
    marginBottom: 2,
  },

  // decorative circle
  circle: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: C.border,
    borderStyle: 'solid',
  },
  circleInner: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 1,
    borderColor: C.border,
    borderStyle: 'solid',
  },
  circleDot: {
    position: 'absolute',
    right: 28,
    top: 28,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.purple,
  },

  // bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: C.border,
  },

  // ── BACK ─────────────────────────────────────────────────
  back: {
    width: W,
    height: H,
    backgroundColor: C.purpleDim,
    padding: 18,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: C.purple,
  },
  backBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: C.purple,
  },

  backLogoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  backLogoWhite: {
    fontFamily: P,
    fontWeight: 700,
    fontSize: 20,
    color: C.white,
    letterSpacing: 0.5,
  },
  backLogoPurple: {
    fontFamily: P,
    fontWeight: 700,
    fontSize: 20,
    color: C.purpleLight,
    letterSpacing: 0.5,
  },

  dividerLine: {
    width: 30,
    height: 1.5,
    backgroundColor: C.purple,
    marginBottom: 10,
  },

  backTagline: {
    fontFamily: P,
    fontWeight: 400,
    fontSize: 7,
    color: C.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },

  backWebsite: {
    fontFamily: P,
    fontWeight: 600,
    fontSize: 7,
    color: C.purpleLight,
    letterSpacing: 0.5,
  },

  // decorative circles back
  backCircle1: {
    position: 'absolute',
    left: -25,
    bottom: -25,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.2)',
    borderStyle: 'solid',
  },
  backCircle2: {
    position: 'absolute',
    right: -15,
    top: -15,
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.2)',
    borderStyle: 'solid',
  },
})

export function BusinessCardPDF({ data }: { data: CardData }) {
  return (
    <Document title="Luminaire Visitenkarte" author="Luminaire">

      {/* ── FRONT ──────────────────────────────────────── */}
      <Page size={[W, H]} style={s.page}>
        <View style={s.front}>
          {/* accent bar */}
          <View style={s.topBar} />

          {/* decorative circles */}
          <View style={s.circle} />
          <View style={s.circleInner} />
          <View style={s.circleDot} />

          {/* logo */}
          <View style={s.logoRow}>
            <Text style={s.logoWhite}>lumin</Text>
            <Text style={s.logoPurple}>AI</Text>
            <Text style={s.logoWhite}>re</Text>
          </View>

          {/* contact */}
          <View style={s.contactBlock}>
            <Text style={s.personName}>{data.name || 'Name'}</Text>
            <Text style={s.personTitle}>{data.title || 'Titel'}</Text>
            {data.phone   ? <Text style={s.contactLine}>{data.phone}</Text>   : null}
            {data.email   ? <Text style={s.contactLine}>{data.email}</Text>   : null}
            {data.website ? <Text style={s.contactLine}>{data.website}</Text> : null}
          </View>

          <View style={s.bottomBar} />
        </View>
      </Page>

      {/* ── BACK ───────────────────────────────────────── */}
      <Page size={[W, H]} style={s.page}>
        <View style={s.back}>
          <View style={s.backTopBar} />
          <View style={s.backBottomBar} />
          <View style={s.backCircle1} />
          <View style={s.backCircle2} />

          <View style={s.backLogoRow}>
            <Text style={s.backLogoWhite}>lumin</Text>
            <Text style={s.backLogoPurple}>AI</Text>
            <Text style={s.backLogoWhite}>re</Text>
          </View>

          <View style={s.dividerLine} />

          <Text style={s.backTagline}>
            {data.tagline || 'Das Teuerste an KI ist, sie nicht zu nutzen.'}
          </Text>

          <Text style={s.backWebsite}>
            {data.website || 'www.luminaire.training'}
          </Text>
        </View>
      </Page>

    </Document>
  )
}
