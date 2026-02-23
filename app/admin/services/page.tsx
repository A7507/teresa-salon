'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, Loader2, DollarSign, Clock } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string | null
  price: number
  duration_minutes: number | null
  is_active: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  
  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    setLoading(true)
    try {
      const servicesData = localStorage.getItem('services')
      const services = servicesData ? JSON.parse(servicesData) : []
      
      if (services.length > 0) {
        setServices(services)
      } else {
        // If no services, use fallback
        setServices([
          { id: '1', name: 'Knotless Braids', description: 'Natural-looking, lightweight braids that start with your natural hair', price: 120, duration_minutes: 240, is_active: true },
          { id: '2', name: 'Box Braids', description: 'Classic protective style with perfectly sectioned parts', price: 100, duration_minutes: 180, is_active: true },
          { id: '3', name: 'Cornrows', description: 'Traditional braids styled close to the scalp in various patterns', price: 60, duration_minutes: 120, is_active: true },
          { id: '4', name: 'Fulani Braids', description: 'Elegant style featuring unique pattern with center cornrow and side braids', price: 90, duration_minutes: 180, is_active: true },
          { id: '5', name: 'Twist Braids', description: 'Two-strand twists for a softer, versatile protective style', price: 80, duration_minutes: 150, is_active: true }
        ])
      }
    } catch (error) {
      console.log('Error fetching services')
    } finally {
      setLoading(false)
    }
  }

  function openDialog(service?: Service) {
    if (service) {
      setEditingService(service)
      setName(service.name)
      setDescription(service.description || '')
      setPrice(service.price.toString())
      setDuration(service.duration_minutes?.toString() || '')
      setIsActive(service.is_active)
    } else {
      setEditingService(null)
      setName('')
      setDescription('')
      setPrice('')
      setDuration('')
      setIsActive(true)
    }
    setIsDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !price) {
      alert('Please fill in the required fields')
      return
    }

    setIsSaving(true)
    try {
      const serviceData = {
        name,
        description: description || null,
        price: parseFloat(price),
        duration_minutes: duration ? parseInt(duration) : null,
        is_active: isActive,
      }

      // Load existing services
      const servicesData = localStorage.getItem('services')
      let services = servicesData ? JSON.parse(servicesData) : []

      if (editingService) {
        // Edit existing service
        services = services.map((s: any) => 
          s.id === editingService.id ? { ...serviceData, id: editingService.id } : s
        )
        alert('Service updated successfully!')
      } else {
        // Add new service
        const newService = {
          ...serviceData,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        services.push(newService)
        alert('Service created successfully!')
      }

      // Save to localStorage
      localStorage.setItem('services', JSON.stringify(services))

      setIsDialogOpen(false)
      fetchServices()
    } catch (error) {
      alert('Failed to save service')
    } finally {
      setIsSaving(false)
    }
  }

  async function deleteService(id: string) {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      // Load existing services
      const servicesData = localStorage.getItem('services')
      let services = servicesData ? JSON.parse(servicesData) : []

      // Remove service
      services = services.filter((s: any) => s.id !== id)

      // Save to localStorage
      localStorage.setItem('services', JSON.stringify(services))

      alert('Service deleted successfully!')
      fetchServices()
    } catch (error) {
      alert('Failed to delete service')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[oklch(1_0_0)]">Services</h1>
          <p className="text-[oklch(0.6_0_0)] mt-1">Manage your service offerings and prices</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[oklch(0.1_0_0)] border-[oklch(0.2_0_0)]">
            <DialogHeader>
              <DialogTitle className="text-[oklch(1_0_0)] font-serif">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[oklch(0.85_0_0)]">Service Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Knotless Braids"
                  className="bg-[oklch(0.08_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[oklch(0.85_0_0)]">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the service"
                  className="bg-[oklch(0.08_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)] resize-none"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-[oklch(0.85_0_0)]">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="120"
                    min="0"
                    step="0.01"
                    className="bg-[oklch(0.08_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-[oklch(0.85_0_0)]">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="180"
                    min="0"
                    className="bg-[oklch(0.08_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="active" className="text-[oklch(0.85_0_0)]">Active</Label>
                <Switch
                  id="active"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
              </div>
              <Button
                type="submit"
                disabled={isSaving}
                className="w-full bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
              >
                {isSaving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.78_0.12_85)]" />
        </div>
      ) : services.length === 0 ? (
        <Card className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
          <CardContent className="py-12 text-center">
            <p className="text-[oklch(0.6_0_0)]">No services yet. Add your first service!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className={`bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)] ${!service.is_active ? 'opacity-60' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-serif text-[oklch(1_0_0)]">
                    {service.name}
                  </CardTitle>
                  <span className="text-xl font-serif text-[oklch(0.78_0.12_85)]">
                    ${service.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {service.description && (
                  <p className="text-sm text-[oklch(0.6_0_0)]">{service.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-[oklch(0.5_0_0)]">
                  {service.duration_minutes && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {Math.floor(service.duration_minutes / 60)}h {service.duration_minutes % 60 > 0 ? `${service.duration_minutes % 60}m` : ''}
                    </div>
                  )}
                  {!service.is_active && (
                    <span className="px-2 py-0.5 bg-[oklch(0.15_0_0)] rounded text-xs">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(service)}
                    className="flex-1 border-[oklch(0.2_0_0)] text-[oklch(0.8_0_0)] hover:bg-[oklch(0.15_0_0)]"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
