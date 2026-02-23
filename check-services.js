// Script para verificar serviços duplicados
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://zdiydwebpgnymjwvqpig.supabase.co', 'sb_publishable_Nk4RB_BQkwJR5n5PrWJO_A_EhaSU5QC');

async function checkServices() {
  try {
    const { data: services, error } = await supabase.from('services').select('*');
    
    if (error) {
      console.error('Erro:', error);
      return;
    }
    
    console.log('Total de serviços:', services?.length || 0);
    console.log('Serviços encontrados:');
    
    services.forEach((service, index) => {
      console.log(`${index + 1}. ${service.name} - $${service.price}`);
    });
    
    // Verificar duplicatas
    const serviceNames = services.map(s => s.name);
    const duplicates = serviceNames.filter((name, index) => serviceNames.indexOf(name) !== index);
    
    if (duplicates.length > 0) {
      console.log('\n⚠️ Nomes duplicados encontrados:');
      duplicates.forEach(name => {
        console.log(`- ${name}`);
      });
    } else {
      console.log('\n✅ Nenhum nome duplicado encontrado');
    }
    
  } catch (error) {
    console.error('Erro geral:', error);
  }
}

checkServices();
