# Automatic script to start Teresa Salon without configuration
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   STARTING TERESA SALON (LOCAL MODE)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Install from https://nodejs.org/" -ForegroundColor Red
    pause
    exit
}

# Install dependencies if needed
if (-not (Test-Path "node_modules") -or (Get-ChildItem "node_modules").Count -eq 0) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
    npm install --force
    Write-Host "✓ Dependencies installed!" -ForegroundColor Green
}

# Create gallery folder if it doesn't exist
if (-not (Test-Path "public\gallery")) {
    New-Item -ItemType Directory -Path "public\gallery" -Force
    Write-Host "✓ Gallery folder created" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 STARTING SERVER..." -ForegroundColor Blue
Write-Host ""
Write-Host "📍 Important URLs:" -ForegroundColor Cyan
Write-Host "   • Website: http://localhost:3000" -ForegroundColor White
Write-Host "   • Admin Login: http://localhost:3000/auth/login" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Admin Credentials:" -ForegroundColor Yellow
Write-Host "   • Email: admin@teresasalon.com" -ForegroundColor White
Write-Host "   • Password: TeresaAdmin2024!" -ForegroundColor White
Write-Host ""
Write-Host "📋 To add sample data:" -ForegroundColor Magenta
Write-Host "   1. Access the website" -ForegroundColor Gray
Write-Host "   2. Open browser console (F12)" -ForegroundColor Gray
Write-Host "   3. Copy and paste the content from 'setup-initial-data.js' file" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start server
npm run dev
