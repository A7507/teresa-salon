'use client'

import React from "react"

import { createClient } from '@/lib/supabase/client'
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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/admin')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    setIsGoogleLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      setIsGoogleLoading(false)
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
            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full mb-6 bg-[oklch(1_0_0)] text-[oklch(0.2_0_0)] border-[oklch(0.8_0_0)] hover:bg-[oklch(0.95_0_0)]"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              <GoogleIcon />
              <span className="ml-2">{isGoogleLoading ? 'Redirecting...' : 'Continue with Google'}</span>
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[oklch(0.25_0_0)]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[oklch(0.12_0_0)] px-2 text-[oklch(0.5_0_0)]">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[oklch(0.85_0_0)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@teresasalon.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[oklch(0.08_0_0)] border-[oklch(0.25_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.4_0_0)]"
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
                  />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button 
                  type="submit" 
                  className="w-full bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In with Email'}
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
