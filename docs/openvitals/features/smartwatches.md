# Smartwatches

> **Status:** Current behavior.
> **Audience:** Users.
> **Related:** [OpenWatch](../../openwatch/index.md), [Bluetooth LE sensors](ble-sensors.md), [Health Connect](../app/health-connect.md), [Recording of activity](activity-recording.md), [Feature map](feature-map.md).

OpenVitals does not pair watches itself. It reads what a watch recorded from Health Connect, whichever app put it there:

- **Garmin and Wear OS watches** sync through [OpenWatch](../../openwatch/index.md), a separate app from the same project. It pairs a Garmin watch over Garmin's own Bluetooth protocol, or a Wear OS watch running the OpenWatch watch app, with no vendor account and no internet, and writes what the watch recorded to Health Connect. See [OpenWatch's Watches page](../../openwatch/watches.md).
- **Any other watch** syncs through **[Gadgetbridge](https://gadgetbridge.org)**, a free, open-source companion app that supports many watch brands, or through **your vendor's own app**, if it writes to Health Connect.

Up to OpenVitals 2.16.0, OpenVitals synced Garmin and Wear OS watches itself; an updated OpenVitals says once that this moved to OpenWatch. Records it wrote then stay in Health Connect.

Once a watch's data lands in Health Connect - whichever way it got there - OpenVitals picks all of it up: steps, heart rate, resting heart rate, HRV, sleep sessions and stages, SpO2, VO2 max, respiratory rate, workouts with their routes, and everything else in the app's [read coverage](../app/health-connect.md).

## With OpenWatch Installed

OpenVitals and OpenWatch talk on the phone through [OpenLink](../../openlink/index.md). OpenWatch decides what OpenVitals may do, on its [Connected apps](../../openwatch/connected-apps.md) screen; OpenVitals from Google Play or from GitHub is allowed without a prompt.

- **Dashboard tile.** The OpenWatch tile shows the watch synced most recently, with its battery and last sync, and a button that asks OpenWatch to sync it now. While OpenWatch waits for your answer, the tile says so and opens the request.
- **Settings, OpenWatch.** One status line, not installed, waiting for approval, blocked, or connected, and when connected, the watches OpenWatch sees, what it allows, and when the body profile last synced, with **Sync body profile now**.
- **Body profile.** Birth year, sex, height and weight are kept the same in both apps, the newest change winning. The body profile screen says **Kept in sync with OpenWatch** while it is.
- **Live heart rate while recording.** While an activity records, OpenVitals asks OpenWatch to keep the watch streaming and uses its live heart rate as the recording's heart rate sensor. A Bluetooth LE strap you added still wins. OpenWatch shows a notification while it streams.

A watch that broadcasts its heart rate over Bluetooth LE can also be added as a [sensor](ble-sensors.md), without OpenWatch.
