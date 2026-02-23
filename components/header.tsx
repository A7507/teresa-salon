'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#booking', label: 'Book Now' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.08_0_0)]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/images/logo.png" 
              alt="Teresa Salon Logo" 
              width={48} 
              height={48}
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[oklch(0.85_0_0)] hover:text-[oklch(0.78_0.12_85)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admin">
              <Button 
                variant="outline" 
                size="sm"
                className="border-[oklch(0.78_0.12_85)] text-[oklch(0.78_0.12_85)] hover:bg-[oklch(0.78_0.12_85)] hover:text-[oklch(0.08_0_0)] bg-transparent"
              >
                Admin
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[oklch(0.85_0_0)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[oklch(0.25_0_0)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[oklch(0.85_0_0)] hover:text-[oklch(0.78_0.12_85)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-fit border-[oklch(0.78_0.12_85)] text-[oklch(0.78_0.12_85)] hover:bg-[oklch(0.78_0.12_85)] hover:text-[oklch(0.08_0_0)] bg-transparent"
                >
                  Admin
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
