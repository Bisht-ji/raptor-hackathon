#!/bin/bash

# Collapsing IDE - Setup Script
# This script sets up the entire project

echo "╔════════════════════════════════════════════════════════╗"
echo "║                                                        ║"
echo "║   💥 COLLAPSING IDE - SETUP SCRIPT                    ║"
echo "║                                                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js
echo "🔍 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please upgrade to Node.js 18+."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check npm
echo "🔍 Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..
echo ""

# Create .env file if it doesn't exist
if [ ! -f server/.env ]; then
    echo "📝 Creating .env file..."
    cp server/.env.example server/.env
    echo "✅ .env file created. Please edit it with your configuration."
else
    echo "✅ .env file already exists"
fi
echo ""

# Success message
echo "╔════════════════════════════════════════════════════════╗"
echo "║                                                        ║"
echo "║   ✅ SETUP COMPLETE!                                  ║"
echo "║                                                        ║"
echo "║   Run 'npm run dev' to start the development server   ║"
echo "║                                                        ║"
echo "║   Frontend: http://localhost:3000                      ║"
echo "║   Backend:  http://localhost:5000                      ║"
echo "║                                                        ║"
echo "║   💥 Ready for chaos!                                 ║"
echo "║                                                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
