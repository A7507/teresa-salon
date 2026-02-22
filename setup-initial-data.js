// Script to add initial data to localStorage
// Execute this script in the browser console after accessing the site

function setupInitialData() {
  // Example data for gallery
  const galleryData = [
    {
      id: '1',
      title: 'Urban Braided Elegance',
      description: 'Modern urban style with elegant braids',
      image_url: '/gallery-uploads/style1.jpg',
      display_order: 0,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2', 
      title: 'Modern City Style Braids',
      description: 'Contemporary braids for city look',
      image_url: '/gallery-uploads/style2.jpg',
      display_order: 1,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Chic Contemporary Braids', 
      description: 'Chic and modern style for any occasion',
      image_url: '/gallery-uploads/style3.jpg',
      display_order: 2,
      is_active: true,
      created_at: new Date().toISOString()
    }
  ]

  // Example data for appointments
  const appointmentsData = [
    {
      id: '1',
      service_id: null,
      customer_name: 'Jane Smith',
      customer_email: 'jane@email.com',
      customer_phone: '(613) 123-4567',
      appointment_date: '2026-02-25',
      appointment_time: '10:00',
      status: 'pending',
      booking_fee_paid: false,
      stripe_session_id: null,
      notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      service_id: '1',
      customer_name: 'Emily Johnson',
      customer_email: 'emily@email.com',
      customer_phone: '(613) 987-6543',
      appointment_date: '2026-02-26',
      appointment_time: '14:00',
      status: 'confirmed',
      booking_fee_paid: true,
      stripe_session_id: 'cs_test_a1B2c3D4e5F6g7H',
      notes: 'Client prefers afternoon appointments',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]

  // Example data for messages
  const messagesData = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah@email.com',
      message: 'Hi! I would like to know if you have availability for next week. I\'m interested in knotless braids.',
      is_read: false,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael@email.com',
      message: 'Hello! Do you offer services for children? My daughter is 8 years old and wants box braids.',
      is_read: true,
      created_at: new Date().toISOString()
    }
  ]

  // Save data to localStorage
  localStorage.setItem('gallery', JSON.stringify(galleryData))
  localStorage.setItem('appointments', JSON.stringify(appointmentsData))
  localStorage.setItem('contact_messages', JSON.stringify(messagesData))

  console.log('✅ Initial data setup completed!')
  console.log('')
  console.log('📊 Added data:')
  console.log(`   • Gallery: ${galleryData.length} items`)
  console.log(`   • Appointments: ${appointmentsData.length} items`)
  console.log(`   • Messages: ${messagesData.length} items`)
  console.log('')
  console.log('🔄 Reload the page to see the data')
  console.log('')
  console.log('🎯 Setup completed successfully! 🎯')
}

// Function to clear all data
function clearAllData() {
  console.log('🗑️ CLEARING ALL DATA 🗑️')
  
  const confirmClear = confirm('Are you sure you want to clear ALL data? This action cannot be undone.')
  
  if (!confirmClear) {
    console.log('❌ Cancelled')
    return
  }

  // Clear all relevant localStorage items
  localStorage.removeItem('gallery')
  localStorage.removeItem('appointments')
  localStorage.removeItem('contact_messages')
  localStorage.removeItem('services')

  console.log('✅ All data cleared successfully!')
  console.log('')
  console.log('🔄 Reload the page to see changes')
  console.log('')
  console.log('🎯 Data cleared successfully! 🎯')
}

// Function to show current data status
function showDataStatus() {
  console.log('📊 CURRENT DATA STATUS 📊')
  console.log('')

  const gallery = JSON.parse(localStorage.getItem('gallery') || '[]')
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
  const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]')
  const services = JSON.parse(localStorage.getItem('services') || '[]')

  console.log(`📸 Gallery: ${gallery.length} items`)
  console.log(`📅 Appointments: ${appointments.length} items`)
  console.log(`💬 Messages: ${messages.length} items (${messages.filter(m => !m.is_read).length} unread)`)
  console.log(`💇 Services: ${services.length} items`)
  console.log('')

  // Show recent items
  if (appointments.length > 0) {
    console.log('📅 Recent appointments:')
    appointments.slice(0, 3).forEach(apt => {
      console.log(`   • ${apt.customer_name} - ${apt.appointment_date} at ${apt.appointment_time} (${apt.status})`)
    })
  }

  if (messages.length > 0) {
    console.log('💬 Recent messages:')
    messages.slice(0, 3).forEach(msg => {
      console.log(`   • ${msg.name} - ${msg.is_read ? 'Read' : 'Unread'}`)
    })
  }
}

// Menu
function dataMenu() {
  console.log('📋 DATA MANAGEMENT MENU 📋')
  console.log('')
  console.log('1. setupInitialData() - Add sample data')
  console.log('2. clearAllData() - Clear all data')
  console.log('3. showDataStatus() - Show current data status')
  console.log('')
  console.log('Type one of the functions above in the console and press Enter')
  console.log('')
  console.log('Example: setupInitialData()')
}

// Execute menu
dataMenu()
