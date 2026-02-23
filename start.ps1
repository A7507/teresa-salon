# Script to start Teresa Salon project
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Starting Teresa Salon" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    pause
    exit
}

# Check if .env.local file is configured
$envFile = ".env.local"
$envContent = Get-Content $envFile -Raw
if ($envContent -match "your-project.supabase.co" -or $envContent -match "your_anon_key_here") {
    Write-Host "⚠️  ATTENTION: You need to configure the .env.local file!" -ForegroundColor Yellow
    Write-Host "1. Go to https://supabase.com" -ForegroundColor White
    Write-Host "2. Create a project or use an existing one" -ForegroundColor White
    Write-Host "3. Go to Project Settings > API" -ForegroundColor White
    Write-Host "4. Copy the URL and anon key" -ForegroundColor White
    Write-Host "5. Replace in the .env.local file" -ForegroundColor White
    Write-Host ""
    Write-Host "Do you want to continue anyway? (y/n): " -ForegroundColor Yellow -NoNewline
    $response = Read-Host
    if ($response -ne "y") {
        Write-Host "Setup cancelled. Configure .env.local and try again." -ForegroundColor Red
        pause
        exit
    }
}

Write-Host "✓ Environment check completed" -ForegroundColor Green
Write-Host ""

# Install dependencies if needed
Write-Host "📦 Checking dependencies..." -ForegroundColor Cyan
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""

# Start the development server
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host "📱 The application will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor White
Write-Host ""

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "✓ package.json found" -ForegroundColor Green
    npm run dev
} else {
    Write-Host "✗ package.json not found. Make sure you are in the project directory." -ForegroundColor Red
    pause
}
