// Script para adicionar suas 4 fotos ao Supabase
// Execute no console do navegador em http://localhost:3000

async function addYourPhotosToSupabase() {
  const photos = [
    {
      title: 'Stylish Braided Look',
      description: 'Beautiful braided hairstyle with colorful patterned top and golden bow necklace',
      image_url: '/gallery-uploads/style-1.jpg',
      display_order: 1,
      is_active: true
    },
    {
      title: 'Urban Braided Style',
      description: 'Modern braided look perfect for city lifestyle with elegant accessories',
      image_url: '/gallery-uploads/style-2.jpg',
      display_order: 2,
      is_active: true
    },
    {
      title: 'Chic Braided Design',
      description: 'Sophisticated braided hairstyle with fashionable urban outfit',
      image_url: '/gallery-uploads/style-3.jpg',
      display_order: 3,
      is_active: true
    },
    {
      title: 'Elegant Braided Beauty',
      description: 'Stunning braided style with golden accessories and contemporary fashion',
      image_url: '/gallery-uploads/style-4.jpg',
      display_order: 4,
      is_active: true
    }
  ];

  console.log('🔄 Adicionando suas fotos ao Supabase...');
  
  try {
    for (const photo of photos) {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photo)
      });

      if (response.ok) {
        console.log(`✅ Foto adicionada: ${photo.title}`);
      } else {
        const error = await response.text();
        console.error(`❌ Erro ao adicionar ${photo.title}:`, error);
      }
    }
    
    console.log('\n🎉 Processo concluído!');
    console.log('📸 Suas 4 fotos foram adicionadas ao banco de dados!');
    console.log('🔄 Recarregue a página de administração para ver as fotos');
    console.log('🔗 Acesse: http://localhost:3000/admin/gallery');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Executar imediatamente
addYourPhotosToSupabase();
