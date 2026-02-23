import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Gallery } from '@/components/gallery'
import { Booking } from '@/components/booking'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Booking />
      <Contact />
      <Footer />
    </main>
  )
}
