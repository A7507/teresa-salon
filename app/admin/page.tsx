'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Calendar, DollarSign, ImageIcon, MessageSquare, TrendingUp } from 'lucide-react'

interface DashboardStats {
  totalAppointments: number
  pendingAppointments: number
  totalRevenue: number
  galleryItems: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalRevenue: 0,
    galleryItems: 0,
    unreadMessages: 0,
  })
  const [recentAppointments, setRecentAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const supabase = createClient()

        // Fetch appointments count
        const { count: totalAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })

        // Fetch pending appointments
        const { count: pendingAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')

        // Fetch gallery count
        const { count: galleryItems } = await supabase
          .from('gallery')
          .select('*', { count: 'exact', head: true })

        // Fetch unread messages
        const { count: unreadMessages } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })
          .eq('is_read', false)

        // Fetch recent appointments
        const { data: recent } = await supabase
          .from('appointments')
          .select('*, services(name)')
          .order('created_at', { ascending: false })
          .limit(5)

        setStats({
          totalAppointments: totalAppointments || 0,
          pendingAppointments: pendingAppointments || 0,
          totalRevenue: (totalAppointments || 0) * 20, // $20 booking fee per appointment
          galleryItems: galleryItems || 0,
          unreadMessages: unreadMessages || 0,
        })

        setRecentAppointments(recent || [])
      } catch (error) {
        console.log('[v0] Error fetching dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'text-[oklch(0.78_0.12_85)]',
      bgColor: 'bg-[oklch(0.78_0.12_85)]/10',
    },
    {
      title: 'Pending',
      value: stats.pendingAppointments,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Booking Revenue',
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Gallery Items',
      value: stats.galleryItems,
      icon: ImageIcon,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-[oklch(1_0_0)]">Dashboard</h1>
        <p className="text-[oklch(0.6_0_0)] mt-1">Welcome back to Teresa Salon admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-[oklch(0.6_0_0)]">{stat.title}</p>
                  <p className="text-2xl font-semibold text-[oklch(1_0_0)]">
                    {loading ? '...' : stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-[oklch(1_0_0)]">
            Recent Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[oklch(0.6_0_0)]">Loading...</p>
          ) : recentAppointments.length === 0 ? (
            <p className="text-[oklch(0.6_0_0)]">No appointments yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[oklch(0.15_0_0)]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-[oklch(0.6_0_0)]">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[oklch(0.6_0_0)]">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[oklch(0.6_0_0)]">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[oklch(0.6_0_0)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((apt) => (
                    <tr key={apt.id} className="border-b border-[oklch(0.12_0_0)]">
                      <td className="py-3 px-4 text-[oklch(0.9_0_0)]">{apt.customer_name}</td>
                      <td className="py-3 px-4 text-[oklch(0.7_0_0)]">{apt.services?.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-[oklch(0.7_0_0)]">
                        {apt.appointment_date} at {apt.appointment_time}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          apt.status === 'confirmed' 
                            ? 'bg-green-400/10 text-green-400'
                            : apt.status === 'pending'
                              ? 'bg-yellow-400/10 text-yellow-400'
                              : 'bg-[oklch(0.15_0_0)] text-[oklch(0.6_0_0)]'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
