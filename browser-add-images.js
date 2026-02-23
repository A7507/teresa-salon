// Script para adicionar as fotos diretamente via console do navegador
// Abra http://localhost:3000 e cole este código no console do navegador

(async function addGalleryImages() {
  const images = [
    {
      title: 'Stylish Braided Look',
      description: 'Beautiful braided hairstyle with colorful patterned top and golden bow necklace',
      image_url: '/gallery-uploads/style-1.jpg',
      display_order: 6,
      is_active: true
    },
    {
      title: 'Urban Braided Style',
      description: 'Modern braided look perfect for city lifestyle with elegant accessories',
      image_url: '/gallery-uploads/style-2.jpg',
      display_order: 7,
      is_active: true
    },
    {
      title: 'Chic Braided Design',
      description: 'Sophisticated braided hairstyle with fashionable urban outfit',
      image_url: '/gallery-uploads/style-3.jpg',
      display_order: 8,
      is_active: true
    },
    {
      title: 'Elegant Braided Beauty',
      description: 'Stunning braided style with golden accessories and contemporary fashion',
      image_url: '/gallery-uploads/style-4.jpg',
      display_order: 9,
      is_active: true
    }
  ];

  try {
    for (const image of images) {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(image)
      });

      if (response.ok) {
        console.log(`✅ Added: ${image.title}`);
      } else {
        const error = await response.text();
        console.error(`❌ Failed to add: ${image.title}`);
        console.error(`Error:`, error);
      }
    }
    
    console.log('\n🎉 All images processed!');
    console.log('Check your gallery at: http://localhost:3000/#gallery');
    console.log('Refresh the page to see the new images!');
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
