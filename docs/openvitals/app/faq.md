# FAQ

## Does OpenVitals Upload My Health Data?

No. The local OpenVitals app does not ship app-level internet permission and does not upload health data to an OpenVitals server.

Health data is read from Health Connect on device. Entries explicitly saved by the user are written back to Health Connect.

## Why Does OpenVitals Ask For Many Health Connect Permissions?

OpenVitals has dashboard and detail screens for many health areas: activity, sleep, heart, body, hydration, nutrition, mindfulness, vitals, and cycle tracking.

Users do not need to grant everything. The dashboard can work with partial permissions, and cycle tracking is grouped separately so it can be granted or skipped explicitly.

## Why Is Cycle Tracking Separate?

Cycle data is sensitive. OpenVitals requests cycle permissions as their own Health Connect category in onboarding and Settings, so those records are shown only after the user grants that category.

## Why Can I Not See Old Data?

Health Connect restricts access to older records unless Health history access is granted. Open Health Connect permissions and grant history access if older data should be included.

Long reads can also hit Health Connect rate limits. When that happens the dashboard shows a banner with a countdown and reloads the missing tiles by itself once Health Connect answers again; there is no need to pull to refresh, which only spends more of the limit.

## Can OpenVitals Edit Records From Other Apps?

No. OpenVitals keeps third-party records read-only.

OpenVitals-created hydration, activity, mindfulness, body, and vitals entries can be edited later, but ownership is checked before updating Health Connect records.

## Why Do Routes Need Separate Approval?

Workout route data is treated as sensitive Health Connect data. Some route access must be approved manually from Health Connect settings.

## Why Does GPS Recording Need Location Permission?

OpenVitals needs precise location to record route-backed activities. Without it, the app cannot record reliable GPS tracks.

## Why Does BLE Sensor Recording Need Bluetooth Permission?

OpenVitals uses nearby-device Bluetooth permissions to connect to paired Bluetooth LE sensors during experimental activity recording. This does not add internet access.

## Can OpenVitals Connect To My Smartwatch?

It depends on the watch. See [Smartwatches](../features/smartwatches.md) for the details.

- **Garmin:** yes, experimentally. OpenVitals pairs with the watch over Bluetooth, with no Garmin account, and syncs its activities, sleep and wellness data into Health Connect. It can also forward phone notifications, send the weather and change the watch's settings.
- **Wear OS:** a watch running the OpenVitals Wear OS app syncs its heart rate and one estimated sleep session per night. The watch app is for testers and is installed from a computer; see [Install the Wear OS App](../how-to/wear-os-sideload.md).
- **Any other watch:** sync it with [Gadgetbridge](https://gadgetbridge.org) or your vendor's app so its data lands in Health Connect. OpenVitals reads everything from there — steps, heart rate, sleep, HRV, workouts — and shows which app each record came from.

Either way, OpenVitals talks to a watch over Bluetooth only and still has no internet permission.

Bluetooth LE sensors are different: heart-rate straps and cycling cadence/power sensors still stream live into an activity recording. See [Bluetooth LE sensors](../features/ble-sensors.md).

## Why Does OpenVitals Need Notification Permission?

Notification permission is used for:

- Persistent activity recording notifications.
- User-started Apple Health import progress.
- Optional hydration and mindfulness reminders.

Reminders are local and optional.

## Is OpenVitals A Medical App?

No. OpenVitals shows wellness context from Health Connect records. Sleep score, cardio load, vital context, Body Energy, readiness, and metric interpretation cards are not medical diagnosis or treatment advice.

## Does OpenVitals Work Without Google Play Services?

OpenVitals does not depend on Google Play Services for core app logic.

Health Connect availability depends on Android version and device setup. Android 14 and newer include Health Connect as part of the system. Android 13 and older normally use the separate Health Connect app.

## What Is The Connected App?

The connected app is a separate app and repository for planned online features such as accounts and sharing. It is separate so the local app can remain internet-free.
