import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[oklch(0.05_0_0)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image 
              src="/images/logo.png" 
              alt="Teresa Salon Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-wide text-[oklch(1_0_0)]">
                Teresa
              </span>
              <span className="text-[10px] font-light tracking-widest text-[oklch(0.78_0.12_85)] uppercase">
                Salon
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link href="#services" className="text-sm text-[oklch(0.6_0_0)] hover:text-[oklch(0.78_0.12_85)] transition-colors">
              Services
            </Link>
            <Link href="#gallery" className="text-sm text-[oklch(0.6_0_0)] hover:text-[oklch(0.78_0.12_85)] transition-colors">
              Gallery
            </Link>
            <Link href="#booking" className="text-sm text-[oklch(0.6_0_0)] hover:text-[oklch(0.78_0.12_85)] transition-colors">
              Book Now
            </Link>
            <Link href="#contact" className="text-sm text-[oklch(0.6_0_0)] hover:text-[oklch(0.78_0.12_85)] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[oklch(0.15_0_0)] flex items-center justify-center text-[oklch(0.6_0_0)] hover:bg-[oklch(0.78_0.12_85)] hover:text-[oklch(0.08_0_0)] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[oklch(0.15_0_0)] flex items-center justify-center text-[oklch(0.6_0_0)] hover:bg-[oklch(0.78_0.12_85)] hover:text-[oklch(0.08_0_0)] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-[oklch(0.2_0_0)]" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[oklch(0.4_0_0)]">
          <p>&copy; {new Date().getFullYear()} Teresa Salon. All rights reserved.</p>
          <p>Professional Braids & Protective Hairstyles</p>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[oklch(0.35_0_0)]">
            By: <span className="text-[oklch(0.78_0.12_85)]">Mr Nobody</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
