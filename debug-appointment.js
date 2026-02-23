// Script para debug de agendamento
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zdiydwebpgnymjwvqpig.supabase.co';
const supabaseKey = 'sb_publishable_Nk4RB_BQkwJR5n5PrWJO_A_EhaSU5QC';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAppointment() {
  try {
    console.log('🔍 Testando criação de agendamento...');
    
    // Primeiro, buscar serviços disponíveis
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .limit(1);

    if (servicesError) {
      console.error('❌ Erro ao buscar serviços:', servicesError);
      return;
    }

    console.log('✅ Serviços encontrados:', services?.length || 0);
    
    if (!services || services.length === 0) {
      console.error('❌ Nenhum serviço encontrado');
      return;
    }

    // Testar inserção de agendamento
    const testAppointment = {
      service_id: services[0].id,
      customer_name: 'Teste Debug',
      customer_email: 'debug@teste.com',
      customer_phone: '1234567890',
      appointment_date: '2024-12-25',
      appointment_time: '10:00',
      status: 'pending_payment',
      booking_fee_paid: false,
      notes: null
    };

    console.log('📝 Dados do agendamento:', testAppointment);

    const { data: newAppointment, error: insertError } = await supabase
      .from('appointments')
      .insert([testAppointment])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erro ao criar agendamento:', insertError);
      console.error('Detalhes:', JSON.stringify(insertError, null, 2));
    } else {
      console.log('✅ Agendamento criado com sucesso!');
      console.log('📄 ID:', newAppointment.id);
      
      // Limpar agendamento de teste
      await supabase
        .from('appointments')
        .delete()
        .eq('id', newAppointment.id);
      console.log('🧹 Agendamento de teste removido');
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

testAppointment();
