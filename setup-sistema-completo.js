// Script para configurar dados iniciais do sistema
// Execute no console do navegador após acessar o site

function setupInitialData() {
  console.log('🔧 Configurando sistema Teresa Salon...')
  
  // Dados dos serviços
  const servicesData = [
    {
      id: '1',
      name: 'Knotless Braids',
      description: 'Seamless, lightweight braids that start with your natural hair for a more natural look and less tension on the scalp.',
      price: 120.00,
      duration_minutes: 180,
      is_active: true,
      sort_order: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Box Braids',
      description: 'Classic protective style with individual braids sectioned into square-shaped parts.',
      price: 100.00,
      duration_minutes: 150,
      is_active: true,
      sort_order: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Cornrows',
      description: 'Traditional braids that are braided flat to the scalp in straight lines or intricate designs.',
      price: 60.00,
      duration_minutes: 90,
      is_active: true,
      sort_order: 3,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Fulani Braids',
      description: 'Elegant style featuring a unique pattern of braids with beads and accessories.',
      price: 90.00,
      duration_minutes: 120,
      is_active: true,
      sort_order: 4,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Twist Braids',
      description: 'Two-strand twists that create a beautiful, natural-looking protective style.',
      price: 80.00,
      duration_minutes: 120,
      is_active: true,
      sort_order: 5,
      created_at: new Date().toISOString()
    }
  ]

  // Dados da galeria
  const galleryData = [
    {
      id: '1',
      title: 'Urban Braided Elegance',
      description: 'Modern urban style with elegant braids',
      image_url: '/gallery/style-1.jpg',
      is_active: true,
      display_order: 0,
      created_at: new Date().toISOString()
    },
    {
      id: '2', 
      title: 'Modern City Style Braids',
      description: 'Contemporary braids for city look',
      image_url: '/gallery/style-2.jpg',
      is_active: true,
      display_order: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Chic Contemporary Braids', 
      description: 'Chic and modern style for any occasion',
      image_url: '/gallery/style-3.jpg',
      is_active: true,
      display_order: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Sophisticated Urban Look',
      description: 'Professional and elegant braided style',
      image_url: '/gallery/public/style-1.jpg',
      is_active: true,
      display_order: 3,
      created_at: new Date().toISOString()
    }
  ]

  // Dados de agendamentos exemplo
  const appointmentsData = [
    {
      id: '1',
      service_id: '1',
      customer_name: 'Sarah Johnson',
      customer_email: 'sarah.j@email.com',
      customer_phone: '(613) 123-4567',
      appointment_date: '2026-02-25',
      appointment_time: '10:00',
      status: 'pending',
      booking_fee_paid: false,
      stripe_session_id: null,
      notes: 'Client wants knotless braids with medium length',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      service_id: '2',
      customer_name: 'Maria Silva',
      customer_email: 'maria.s@email.com',
      customer_phone: '(613) 987-6543',
      appointment_date: '2026-02-26',
      appointment_time: '14:00',
      status: 'confirmed',
      booking_fee_paid: true,
      stripe_session_id: 'cs_test_a1B2c3D4e5F6g7H',
      notes: 'Client confirmed appointment via email',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      service_id: '3',
      customer_name: 'Emily Chen',
      customer_email: 'emily.c@email.com',
      customer_phone: '(613) 555-0123',
      appointment_date: '2026-02-27',
      appointment_time: '09:30',
      status: 'completed',
      booking_fee_paid: true,
      stripe_session_id: 'cs_test_b2C3d4E5f6G7h8I',
      notes: 'Appointment completed successfully',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]

  // Dados de mensagens
  const messagesData = [
    {
      id: '1',
      name: 'Amanda Wilson',
      email: 'amanda.w@email.com',
      message: 'Hi! I would like to know if you have availability for next week. I\'m interested in knotless braids for shoulder-length hair.',
      is_read: false,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Jessica Brown',
      email: 'jessica.b@email.com',
      message: 'Hello! Do you offer services for children? My daughter is 8 years old and wants box braids for summer vacation.',
      is_read: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Patricia Martinez',
      email: 'patricia.m@email.com',
      message: 'What is the price for cornrows with added beads? Also, how long does the appointment usually take?',
      is_read: false,
      created_at: new Date().toISOString()
    }
  ]

  // Salvar tudo no localStorage
  localStorage.setItem('services', JSON.stringify(servicesData))
  localStorage.setItem('gallery', JSON.stringify(galleryData))
  localStorage.setItem('appointments', JSON.stringify(appointmentsData))
  localStorage.setItem('contact_messages', JSON.stringify(messagesData))

  // Configurar login admin
  localStorage.setItem('admin_logged_in', 'true')
  localStorage.setItem('admin_email', 'admin@teresasalon.com')

  console.log('✅ Sistema configurado com sucesso!')
  console.log('')
  console.log('📊 Dados adicionados:')
  console.log(`   • Serviços: ${servicesData.length}`)
  console.log(`   • Galeria: ${galleryData.length}`)
  console.log(`   • Agendamentos: ${appointmentsData.length}`)
  console.log(`   • Mensagens: ${messagesData.length}`)
  console.log('')
  console.log('🔐 Login Admin:')
  console.log('   • Email: admin@teresasalon.com')
  console.log('   • Senha: TeresaAdmin2024!')
  console.log('')
  console.log('🎯 Sistema pronto para uso!')
  console.log('   • Acesse: http://localhost:3000')
  console.log('   • Admin: http://localhost:3000/admin')
  console.log('')
  console.log('🔄 Recarregue a página para ver as mudanças')
}

// Função para limpar tudo
function clearAllData() {
  console.log('🗑️ LIMPANDO TODOS OS DADOS')
  
  const confirmClear = confirm('Tem certeza que deseja apagar TODOS os dados? Esta ação não pode ser desfeita.')
  
  if (!confirmClear) {
    console.log('❌ Cancelado')
    return
  }

  localStorage.removeItem('services')
  localStorage.removeItem('gallery')
  localStorage.removeItem('appointments')
  localStorage.removeItem('contact_messages')
  localStorage.removeItem('admin_logged_in')
  localStorage.removeItem('admin_email')

  console.log('✅ Todos os dados apagados com sucesso!')
  console.log('🔄 Recarregue a página para ver as mudanças')
}

// Menu principal
function setupMenu() {
  console.log('🚀 MENU DE CONFIGURAÇÃO - TERESA SALON 🚀')
  console.log('')
  console.log('1. setupInitialData() - Configurar sistema completo')
  console.log('2. clearAllData() - Apagar todos os dados')
  console.log('')
  console.log('Execute uma das funções acima no console')
  console.log('')
  console.log('Exemplo: setupInitialData()')
}

// Executar menu
setupMenu()
