'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface GalleryItem {
  id: string
  title: string
  description: string | null
  image_url: string
}

// Placeholder gallery items
const placeholderGallery: GalleryItem[] = [
  { id: '1', title: 'Knotless Braids', description: 'Waist-length knotless braids', image_url: '/gallery/braids-1.jpg' },
  { id: '2', title: 'Box Braids', description: 'Medium box braids with curly ends', image_url: '/gallery/braids-2.jpg' },
  { id: '3', title: 'Cornrows', description: 'Intricate cornrow design', image_url: '/gallery/braids-3.jpg' },
  { id: '4', title: 'Fulani Braids', description: 'Traditional fulani style with beads', image_url: '/gallery/braids-4.jpg' },
  { id: '5', title: 'Twist Braids', description: 'Passion twists', image_url: '/gallery/braids-5.jpg' },
  { id: '6', title: 'Bohemian Braids', description: 'Boho knotless with curly ends', image_url: '/gallery/braids-6.jpg' },
]

export function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>(placeholderGallery)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (!error && data && data.length > 0) {
          setGallery(data)
        }
      } catch {
        // Use placeholder gallery on error
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  return (
    <section id="gallery" className="py-24 bg-[oklch(0.08_0_0)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-[oklch(0.78_0.12_85)] mb-4">
            Our Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[oklch(1_0_0)] mb-6">
            Gallery
          </h2>
          <p className="text-lg text-[oklch(0.6_0_0)] max-w-2xl mx-auto">
            Browse through our collection of beautiful braiding styles and find inspiration 
            for your next look.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-[oklch(0.15_0_0)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[oklch(0.78_0.12_85)] focus:ring-offset-2 focus:ring-offset-[oklch(0.08_0_0)]"
            >
              {/* Placeholder gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.2_0_0)] to-[oklch(0.12_0_0)]" />
              
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-[oklch(0.78_0.12_85)] flex items-center justify-center">
                  <span className="text-4xl font-serif text-[oklch(0.78_0.12_85)]">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0_0_0)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-lg font-serif text-[oklch(1_0_0)] mb-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-[oklch(0.7_0_0)]">
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* View More CTA */}
        <div className="mt-12 text-center">
          <p className="text-[oklch(0.5_0_0)]">
            Visit us to see more styles and discuss your perfect look
          </p>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl bg-[oklch(0.08_0_0)] border-[oklch(0.25_0_0)]">
          <VisuallyHidden>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </VisuallyHidden>
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative aspect-[4/5] bg-[oklch(0.15_0_0)] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.2_0_0)] to-[oklch(0.12_0_0)] flex items-center justify-center">
                  <span className="text-6xl font-serif text-[oklch(0.78_0.12_85)]/20">
                    {selectedImage.title[0]}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif text-[oklch(1_0_0)]">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p className="text-[oklch(0.6_0_0)] mt-1">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
