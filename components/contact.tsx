'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !message) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      alert('Message sent successfully! We will contact you soon.')
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-[oklch(0.08_0_0)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-[oklch(0.78_0.12_85)] mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[oklch(1_0_0)] mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-[oklch(0.6_0_0)] max-w-2xl mx-auto">
            Have questions? We would love to hear from you. Send us a message and we will 
            respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-[oklch(1_0_0)] mb-6">
                Teresa Salon
              </h3>
              <p className="text-[oklch(0.6_0_0)] mb-8 leading-relaxed">
                Experience the art of braiding with our expert stylists. We are dedicated 
                to creating beautiful, long-lasting styles that celebrate your unique beauty.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.78_0.12_85)]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[oklch(0.78_0.12_85)]" />
                </div>
                <div>
                  <h4 className="font-medium text-[oklch(1_0_0)] mb-1">Location</h4>
                  <p className="text-[oklch(0.6_0_0)]">
                    Ottawa, Ontario<br />
                    Canada
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.78_0.12_85)]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[oklch(0.78_0.12_85)]" />
                </div>
                <div>
                  <h4 className="font-medium text-[oklch(1_0_0)] mb-1">Phone</h4>
                  <p className="text-[oklch(0.6_0_0)]">
                    (613) 716-7324<br />
                    (613) 302-6166
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.78_0.12_85)]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[oklch(0.78_0.12_85)]" />
                </div>
                <div>
                  <h4 className="font-medium text-[oklch(1_0_0)] mb-1">Email</h4>
                  <p className="text-[oklch(0.6_0_0)]">
                    thethecamba@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.78_0.12_85)]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[oklch(0.78_0.12_85)]" />
                </div>
                <div>
                  <h4 className="font-medium text-[oklch(1_0_0)] mb-1">Hours</h4>
                  <p className="text-[oklch(0.6_0_0)]">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-[oklch(0.25_0_0)] bg-[oklch(0.12_0_0)]">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-[oklch(0.85_0_0)]">
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-[oklch(0.08_0_0)] border-[oklch(0.25_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.4_0_0)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-[oklch(0.85_0_0)]">
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="bg-[oklch(0.08_0_0)] border-[oklch(0.25_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.4_0_0)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-[oklch(0.85_0_0)]">
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={5}
                    className="bg-[oklch(0.08_0_0)] border-[oklch(0.25_0_0)] text-[oklch(1_0_0)] placeholder:text-[oklch(0.4_0_0)] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
                >
                  {isLoading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
