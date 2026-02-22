'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Service {
  id: string
  name: string
  description: string | null
  price: number
  duration_minutes: number | null
  is_active: boolean
}

// Fallback services if database is not available
const fallbackServices: Service[] = [
  { id: '1', name: 'Knotless Braids', description: 'Natural-looking, lightweight braids that start with your natural hair', price: 120, duration_minutes: 240, is_active: true },
  { id: '2', name: 'Box Braids', description: 'Classic protective style with perfectly sectioned parts', price: 100, duration_minutes: 180, is_active: true },
  { id: '3', name: 'Cornrows', description: 'Traditional braids styled close to the scalp in various patterns', price: 60, duration_minutes: 120, is_active: true },
  { id: '4', name: 'Fulani Braids', description: 'Intricate pattern with center cornrow and side braids with beads', price: 90, duration_minutes: 180, is_active: true },
  { id: '5', name: 'Twist Braids', description: 'Two-strand twists for a softer, versatile protective style', price: 80, duration_minutes: 150, is_active: true },
]

export function Services() {
  const [services, setServices] = useState<Service[]>(fallbackServices)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const servicesData = localStorage.getItem('services')
        const services = servicesData ? JSON.parse(servicesData) : []
        
        if (services.length > 0) {
          setServices(services)
        } else {
          // If no services, use fallback
          setServices(fallbackServices)
        }
      } catch {
        setServices(fallbackServices)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <section id="services" className="py-24 bg-[oklch(0.98_0_0)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-[oklch(0.78_0.12_85)] mb-4">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[oklch(0.1_0_0)] mb-6">
            Our Services
          </h2>
          <p className="text-lg text-[oklch(0.45_0_0)] max-w-2xl mx-auto">
            Choose from our range of professional braiding services, each crafted with 
            care and attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="group border-[oklch(0.88_0.02_85)] bg-[oklch(1_0_0)] hover:border-[oklch(0.78_0.12_85)] transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-serif text-[oklch(0.1_0_0)] group-hover:text-[oklch(0.65_0.14_85)] transition-colors">
                    {service.name}
                  </CardTitle>
                  <span className="text-2xl font-serif text-[oklch(0.78_0.12_85)]">
                    ${service.price}
                  </span>
                </div>
                {service.duration_minutes && (
                  <p className="text-xs text-[oklch(0.5_0_0)]">
                    Approx. {Math.floor(service.duration_minutes / 60)}h {service.duration_minutes % 60 > 0 ? `${service.duration_minutes % 60}m` : ''}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[oklch(0.45_0_0)] leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[oklch(0.5_0_0)]">
            A non-refundable <span className="text-[oklch(0.78_0.12_85)] font-medium">$20 CAD</span> booking fee is required to secure your appointment.
          </p>
        </div>
      </div>
    </section>
  )
}
