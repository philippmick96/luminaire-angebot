import { Document, Page, Text, View, Font } from '@react-pdf/renderer'
import type { QuoteData } from '../types'
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

const DARK = {
  bg:          '#0a0a14',
  card:        '#120b1e',
  purple:      '#7c3aed',
  purpleLight: '#a78bfa',
  purpleDim:   '#130d22',
  white:       '#ffffff',
  body:        '#f1f5f9',
  muted:       '#94a3b8',
  light:       '#64748b',
  border:      '#3b1f7a',
  borderMid:   '#6d28d9',
  rowAlt:      '#0e0918',
}

const LIGHT = {
  bg:          '#ffffff',
  card:        '#f3f4f8',
  purple:      '#7c3aed',
  purpleLight: '#6d28d9',
  purpleDim:   '#f3f0ff',
  white:       '#111827',
  body:        '#374151',
  muted:       '#6b7280',
  light:       '#9ca3af',
  border:      '#e5e7eb',
  borderMid:   '#d1d5db',
  rowAlt:      '#f9fafb',
}

const P = 'Poppins'

function makeStyles(C: typeof DARK) {
  return {
    page: {
      fontFamily: P, fontWeight: 400 as const,
      fontSize: 9, color: C.body,
      backgroundColor: C.bg, paddingBottom: 65,
    },
    header: {
      backgroundColor: C.card,
      paddingHorizontal: 40, paddingTop: 26, paddingBottom: 22,
      flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'flex-start' as const,
      borderBottomWidth: 2, borderBottomColor: C.purple, borderStyle: 'solid' as const,
    },
    logoArea: {},
    logoWordmark: { flexDirection: 'row' as const, alignItems: 'baseline' as const },
    logoWhite:  { color: C.white,       fontFamily: P, fontWeight: 700 as const, fontSize: 22, letterSpacing: 0.5 },
    logoPurple: { color: C.purpleLight, fontFamily: P, fontWeight: 700 as const, fontSize: 22, letterSpacing: 0.5 },
    logoSub:    { color: C.muted,  fontFamily: P, fontWeight: 400 as const, fontSize: 7.5, letterSpacing: 2.5, marginTop: 2, marginBottom: 10 },
    logoTagline:{ color: C.light, fontFamily: P, fontWeight: 400 as const, fontSize: 7 },
    headerRight: { alignItems: 'flex-end' as const },
    docTitle:   { color: C.white, fontFamily: P, fontWeight: 700 as const, fontSize: 28, letterSpacing: 5, marginBottom: 10 },
    docMetaRow: { flexDirection: 'row' as const, justifyContent: 'flex-end' as const, marginBottom: 4 },
    docMetaLabel:{ color: C.light,       fontFamily: P, fontWeight: 400 as const, fontSize: 7.5, width: 68, textAlign: 'right' as const, marginRight: 8 },
    docMetaValue:{ color: C.purpleLight, fontFamily: P, fontWeight: 600 as const, fontSize: 7.5, minWidth: 95, textAlign: 'right' as const },

    accentBar: { height: 3, backgroundColor: C.purple },

    body: { paddingHorizontal: 40, paddingTop: 26 },

    addressRow:   { flexDirection: 'row' as const, marginBottom: 24 },
    addressBox:   { flex: 1, paddingRight: 20 },
    addressBoxRight: {
      flex: 1, paddingLeft: 20,
      borderLeftWidth: 1, borderLeftColor: C.border, borderStyle: 'solid' as const,
    },
    addressLabel: {
      fontSize: 7, fontFamily: P, fontWeight: 600 as const,
      color: C.purple, letterSpacing: 2, marginBottom: 8, paddingBottom: 5,
      borderBottomWidth: 1, borderBottomColor: C.border, borderStyle: 'solid' as const,
    },
    addressName:    { fontFamily: P, fontWeight: 700 as const, fontSize: 10, marginBottom: 3, color: C.white },
    addressCompany: { fontFamily: P, fontWeight: 600 as const, fontSize: 9,  marginBottom: 2, color: C.body },
    addressLine:    { fontFamily: P, fontWeight: 400 as const, fontSize: 9,  color: C.muted, marginBottom: 2 },
    addressContact: { fontFamily: P, fontWeight: 400 as const, fontSize: 8,  color: C.muted, marginTop: 1 },

    divider: { borderTopWidth: 1, borderTopColor: C.border, borderStyle: 'solid' as const, marginBottom: 18 },

    sectionRow:  { flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: 10 },
    sectionBar:  { width: 3, height: 14, backgroundColor: C.purple, borderRadius: 2, marginRight: 8 },
    sectionTitle:{ fontFamily: P, fontWeight: 700 as const, fontSize: 10.5, color: C.white, letterSpacing: 1.5 },

    tableHeader: {
      flexDirection: 'row' as const, backgroundColor: C.purpleDim,
      paddingVertical: 7, paddingHorizontal: 10, borderRadius: 4,
      borderWidth: 1, borderColor: C.border, borderStyle: 'solid' as const, marginBottom: 1,
    },
    th: { color: C.purpleLight, fontFamily: P, fontWeight: 600 as const, fontSize: 7.5, letterSpacing: 0.8 },
    tableRow: {
      flexDirection: 'row' as const, paddingVertical: 9, paddingHorizontal: 10,
      borderBottomWidth: 1, borderBottomColor: C.border, borderStyle: 'solid' as const,
    },
    tableRowAlt: { backgroundColor: C.rowAlt },
    td:    { fontFamily: P, fontWeight: 400 as const, fontSize: 9, color: C.body },
    tdBold:{ fontFamily: P, fontWeight: 600 as const, fontSize: 9, color: C.white },
    tdSub: { fontFamily: P, fontWeight: 400 as const, fontSize: 7.5, color: C.muted, marginTop: 3, lineHeight: 1.4 },

    colPos:  { width: 22 },
    colDesc: { flex: 1 },
    colQty:  { width: 38, textAlign: 'right' as const },
    colUnit: { width: 55, textAlign: 'right' as const },
    colEP:   { width: 65, textAlign: 'right' as const },
    colGP:   { width: 70, textAlign: 'right' as const },

    totalsWrapper: { flexDirection: 'row' as const, justifyContent: 'flex-end' as const, marginTop: 16, marginBottom: 24 },
    totalsBox:     { width: 240 },
    totalsRow:     { flexDirection: 'row' as const, justifyContent: 'space-between' as const, paddingVertical: 3 },
    totalsLabel:   { fontFamily: P, fontWeight: 400 as const, fontSize: 9, color: C.muted },
    totalsVal:     { fontFamily: P, fontWeight: 600 as const, fontSize: 9, color: C.body },
    totalsDivider: { borderTopWidth: 1, borderTopColor: C.border, borderStyle: 'solid' as const, marginVertical: 5 },
    grandRow: {
      flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const,
      backgroundColor: C.purpleDim, borderWidth: 1, borderColor: C.purple, borderStyle: 'solid' as const,
      paddingVertical: 9, paddingHorizontal: 12, borderRadius: 6, marginTop: 4,
    },
    grandLabel: { fontFamily: P, fontWeight: 700 as const, fontSize: 10,  color: C.white,       letterSpacing: 0.5 },
    grandValue: { fontFamily: P, fontWeight: 700 as const, fontSize: 14,  color: C.purpleLight },

    notesBox: {
      backgroundColor: C.purpleDim, borderWidth: 1, borderColor: C.border,
      borderStyle: 'solid' as const, borderRadius: 6, padding: 14, marginBottom: 20,
    },
    notesLabel: { fontFamily: P, fontWeight: 600 as const, fontSize: 7, color: C.purple, letterSpacing: 1.5, marginBottom: 6 },
    notesText:  { fontFamily: P, fontWeight: 400 as const, fontSize: 8.5, color: C.muted, lineHeight: 1.6 },

    signatureRow: { flexDirection: 'row' as const, marginBottom: 20, gap: 30 },
    signatureBox: { flex: 1 },
    signatureLabel: { fontFamily: P, fontWeight: 400 as const, fontSize: 7, color: C.muted, marginBottom: 18 },
    signatureLine:  { borderTopWidth: 1, borderTopColor: C.border, borderStyle: 'solid' as const, marginBottom: 3 },
    signatureHint:  { fontFamily: P, fontWeight: 400 as const, fontSize: 7, color: C.light },

    bankBox: {
      backgroundColor: C.purpleDim, borderWidth: 1, borderColor: C.border,
      borderStyle: 'solid' as const, borderRadius: 6, padding: 14, marginBottom: 20,
    },
    bankLabel: { fontFamily: P, fontWeight: 600 as const, fontSize: 7, color: C.purple, letterSpacing: 1.5, marginBottom: 8 },
    bankRow:   { flexDirection: 'row' as const, gap: 20 },
    bankCol:   { flex: 1 },
    bankItem:  { fontFamily: P, fontWeight: 400 as const, fontSize: 8.5, color: C.body, marginBottom: 4 },
    bankKey:   { fontFamily: P, fontWeight: 600 as const, fontSize: 8.5, color: C.muted },
    bankVal:   { fontFamily: P, fontWeight: 400 as const, fontSize: 8.5, color: C.body },

    footerAccent: { position: 'absolute' as const, bottom: 44, left: 0, right: 0, height: 2, backgroundColor: C.purple },
    footer: {
      position: 'absolute' as const, bottom: 0, left: 0, right: 0,
      paddingHorizontal: 40, paddingVertical: 12,
      flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const,
      backgroundColor: C.card,
    },
    footerLogo:       { flexDirection: 'row' as const, alignItems: 'baseline' as const, marginBottom: 3 },
    footerLogoWhite:  { fontFamily: P, fontWeight: 700 as const, fontSize: 10, color: C.white,       letterSpacing: 0.5 },
    footerLogoPurple: { fontFamily: P, fontWeight: 700 as const, fontSize: 10, color: C.purpleLight, letterSpacing: 0.5 },
    footerContact:    { fontFamily: P, fontWeight: 400 as const, fontSize: 7, color: C.muted },
    footerRight:      { alignItems: 'flex-end' as const },
    footerAddress:    { fontFamily: P, fontWeight: 400 as const, fontSize: 7, color: C.light, marginBottom: 3 },
    footerPage:       { fontFamily: P, fontWeight: 600 as const, fontSize: 7, color: C.purpleLight },
  }
}

