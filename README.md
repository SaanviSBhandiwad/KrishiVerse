🌟 Overview KrishiVerse is a revolutionary gamified platform that educates and motivates Indian farmers to adopt sustainable agricultural practices. By combining AI guidance, real-time market data, and engaging gameplay, we're making sustainable farming accessible, profitable, and enjoyable for all generations.

🎯 Problem Statement Farmers stuck in unsustainable practices (chemicals, over-irrigation, mono-cropping) Traditional training methods fail to inspire lasting change Youth disconnection from agriculture as a career Lack of integrated market intelligence and government scheme awareness

💡 Our Solution A comprehensive ecosystem with six integrated modules that work together to create behavioral change through gamification and practical utility.

🚀 Features Core Modules Module Icon Description Status KrishiGrow 🎯 Gamified quests with photo verification & rewards

KrishiPlay 🎮 Digital twin farm simulation game

KrishiMa 👵 AI-powered farming assistant (Gemini API)

KrishiMart 📊 Real-time market intelligence (AGMARKNET/e-NAM)

KrishiKnow 👥 Community knowledge sharing platform

Gov Schemes 🏛️ Government scheme discovery & tracker

🛠 Tech Stack Frontend React 18 - Modern UI framework

React Router - Navigation and routing

Context API - State management

Tailwind CSS - Utility-first styling

Framer Motion - Animations and transitions

Chart.js - Data visualization for market trends

Backend & Services

Firebase Auth - User authentication

Cloud Firestore - Real-time database

Firebase Storage - Image uploads for quest verification

Cloud Functions - Serverless backend logic

Google Gemini API - AI-powered farming guidance

Google Cloud Vision API - Image analysis for quest verification

External APIs

AGMARKNET - Agricultural market data

e-NAM - National agricultural market prices

OpenWeather API - Weather forecasting

Government Schemes API - Scheme information and tracking

Development Tools

Vite - Fast build tool and dev server

ESLint & Prettier - Code quality and formatting

Jest & React Testing Library - Testing framework

GitHub Actions - CI/CD pipeline

Data Flow

User Action → Firebase Auth → Profile Creation

Quest Completion → Photo Upload → Vision API → Verification → Rewards

Market Query → AGMARKNET/e-NAM APIs → Real-time Data Display

AI Chat → Gemini API → Contextual Response

📦 Installation

Prerequisites

Node.js 18+

npm or yarn

Firebase project

Google Cloud project with Gemini API access

Step-by-Step Setup

Clone the repository

bash git clone https://github.com/SaanviSBhandiwad/krishiverse.git cd krishiverse

Install dependencies

bash npm install
