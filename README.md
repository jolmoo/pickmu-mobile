# Pickmu — Mobile Frontend

**Role:** Mobile Frontend Developer  
**Tech Stack:** React Native, Expo, EAS, React Navigation, Context API/Redux, Geolocation APIs  

---

## Project Overview
Pickmu is a delivery mobile app connecting individuals and businesses with nearby riders. Users can request services, track orders in real time, manage profiles and wallets, upload documents, and communicate directly with riders.  

I developed the **complete mobile frontend**, including all user and rider interfaces, adaptive screens, and integration with APIs. Crucially, I managed the **EAS build process** for both **iOS and Android** and handled the **deployment to the App Store and Google Play**. My core achievement lies in the complex **Geolocation and GPS Engineering** necessary for real-time, battery-efficient rider tracking.

---

## Screens Overview

### Authentication Screens
- **Login:** User login via email, Google, or Apple.  
- **Register:** Create new accounts with email verification.  
- **Phone Verification:** Validate user phone number for security.  
- **Password Recovery:** Reset forgotten passwords.  
- **Onboarding Swiper:** Introductory slides for new users.  
- **Intro Screen:** Base introduction to the app.  

### User Screens
- **Home:** Main dashboard showing available services.  
- **Documents Upload (Docs):** Upload identification or service-related documents.  
- **Order History (Historial):** Track past services and deliveries.  
- **Profile:** View and edit user information.  
- **Wallet:** Manage balance, add funds, and view transactions.  
- **Settings (Ajustes):** App configuration options.  
- **Terms & Conditions:** Legal information.  
- **Multi-step Onboarding (OnBoarding*):** Guide users through service requests like food delivery, package pickup, or scheduled shipments.  
- **Current Order Tracking (PedidoEnCurso):** Track ongoing orders in real time.  

### Rider Screens
- **Home (inicioRider):** Rider dashboard with pending deliveries.  
- **Profile (perfilRider):** Manage personal and vehicle information.  
- **Chat:** Real-time communication between riders and users/support using Webhooks.  
- **Vehicle Management (vehiculos):** Register and manage vehicles.  
- **Documents Upload (Docs):** Upload and verify rider documents.  
- **Settings (Ajustes):** Configuration options for riders.  
- **Wallet:** Manage rider balance and transactions.  
- **Verification (verificacionRider):** Identity and vehicle verification.  
- **Rider Onboarding (RiderOnboardingSwiper):** Introductory flow specifically for riders.  

### UI Components
- **Maps (MapaPedido, TrackingMap):** Display order routes and real-time tracking.  
- **Navigation Bars (navbar, navbarRider):** Custom navigation components for users and riders.  
- **Profile Screens (profilescreen):** Detailed view of user or rider profiles.  
- **Info Pages (ayudaPage, privacidadPage, terminosPage):** Help, privacy policy, and terms & conditions.  

---

## Key Features
- Fully adaptive screens for responsive UI across devices.  
- **Advanced Geolocation & Maps:** Real-time tracking of orders and delivery routes.  
- **Rider Operational Efficiency:** Implemented **dual-mode geolocation logic** to drastically optimize rider device battery life (low-consumption **IDLE** mode and high-precision **ACTIVE** mode).
- **Authentication:** Email, Google, and Apple login options.  
- **Real-time Chat:** Communication between users, riders, and support via Webhooks.  
- **Vehicle & Document Management:** Register, verify, and manage rider information.  
- **Wallet Management:** View balance, add funds, and manage transactions.  
- **Notifications:** Push notifications for updates on services and orders using EAS.  
- **File Uploads:** Upload documents, photos, and other files securely.  

---

## Technical Deep Dive: High-Performance GPS Engineering

To ensure the mission-critical stability and efficiency of the Rider application, I engineered the following low-level solutions:

1.  **Background Persistence and Stability:** Utilized **Expo Background Task** (`LOCATION_TASK_NAME`) to maintain active geolocation and session state (token) even when the app is backgrounded. This prevents the OS from killing the app, ensuring continuous tracking—a major challenge in logistics apps.
2.  **Network and Battery Optimization (Batching):** The code dynamically manages GPS precision and employs a **batching system** (`updatesQueue`). This system collects up to 3 location updates and sends them in a single optimized network request every 5 seconds, significantly reducing resource drain and data usage.
3.  **Deployment and Build Management:** Handled the entire **EAS (Expo Application Services) workflow**, including custom *development builds* and final *production builds* for store submission, ensuring a smooth Continuous Integration/Continuous Delivery (CI/CD) process.

---

## Challenges and Solutions

During development, I faced several challenges:  

1. **Integrating advanced geolocation and real-time tracking:** Ensuring accurate location updates and map rendering on both Android and iOS while maximizing battery life.
    > **Solution:** Implemented **Dual (IDLE/ACTIVE) geolocation logic** for performance and battery saving, coupled with a **Background Task** to maintain tracking persistence.
2. **Adaptive UI for multiple screen sizes:** Some components did not scale correctly on smaller devices. Solved by using responsive layouts and dynamic styling.  
3. **Authentication across multiple providers:** Implementing Google, Apple, and email login in a single flow was complex. Used proper libraries and context-based state management to unify authentication logic.  
4. **Push notifications via EAS:** Ensuring notifications were delivered correctly for order updates and chat required proper integration and testing across platforms.
5. **Build Process and Testing:** Given the complexity of background geolocation, a strict installation flow was required for iOS testing, involving enabling **Developer Mode** and executing the JS bundle using `npx expo start --dev-client` for correct loading and real-time debugging.

Thanks to **Fernando (backend developer)** for providing support with API endpoints, debugging and backend integration, which made development much smoother.  

---

## Author
[Jolmo]  
[Portfolio Link]  
[GitHub Link]  
