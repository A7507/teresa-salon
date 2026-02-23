// Script to facilitate changing service prices
// Execute this script in the browser console after accessing the site

function changePrices() {
  console.log('💰 PRICE CHANGER - TERESA SALON 💰')
  console.log('')

  // Current prices
  const currentPrices = {
    'Knotless Braids': 120,
    'Box Braids': 100,
    'Cornrows': 60,
    'Fulani Braids': 90,
    'Twist Braids': 80
  }

  console.log('📋 CURRENT PRICES:')
  Object.entries(currentPrices).forEach(([service, price]) => {
    console.log(`   • ${service}: $${price}`)
  })
  console.log('')

  // New prices (change these values)
  const newPrices = {
    'Knotless Braids': 150,    // Changed from 120 to 150
    'Box Braids': 120,       // Changed from 100 to 120
    'Cornrows': 80,         // Changed from 60 to 80
    'Fulani Braids': 110,     // Changed from 90 to 110
    'Twist Braids': 100        // Changed from 80 to 100
  }

  console.log('💡 NEW PRICES (already changed):')
  Object.entries(newPrices).forEach(([service, price]) => {
    console.log(`   • ${service}: $${price}`)
  })
  console.log('')

  // Load existing services
  const servicesData = localStorage.getItem('services')
  let services = servicesData ? JSON.parse(servicesData) : []

  // Update prices
  services = services.map(service => {
    if (newPrices[service.name]) {
      return {
        ...service,
        price: newPrices[service.name],
        updated_at: new Date().toISOString()
      }
    }
    return service
  })

  // Save to localStorage
  localStorage.setItem('services', JSON.stringify(services))

  console.log('✅ Prices updated successfully!')
  console.log('')
  console.log('🔄 Reload the page to see new prices')
  console.log('📱 To test:')
  console.log('   1. Go to the services page')
  console.log('   2. Check if prices were updated')
  console.log('   3. Make an appointment to test')
  console.log('')
  console.log('🎯 Prices changed successfully! 🎯')

  return {
    oldPrices: currentPrices,
    newPrices: newPrices
  }
}

// Function to revert prices
function revertPrices() {
  console.log('🔄 REVERTING PRICES TO ORIGINAL VALUES 🔄')

  const originalPrices = {
    'Knotless Braids': 120,
    'Box Braids': 100,
    'Cornrows': 60,
    'Fulani Braids': 90,
    'Twist Braids': 80
  }

  // Load existing services
  const servicesData = localStorage.getItem('services')
  let services = servicesData ? JSON.parse(servicesData) : []

  // Revert to original prices
  services = services.map(service => {
    if (originalPrices[service.name]) {
      return {
        ...service,
        price: originalPrices[service.name],
        updated_at: new Date().toISOString()
      }
    }
    return service
  })

  // Save to localStorage
  localStorage.setItem('services', JSON.stringify(services))

  console.log('✅ Prices reverted to original values!')
  console.log('')
  console.log('🔄 Reload the page to see changes')
  console.log('')
  console.log('🎯 Prices reverted successfully! 🎯')
}

// Function to set custom prices
function setCustomPrices() {
  console.log('⚙️ SET CUSTOM PRICES ⚙️')
  
  const customPrices = prompt(
    'Enter prices in format: "Knotless Braids:150,Box Braids:120,Cornrows:80"',
    'Knotless Braids:150,Box Braids:120,Cornrows:80,Fulani Braids:110,Twist Braids:100'
  )

  if (!customPrices) {
    console.log('❌ Cancelled')
    return
  }

  try {
    // Parse custom prices
    const pairs = customPrices.split(',')
    const newPrices = {}
    
    pairs.forEach(pair => {
      const [service, price] = pair.split(':')
      if (service && price) {
        newPrices[service.trim()] = parseFloat(price.trim())
      }
    })

    // Load existing services
    const servicesData = localStorage.getItem('services')
    let services = servicesData ? JSON.parse(servicesData) : []

    // Update prices
    services = services.map(service => {
      if (newPrices[service.name]) {
        return {
          ...service,
          price: newPrices[service.name],
          updated_at: new Date().toISOString()
        }
      }
      return service
    })

    // Save to localStorage
    localStorage.setItem('services', JSON.stringify(services))

    console.log('✅ Custom prices set!')
    Object.entries(newPrices).forEach(([service, price]) => {
      console.log(`   • ${service}: $${price}`)
    })
    console.log('')
    console.log('🔄 Reload the page to see changes')
    console.log('')
    console.log('🎯 Custom prices applied! 🎯')
  } catch (error) {
    console.log('❌ Error processing custom prices:', error)
  }
}

// Interactive menu
function priceMenu() {
  console.log('📋 PRICE MENU 📋')
  console.log('')
  console.log('1. changePrices() - Changes to suggested prices')
  console.log('2. revertPrices() - Reverts to original prices')
  console.log('3. setCustomPrices() - Sets custom prices')
  console.log('')
  console.log('Type one of the functions above in the console and press Enter')
  console.log('')
  console.log('Example: changePrices()')
}

// Execute menu
priceMenu()
