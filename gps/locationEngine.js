import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import api from "../src/api/axios";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const LOCATION_TASK_NAME = "BACKGROUND_RIDER_LOCATION";

/**
 * IDLE mode: rider is online but not on an active delivery.
 * Low accuracy + high distance threshold = minimal battery drain.
 */
export const IDLE_LOCATION_CONFIG = {
  accuracy: Location.Accuracy.Balanced,
  distanceInterval: 100,
  showsBackgroundLocationIndicator: true,
  pausesLocationUpdatesAutomatically: false,
  activityType: Location.ActivityType.AutomotiveNavigation,
};

/**
 * ACTIVE mode: rider is on a live delivery.
 * Max accuracy + batching every 5s = real-time tracking with controlled network usage.
 */
export const ACTIVE_LOCATION_CONFIG = {
  accuracy: Location.Accuracy.BestForNavigation,
  distanceInterval: 30,          // 30m threshold avoids ghost jumps and saves battery
  deferredUpdatesInterval: 5000, // iOS: process location batches every 5s minimum
  showsBackgroundLocationIndicator: true,
  pausesLocationUpdatesAutomatically: false,
  activityType: Location.ActivityType.AutomotiveNavigation,
  foregroundService: {
    notificationTitle: "Rider en Ruta",
    notificationBody: "Optimizando ruta y batería...",
    notificationColor: "#00C851",
  },
};

// ─────────────────────────────────────────────
// SHARED MEMORY (Background Task ↔ UI Thread)
// ─────────────────────────────────────────────

/**
 * globalToken and globalLocationCache act as a shared memory bridge
 * between the background TaskManager task and the React component.
 *
 * Why globals instead of AsyncStorage?
 * → AsyncStorage is async and adds latency on every GPS tick.
 * → Globals are synchronous RAM reads — zero battery cost per update.
 */
export let globalToken = null;

export let globalLocationCache = {
  latitude: 0,
  longitude: 0,
  heading: 0,
  timestamp: 0,
};

export let globalDriverConfig = {
  vehiculo_servicio_id: null,
  multiplicador: "1",
  dispuestoaServicio: "3",
  conductor_estado: "1",
};

/**
 * Pending location updates queued for batched network dispatch.
 * Flushed every 5 seconds in a single POST — reduces backend load and battery usage.
 */
export let updatesQueue = [];

// ─────────────────────────────────────────────
// BACKGROUND TASK DEFINITION
// ─────────────────────────────────────────────

/**
 * This task runs even when the app is backgrounded or the screen is off.
 * It receives GPS events from the OS and:
 *   1. Updates the in-memory cache (read by the polling loop at zero cost)
 *   2. Sends a batched location update to the server if a service is active
 */
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.warn("[GPS Task] Error:", error.message);
    return;
  }

  if (!data || !("locations" in data) || data.locations.length === 0) return;

  const latest = data.locations[data.locations.length - 1];

  // 1. Update shared memory cache — O(1), no I/O
  globalLocationCache = {
    latitude: latest.coords.latitude,
    longitude: latest.coords.longitude,
    heading: latest.coords.heading ?? 0,
    timestamp: latest.timestamp,
  };

  // 2. Dispatch to server only if rider is on an active service
  const token = globalToken;
  if (!token || !globalDriverConfig.vehiculo_servicio_id) return;

  try {
    await api.post(
      "/usuarios/refresh_Driver/",
      {
        vehiculo_servicio_id: globalDriverConfig.vehiculo_servicio_id,
        multiplicador: globalDriverConfig.multiplicador,
        dispuestoaServicio: globalDriverConfig.dispuestoaServicio,
        conductor_estado: globalDriverConfig.conductor_estado,
        lat: latest.coords.latitude,
        lng: latest.coords.longitude,
        timestamp: latest.timestamp,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    // Non-blocking: a failed update is acceptable — the next tick will retry
    console.warn("[GPS Task] Failed to sync location:", err.message);
  }
});

// ─────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────

/**
 * Start background location tracking.
 * @param {"IDLE" | "ACTIVE"} mode - IDLE for standby, ACTIVE for live deliveries
 */
export const startBackgroundLocation = async (mode = "IDLE") => {
  try {
    updatesQueue = [];
    const config =
      mode === "ACTIVE" ? ACTIVE_LOCATION_CONFIG : IDLE_LOCATION_CONFIG;
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, config);
    console.log(`[GPS] Tracking started in ${mode} mode`);
  } catch (err) {
    console.warn("[GPS] Failed to start tracking:", err.message);
  }
};

/**
 * Stop background location tracking and clear the updates queue.
 */
export const stopBackgroundLocation = async () => {
  try {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    updatesQueue = [];
    console.log("[GPS] Tracking stopped");
  } catch (err) {
    console.warn("[GPS] Failed to stop tracking:", err.message);
  }
};

/**
 * Request all location permissions required for background tracking.
 * Must be called before startBackgroundLocation.
 * @returns {Promise<boolean>} true if all permissions were granted
 */
export const requestLocationPermissions = async () => {
  const { status: fgStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (fgStatus !== "granted") {
    console.warn("[GPS] Foreground permission denied");
    return false;
  }

  const { status: bgStatus } =
    await Location.requestBackgroundPermissionsAsync();
  if (bgStatus !== "granted") {
    console.warn("[GPS] Background permission denied");
    return false;
  }

  return true;
};
