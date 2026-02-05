import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[oklch(0.08_0_0)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.78_0.12_85)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.78_0.12_85)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[oklch(0.78_0.12_85)]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[oklch(0.78_0.12_85)]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Tagline */}
        <p className="text-sm tracking-[0.3em] uppercase text-[oklch(0.78_0.12_85)] mb-6">
          Professional Hair Artistry
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[oklch(1_0_0)] leading-tight mb-6">
          <span className="block text-balance">Professional Braids</span>
          <span className="block text-[oklch(0.78_0.12_85)]">&</span>
          <span className="block text-balance">Protective Hairstyles</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-[oklch(0.7_0_0)] max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          Experience the art of braiding with Teresa Salon. We specialize in creating 
          beautiful, long-lasting protective styles that celebrate your natural beauty.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#booking">
            <Button 
              size="lg"
              className="bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)] px-10 py-6 text-base font-medium"
            >
              Book an Appointment
            </Button>
          </Link>
          <Link href="#gallery">
            <Button 
              variant="outline"
              size="lg"
              className="border-[oklch(0.4_0_0)] text-[oklch(0.85_0_0)] hover:bg-[oklch(0.15_0_0)] px-10 py-6 text-base font-medium bg-transparent"
            >
              View Our Work
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex items-center justify-center gap-8 text-[oklch(0.5_0_0)] text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.12_85)]" />
            <span>Expert Stylists</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.12_85)]" />
            <span>Quality Products</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.12_85)]" />
            <span>Lasting Results</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-[oklch(0.4_0_0)] flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-[oklch(0.78_0.12_85)] animate-bounce" />
        </div>
      </div>
    </section>
  )
}
