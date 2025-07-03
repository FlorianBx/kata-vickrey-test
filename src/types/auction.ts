export interface Auction {
  product: Product
  bidders: Bidder[]
}

export interface Product {
  id: number
  name: string
  description: string
  image: string
  imageAlt: string
  reservePrice: number
  state: 'In progress' | 'Closed'
}

export interface Bidder {
  name: string
  bids: number[]
}
