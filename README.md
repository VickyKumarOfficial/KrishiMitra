# 🌾 KrishiMitra - AI-Powered Crop Advisory Mobile Application

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.79+-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-51.0+-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/MongoDB-6.0+-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development Workflow](#development-workflow)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Language Support](#language-support)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

## 🎯 Overview

**KrishiMitra** is a comprehensive AI-powered mobile application designed specifically for farmers in India, with an initial focus on Jharkhand state. The application provides intelligent crop recommendations, real-time agricultural insights, market price analysis, and multilingual support to empower farmers with data-driven decision making.

### 🌟 Key Highlights

- **AI-Powered Recommendations**: Smart crop suggestions based on soil, weather, and market conditions
- **Multilingual Support**: Hindi and English interface with seamless switching
- **Real-time Data**: Live weather forecasts, soil health monitoring, and market prices
- **Offline-First Design**: Works in areas with limited connectivity
- **Mobile-Optimized**: Cross-platform React Native app for iOS and Android
- **Farmer-Centric UX**: Designed for users with varying literacy levels

## ✨ Features

### 🏠 Dashboard
- **KrishiMitra Branding**: Full-width green banner with personalized greeting
- **User Profile**: Location-based information with profile management
- **Weather Overview**: Current conditions with 3-day forecast
- **Soil Health Score**: Real-time soil metrics and recommendations
- **Quick Actions**: Easy access to key features

### 🌱 Crop Recommendations
- **Seasonal Suggestions**: AI-powered crop recommendations for current season
- **Profitability Analysis**: Expected yield and profit calculations
- **Explainable AI**: Clear reasoning behind each recommendation
- **Crop Rotation Planning**: Sustainable farming practices guidance
- **Confidence Scoring**: Reliability indicators for each suggestion

### 📊 Market Intelligence
- **Live Price Tracking**: Real-time commodity prices with trend analysis
- **Mandi Comparison**: Local market prices vs transport costs
- **Price Forecasting**: 7/14/30-day price trend charts
- **Multi-Crop Support**: Paddy, wheat, maize, sugarcane, cotton, soybean
- **Best Deal Recommendations**: Optimized selling strategies

### ☁️ Agricultural Insights
- **Comprehensive Soil Analysis**: pH, moisture, NPK levels monitoring
- **Weather Forecasting**: 7-day detailed weather predictions
- **Smart Alerts**: Color-coded warnings for weather and soil conditions
- **Actionable Recommendations**: Practical farming advice based on data

### 📸 Disease & Pest Detection
- **Image-Based Analysis**: Camera and gallery integration for crop images
- **AI Disease Identification**: Mock analysis with confidence scores
- **Treatment Recommendations**: Localized solutions and prevention tips
- **Multilingual Results**: Complete Hindi/English support

### 🤖 AI Assistant
- **Conversational Interface**: Text and voice input capabilities
- **Quick Questions**: Pre-defined farmer queries for easy access
- **Multilingual Chat**: Seamless Hindi/English communication
- **Context-Aware Responses**: Farming-specific knowledge base

## 🛠 Tech Stack

### Frontend (Mobile App)
- **React Native** 0.79+ - Cross-platform mobile development
- **Expo Router** - File-based routing and navigation
- **TypeScript** - Type-safe development
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions
- **Expo Image Picker** - Camera and gallery access
- **React Native Gifted Charts** - Data visualization
- **Ionicons** - Icon library

### Backend (API Server) *[Planned]*
- **FastAPI** - High-performance Python web framework
- **Python** 3.11+ - Server-side programming
- **Pydantic** - Data validation and serialization
- **SQLAlchemy** - Database ORM
- **Alembic** - Database migrations

### Database *[Planned]*
- **MongoDB** - Document-based NoSQL database
- **Redis** - Caching and session management

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Metro** - JavaScript bundler
- **Yarn** - Package management

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Mobile App (React Native)                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐ │
│  │  Dashboard  │ │    Crops    │ │   Market    │ │Insights│ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  AI Chat    │ │  Disease    │ │  Language   │           │
│  │   Modal     │ │ Detection   │ │  Support    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                    Mock Data Layer                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Future Backend (FastAPI)                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  Auth API   │ │  Crop API   │ │ Weather API │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Market API  │ │   AI API    │ │  User API   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                     MongoDB Database                        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Yarn** package manager ([Install](https://yarnpkg.com/getting-started/install))
- **Git** version control ([Download](https://git-scm.com/))
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **Python** 3.11+ (for backend development)

### 📱 Frontend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/krishimitra.git
   cd krishimitra
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env file with your configuration
   nano .env
   ```

4. **Start Development Server**
   ```bash
   # Start Expo development server
   expo start
   
   # For web development
   expo start --web
   
   # For specific platform
   expo start --android
   expo start --ios
   ```

5. **Install Expo Go App**
   - Download Expo Go from [App Store](https://apps.apple.com/app/apple-store/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - Scan QR code from terminal to run on device

### 🖥 Backend Setup *[For Future Development]*

1. **Setup Python Environment**
   ```bash
   cd backend
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

2. **Install Backend Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Database Setup**
   ```bash
   # Install MongoDB locally or use MongoDB Atlas
   # Update MONGO_URL in .env file
   
   # Run database migrations
   alembic upgrade head
   ```

4. **Start Backend Server**
   ```bash
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   ```

### 🐳 Docker Setup *[Optional]*

1. **Using Docker Compose**
   ```bash
   # Build and start all services
   docker-compose up --build
   
   # Start in background
   docker-compose up -d
   
   # Stop services
   docker-compose down
   ```

2. **Individual Container Setup**
   ```bash
   # Frontend container
   docker build -t krishimitra-frontend ./frontend
   docker run -p 3000:3000 krishimitra-frontend
   
   # Backend container
   docker build -t krishimitra-backend ./backend
   docker run -p 8001:8001 krishimitra-backend
   ```

## 📁 Project Structure

```
krishimitra/
├── 📱 frontend/                 # React Native Mobile App
│   ├── 📂 app/                  # Expo Router Pages
│   │   ├── 📄 index.tsx         # Main entry point
│   │   └── 📂 screens/          # App screens
│   │       ├── 📄 DashboardScreen.tsx
│   │       ├── 📄 CropRecommendationsScreen.tsx
│   │       ├── 📄 MarketPricesScreen.tsx
│   │       ├── 📄 InsightsScreen.tsx
│   │       ├── 📄 AIChatModal.tsx
│   │       └── 📄 DiseaseDetectionModal.tsx
│   ├── 📂 assets/               # Images, fonts, etc.
│   ├── 📂 components/           # Reusable components
│   ├── 📂 utils/                # Utility functions
│   ├── 📂 hooks/                # Custom React hooks
│   ├── 📂 types/                # TypeScript definitions
│   ├── 📄 package.json          # Dependencies
│   ├── 📄 app.json              # Expo configuration
│   ├── 📄 metro.config.js       # Metro bundler config
│   ├── 📄 tsconfig.json         # TypeScript config
│   └── 📄 .env                  # Environment variables
│
├── 🖥 backend/                  # FastAPI Backend (Future)
│   ├── 📄 server.py             # Main FastAPI app
│   ├── 📂 api/                  # API routes
│   ├── 📂 models/               # Database models
│   ├── 📂 services/             # Business logic
│   ├── 📂 utils/                # Utility functions
│   ├── 📄 requirements.txt      # Python dependencies
│   └── 📄 .env                  # Backend environment
│
├── 📂 docs/                     # Documentation
├── 📂 tests/                    # Test files
├── 📄 docker-compose.yml        # Docker configuration
├── 📄 README.md                 # This file
└── 📄 LICENSE                   # License information
```

## ⚙️ Configuration

### Frontend Environment Variables (.env)

```bash
# Expo Configuration
EXPO_TUNNEL_SUBDOMAIN=your-subdomain
EXPO_PACKAGER_HOSTNAME=your-hostname
EXPO_PACKAGER_PROXY_URL=your-proxy-url
EXPO_USE_FAST_RESOLVER=1
METRO_CACHE_ROOT=./frontend/.metro-cache

# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:8001
EXPO_PUBLIC_APP_ENV=development

# Feature Flags
EXPO_PUBLIC_ENABLE_AI_CHAT=true
EXPO_PUBLIC_ENABLE_DISEASE_DETECTION=true
EXPO_PUBLIC_ENABLE_OFFLINE_MODE=true
```

### Backend Environment Variables (.env)

```bash
# Database Configuration
MONGO_URL=mongodb://localhost:27017/krishimitra
REDIS_URL=redis://localhost:6379

# API Configuration
API_HOST=0.0.0.0
API_PORT=8001
DEBUG=true

# Security
SECRET_KEY=your-secret-key-here
JWT_SECRET=your-jwt-secret-here
JWT_EXPIRE_HOURS=24

# External APIs
WEATHER_API_KEY=your-weather-api-key
SOIL_API_KEY=your-soil-api-key
MARKET_API_KEY=your-market-api-key

# AI/ML Configuration
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
```

## 🔄 Development Workflow

### Code Quality

```bash
# Linting
yarn lint                        # Check code style
yarn lint:fix                   # Fix auto-fixable issues

# Type checking
yarn type-check                  # TypeScript validation

# Testing
yarn test                        # Run all tests
yarn test:watch                 # Watch mode
yarn test:coverage              # Coverage report
```

### Git Workflow

```bash
# Feature development
git checkout -b feature/your-feature-name
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name

# Create pull request on GitHub
```

### Building for Production

```bash
# Frontend build
cd frontend
expo build:android              # Android APK
expo build:ios                  # iOS IPA

# Backend build
cd backend
docker build -t krishimitra-backend .
```

## 📚 API Documentation

### Current Mock Data Structure

The app currently uses structured mock data that mirrors the expected API responses:

#### Weather Data
```json
{
  "temperature": 28,
  "condition": "Partly Cloudy",
  "humidity": 68,
  "rainfall": 5.2,
  "icon": "partly-sunny",
  "forecast": [
    {
      "day": "Tomorrow",
      "temp": 30,
      "condition": "Sunny",
      "icon": "sunny",
      "rain": 0
    }
  ]
}
```

#### Soil Health Data
```json
{
  "score": 78,
  "pH": 6.8,
  "moisture": 45,
  "temperature": 24,
  "status": "Good",
  "nitrogen": 78,
  "phosphorus": 65,
  "potassium": 82
}
```

#### Crop Recommendations
```json
{
  "id": 1,
  "name": "Paddy Rice",
  "hindiName": "धान",
  "confidence": 92,
  "profitability": 85,
  "yieldForecast": "4.2 tons/hectare",
  "profit": "₹45,000/hectare",
  "reasons": [
    "High soil moisture content (45%)",
    "Optimal pH level (6.8)"
  ]
}
```

### Future API Endpoints

```
GET  /api/v1/weather/current          # Current weather
GET  /api/v1/weather/forecast         # Weather forecast
GET  /api/v1/soil/health             # Soil health data
GET  /api/v1/crops/recommendations   # Crop recommendations
GET  /api/v1/market/prices           # Market prices
POST /api/v1/disease/detect          # Disease detection
POST /api/v1/chat/message            # AI chat
```

## 📱 Screenshots

### Dashboard View
*Main dashboard with weather, soil health, and quick actions*

### Language Switching
*Functional Hindi/English language toggle*

### Crop Recommendations
*AI-powered crop suggestions with profitability analysis*

### Market Prices
*Real-time market price tracking and trends*

## 🌐 Language Support

### Implemented Languages
- **Hindi (हिंदी)** - Primary language for Indian farmers
- **English** - Secondary language for broader accessibility

### Language Features
- **Seamless Switching**: Toggle between languages instantly
- **Persistent Selection**: Language preference saved across sessions
- **Complete Coverage**: All UI elements, messages, and content translated
- **Regional Context**: Hindi translations use farming-specific terminology

### Adding New Languages

1. **Update Language Texts Function**
   ```typescript
   const getLanguageTexts = (language: string) => ({
     // Add new language case
     appName: language === 'marathi' ? 'कृषीमित्र' : 'KrishiMitra',
     // ... other translations
   });
   ```

2. **Add Language Option in Profile**
   ```typescript
   <TouchableOpacity onPress={() => changeLanguage('marathi')}>
     <Text>मराठी (Marathi)</Text>
   </TouchableOpacity>
   ```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the Repository**
   ```bash
   git fork https://github.com/your-username/krishimitra.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow the coding standards
   - Add tests for new features
   - Update documentation

4. **Commit Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Submit Pull Request**
   - Describe your changes
   - Include screenshots if applicable
   - Reference any related issues

### Code Style Guidelines

- **TypeScript**: Use strict typing
- **React Native**: Follow React Native best practices
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comments for complex logic
- **Testing**: Write unit tests for new features

### Issue Reporting

Found a bug? Have a feature request? Please create an issue:

1. **Check Existing Issues**: Avoid duplicates
2. **Use Templates**: Follow issue templates
3. **Provide Details**: Include steps to reproduce
4. **Add Labels**: Help categorize the issue

## 🗺 Roadmap

### Phase 1: Core Features ✅
- [x] Dashboard with weather and soil health
- [x] Crop recommendations system
- [x] Market price tracking
- [x] Language switching (Hindi/English)
- [x] Disease detection UI
- [x] AI chat interface

### Phase 2: Backend Integration 🔄
- [ ] FastAPI backend setup
- [ ] MongoDB database integration
- [ ] User authentication system
- [ ] Real API data integration
- [ ] Offline synchronization

### Phase 3: AI/ML Features 🚀
- [ ] Real AI crop recommendations
- [ ] Disease detection ML model
- [ ] Price prediction algorithms
- [ ] Personalized recommendations
- [ ] Voice input processing

### Phase 4: Advanced Features 🌟
- [ ] IoT sensor integration
- [ ] Satellite imagery analysis
- [ ] Social features for farmers
- [ ] Marketplace integration
- [ ] Insurance integration

### Phase 5: Scale & Expansion 🌍
- [ ] Multi-state coverage
- [ ] Regional language support
- [ ] Government integration
- [ ] Cooperative features
- [ ] Analytics dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 KrishiMitra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact & Support

### Development Team
- **Project Maintainer**: [Your Name](mailto:your.email@example.com)
- **Contributors**: See [Contributors](https://github.com/your-username/krishimitra/contributors)

### Community
- **GitHub Issues**: [Report bugs or request features](https://github.com/your-username/krishimitra/issues)
- **Discussions**: [Community discussions](https://github.com/your-username/krishimitra/discussions)
- **Discord**: [Join our developer community](https://discord.gg/krishimitra)

### Commercial Support
- **Email**: support@krishimitra.com
- **Phone**: +91-9876543210
- **Website**: [www.krishimitra.com](https://www.krishimitra.com)

---

<div align="center">
  <p>Made with ❤️ for Indian Farmers</p>
  <p>🌾 <strong>KrishiMitra</strong> - Empowering Agriculture with AI 🌾</p>
</div>
