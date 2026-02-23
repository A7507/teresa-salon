// Script para adicionar suas 4 fotos à galeria
// Execute este código no console do navegador

function addYourPhotos() {
  const galleryData = [
    {
      id: '6',
      title: 'Stylish Braided Look',
      description: 'Beautiful braided hairstyle with colorful patterned top and golden bow necklace',
      image_url: '/gallery-uploads/style-1.jpg',
      display_order: 6,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '7',
      title: 'Urban Braided Style', 
      description: 'Modern braided look perfect for city lifestyle with elegant accessories',
      image_url: '/gallery-uploads/style-2.jpg',
      display_order: 7,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '8',
      title: 'Chic Braided Design',
      description: 'Sophisticated braided hairstyle with fashionable urban outfit',
      image_url: '/gallery-uploads/style-3.jpg',
      display_order: 8,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '9',
      title: 'Elegant Braided Beauty',
      description: 'Stunning braided style with golden accessories and contemporary fashion',
      image_url: '/gallery-uploads/style-4.jpg',
      display_order: 9,
      is_active: true,
      created_at: new Date().toISOString()
    }
  ]

  // Get existing gallery data
  const existingGallery = JSON.parse(localStorage.getItem('gallery') || '[]')
  
  // Add new photos
  const updatedGallery = [...existingGallery, ...galleryData]
  
  // Save to localStorage
  localStorage.setItem('gallery', JSON.stringify(updatedGallery))

  console.log('✅ Suas 4 fotos foram adicionadas com sucesso!')
  console.log('')
  console.log('📸 Fotos adicionadas:')
  galleryData.forEach(photo => {
    console.log(`   • ${photo.title}`)
  })
  console.log('')
  console.log('🔄 Recarregue a página para ver as fotos na galeria')
  console.log('')
  console.log('🎯 Fotos adicionadas com sucesso! 🎯')
}

// Execute immediately
addYourPhotos()
