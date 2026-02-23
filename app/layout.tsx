import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Teresa Salon | Professional Braids & Protective Hairstyles',
  description: 'Professional braiding salon specializing in knotless braids, box braids, cornrows, fulani braids, and twist braids. Book your appointment today!',
  keywords: [
    'braids', 'hair salon', 'protective hairstyles', 'knotless braids', 'box braids', 'cornrows',
    'salão de cabeleireiro', 'cabeleireiro', 'tranças', 'braids salon', 'hair braiding',
    'salão de beleza', 'cabeleireiro perto de mim', 'tranças afro', 'box braids near me',
    'Teresa Salon', 'salão Teresa', 'cabeleireiro especialista em tranças', 'protective styles',
    'afro braids', 'professional braiding', 'hair salon Ottawa', 'braiding services',
    'hair stylist', 'beauty salon', 'hair extensions', 'braid styles', 'natural hair',
    'protective hair', 'hair care', 'braiding shop', 'hair salon near me',
    'best braids', 'affordable braids', 'quality braids', 'expert braider',
    'Ottawa hair salon', 'Ontario braids', 'Canada hair salon', 'professional hairstylist'
  ],
  generator: 'v0.app',
  verification: {
    google: 'INACLribv12_50',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
