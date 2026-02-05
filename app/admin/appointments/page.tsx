'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Calendar, Clock, User, Phone, Mail, Check, X, Loader2 } from 'lucide-react'

interface Appointment {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  appointment_date: string
  appointment_time: string
  status: string
  booking_fee_paid: boolean
  created_at: string
  services: { name: string; price: number } | null
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchAppointments()
  }, [filter])

  async function fetchAppointments() {
    try {
      const supabase = createClient()
      let query = supabase
        .from('appointments')
        .select('*, services(name, price)')
        .order('appointment_date', { ascending: true })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setAppointments(data || [])
    } catch (error) {
      console.log('[v0] Error fetching appointments')
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      
      toast.success(`Appointment ${status}`)
      fetchAppointments()
    } catch (error) {
      toast.error('Failed to update appointment')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[oklch(1_0_0)]">Appointments</h1>
          <p className="text-[oklch(0.6_0_0)] mt-1">Manage customer appointments</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40 bg-[oklch(0.1_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.78_0.12_85)]" />
        </div>
      ) : appointments.length === 0 ? (
        <Card className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
          <CardContent className="py-12 text-center">
            <p className="text-[oklch(0.6_0_0)]">No appointments found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {appointments.map((apt) => (
            <Card key={apt.id} className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Customer Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[oklch(0.78_0.12_85)]/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[oklch(0.78_0.12_85)]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[oklch(1_0_0)]">{apt.customer_name}</h3>
                        <p className="text-sm text-[oklch(0.78_0.12_85)]">{apt.services?.name || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-[oklch(0.6_0_0)]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {apt.appointment_date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {apt.appointment_time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {apt.customer_phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {apt.customer_email}
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'confirmed' 
                        ? 'bg-green-400/10 text-green-400'
                        : apt.status === 'pending'
                          ? 'bg-yellow-400/10 text-yellow-400'
                          : apt.status === 'completed'
                            ? 'bg-blue-400/10 text-blue-400'
                            : 'bg-red-400/10 text-red-400'
                    }`}>
                      {apt.status}
                    </span>
                    
                    {apt.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateStatus(apt.id, 'confirmed')}
                          className="bg-green-500 hover:bg-green-600 text-[oklch(1_0_0)]"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus(apt.id, 'cancelled')}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    
                    {apt.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(apt.id, 'completed')}
                        className="bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
