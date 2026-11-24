# OpenWatch

OpenWatch is the devices half of [OpenVitals](../openvitals/index.md). It pairs a Garmin or Wear OS watch, a Xiaomi S400 scale and standard Bluetooth health devices with your phone, copies what they record into Health Connect, and manages them. OpenVitals, or any other Health Connect app, is where you read the records; OpenWatch is where they come from.

No account and no server: the phone app declares no internet permission, and everything travels over Bluetooth between the device and the phone. Open source under the AGPL-3.0-or-later.

## What it does

- **Garmin watches**, over Garmin's own Bluetooth protocol: sync of activity, sleep and wellness files, written to Health Connect where it has a record type; notification forwarding, the watch's settings and alarms, find my watch, music controls, calendar and weather on the watch, CoMaps guidance on the wrist, a GPS ephemeris upload, and saved locations. The measurements Health Connect cannot hold (stress, Body Battery, sleep score and the like) stay in OpenWatch, on the watch's Data screen. See [Watches](watches.md).
- **Wear OS watches**, through the OpenWatch watch app: heart rate, steps and floors recorded on the watch, synced on a tap or a schedule, with an estimated sleep session per night, naps as sessions of their own and the night's resting heart rate. At night the watch also measures heart rate variability and, when you switch it on, the breathing rate; on a Samsung watch, SpO2 and skin temperature too, each behind its own switch. Workouts recorded on the watch, with GPS, heart rate, distance and climb, reach Health Connect with their route and an estimate of their active calories. The watch app opens on today's dashboard, where each figure opens its own day, week and last night; it has a quick log for water, weight, blood pressure and other values entered on the wrist, spot measurements of heart rate, HRV and air pressure (and blood oxygen on a Samsung watch), and workouts with heart rate zones, auto-pause, a recovery measurement and a summary. It offers five tiles and three watch face complications, shows the sleep, energy and distance the phone knows, and its settings can be changed on the watch or from the phone's watch screen. See [Watches](watches.md#wear-os-companion-app) and [Install the watch app](wear-os-sideload.md).
- **Xiaomi Body Composition Scale S400 and S400 Pro**: every weigh-in saved as it happens, with the app open or closed. See [Xiaomi S400 scale](scale.md).
- **Standard Bluetooth devices**, since 0.5.0: heart rate straps, bathroom scales, blood pressure monitors and glucose meters on the Bluetooth standard profiles. See [Standard Bluetooth devices](standard-devices.md).
- **OpenVitals and other apps on the phone**: the body profile kept the same in both apps, the paired watches on OpenVitals' dashboard tile, and a watch's live heart rate while OpenVitals records an activity, all with your say-so. See [Connected apps](connected-apps.md).
- **What it reads and writes, in the app.** Since 0.4.1 a screen lists every Health Connect data type OpenWatch writes, under the device it comes from, every type it reads and why, and what the watch app asks for; it opens from Settings, the Health Connect setup and Health Connect's own permission page. See [Permissions](permissions.md).
- **The same numbers as OpenVitals.** Since 0.4.0 both apps take their calculations, the sleep estimate, the calorie estimates, the maximum heart rate and the heart rate zones among them, from one library, [health-calculations](https://github.com/Hale-MTU/health-calculations), so they give the same figure from the same data.

## Start here

1. [Install](install.md) OpenWatch on the phone, and the watch app on a Wear OS watch.
2. Open OpenWatch, set up Health Connect, and pair a watch or add the scale from the home screen.
3. Fill in the [body profile](connected-apps.md#body-profile) if OpenVitals does not already share it: the scale's body composition needs your sex and height, the walking and workout calorie estimates your weight.

## Coming from OpenVitals

OpenVitals 2.16.0 and earlier synced watches and the scale themselves; from 2.17.0 that is OpenWatch's job, and an updated OpenVitals says so once.

- **Health Connect records belong to the app that wrote them.** OpenWatch cannot update or delete a record OpenVitals wrote. Its first sync imports what the watch still holds, as new records under OpenWatch.
- **The Wear OS watch app is a different app.** Uninstall the OpenVitals watch app, so the two do not both record the sensors, and [install OpenWatch's](wear-os-sideload.md).
- **The watch-only Garmin data is not copied over.** Stress, Body Battery and the rest fill OpenWatch's own store from the next syncs.

## Help and source

- Source and issues: [github.com/Hale-MTU/OpenWatch](https://github.com/Hale-MTU/OpenWatch)
- Community chat: [Zulip](https://openvitals.zulipchat.com/)
