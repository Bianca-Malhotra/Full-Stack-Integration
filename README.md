# 🛰️ SafeRoute: Operational Security Platform

**SafeRoute** is a high-fidelity, enterprise-grade personal safety platform engineered to empower individuals with real-time risk assessment, stealth emergency protocols, and intelligence-led telemetry. Designed for professional workstations and expansive 1800px horizons.

![SafeRoute Integrity](https://img.shields.io/badge/Status-Operational-0ea5e9)
![License](https://img.shields.io/badge/License-MIT-0369a1)
![Auth](https://img.shields.io/badge/Security-JWT%207D-0ea5e9)

---

## 🏛️ Architecture: The Intelligence Hub
The platform is structured into a logical, high-performance workstation hierarchy:
- **🏠 Intelligence Hub (Root /)**: The grand landing home with tactical feature showcases and the Operational Mission.
- **🖥️ Operational Dashboard (/dashboard)**: The primary 3-column command center for real-time monitoring and active protocols.
- **🔐 Security Network (/contacts)**: A dedicated 4-column workstation for authorizing and managing high-security endpoints.

---

## ✨ Core Tactical Protocols

### 📡 Global Telemetry
Real-time location synchronization across secure cloud architecture, ensuring your network always knows your precise coordinates during active journeys.

### 🔏 Stealth SOS Broadcasting
Trigger emergency alerts silently with a single high-fidelity interaction. Encrypted event data is dispatched to authorized endpoints instantly via SMTP protocols.

### 🛡️ Safe-Zone Routing
Integrated intelligence that identifies verified safe-havens, tactical escape routes, and spoofing protocols to set up immediate extraction points.

### ⌛ Arrival Protocol
Automated time-horizon monitoring. If manual confirmation isn't received within the specified window, the platform automatically escalates telemetry to your security network.

---

## 🎨 Design System: "Sky Workspace"
The platform features a proprietary **Sky Workspace** theme designed for maximum clarity and professional impact:
- **Expansive Horizon**: Optimized for **1800px workstation** displays with wide-grid architecture.
- **Jewel Gloss Buttons**: High-fidelity gradients, 3D inner glows, and lustrous shimmer hover effects.
- **Airy Palette**: A fresh `#f0f7ff` sky-blue background paired with authoritative navy typography.
- **Broad Inputs**: Tactical, massive interaction targets for rapid data entry during critical moments.

---

## 🛠 Tech Stack

### Frontend (Modern React)
- **React 18+ (Vite)** - High-speed build and rendering.
- **Lazy Loading** - Dynamic route-based code splitting for instantaneous module delivery.
- **Glass-Morphism** - High-fidelity visual depth and premium card layering.
- **CSS3 Variables** - Centralized theme tokens for the Sky Workspace palette.

### Backend (Spring Boot Core)
- **Spring Boot 3** - Enterprise Java framework for safety-critical logic.
- **JWT Security** - Stateless 7-day session management with high-entropy signing.
- **SMTP Alerts** - Professional email notification system for global dispatch.
- **Spring Data JPA** - Optimized MySQL 8 mapping for safety registries.

---

## 🚀 Deployment Checklist

### Prerequisites
- **Java JDK 17+**
- **Node.js 18+**
- **MySQL 8.0**
- **SMTP Server** (Gmail App Password recommended)

### Critical Configuration
Update your `application.properties` with the following tactical secrets:
```properties
jwt.secret=YOUR_CUSTOM_256_BIT_SECRET
app.jwt.expiration-ms=604800000
spring.mail.password=${SMTP_PASSWORD}
```

### Installation Sequence
1. **Clone & Target**: `git clone https://github.com/Bianca-Malhotra/Full-Stack-Integration.git`
2. **Launch Backend**: `mvn spring-boot:run` (Starts on :8081)
3. **Launch Frontend**: `npm install && npm run dev` (Starts on :5173)

---

## 🤝 Developer Spotlight
**SafeRoute** was architected and developed with a passion for public safety and high-fidelity tactical design by **Bianca Malhotra**.

- **GitHub**: [Bianca-Malhotra](https://github.com/Bianca-Malhotra)
- **LinkedIn**: [Bianca Malhotra](https://www.linkedin.com/in/bianca-malhotra/)

---

*© 2026 SafeRoute Operational Security Platform. Built with ❤️ for Global Safety.*