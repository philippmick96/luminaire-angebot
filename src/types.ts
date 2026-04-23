export interface Customer {
  salutation: string
  name: string
  company: string
  street: string
  zip: string
  city: string
  email: string
  phone: string
}

export interface LineItem {
  id: string
  description: string
  details: string
  quantity: number
  unit: string
  unitPrice: number
}

export interface BankDetails {
  accountHolder: string
  iban: string
  bic: string
  bank: string
}

export interface QuoteData {
  docType: 'angebot' | 'rechnung'
  quoteNumber: string
  date: string
  validUntil: string
  customer: Customer
  items: LineItem[]
  notes: string
  vatRate: number
  bankDetails: BankDetails
}

export type CardTheme = 'sweep' | 'pearl' | 'frost' | 'aurora'

export interface CardData {
  name: string
  title: string
  email: string
  phone: string
  website: string
  address: string
  tagline: string
  theme: CardTheme
  nameFontSize: number
  infoFontSize: number
}
