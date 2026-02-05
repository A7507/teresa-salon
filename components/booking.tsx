'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { startCheckoutSession } from '@/app/actions/stripe'
import { format } from 'date-fns'
import { CalendarIcon, Clock, CreditCard, CheckCircle2 } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Service {
  id: string
  name: string
  price: number
  duration_minutes: number | null
}

const fallbackServices: Service[] = [
  { id: '1', name: 'Knotless Braids', price: 120, duration_minutes: 240 },
  { id: '2', name: 'Box Braids', price: 100, duration_minutes: 180 },
  { id: '3', name: 'Cornrows', price: 60, duration_minutes: 120 },
  { id: '4', name: 'Fulani Braids', price: 90, duration_minutes: 180 },
  { id: '5', name: 'Twist Braids', price: 80, duration_minutes: 150 },
]

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
]

type BookingStep = 'details' | 'payment' | 'confirmation'

export function Booking() {
  const [step, setStep] = useState<BookingStep>('details')
  const [services, setServices] = useState<Service[]>(fallbackServices)
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('services')
          .select('id, name, price, duration_minutes')
          .eq('is_active', true)
          .order('price', { ascending: true })

        if (!error && data && data.length > 0) {
          setServices(data)
        }
      } catch (err) {
        console.log('[v0] Using fallback services')
      }
    }

    fetchServices()
  }, [])

  const isFormValid = selectedService && selectedDate && selectedTime && fullName && email && phone

  const handleProceedToPayment = async () => {
    if (!isFormValid) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    try {
      // Store booking details in session storage for after payment
      const bookingDetails = {
        service_id: selectedService,
        service_name: services.find(s => s.id === selectedService)?.name,
        appointment_date: format(selectedDate!, 'yyyy-MM-dd'),
        appointment_time: selectedTime,
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
      }
      sessionStorage.setItem('pendingBooking', JSON.stringify(bookingDetails))
      
      setStep('payment')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const startCheckoutForBooking = useCallback(async () => {
    const pendingBooking = sessionStorage.getItem('pendingBooking')
    return startCheckoutSession('booking-fee', pendingBooking || undefined)
  }, [])

  const handlePaymentComplete = async () => {
    // Save booking to database
    try {
      const pendingBooking = sessionStorage.getItem('pendingBooking')
      if (pendingBooking) {
        const booking = JSON.parse(pendingBooking)
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('appointments')
          .insert({
            service_id: booking.service_id,
            appointment_date: booking.appointment_date,
            appointment_time: booking.appointment_time,
            customer_name: booking.customer_name,
            customer_email: booking.customer_email,
            customer_phone: booking.customer_phone,
            booking_fee_paid: true,
            status: 'confirmed',
          })
          .select('id')
          .single()

        if (!error && data) {
          setBookingId(data.id)
        }
        
        sessionStorage.removeItem('pendingBooking')
      }
    } catch (err) {
      console.log('[v0] Error saving booking')
    }
    
    setStep('confirmation')
  }

  const selectedServiceData = services.find(s => s.id === selectedService)

  return (
    <section id="booking" className="py-24 bg-[oklch(0.98_0_0)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-[oklch(0.78_0.12_85)] mb-4">
            Schedule Your Visit
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[oklch(0.1_0_0)] mb-6">
            Book an Appointment
          </h2>
          <p className="text-lg text-[oklch(0.45_0_0)] max-w-2xl mx-auto">
            Secure your appointment with a $20 CAD non-refundable booking fee.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { key: 'details', label: 'Details', icon: CalendarIcon },
            { key: 'payment', label: 'Payment', icon: CreditCard },
            { key: 'confirmation', label: 'Confirmed', icon: CheckCircle2 },
          ].map((s, index) => (
            <div key={s.key} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                step === s.key 
                  ? 'bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)]' 
                  : step === 'confirmation' || (step === 'payment' && index === 0)
                    ? 'bg-[oklch(0.1_0_0)] text-[oklch(1_0_0)]'
                    : 'bg-[oklch(0.92_0_0)] text-[oklch(0.45_0_0)]'
              }`}>
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
              </div>
              {index < 2 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  (step === 'payment' && index === 0) || step === 'confirmation'
                    ? 'bg-[oklch(0.78_0.12_85)]'
                    : 'bg-[oklch(0.88_0_0)]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 'details' && (
          <Card className="border-[oklch(0.88_0.02_85)] bg-[oklch(1_0_0)]">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[oklch(0.1_0_0)]">
                Appointment Details
              </CardTitle>
              <CardDescription className="text-[oklch(0.45_0_0)]">
                Select your service and preferred date and time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service" className="text-[oklch(0.1_0_0)]">
                  Select Service
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="border-[oklch(0.88_0_0)]">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - ${service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[oklch(0.1_0_0)]">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border border-[oklch(0.88_0_0)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[oklch(0.1_0_0)]">Select Time</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? 'default' : 'outline'}
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time 
                          ? 'bg-[oklch(0.1_0_0)] text-[oklch(1_0_0)]' 
                          : 'border-[oklch(0.88_0_0)] text-[oklch(0.1_0_0)] hover:bg-[oklch(0.95_0_0)]'
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[oklch(0.1_0_0)]">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="border-[oklch(0.88_0_0)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[oklch(0.1_0_0)]">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="border-[oklch(0.88_0_0)]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[oklch(0.1_0_0)]">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="border-[oklch(0.88_0_0)]"
                />
              </div>

              {/* Summary & Continue */}
              {selectedServiceData && selectedDate && selectedTime && (
                <div className="bg-[oklch(0.95_0.01_85)] rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-[oklch(0.1_0_0)]">Booking Summary</h4>
                  <div className="text-sm text-[oklch(0.45_0_0)] space-y-1">
                    <p><strong>Service:</strong> {selectedServiceData.name}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Service Price:</strong> ${selectedServiceData.price}</p>
                    <p className="text-[oklch(0.78_0.12_85)]"><strong>Booking Fee:</strong> $20 CAD (non-refundable)</p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleProceedToPayment}
                disabled={!isFormValid || isLoading}
                className="w-full bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
              >
                {isLoading ? 'Processing...' : 'Continue to Payment ($20 CAD)'}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'payment' && (
          <Card className="border-[oklch(0.88_0.02_85)] bg-[oklch(1_0_0)]">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[oklch(0.1_0_0)]">
                Complete Payment
              </CardTitle>
              <CardDescription className="text-[oklch(0.45_0_0)]">
                Pay the $20 CAD non-refundable booking fee to confirm your appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ 
                  clientSecret: startCheckoutForBooking,
                  onComplete: handlePaymentComplete,
                }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </CardContent>
          </Card>
        )}

        {step === 'confirmation' && (
          <Card className="border-[oklch(0.78_0.12_85)] bg-[oklch(1_0_0)]">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[oklch(0.78_0.12_85)] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[oklch(0.08_0_0)]" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-[oklch(0.1_0_0)] mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-[oklch(0.45_0_0)]">
                  Thank you for booking with Teresa Salon. A confirmation email has been sent to your email address.
                </p>
              </div>
              {bookingId && (
                <p className="text-sm text-[oklch(0.5_0_0)]">
                  Booking Reference: #{bookingId.slice(0, 8).toUpperCase()}
                </p>
              )}
              <Button
                onClick={() => {
                  setStep('details')
                  setSelectedService('')
                  setSelectedDate(undefined)
                  setSelectedTime('')
                  setFullName('')
                  setEmail('')
                  setPhone('')
                  setBookingId(null)
                }}
                variant="outline"
                className="border-[oklch(0.78_0.12_85)] text-[oklch(0.78_0.12_85)] hover:bg-[oklch(0.78_0.12_85)] hover:text-[oklch(0.08_0_0)]"
              >
                Book Another Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