function fmtDate(dateStr: string): string {
  if (!dateStr) return '–'
  return new Date(dateStr).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
}

function fmtCurrency(n: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n)
}

export function LuminairePDF({ data, lightMode = false }: { data: QuoteData; lightMode?: boolean }) {
  const s = makeStyles(lightMode ? LIGHT : DARK)
  const net   = data.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
  const vat   = net * (data.vatRate / 100)
  const gross = net + vat
  const isInvoice = data.docType === 'rechnung'

  return (
    <Document title={`${isInvoice ? 'Rechnung' : 'Angebot'} ${data.quoteNumber}`} author="Luminaire">
      <Page size="A4" style={s.page}>

        {/* ── HEADER ─────────────────────────────────── */}
        <View style={s.header}>
          <View style={s.logoArea}>
            <View style={s.logoWordmark}>
              <Text style={s.logoWhite}>lumin</Text>
              <Text style={s.logoPurple}>AI</Text>
              <Text style={s.logoWhite}>re</Text>
            </View>
            <Text style={s.logoSub}>KI-SCHULUNGEN</Text>
            <Text style={s.logoTagline}>Das Teuerste an KI ist, sie nicht zu nutzen.</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.docTitle}>{isInvoice ? 'RECHNUNG' : 'ANGEBOT'}</Text>
            <View style={s.docMetaRow}>
              <Text style={s.docMetaLabel}>{isInvoice ? 'Rechnungsnr.' : 'Angebotsnr.'}</Text>
              <Text style={s.docMetaValue}>{data.quoteNumber}</Text>
            </View>
            <View style={s.docMetaRow}>
              <Text style={s.docMetaLabel}>Datum</Text>
              <Text style={s.docMetaValue}>{fmtDate(data.date)}</Text>
            </View>
            <View style={s.docMetaRow}>
              <Text style={s.docMetaLabel}>{isInvoice ? 'Fällig am' : 'Gültig bis'}</Text>
              <Text style={s.docMetaValue}>{fmtDate(data.validUntil)}</Text>
            </View>
          </View>
        </View>

        {/* ── ACCENT BAR ─────────────────────────────── */}
        <View style={s.accentBar} />

        {/* ── BODY ───────────────────────────────────── */}
        <View style={s.body}>

          <View style={s.addressRow}>
            <View style={s.addressBox}>
              <Text style={s.addressLabel}>VON</Text>
              <Text style={s.addressName}>Luminaire</Text>
              {isInvoice && (
                <Text style={s.addressCompany}>Philipp Mick (Einzelunternehmen)</Text>
              )}
              <Text style={s.addressLine}>Kaiserstraße 26a</Text>
              <Text style={s.addressLine}>66111 Saarbrücken</Text>
              <Text style={s.addressContact}>info@luminaire.training</Text>
              <Text style={s.addressContact}>+49 179 1327191</Text>
              <Text style={s.addressContact}>www.luminaire.training</Text>
              {isInvoice && (
                <Text style={[s.addressContact, { marginTop: 6 }]}>
                  Steuernummer: 040/249/04194
                </Text>
              )}
            </View>
            <View style={s.addressBoxRight}>
              <Text style={s.addressLabel}>AN</Text>
              {data.customer.company ? <Text style={s.addressCompany}>{data.customer.company}</Text> : null}
              <Text style={s.addressName}>{data.customer.salutation} {data.customer.name || 'Empfänger'}</Text>
              {data.customer.street ? <Text style={s.addressLine}>{data.customer.street}</Text> : null}
              {(data.customer.zip || data.customer.city) ? (
                <Text style={s.addressLine}>{data.customer.zip} {data.customer.city}</Text>
              ) : null}
              {data.customer.email ? <Text style={s.addressContact}>{data.customer.email}</Text> : null}
              {data.customer.phone ? <Text style={s.addressContact}>{data.customer.phone}</Text> : null}
            </View>
          </View>

          <View style={s.divider} />

          <View style={s.sectionRow}>
            <View style={s.sectionBar} />
            <Text style={s.sectionTitle}>LEISTUNGEN</Text>
          </View>

          <View style={s.tableHeader}>
            <Text style={[s.th, s.colPos]}>POS</Text>
            <Text style={[s.th, s.colDesc]}>BEZEICHNUNG</Text>
            <Text style={[s.th, s.colQty]}>MENGE</Text>
            <Text style={[s.th, s.colUnit]}>EINHEIT</Text>
            <Text style={[s.th, s.colEP]}>EINZELPR.</Text>
            <Text style={[s.th, s.colGP]}>GESAMT</Text>
          </View>

          {data.items.map((item, idx) => (
            <View key={item.id} style={[s.tableRow, idx % 2 === 1 ? s.tableRowAlt : {}]}>
              <Text style={[s.td, s.colPos]}>{idx + 1}</Text>
              <View style={s.colDesc}>
                <Text style={s.tdBold}>{item.description}</Text>
                {item.details ? <Text style={s.tdSub}>{item.details}</Text> : null}
              </View>
              <Text style={[s.td, s.colQty]}>{item.quantity}</Text>
              <Text style={[s.td, s.colUnit]}>{item.unit}</Text>
              <Text style={[s.td, s.colEP]}>{fmtCurrency(item.unitPrice)}</Text>
              <Text style={[s.td, s.colGP]}>{fmtCurrency(item.quantity * item.unitPrice)}</Text>
            </View>
          ))}

          <View style={s.totalsWrapper}>
            <View style={s.totalsBox}>
              <View style={s.totalsRow}>
                <Text style={s.totalsLabel}>Nettobetrag</Text>
                <Text style={s.totalsVal}>{fmtCurrency(net)}</Text>
              </View>
              <View style={s.totalsRow}>
                <Text style={s.totalsLabel}>MwSt. {data.vatRate} %</Text>
                <Text style={s.totalsVal}>{fmtCurrency(vat)}</Text>
              </View>
              <View style={s.totalsDivider} />
              <View style={s.grandRow}>
                <Text style={s.grandLabel}>GESAMTBETRAG</Text>
                <Text style={s.grandValue}>{fmtCurrency(gross)}</Text>
              </View>
            </View>
          </View>

          {data.notes ? (
            <View style={s.notesBox}>
              <Text style={s.notesLabel}>HINWEISE &amp; ZAHLUNGSBEDINGUNGEN</Text>
              <Text style={s.notesText}>{data.notes}</Text>
            </View>
          ) : null}

          {isInvoice ? (
            <View style={s.bankBox}>
              <Text style={s.bankLabel}>BANKVERBINDUNG</Text>
              <View style={s.bankRow}>
                <View style={s.bankCol}>
                  <Text style={s.bankItem}>
                    <Text style={s.bankKey}>Kontoinhaber: </Text>
                    <Text style={s.bankVal}>{data.bankDetails?.accountHolder || 'Luminaire'}</Text>
                  </Text>
                  <Text style={s.bankItem}>
                    <Text style={s.bankKey}>IBAN: </Text>
                    <Text style={s.bankVal}>{data.bankDetails?.iban || '–'}</Text>
                  </Text>
                </View>
                <View style={s.bankCol}>
                  <Text style={s.bankItem}>
                    <Text style={s.bankKey}>BIC: </Text>
                    <Text style={s.bankVal}>{data.bankDetails?.bic || '–'}</Text>
                  </Text>
                  <Text style={s.bankItem}>
                    <Text style={s.bankKey}>Bank: </Text>
                    <Text style={s.bankVal}>{data.bankDetails?.bank || '–'}</Text>
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={s.signatureRow}>
              <View style={s.signatureBox}>
                <Text style={s.signatureLabel}>Datum &amp; Ort</Text>
                <View style={s.signatureLine} />
                <Text style={s.signatureHint}>Datum, Ort</Text>
              </View>
              <View style={s.signatureBox}>
                <Text style={s.signatureLabel}>Auftragsbestätigung (Unterschrift &amp; Stempel)</Text>
                <View style={s.signatureLine} />
                <Text style={s.signatureHint}>Unterschrift, Firmenstempel</Text>
              </View>
            </View>
          )}

        </View>

        {/* ── FOOTER ─────────────────────────────────── */}
        <View style={s.footerAccent} fixed />
        <View style={s.footer} fixed>
          <View>
            <View style={s.footerLogo}>
              <Text style={s.footerLogoWhite}>lumin</Text>
              <Text style={s.footerLogoPurple}>AI</Text>
              <Text style={s.footerLogoWhite}>re</Text>
            </View>
            <Text style={s.footerContact}>
              info@luminaire.training  ·  +49 179 1327191  ·  www.luminaire.training
            </Text>
          </View>
          <View style={s.footerRight}>
            <Text style={s.footerAddress}>Saarbrücken, Saarland, Deutschland</Text>
            <Text
              style={s.footerPage}
              render={({ pageNumber, totalPages }) => `Seite ${pageNumber} von ${totalPages}`}
            />
          </View>
        </View>

      </Page>
    </Document>
  )
}
