// Script to test the local system
// Execute this script in the browser console after accessing the site

function testSystem() {
  console.log('🧪 TESTING TERESA SALON SYSTEM 🧪')
  console.log('')

  // 1. Clear existing data
  console.log('🗑️ Clearing existing data...')
  localStorage.removeItem('contact_messages')
  localStorage.removeItem('appointments')
  localStorage.removeItem('gallery')

  // 2. Add test data
  console.log('📝 Adding test data...')

  // Test messages
  const messagesData = [
    {
      id: '1',
      name: 'Jane Smith',
      email: 'jane@email.com',
      message: 'Hello, I would like to schedule a time to get braids done.',
      is_read: false,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john@email.com',
      message: 'Hi! Do you have availability for this weekend? I want box braids.',
      is_read: false,
      created_at: new Date().toISOString()
    }
  ]

  // Test appointments
  const appointmentsData = [
    {
      id: '1',
      service_id: '1',
      customer_name: 'Alice Johnson',
      customer_email: 'alice@email.com',
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
      service_id: '2',
      customer_name: 'Bob Wilson',
      customer_email: 'bob@email.com',
      customer_phone: '(613) 987-6543',
      appointment_date: '2026-02-26',
      appointment_time: '14:00',
      status: 'confirmed',
      booking_fee_paid: true,
      stripe_session_id: 'cs_test_a1B2c3D4e5F6g7H',
      notes: 'Client prefers longer braids',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]

  // Test gallery
  const galleryData = [
    {
      id: '1',
      title: 'Elegant Knotless Braids',
      description: 'Beautiful knotless style with natural finish',
      image_url: '/gallery/style-1.jpg',
      display_order: 0,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Classic Box Braids',
      description: 'Traditional box braids with perfect parts',
      image_url: '/gallery/style-2.jpg',
      display_order: 1,
      is_active: true,
      created_at: new Date().toISOString()
    }
  ]

  // Save test data
  localStorage.setItem('contact_messages', JSON.stringify(messagesData))
  localStorage.setItem('appointments', JSON.stringify(appointmentsData))
  localStorage.setItem('gallery', JSON.stringify(galleryData))

  console.log('✅ Test data added successfully!')
  console.log('')
  console.log('📊 Test Summary:')
  console.log(`   • Messages: ${messagesData.length} items`)
  console.log(`   • Appointments: ${appointmentsData.length} items`)
  console.log(`   • Gallery: ${galleryData.length} items`)
  console.log('')

  // 3. Test functions
  console.log('🔧 Testing system functions...')

  // Test contact form
  console.log('📧 Testing contact form...')
  console.log('   - Navigate to Contact section')
  console.log('   - Fill out the form and submit')
  console.log('   - Check if message appears in admin panel')

  // Test booking system
  console.log('📅 Testing booking system...')
  console.log('   - Navigate to Booking section')
  console.log('   - Select service, date, and time')
  console.log('   - Fill out customer information')
  console.log('   - Submit and check if appointment appears')

  // Test admin panel
  console.log('⚙️ Testing admin panel...')
  console.log('   - Navigate to /admin')
  console.log('   - Login with: admin@teresasalon.com / TeresaAdmin2024!')
  console.log('   - Check if data appears correctly')

  console.log('')
  console.log('🔄 Reload the page and run tests')
  console.log('')
  console.log('🎯 System test completed! 🎯')
  console.log('')
  console.log('📋 Test Checklist:')
  console.log('□ Contact form submission')
  console.log('□ Booking form submission')
  console.log('□ Admin panel access')
  console.log('□ Data display in admin')
  console.log('□ Gallery display')
  console.log('□ Service pricing display')
}

// Function to run specific tests
function runContactTest() {
  console.log('📧 CONTACT FORM TEST')
  console.log('1. Go to Contact section')
  console.log('2. Fill: Name, Email, Message')
  console.log('3. Click "Send Message"')
  console.log('4. Check admin panel for new message')
}

function runBookingTest() {
  console.log('📅 BOOKING SYSTEM TEST')
  console.log('1. Go to Booking section')
  console.log('2. Select a service')
  console.log('3. Select date and time')
  console.log('4. Fill: Name, Email, Phone')
  console.log('5. Choose payment method')
  console.log('6. Submit and check confirmation')
}

function runAdminTest() {
  console.log('⚙️ ADMIN PANEL TEST')
  console.log('1. Go to /admin')
  console.log('2. Login: admin@teresasalon.com')
  console.log('3. Password: TeresaAdmin2024!')
  console.log('4. Check dashboard data')
  console.log('5. Test appointments management')
  console.log('6. Test messages management')
}

// Test menu
function testMenu() {
  console.log('🧪 TEST MENU 🧪')
  console.log('')
  console.log('1. testSystem() - Run complete system test')
  console.log('2. runContactTest() - Test contact form only')
  console.log('3. runBookingTest() - Test booking system only')
  console.log('4. runAdminTest() - Test admin panel only')
  console.log('')
  console.log('Type one of the functions above in the console')
}

// Execute menu
testMenu()
