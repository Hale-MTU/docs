# Connected Apps

> **Status:** Current behavior.
> **Audience:** Users.
> **Related:** [Privacy](privacy.md), [Watches](watches.md), [Xiaomi S400 scale](scale.md), [OpenLink](../openlink/index.md).

Other apps on the same phone can ask to use OpenWatch through [OpenLink](../openlink/index.md), a connection that works only inside the phone. OpenVitals is the first. Health data still travels through Health Connect; OpenLink carries what Health Connect has no place for: your body profile, the state of your watches and scale, and a watch's live readings while an app records an activity. Nothing goes over a network.

## Who may connect

- **OpenVitals** connects without asking, whether it came from Google Play or from GitHub, because OpenWatch knows it by its name and its signing key together. It still appears on the Connected apps screen, where you can take anything back.
- **Any other app** waits for you. It heads the Connected apps list, marked **Asks to connect**, with what it asks for and **Allow** and **Block**; an app can open that screen for you from a tap, as OpenVitals' **Open OpenWatch to approve** does. Until you answer, the app gets nothing. Up to 0.3.0 the home screen also showed a card for such an app; since 0.4.0 it does not, since any app could raise one.
- **An app that uses OpenVitals' name** but is not signed by the OpenVitals project is treated as any other app, and its card warns that it calls itself OpenVitals without the project's signature. Allow it only if you built or installed it yourself and trust where it came from.
- **An app that takes another app's name**, one whose package is not that app's, gets a warning on its card too, since 0.4.1.

An app whose signing certificate changes, a different app under the same name, starts over and has to ask again.

## What an app may be allowed

| Permission | What it means |
| --- | --- |
| See your watches and scale | Their names, battery and last sync, and a request to sync one. OpenVitals uses this for its dashboard tile and its sync button. |
| Share your body profile | Birth year, sex, height and weight, both ways, so you enter them once. |
| Keep your watch streaming | While the app records an activity, OpenWatch keeps the watch's live readings flowing. |
| Receive heart rate and steps | The watch's live heart rate and steps, while the app records, and to that app only. |

Notifications, calendar events, music, saved locations and the scale's key are never shared.

## The Connected Apps screen

Open **Settings, Connected apps**. Each app that asked has a card that says:

- whether it is **connected**, **asks to connect**, or is **blocked**;
- the app's package name and the key it is signed with, since 0.4.1, so two apps of the same name can be told apart;
- **In use now** while the app is bound to OpenWatch, otherwise when it was **last connected**;
- what its recording is doing, such as **Recording: streaming heart rate from Venu 3**, or that it is waiting for the watch's first reading;
- when its **last profile** arrived.

While the screen shows, a touch that passes through another app's window is dropped and, on Android 12 and newer, other apps' overlays are hidden, so no app can draw over **Allow** or a switch.

Each permission has a switch; turning one off takes effect at once and ends anything running under it. **Block** stops the app entirely. **Forget** removes it: it asks again the next time it connects, except OpenVitals, which is allowed again at once. **Unblock** forgets a blocked app, so it can ask again.

## Body profile

**Settings, Body profile** holds the birth year, sex, height and weight that the scale's body composition and the calorie estimates for walking, watch workouts and imported workouts need. Without a weight there is no calorie estimate, and the sync card says so. With OpenVitals connected and the profile shared, the screen says **Kept in sync with OpenVitals**, with when it last changed. The newest change wins, on either side: edit it in OpenVitals or in OpenWatch, and the other app takes it the next time they connect.

A weight or height Health Connect holds is shown beside the field and is used in place of the one typed here.

## While another app records

When an app keeps a watch streaming for its recording, OpenWatch shows a silent notification, **Streaming heart rate to OpenVitals**, naming the watch. It goes when the recording stops. The watch's radio and battery are working for that app, so it is never invisible.

The live readings go only to the app that asked, while its recording runs, and OpenWatch stores none of them; the watch's own record of the same minutes arrives with the next sync.

## In OpenVitals

OpenVitals shows its side under **Settings, OpenWatch**: whether OpenWatch is installed, waiting for your approval, blocked, or connected, and when connected, the watches it sees, what OpenWatch allows, and when the body profile last synced, with a button to sync it now.
