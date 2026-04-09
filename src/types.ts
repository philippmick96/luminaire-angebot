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

export interface QuoteData {
  quoteNumber: string
  date: string
  validUntil: string
  customer: Customer
  items: LineItem[]
  notes: string
  vatRate: number
}

export type CardTheme = 'sweep' | 'pearl' | 'frost'

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
