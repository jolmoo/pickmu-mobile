# GPS Engine — Pickmu Rider

Real-time background location tracking module for the Pickmu rider app.  
Designed for production logistics: continuous GPS on Android & iOS with minimal battery impact.

---

## The Problem

A delivery app needs to track riders continuously — including when the app is backgrounded or the screen is off. The naive approach (track always at max accuracy) drains the battery in ~3 hours and floods the backend with redundant updates.

## The Solution: Dual-Mode Tracking

The engine operates in two modes depending on rider state:

| Mode | When | Accuracy | Distance Threshold | Battery Impact |
|------|------|----------|--------------------|----------------|
| `IDLE` | Online, no active delivery | Balanced | 100m | Minimal |
| `ACTIVE` | On a live delivery | BestForNavigation | 30m | Controlled |

Switching between modes is a single function call:

```js
startBackgroundLocation("IDLE");   // rider goes online
startBackgroundLocation("ACTIVE"); // rider accepts a delivery
stopBackgroundLocation();          // rider goes offline
```

---

## Architecture

```
OS GPS Events
     │
     ▼
TaskManager (Background Task)          ← runs even when app is backgrounded
     │
     ├─► globalLocationCache (RAM)     ← zero-cost reads by polling loop
     │
     └─► POST /refresh_Driver/         ← only if active service exists
           (lat, lng, timestamp, config)

Polling Loop (UI Thread, every 5s)
     │
     └─► READ globalLocationCache      ← no GPS call, no I/O
           → fetch orders from server
           → update map UI
```

### Why globals instead of AsyncStorage?

AsyncStorage is async — reading it on every GPS tick adds I/O latency and wakes the CPU unnecessarily. The globals act as a synchronous RAM bridge between the background task and the React component, with zero battery cost per read.

### Why 30m distance threshold in ACTIVE mode?

Testing on real delivery routes showed that updates more frequent than 30m introduced "ghost jumps" (GPS noise) and caused the backend to receive contradictory position data. 30m filters noise while maintaining smooth polyline rendering on the map.

---

## Usage

```js
import {
  startBackgroundLocation,
  stopBackgroundLocation,
  requestLocationPermissions,
  globalLocationCache,
  globalToken,
  globalDriverConfig,
} from "./gps/locationEngine";

// 1. Request permissions on app init
const granted = await requestLocationPermissions();

// 2. Set shared config before going online
globalToken = await SecureStore.getItemAsync("userToken");
globalDriverConfig.vehiculo_servicio_id = savedVehicleId;

// 3. Start tracking
await startBackgroundLocation("IDLE");

// 4. Read location at zero cost from anywhere in the app
const { latitude, longitude } = globalLocationCache;
```

---

## Files

```
gps/
└── locationEngine.js   # Task definition, mode configs, public API
```

---

## Tech Stack

- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) — GPS & background tasks
- [Expo TaskManager](https://docs.expo.dev/versions/latest/sdk/task-manager/) — background execution on iOS & Android
- React Native + TypeScript
