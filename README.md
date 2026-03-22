# 📦 Pickmu — Mobile Frontend Application

**Role:** Mobile Frontend Engineer  
**Platform:** iOS & Android  
**Status:** Production-ready / Field-tested  
**Repository Type:** Mobile Client (React Native)

---

## 🔍 Why This Project Matters

Pickmu is a production-grade mobile application, actively used by the company for real-world logistics. 
It demonstrates experience in building high-performance mobile systems, including real-time geolocation, background execution, and scalable architecture.

---

## 🚀 Project Overview

**Pickmu** is a mobile delivery platform that connects individuals and businesses with nearby riders to perform **on-demand and scheduled services** (food delivery, package pickup, express shipments, etc.).

This repository contains the **entire mobile frontend** of the application, covering **both User and Rider experiences**, built from scratch using **React Native with Expo**.

### My responsibilities included:

- Full mobile frontend architecture and implementation (~40+ screens)
- Design and implementation of a real-time, battery-efficient GPS tracking system
- Integration with multiple backend services and async data flows
- State management for complex multi-role application logic
- CI/CD ownership using Expo Application Services (EAS)
- Production builds and store deployment (App Store & Google Play)

A key technical challenge — and the main differentiator of this project — was the design of a **high-performance real-time rider tracking system** suitable for continuous, real-world logistics usage.

---

## 🖥️ Production Application

The **Pickmu** app is currently **actively used by the company** for logistics operations.  
This is the final production version, available for download on the **Apple App Store** and **Google Play Store**, including all User and Rider flows.

This allows evaluators to directly experience **user interactions, real-time tracking, order management, and all production functionalities**, demonstrating the real-world impact of this project.

> Note: This section is intended for frontend technical evaluation. No access to sensitive customer data is required to explore the application.
---

## 🧱 Tech Stack

### Core Technologies
- React Native
- TypeScript
- Expo & EAS

### State & Navigation
- React Navigation
- Context API / Redux

### Platform & Services
- Geolocation & Maps APIs
- Expo Background Tasks
- Push Notifications (EAS)

---

## 📱 Application Structure

The app is divided into two main operational flows.

### 👤 User Application
Authentication, onboarding, service requests, real-time tracking, order history, wallet & transactions, document uploads, profile & settings.

### 🏍️ Rider Application
Rider onboarding, active & pending services, real-time tracking, chat, wallet & earnings, service history, vehicle & document management.

---

## ✨ Key Features

- **Fully Adaptive UI**  
  Responsive layouts across a wide range of Android and iOS devices.

- **Advanced Real-Time Geolocation**  
  Live rider and order tracking with map visualization.

- **Battery-Efficient GPS Architecture**  
  Custom dual-mode tracking system designed for production logistics usage.

- **Multi-Provider Authentication**  
  Email, Google, and Apple authentication under a unified auth flow.

- **Real-Time Communication**  
  Rider ↔ User ↔ Support communication.

- **Wallet & Transactions**  
  Balance management, top-ups, and transaction history.

- **Push Notifications**  
  Order updates, chat messages, and system alerts via EAS.

- **Secure File Uploads**  
  Identity and vehicle document handling.

---

## 🧠 Technical Deep Dive — High-Performance GPS Engineering

Continuous rider tracking — including background execution — is a **mission-critical component** of Pickmu.  
The system was designed to balance **accuracy, OS limitations, network usage, and battery consumption**.

### Background Location Persistence

- Implemented Expo Background Tasks using `LOCATION_TASK_NAME`
- Ensures GPS tracking continues when the app is backgrounded
- Session state persistence prevents OS task termination
- Supports reliable tracking on both iOS and Android

### Dual-Mode Geolocation Strategy

To minimize battery drain without sacrificing accuracy:

- **IDLE Mode**
  - Low-frequency updates
  - Reduced precision
  - Used when rider is inactive or waiting

- **ACTIVE Mode**
  - High-precision tracking
  - Enabled only during active deliveries

### Network & Battery Optimization (Batching)

- GPS updates are queued locally
- Up to **3 location points** are sent in a **single request every 5 seconds**
- Significantly reduces battery usage, network overhead, and backend load

---
## 📁 Code Sample

The GPS engine is available as a standalone module → [`gps/locationEngine.js`](./gps/locationEngine.js)

---

## ⚙️ Build, Deployment & CI/CD

- Managed the complete EAS workflow
- Custom development builds for advanced debugging
- Production builds for:
  - Apple App Store
  - Google Play Store
- Platform-specific background execution validation
- Strict iOS background testing using dev-client builds

---

## 🧪 Testing Strategy

Due to the nature of mobile background services and time constraints, automated testing is currently limited.

The project focuses on:
- Real-device field testing
- Background execution stress tests
- Battery consumption analysis
- Network instability scenarios

**Planned improvements:**
- Unit tests for business logic
- Integration tests for critical application flows

---

## 🧪 Real-World Testing & Validation

The application was tested during **live field operations**, including real delivery routes and production-like usage.

The screenshots below are **real production captures**, provided by the Pickmu team during testing phases.

<p align="center">
  <img src="assets/pickmu1.jpg" width="32%" />
  <img src="assets/pickmu2.jpg" width="32%" />
  <img src="assets/pickmu3.jpg" width="32%" />
  <br />
  <small><i>Login · User Home · Package Details</i></small>
</p>

<p align="center">
  <img src="assets/pickmu4.jpg" width="32%" />
  <img src="assets/pickmu5.jpg" width="32%" />
  <img src="assets/pickmu6.jpg" width="32%" />
  <br />
  <small><i>Address Selection · Real-Time Tracking · Order History</i></small>
</p>

<p align="center">
  <img src="assets/pickmu7.jpg" width="32%" />
  <img src="assets/pickmu8.jpg" width="32%" />
  <img src="assets/pickmu9.jpg" width="32%" />
  <br />
  <small><i>Rider Home · Rider Service Request · Rider In-Service</i></small>
</p>

<p align="center">
  <img src="assets/pickmu10.jpg" width="32%" />
  <br />
  <small><i>Rider History</i></small>
</p>

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
|--------|---------|
| Background GPS reliability | Expo Background Tasks + session persistence |
| Battery drain | Dual-mode tracking (IDLE / ACTIVE) |
| Multi-provider authentication | Unified auth logic via Context / Redux |
| Adaptive UI | Responsive layouts and dynamic styling |
| Push notifications | EAS integration with cross-platform testing |
| iOS background testing | Dev-client builds and strict install flow |

---

## ⚠️ Notes

This repository contains the **frontend implementation only**.  
Sensitive backend logic and infrastructure are intentionally excluded.

---

## 🤝 Acknowledgements

Special thanks to **Fernando** (Pickmu CTO) for collaboration on API design, debugging, and backend integration.

---

## 👤 Author

**Jolmo** 
- 🌐 Portfolio: https://jolmol.com
- 💻 GitHub: https://github.com/jolmoo

