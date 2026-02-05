'use server'

import { stripe } from '@/lib/stripe'
import { BOOKING_FEE } from '@/lib/products'

export async function startCheckoutSession(productId: string, bookingDetails?: string) {
  if (productId !== 'booking-fee') {
    throw new Error('Invalid product')
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: BOOKING_FEE.name,
            description: BOOKING_FEE.description,
          },
          unit_amount: BOOKING_FEE.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      booking_details: bookingDetails || '',
    },
  })

  return session.client_secret
}
