'use client'

import React from "react"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  ImageIcon, 
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/services', label: 'Services', icon: Scissors },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    function checkAuth() {
      const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true'
      
      if (!isLoggedIn) {
        router.push('/auth/login')
      } else {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem('admin_logged_in')
    localStorage.removeItem('admin_email')
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[oklch(0.08_0_0)] flex items-center justify-center">
        <div className="text-[oklch(0.78_0.12_85)]">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[oklch(0.06_0_0)]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[oklch(0.08_0_0)] border-b border-[oklch(0.15_0_0)] px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-serif text-[oklch(1_0_0)]">Teresa</span>
            <span className="text-xs font-light tracking-widest text-[oklch(0.78_0.12_85)] uppercase">Admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-[oklch(0.7_0_0)]"
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-[oklch(0.08_0_0)] border-r border-[oklch(0.15_0_0)]
        transition-transform duration-300
        lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-2 px-6 py-6 border-b border-[oklch(0.15_0_0)]">
            <span className="text-xl font-serif text-[oklch(1_0_0)]">Teresa</span>
            <span className="text-xs font-light tracking-widest text-[oklch(0.78_0.12_85)] uppercase">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 mt-14 lg:mt-0 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)]' 
                      : 'text-[oklch(0.7_0_0)] hover:bg-[oklch(0.12_0_0)] hover:text-[oklch(1_0_0)]'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-[oklch(0.15_0_0)]">
            <Link
              href="/"
              className="block text-sm text-[oklch(0.5_0_0)] hover:text-[oklch(0.78_0.12_85)] mb-4 px-4 transition-colors"
            >
              View Website
            </Link>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start text-[oklch(0.7_0_0)] hover:text-[oklch(1_0_0)] hover:bg-[oklch(0.12_0_0)]"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-[oklch(0_0_0)]/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
