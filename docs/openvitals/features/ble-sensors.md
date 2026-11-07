# Bluetooth LE Sensors

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/settings`, `features/manualentry/activity/recording`.
> **Navigation:** `Screen.SettingsSensors`, `Screen.ActivityEntry`.
> **Related:** [Feature map](feature-map.md), [Recording of activity](activity-recording.md), [Smartwatches](smartwatches.md), [Permissions](../app/permissions.md).

OpenVitals has experimental Bluetooth LE support for activity recording.

This page covers sensors that stream while you record — a chest strap, a cadence sensor, a power meter. A smartwatch is not a sensor in this sense: it records on its own and syncs afterwards, either directly with OpenVitals (Garmin, or Wear OS with the OpenVitals watch app) or through its companion app and Health Connect. See [Smartwatches](smartwatches.md).

## Supported Recording Signals

Supported sensor families can include:

- Heart rate.
- Cycling cadence.
- Cycling speed and distance, from a wheel speed sensor.
- Cycling power.
- Footpod-style movement data.

Sensor availability depends on the device, Android permissions, and the Bluetooth sensor's advertised services.

## Where Sensors Are Used

BLE sensors are used during activity recording and repetition-oriented training when compatible data is available. Heart-rate sensors can enrich GPS recordings, strength training, and repetition training summaries.

### Bike Sensors

Any ride, including one on a stationary bike or with GPS off, can show cadence, speed, distance, average speed, average moving speed, and max speed from bike sensors.

A wheel speed sensor measures distance from wheel turns:

- Only turns made while recording count, so pauses are left out.
- A sensor that reconnects neither loses nor doubles the distance.
- The distance survives the system closing the app during a ride.

Once the sensor reports, its distance and top speed are used instead of the GPS ones: on the recording screen, in the notification, in voice announcements, and in the saved workout. GPS still draws the route. A ride without a route fills the review form with the sensor distance.

Distance comes from the wheel circumference set for the sensor in Settings, Sensors & devices. It defaults to 2100 mm and accepts any whole number from 500 to 3000 mm, so a sensor can be calibrated for a small or a large wheel.

## Sensor Settings

Settings can show saved sensor devices, connection status, and battery information when available.

## Permissions And Timeouts

OpenVitals requests Bluetooth and notification permissions only where Android requires them. During recording, stale sensor values are timed out so old readings do not continue to appear as live data.

## Privacy

Sensor data is used locally for recording and review. Saved activity data is written through Health Connect only when the user chooses to save the recording.
