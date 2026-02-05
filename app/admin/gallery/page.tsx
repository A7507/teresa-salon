'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Loader2, ImageIcon } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  description: string | null
  image_url: string
  display_order: number
  is_active: boolean
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  
  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [displayOrder, setDisplayOrder] = useState('0')
  const [isActive, setIsActive] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchGallery()
  }, [])

  async function fetchGallery() {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setGallery(data || [])
    } catch (error) {
      console.log('[v0] Error fetching gallery')
    } finally {
      setLoading(false)
    }
  }

  function openDialog(item?: GalleryItem) {
    if (item) {
      setEditingItem(item)
      setTitle(item.title)
      setDescription(item.description || '')
      setImageUrl(item.image_url)
      setDisplayOrder(item.display_order.toString())
      setIsActive(item.is_active)
    } else {
      setEditingItem(null)
      setTitle('')
      setDescription('')
      setImageUrl('')
      setDisplayOrder((gallery.length).toString())
      setIsActive(true)
    }
    setIsDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !imageUrl) {
      toast.error('Please fill in required fields')
      return
    }

    setIsSaving(true)
    try {
      const supabase = createClient()
      const itemData = {
        title,
        description: description || null,
        image_url: imageUrl,
        display_order: parseInt(displayOrder),
        is_active: isActive,
      }

      if (editingItem) {
        const { error } = await supabase
          .from('gallery')
          .update(itemData)
          .eq('id', editingItem.id)
        if (error) throw error
        toast.success('Gallery item updated')
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert(itemData)
        if (error) throw error
        toast.success('Gallery item created')
      }

      setIsDialogOpen(false)
      fetchGallery()
    } catch (error) {
      toast.error('Failed to save gallery item')
    } finally {
      setIsSaving(false)
    }
  }

  async function deleteItem(id: string) {
    if (!confirm('Are you sure you want to delete this gallery item?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast.success('Gallery item deleted')
      fetchGallery()
    } catch (error) {
      toast.error('Failed to delete gallery item')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[oklch(1_0_0)]">Gallery</h1>
          <p className="text-[oklch(0.6_0_0)] mt-1">Manage your portfolio images</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => openDialog()}
              className="bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[oklch(0.1_0_0)] border-[oklch(0.2_0_0)]">
            <DialogHeader>
              <DialogTitle className="text-[oklch(1_0_0)] font-serif">
                {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[oklch(0.85_0_0)]">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Knotless Braids"
                  className="bg-[oklch(0.08_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-[oklch(0.85_0_0)]">Image URL *</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="bg-[oklch(0.08_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)]"
                />
                <p className="text-xs text-[oklch(0.5_0_0)]">
                  Enter the URL of your image. You can upload images to a service like Imgur or Cloudinary.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[oklch(0.85_0_0)]">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description"
                  className="bg-[oklch(0.08_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)] resize-none"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order" className="text-[oklch(0.85_0_0)]">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  min="0"
                  className="bg-[oklch(0.08_0_0)] border-[oklch(0.2_0_0)] text-[oklch(1_0_0)]"
                />
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
                {isSaving ? 'Saving...' : editingItem ? 'Update Item' : 'Add to Gallery'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.78_0.12_85)]" />
        </div>
      ) : gallery.length === 0 ? (
        <Card className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
          <CardContent className="py-12 text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-[oklch(0.3_0_0)] mb-4" />
            <p className="text-[oklch(0.6_0_0)]">No gallery items yet. Add your first image!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <Card 
              key={item.id} 
              className={`bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)] overflow-hidden ${!item.is_active ? 'opacity-60' : ''}`}
            >
              <div className="aspect-square bg-[oklch(0.15_0_0)] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-serif text-[oklch(0.78_0.12_85)]/20">
                    {item.display_order + 1}
                  </span>
                </div>
                {!item.is_active && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-[oklch(0.2_0_0)] rounded text-xs text-[oklch(0.6_0_0)]">
                    Hidden
                  </span>
                )}
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-[oklch(1_0_0)]">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-[oklch(0.5_0_0)] mt-1">{item.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(item)}
                    className="flex-1 border-[oklch(0.2_0_0)] text-[oklch(0.8_0_0)] hover:bg-[oklch(0.15_0_0)]"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteItem(item.id)}
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
