# MedCompare Global 🏥


> **Global Medical Price Intelligence** — Empowering healthcare procurement with real-time price comparisons and technical specifications from leading global manufacturers.

---

## 🌟 Overview

**MedCompare Global** is a high-performance web platform designed to streamline the procurement of medical equipment and supplies. By aggregating pricing and specifications from international markets, it allows medical centers to make informed, data-driven purchasing decisions with ease.

## ✨ Key Features

- 🔍 **Intelligent Search**: Rapidly find products ranging from pharmaceuticals to high-end diagnostic equipment.
- 💱 **Multi-Currency Support**: Real-time conversion across **INR, USD, EUR, GBP, JPY, and CAD**. 
- ⚖️ **Advanced Comparison**: Side-by-side analysis of up to 4 products, highlighting price differences and technical specs.
- 📊 **Search Intelligence**: "Compare All" functionality to visualize entire result sets instantly.
- 🎨 **Premium UI/UX**: Clean, modern interface built for professional environments with a focus on usability.
- 📱 **Responsive Design**: Seamless experience across all devices, from mobile to ultra-wide monitors.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) (Vite)
- **Styling**: Vanilla CSS (Custom Design System)
- **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)
- **State Management**: React Hooks (Custom `useCurrency` hook for live conversion)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Daisy-code77/Global-Medical-Price-Intelligence.git
   cd Global-Medical-Price-Intelligence
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```text
├── src/
│   ├── components/      # UI Components (Navbar, ProductCard, Modals)
│   ├── hooks/           # Custom React Hooks (useCurrency)
│   ├── data/            # Mock Product Database & Search Suggestions
│   ├── App.jsx          # Main Application Logic
│   └── index.css        # Global Styles & Theme
├── public/              # Static Assets (Logos, Banners)
└── firebase.json        # Deployment Configuration
```

## 🌐 Deployment

The platform is configured for automated deployment via Firebase.

```bash
npm run build
firebase deploy
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created with ❤️ for the Medical Community.*
