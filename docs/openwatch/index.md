# OpenWatch

OpenWatch is the devices half of [OpenVitals](../openvitals/index.md). It pairs a Garmin or Wear OS watch and a Xiaomi S400 scale with your phone, copies what they record into Health Connect, and manages them. OpenVitals, or any other Health Connect app, is where you read the records; OpenWatch is where they come from.

No account and no server: the phone app declares no internet permission, and everything travels over Bluetooth between the device and the phone. Open source under the AGPL-3.0-or-later.

## What it does

- **Garmin watches**, over Garmin's own Bluetooth protocol: sync of activity, sleep and wellness files, written to Health Connect where it has a record type; notification forwarding, the watch's settings and alarms, find my watch, music controls, calendar and weather on the watch, CoMaps guidance on the wrist, a GPS ephemeris upload, and saved locations. The measurements Health Connect cannot hold (stress, Body Battery, sleep score and the like) stay in OpenWatch, on the watch's Data screen. See [Watches](watches.md).
- **Wear OS watches**, through the OpenWatch watch app: heart rate, steps and floors recorded on the watch, synced on a tap or a schedule, with an estimated sleep session per night and the night's resting heart rate, and three tiles. See [Watches](watches.md#wear-os-companion-app) and [Install the watch app](wear-os-sideload.md).
- **Xiaomi Body Composition Scale S400 and S400 Pro**: every weigh-in saved as it happens, with the app open or closed. See [Xiaomi S400 scale](scale.md).
- **OpenVitals and other apps on the phone**: the body profile kept the same in both apps, the paired watches on OpenVitals' dashboard tile, and a watch's live heart rate while OpenVitals records an activity, all with your say-so. See [Connected apps](connected-apps.md).

## Start here

1. [Install](install.md) OpenWatch on the phone, and the watch app on a Wear OS watch.
2. Open OpenWatch, set up Health Connect, and pair a watch or add the scale from the home screen.
3. Fill in the [body profile](connected-apps.md#body-profile) if OpenVitals does not already share it: the scale's body composition needs your sex and height, the walking-energy estimate your weight.

## Coming from OpenVitals

OpenVitals 2.16.0 and earlier synced watches and the scale themselves; from the next version that is OpenWatch's job, and an updated OpenVitals says so once.

- **Health Connect records belong to the app that wrote them.** OpenWatch cannot update or delete a record OpenVitals wrote. Its first sync imports what the watch still holds, as new records under OpenWatch.
- **The Wear OS watch app is a different app.** Uninstall the OpenVitals watch app, so the two do not both record the sensors, and [install OpenWatch's](wear-os-sideload.md).
- **The watch-only Garmin data is not copied over.** Stress, Body Battery and the rest fill OpenWatch's own store from the next syncs.

## Help and source

- Source and issues: [github.com/Hale-MTU/OpenWatch](https://github.com/Hale-MTU/OpenWatch)
- Community chat: [Zulip](https://openvitals.zulipchat.com/)
