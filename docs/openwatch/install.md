# Install

OpenWatch has two parts: the phone app, and on a Wear OS watch the OpenWatch watch app. A Garmin watch and the scale need nothing installed on them.

## Channels

| Channel | Use when |
| --- | --- |
| Google Play | You want the normal install and update path. One listing carries the phone app and the Wear OS watch app. A release goes to open testing first, then to production. |
| GitHub releases | You want the signed APKs: the phone app, a debug build, and the watch app. [Releases](https://github.com/Hale-MTU/OpenWatch/releases) |
| Nightly | You want the newest build: the [`nightly` prerelease](https://github.com/Hale-MTU/OpenWatch/releases/tag/nightly) on GitHub, rebuilt every night, and Play's testing track. |
| Source build | You want to build it yourself; see [Development](developers/development.md). |

The phone app and the watch app share the package name `tech.mmarca.openwatch` and the signing key, so install both from the same channel.

## Requirements

- Phone: Android 8.0 (API 26) or newer, with Health Connect.
- Wear OS watch: Wear OS 3 (API 30) or newer.
- Bluetooth, and on Android 12 and newer the Nearby devices permission. See [Permissions](permissions.md).

## The Wear OS watch app

From Google Play, the watch app installs from the watch's own Play Store once the phone app is listed. A nightly, a build of your own, or a watch without the Play Store takes it over adb from a computer: see [Install the watch app on a Wear OS watch](wear-os-sideload.md).

## After installing

Open OpenWatch. It walks through Health Connect first: the Health Connect screen lists any permission still missing by name, and says where background and history access are granted. Then pair a watch or add the scale from the home screen.

Since 0.4.0 a Wear OS watch is added only when you allow Android's companion device dialog, which OpenWatch needs for a workout started on the watch. A watch added before, or whose association was removed in Android's settings, shows **Link watch** on its status card. A Garmin watch keeps the association optional.
