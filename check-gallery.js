// Script para verificar galeria duplicada
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://zdiydwebpgnymjwvqpig.supabase.co', 'sb_publishable_Nk4RB_BQkwJR5n5PrWJO_A_EhaSU5QC');

async function checkGallery() {
  try {
    const { data: gallery, error } = await supabase.from('gallery').select('*');
    
    if (error) {
      console.error('Erro:', error);
      return;
    }
    
    console.log('Total de itens na galeria:', gallery?.length || 0);
    
    if (gallery && gallery.length > 0) {
      console.log('\nItens na galeria:');
      gallery.forEach((item, index) => {
        console.log(`${index + 1}. ${item.title} - ${item.image_url}`);
      });
      
      // Verificar duplicatas
      const titles = gallery.map(g => g.title);
      const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index);
      
      if (duplicates.length > 0) {
        console.log('\n⚠️ Títulos duplicados encontrados:');
        duplicates.forEach(title => {
          console.log(`- ${title}`);
        });
      } else {
        console.log('\n✅ Nenhum título duplicado encontrado');
      }
    } else {
      console.log('✅ Galeria vazia');
    }
    
  } catch (error) {
    console.error('Erro geral:', error);
  }
}

checkGallery();
