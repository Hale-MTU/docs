# Privacy

OpenBridge passes data from [OpenVitals](../openvitals/index.md) to a service you connect. It sends nothing until you connect a service and tell it to send.

OpenBridge is published by Mittetulundusühing Hale (MTÜ Hale), a non-profit association registered in Estonia, registry code 80677610. Privacy contact: [hello@hale.ngo](mailto:hello@hale.ngo).

OpenBridge:

- Has no account of its own, and Hale runs no server for it.
- Does not include ads or an analytics SDK.
- Reads only the OpenVitals data groups you allow, one Android permission each. Change them in Android's settings for OpenBridge.
- Keeps no copy of your health data. It reads from OpenVitals when you look at a screen or send something.
- Does not sell data, does not use it to train AI models, and passes it to no one but the service you sent it to.

## What OpenBridge reads from OpenVitals

OpenVitals shares nothing until you turn on Settings, Share with other apps there. OpenBridge then asks Android for each data group it needs, and you allow or deny each one.

The first screen can read any group you allow, to show that sharing works. What it reads stays on the screen and is not sent anywhere.

## VertMatch

[VertMatch](https://vertmatch.run) is a training service run by its own company, with its own privacy policy. OpenBridge talks to it only after you connect it.

**Sent to VertMatch**

- **The workout you tap Send on**, as a file: its start and end time, sport, duration, distance, calories, heart rate, speed and cadence. If you allowed workout routes, also its GPS route, which shows where you were.
- **An id for that workout**, so that sending it again changes nothing.
- **A request to delete a workout you sent**, when you delete it in OpenVitals or tap Remove from VertMatch.
- **Your time zone**, when the training summary is loaded, so that "this week" means your week.

Nothing else is sent. No other workout, and no sleep, heart, body, nutrition or cycle data.

**Received from VertMatch**

- Your goal race: its name and date.
- With VertMatch Premium, your training load, fitness and fatigue for the last seven days.

OpenBridge shows these on its VertMatch screen and does not store them.

**Kept on your phone**

- Your VertMatch sign-in (tokens), encrypted with a key in the Android Keystore. A backup restored on another phone cannot read it.
- The ids of the workouts you sent, so OpenBridge can delete them on VertMatch when you delete them in OpenVitals.

**Disconnect VertMatch** deletes both from your phone. Workouts already on VertMatch stay there until you delete them, and the permission you gave OpenBridge stays in your VertMatch account until you remove it there.

Sign-in happens in your browser on VertMatch's own page. OpenBridge never sees your VertMatch password. Everything goes over HTTPS, and OpenBridge writes no token, file or id to the system log.

## Changes

This page changes when OpenBridge changes what it reads, sends or keeps.

Last updated: 2026-11-15.
