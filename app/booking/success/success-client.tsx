'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent')
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret')
    const redirectStatus = searchParams.get('redirect_status')

    if (redirectStatus === 'succeeded' && paymentIntent) {
      setStatus('success')
      // Update booking status in localStorage
      const appointmentsData = localStorage.getItem('appointments')
      const appointments = appointmentsData ? JSON.parse(appointmentsData) : []
      
      // Find and update the booking with this payment intent
      const updatedAppointments = appointments.map((appointment: any) => {
        if (appointment.stripe_session_id === paymentIntent) {
          return {
            ...appointment,
            status: 'pending',
            booking_fee_paid: true,
            updated_at: new Date().toISOString()
          }
        }
        return appointment
      })
      
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } else {
      setStatus('error')
    }
  }, [searchParams, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[oklch(0.98_0_0)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[oklch(0.78_0.12_85)] mx-auto mb-4"></div>
          <p className="text-[oklch(0.45_0_0)]">Processando seu pagamento...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[oklch(0.98_0_0)]">
        <Card className="max-w-md mx-auto border-red-200">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-red-600 mb-2">
                Erro no Pagamento
              </h2>
              <p className="text-[oklch(0.45_0_0)]">
                Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.
              </p>
            </div>
            <button
              onClick={() => router.push('/#booking')}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Tentar Novamente
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[oklch(0.98_0_0)]">
      <Card className="max-w-md mx-auto border-[oklch(0.78_0.12_85)]">
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[oklch(0.78_0.12_85)] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[oklch(0.08_0_0)]" />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-[oklch(0.1_0_0)] mb-2">
              Pagamento Concluído!
            </h2>
            <p className="text-[oklch(0.45_0_0)]">
              Seu pagamento de $20 USD foi processado com sucesso. 
              Seu agendamento foi confirmado e você receberá um email em breve.
            </p>
          </div>
          <div className="text-sm text-[oklch(0.5_0_0)]">
            <p>Você será redirecionado para a página inicial em 3 segundos...</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] rounded-lg hover:bg-[oklch(0.88_0.08_85)]"
          >
            Voltar para o Início
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
