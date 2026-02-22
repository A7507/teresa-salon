export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// Booking fee product for Stripe
export const BOOKING_FEE: Product = {
  id: 'booking-fee',
  name: 'Appointment Booking Fee',
  description: 'Non-refundable $20 USD booking fee to secure your appointment at Teresa Salon',
  priceInCents: 2000, // $20.00 USD
}
