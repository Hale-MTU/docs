# Connected Apps

> **Status:** Current behavior.
> **Audience:** Users.
> **Related:** [Privacy](privacy.md), [Watches](watches.md), [Xiaomi S400 scale](scale.md), [OpenLink](../openlink/index.md).

Other apps on the same phone can ask to use OpenWatch through [OpenLink](../openlink/index.md), a connection that works only inside the phone. OpenVitals is the first. Health data still travels through Health Connect; OpenLink carries what Health Connect has no place for: your body profile, the state of your watches and scale, and a watch's live readings while an app records an activity. Nothing goes over a network.

## Who may connect

- **OpenVitals** is signed by the same developer and connects without asking, whether it came from Google Play or from GitHub. It still appears on the Connected apps screen, where you can take anything back.
- **Any other app** waits for you. OpenWatch's home screen shows a card, "*App* wants to connect", and **Review** opens the request: what the app asks for, with **Allow** and **Block**. Until you answer, the app gets nothing.

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
- **In use now** while the app is bound to OpenWatch, otherwise when it was **last connected**;
- what its recording is doing, such as **Recording: streaming heart rate from Venu 3**, or that it is waiting for the watch's first reading;
- when its **last profile** arrived.

Each permission has a switch; turning one off takes effect at once and ends anything running under it. **Block** stops the app entirely. **Forget** removes it: it asks again the next time it connects, except OpenVitals, which is allowed again at once. **Unblock** forgets a blocked app, so it can ask again.

## Body profile

**Settings, Body profile** holds the birth year, sex, height and weight that the scale's body composition and the walking-energy estimate need. With OpenVitals connected and the profile shared, the screen says **Kept in sync with OpenVitals**, with when it last changed. The newest change wins, on either side: edit it in OpenVitals or in OpenWatch, and the other app takes it the next time they connect.

A weight or height Health Connect holds is shown beside the field and is used in place of the one typed here.

## While another app records

When an app keeps a watch streaming for its recording, OpenWatch shows a silent notification, **Streaming heart rate to OpenVitals**, naming the watch. It goes when the recording stops. The watch's radio and battery are working for that app, so it is never invisible.

The live readings go only to the app that asked, while its recording runs, and OpenWatch stores none of them; the watch's own record of the same minutes arrives with the next sync.

## In OpenVitals

OpenVitals shows its side under **Settings, OpenWatch**: whether OpenWatch is installed, waiting for your approval, blocked, or connected, and when connected, the watches it sees, what OpenWatch allows, and when the body profile last synced, with a button to sync it now.
