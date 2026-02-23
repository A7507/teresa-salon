// Script simples para testar conexão com Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://zdiydwebpgnymjwvqpig.supabase.co';
const supabaseKey = 'sb_publishable_Nk4RB_BQkwJR5n5PrWJO_A_EhaSU5QC';

console.log('🔍 Testando conexão com Supabase...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey.substring(0, 20) + '...');

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Testar conexão básica
    console.log('\n📊 Testando busca de serviços...');
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .limit(5);

    if (servicesError) {
      console.error('❌ Erro ao buscar serviços:', servicesError);
    } else {
      console.log('✅ Serviços encontrados:', services?.length || 0);
      if (services?.length > 0) {
        console.log('📋 Primeiro serviço:', services[0].name);
      }
    }

    // Testar inserção de mensagem
    console.log('\n📝 Testando inserção de mensagem...');
    const testMessage = {
      name: 'Teste',
      email: 'teste@example.com',
      message: 'Mensagem de teste',
      is_read: false
    };

    const { data: newMessage, error: insertError } = await supabase
      .from('contact_messages')
      .insert([testMessage])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erro ao inserir mensagem:', insertError);
    } else {
      console.log('✅ Mensagem inserida com sucesso!');
      console.log('📄 ID:', newMessage.id);
      
      // Limpar mensagem de teste
      await supabase
        .from('contact_messages')
        .delete()
        .eq('id', newMessage.id);
      console.log('🧹 Mensagem de teste removida');
    }

    // Testar busca de mensagens
    console.log('\n📬 Testando busca de mensagens...');
    const { data: messages, error: messagesError } = await supabase
      .from('contact_messages')
      .select('*')
      .limit(5);

    if (messagesError) {
      console.error('❌ Erro ao buscar mensagens:', messagesError);
    } else {
      console.log('✅ Mensagens encontradas:', messages?.length || 0);
    }

    console.log('\n🎉 Teste concluído!');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Executar teste
testConnection();
