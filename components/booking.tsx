'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { format } from 'date-fns'
import { CalendarIcon, Clock, CheckCircle2, Building2 } from 'lucide-react'

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
type PaymentMethod = 'transfer'

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transfer')

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const servicesData = await response.json()
          if (servicesData.length > 0) {
            setServices(servicesData)
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error)
        // Keep fallback services if API fails
      }
    }

    fetchServices()
  }, [])

  const isFormValid = selectedService && selectedDate && selectedTime && fullName && email && phone

  const handleBookingSubmit = async () => {
    if (!isFormValid) {
      alert('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: selectedService,
          customer_name: fullName,
          customer_email: email,
          customer_phone: phone,
          appointment_date: format(selectedDate!, 'yyyy-MM-dd'),
          appointment_time: selectedTime,
          status: 'pending_payment',
          booking_fee_paid: false,
          notes: null
        })
      })

      if (!response.ok) {
        throw new Error('Error creating appointment')
      }

      const appointment = await response.json()
      setBookingId(appointment.id)
      
      // For transfer payment, no additional processing needed
      
      setStep('payment')
    } catch (error) {
      console.error('Error:', error)
      alert('Error creating appointment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setStep('details')
    setSelectedService('')
    setSelectedDate(undefined)
    setSelectedTime('')
    setFullName('')
    setEmail('')
    setPhone('')
    setBookingId(null)
    setPaymentMethod('transfer')
  }

  const handlePaymentComplete = async () => {
    // Update appointment status to paid
    if (bookingId) {
      try {
        const response = await fetch('/api/appointments', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: bookingId,
            status: 'pending',
            booking_fee_paid: true
          })
        })

        if (!response.ok) {
          throw new Error('Failed to update appointment')
        }
      } catch (error) {
        console.error('Error updating appointment:', error)
      }
    }
    
    setStep('confirmation')
  }

  const handleTransferPayment = () => {
    // For transfer, just advance to confirmation
    handlePaymentComplete()
  }

  const selectedServiceData = services.find(s => s.id === selectedService)

  return (
    <section id="booking" className="py-24 bg-[oklch(0.98_0_0)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-[oklch(0.78_0_12_85)] mb-4">
            Book Your Visit
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[oklch(0.1_0_0)] mb-6">
            Make an Appointment
          </h2>
          <p className="text-lg text-[oklch(0.45_0_0)] max-w-2xl mx-auto">
            Secure your time slot with a non-refundable $20 USD booking fee.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { key: 'details', label: 'Details', icon: CalendarIcon },
            { key: 'payment', label: 'Payment', icon: Building2 },
            { key: 'confirmation', label: 'Confirmed', icon: CheckCircle2 },
          ].map((s, index) => (
            <div key={s.key} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                step === s.key 
                  ? 'bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)]' 
                  : (step === 'payment' && index === 0) || (step === 'confirmation' && index <= 1)
                    ? 'bg-[oklch(0.1_0_0)] text-[oklch(1_0_0)]'
                    : 'bg-[oklch(0.92_0_0)] text-[oklch(0.45_0_0)]'
              }`}>
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
              </div>
              {index < 2 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  (step === 'payment' && index === 0) || (step === 'confirmation' && index <= 1)
                    ? 'bg-[oklch(0.78_0.12_85)]'
                    : 'bg-[oklch(0.88_0_0)]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 'details' && (
          <Card className="border-[oklch(0.88_0_0)] bg-[oklch(1_0_0)]">
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
                    Phone
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

              {/* Payment Method Display */}
              <div className="space-y-2">
                <Label className="text-[oklch(0.1_0_0)]">Payment Method</Label>
                <div className="flex items-center space-x-2 p-3 bg-[oklch(0.95_0.01_85)] rounded-lg">
                  <Building2 className="w-4 h-4 text-[oklch(0.78_0.12_85)]" />
                  <span className="text-[oklch(0.1_0_0)]">Electronic Transfer</span>
                </div>
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
                    <p><strong>Payment Method:</strong> Electronic Transfer</p>
                    <p className="text-[oklch(0.78_0.12_85)]"><strong>Booking Fee:</strong> $20 USD (non-refundable)</p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleBookingSubmit}
                disabled={!isFormValid || isLoading}
                className="w-full bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
              >
                {isLoading ? 'Processing...' : 'Continue to Payment'}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'payment' && (
          <Card className="border-[oklch(0.78_0.12_85)] bg-[oklch(1_0_0)]">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[oklch(0.1_0_0)]">
                Pay $20 USD Booking Fee
              </CardTitle>
              <CardDescription className="text-[oklch(0.45_0_0)]">
                Complete the $20 USD payment to confirm your appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Booking Summary */}
              {selectedServiceData && selectedDate && selectedTime && (
                <div className="bg-[oklch(0.95_0.01_85)] rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-[oklch(0.1_0_0)]">Appointment Summary</h4>
                  <div className="text-sm text-[oklch(0.45_0_0)] space-y-1">
                    <p><strong>Service:</strong> {selectedServiceData.name}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Client:</strong> {fullName}</p>
                    <p className="text-[oklch(0.78_0.12_85)]"><strong>Booking Fee:</strong> $20 USD (non-refundable)</p>
                  </div>
                </div>
              )}

              {/* Payment Options - Transfer Only */}
              <div className="space-y-4">
                <div className="text-center">
                  <Building2 className="w-12 h-12 mx-auto mb-2 text-[oklch(0.78_0.12_85)]" />
                  <p className="text-sm text-[oklch(0.45_0_0)]">
                    Make an electronic transfer to the details below
                  </p>
                </div>
                
                <div className="bg-[oklch(0.95_0.01_85)] rounded-lg p-4 space-y-3">
                  <h5 className="font-medium text-[oklch(0.1_0_0)]">Electronic Transfer Details</h5>
                  <div className="text-sm text-[oklch(0.45_0_0)] space-y-2">
                    <div className="flex justify-between">
                      <span><strong>Email for Transfer:</strong></span>
                      <span className="font-mono text-xs">thethecamba@gmail.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>Name:</strong></span>
                      <span>Teresa Salon</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>Amount:</strong></span>
                      <span className="text-[oklch(0.78_0.12_85)] font-medium">$20.00 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>Reference:</strong></span>
                      <span>#{bookingId?.slice(0, 8).toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <strong>How to make the transfer:</strong><br/>
                    1. Access your bank's app or website<br/>
                    2. Choose "Electronic Transfer" or "E-Transfer"<br/>
                    3. Email to receive: <strong>thethecamba@gmail.com</strong><br/>
                    4. Amount: <strong>$20.00 USD</strong><br/>
                    5. In the message/description: <strong>#{bookingId?.slice(0, 8).toUpperCase()}</strong>
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                    <strong>Important:</strong> After making the transfer, click the button below to register your payment. 
                    Your appointment will be confirmed within 1-2 business days.
                  </p>
                </div>

                <Button
                  onClick={handleTransferPayment}
                  className="w-full bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
                >
                  Confirm Transfer Made
                </Button>
              </div>

              {/* Back Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setStep('details')}
                  className="border-[oklch(0.78_0.12_85)] text-[oklch(0.78_0.12_85)] hover:bg-[oklch(0.78_0.12_85)] hover:text-[oklch(0.08_0_0)]"
                >
                  Back to Details
                </Button>
              </div>
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
                  Appointment Confirmed!
                </h3>
                <p className="text-[oklch(0.45_0_0)]">
                  Thank you for choosing Teresa Salon. Your $20 USD payment has been processed 
                  and your appointment is confirmed. You will receive a confirmation email shortly.
                </p>
              </div>
              {bookingId && (
                <p className="text-sm text-[oklch(0.5_0_0)]">
                  Appointment Reference: #{bookingId.slice(0, 8).toUpperCase()}
                </p>
              )}
              <div className="bg-[oklch(0.78_0.12_85)]/10 rounded-lg p-4 text-sm text-[oklch(0.45_0_0)]">
                <p className="font-medium text-[oklch(0.1_0_0)] mb-1">Next Steps:</p>
                <p>1. Save this reference number for your records.</p>
                <p>2. You will receive a confirmation email with your appointment details.</p>
                <p>3. Come to the salon on your scheduled date and time.</p>
                <p>4. The remaining service amount will be paid directly at the salon.</p>
              </div>
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-[oklch(0.78_0.12_85)] text-[oklch(0.78_0.12_85)] hover:bg-[oklch(0.78_0.12_85)] hover:text-[oklch(0.08_0_0)]"
              >
                Make Another Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
