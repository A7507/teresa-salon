'use client'

import React from "react"

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true'
    if (isLoggedIn) {
      router.push('/admin')
    }
  }, [router])

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam === 'unauthorized') {
      setError('You are not authorized to access the admin area')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Fixed admin credentials
    const ADMIN_EMAIL = 'admin@teresasalon.com'
    const ADMIN_PASSWORD = 'TeresaAdmin2024!'

    try {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Successful login
        localStorage.setItem('admin_logged_in', 'true')
        localStorage.setItem('admin_email', email)
        router.push('/admin')
      } else {
        setError('Incorrect email or password')
      }
    } catch (error: unknown) {
      setError('An error occurred while logging in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[oklch(0.08_0_0)] p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-serif tracking-wide text-[oklch(1_0_0)]">
              Teresa
            </span>
            <span className="text-sm font-light tracking-widest text-[oklch(0.78_0.12_85)] uppercase">
              Salon
            </span>
          </Link>
        </div>

        <Card className="border-[oklch(0.25_0_0)] bg-[oklch(0.12_0_0)]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[oklch(1_0_0)]">Admin Login</CardTitle>
            <CardDescription className="text-[oklch(0.6_0_0)]">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[oklch(0.85_0_0)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[oklch(0.08_0_0)] border-[oklch(0.25_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.4_0_0)]"
                    autoComplete="off"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-[oklch(0.85_0_0)]">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[oklch(0.08_0_0)] border-[oklch(0.25_0_0)] text-[oklch(1_0_0)]"
                    autoComplete="off"
                  />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button 
                  type="submit" 
                  className="w-full bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="text-sm text-[oklch(0.6_0_0)] hover:text-[oklch(0.78_0.12_85)] transition-colors"
                >
                  Back to website
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
