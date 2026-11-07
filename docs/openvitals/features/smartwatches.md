# Smartwatches

> **Status:** Current behavior. Garmin support is experimental. The Wear OS app syncs heart rate, steps (with cadence and estimated walking calories), floors climbed and an estimated night of sleep with its resting heart rate, is meant for testers, and is installed by hand.
> **Audience:** Users.
> **Related:** [Bluetooth LE sensors](ble-sensors.md), [Health Connect](../app/health-connect.md), [Install the Wear OS app](../how-to/wear-os-sideload.md), [Feature map](feature-map.md).

OpenVitals supports wrist devices in different ways, depending on the make.

**Garmin watches** are read directly, over Garmin's own Bluetooth protocol. There is no vendor account and no network step; the app declares no internet permission at all. Pairing, sync, and the features below are all handled inside OpenVitals.

**Wear OS watches** can run the OpenVitals Wear OS app, which records heart rate, steps and the height climbed minute by minute, and what a sleep estimate needs; OpenVitals on the phone copies them over Bluetooth, again with no vendor account. The watch app is for testers for now and is installed from a computer. See [Wear OS](#wear-os) below.

**Everything else** syncs through Health Connect: the app that already knows the watch does the syncing, and OpenVitals reads the result.

- **[Gadgetbridge](https://gadgetbridge.org)** — a free, open-source companion app that supports many watch brands and can sync what the watch records into Health Connect, with no vendor account.
- **Your vendor's own app** — if it writes to Health Connect, that works too.

Once a watch's data lands in Health Connect - whichever way it got there - OpenVitals picks all of it up: steps, heart rate, resting heart rate, HRV, sleep sessions and stages, SpO2, VO2 max, respiratory rate, workouts with their routes, and everything else in the app's [read coverage](../app/health-connect.md).

## Garmin Support

Verified against a single recent Garmin model. Both Garmin Bluetooth transports sync and forward notifications, so older watches such as the Instinct 2X work too; live heart rate and step streaming need the newer transport, so an older watch syncs but shows no live readings. The app asks each watch what it can do rather than assuming.

- **Sync.** The watch hands over the activity, sleep, and wellness files it recorded; OpenVitals imports them to Health Connect (activity routes get [elevation correction](elevation-correction.md) from imported tiles, for a watch with a drifting barometer), keeps watch-only measurements (stress, Body Battery, training readiness and friends) in its own local storage, and tells the watch to archive what was copied. Sync happens by hand, or on an optional per-watch schedule of every 30 minutes, hour, or two hours - off by default, with Android choosing the exact moment; a dashboard watch tile shows the last-synced watch with its battery and a sync button. An older watch that does not record light, deep and REM sleep still gets a stage timeline: OpenVitals estimates it on the phone from heart rate and movement, and the session's notes say so.
- **Stay connected.** A per-watch mode that holds the Bluetooth link open whenever the watch is in range, the way the vendor's app behaves. It is on by default, because weather, find-my-phone, live readings, handing over a recording the moment it ends, and guidance on the wrist all depend on a held link. It costs battery on both sides, and turning it off is remembered - forgetting the watch clears that choice along with everything else. With it on, live heart rate and steps can stream to the dashboard.
- **CoMaps guidance on the watch.** Whenever CoMaps is navigating, the next turn, the distance to it, and the street can appear on the watch as a notification that updates in place. It has its own per-watch switch, off by default, and is independent of activity recording - see [CoMaps navigation context](comaps-navigation-context.md).
- **Notifications.** Phone notifications can be forwarded to the wrist, with a per-app blocklist, reply and actions from the watch, and dismissal that clears the phone too. Off by default, behind Android's own notification access. Older watches such as the original Instinct receive them too.
- **Calls.** A ringing call shows on the wrist with the caller's name and leaves once it is answered. With a dialer that uses Android's call-style notification, the watch's accept and reject buttons work. It rides on notification forwarding: no phone permission is needed and nothing reads the call log.
- **Weather.** The watch's weather glance is answered from a weather app on the phone that broadcasts the Gadgetbridge generic-weather format (Breezy Weather is the tested one). OpenVitals never contacts a weather service.
- **Music controls.** "Music controls on watch" puts the phone's player on the watch's music controls. The watch shows the player, track, artist, album and position; from the wrist you can play, pause, skip, seek and change the volume. Off by default, and it needs "Stay connected". Android shows the phone's players only to an app with notification access, so switching it on without that grant shows a disclosure first; the grant alone forwards no notifications. Track details go only to the watch over Bluetooth and are never stored. Confirmed on one Garmin model.
- **Calendar.** The watch's calendar glance can show the phone's upcoming events. Off by default behind its own permission; events go to the watch over Bluetooth and nowhere else.
- **Find, both ways.** The phone can make the watch alert, and the watch's find-my-phone rings the phone even when silenced.
- **GPS ephemeris.** A satellite prediction file imported by hand is served to the watch on request, for cold GPS fixes in seconds instead of minutes. Nothing is downloaded.
- **Send a point.** A watch that can store locations gets a "Send a point" row. Type a name and coordinates - decimal degrees, degrees and decimal minutes (the geocaching format), or degrees, minutes and seconds - or share a place from a maps app: OpenVitals appears as "Send to watch" for `geo:` links and shared text, and reads Google Maps, OpenStreetMap and OsmAnd links. A short link such as `maps.app.goo.gl` holds no position and the app cannot go online to resolve it, so the form asks for the coordinates. Nothing is sent until you tap Send. The watch keeps the point in its saved locations, where it can be picked as a navigation target. Not yet confirmed on a watch.
- **Watch settings.** The watch's own settings tree and alarms are rendered live from the watch and can be changed from the phone.
- **Alarms for older watches.** A watch with no settings tree, such as the first Instinct, keeps its alarms in a list on the phone: up to ten, each with a time, repeat days, sound or vibration, backlight and a preset label. Nothing reaches the watch until you tap "Send to watch", and a send replaces every alarm on the watch. Alarms set on the watch do not show in the list. Not yet confirmed on a watch.

### Steps, distance and calories from the watch

The watch reports these three as running daily totals, so a synced file says
where the counter stood, not what happened. OpenVitals differences them against
what it already imported, which is what lets your step history show *when* you
walked instead of drawing the day as one straight ramp from midnight.

Two things are worth knowing:

- **A gap between the live step count and the day's total is normal.** The live
  reading is the number on your wrist right now; the minutes since the watch
  last closed a monitoring file have not been handed over yet. They arrive on
  the next sync.
- **Records are written so they never overlap.** This matters more than it
  sounds: Health Connect discards the overlapping span when it adds records up,
  so two step records sharing a single minute report *less* between them than
  either one claims. A day once read 889 steps while its own records summed to
  1,007.

### Pulse Ox, HRV, thresholds and scores

A sync also reads the Pulse Ox readings and the five-minute HRV values a watch records, and writes them to Health Connect, where the SpO2 and HRV screens pick them up.

Health Connect has no place for the rest, so they show on the watch's **Watch data** screen:

- Under Training: functional threshold power, lactate threshold (in watts, with the heart rate it was reached at), hill score (with its strength and endurance parts), and endurance score.
- Under Last night: the night's restless moments.

A watch that does not record one of these sends nothing for it, and its row does not appear.

### If the watch will not connect or sync

For watches that had trouble connecting or syncing, first reported on a Fenix 6, the link now does what Gadgetbridge does:

- It writes to the watch the way the watch asks to be written to.
- When Android reports a Bluetooth error while connecting, it waits a moment and dials again, up to three attempts in all. A watch that does not answer at all is not redialled: it is out of range.
- A whole sync may run for up to 30 minutes instead of 3, enough for a first sync of a watch holding months of activities.
- It completes the handshake with watches that never send their configuration.

The watch's screen also has a **Large Bluetooth packets** switch, on by default and set per watch. Larger packets make a sync much faster; turn the switch off if the watch keeps dropping the link or a sync never gets going.

## Wear OS

A paired Wear OS watch can be added under Settings, Watches, like a Garmin. It is recognised by its name or by the OpenVitals app installed on it, not by its Bluetooth class alone, so a Garmin, Fitbit or Huawei watch does not end up here.

The OpenVitals Wear OS app is for testers. It is not on any store yet and is installed over adb from a computer, as [Install the Wear OS app](../how-to/wear-os-sideload.md) describes. It needs Wear OS 3 or later. No vendor app is needed on the phone once the watch is paired; a watch that can only be set up with the vendor's app, such as a Galaxy Watch8, needs it once, and it can be uninstalled afterwards.

### Wear OS App Status

The watch's screen has a **Wear OS App Status** card: whether the watch is paired with this phone, and whether the OpenVitals app on it answers over Bluetooth, with a **Validate Wear OS App** button to check again. When something is wrong, the card says what:

- Bluetooth is off on this phone.
- The watch is no longer paired with this phone.
- The watch is waiting for you to allow this phone.
- This phone is blocked on the watch.
- The app on the watch is older or newer than the one on the phone, and one of them needs an update.

The first time a phone connects, the watch asks whether to allow it, naming the phone, with **Allow** and **Block**. Open OpenVitals on the watch and tap Allow. A phone whose key changed, as after a reinstall or a reset, is asked about again the same way, with the reason, and Allow replaces the old key; until then the old key still works. Pairing the watch again on the phone keeps the key, so the watch asks nothing. A blocked phone can be unblocked from the OpenVitals app on the watch.

### Watch Sync

The watch app records your heart rate on its own, with the screen off and the app closed, keeping one sample every ten seconds. It also records, minute by minute, what a sleep estimate needs: movement, the arm's angle, heart rate, and whether the watch was on the wrist or on the charger. It keeps a week of both. On first launch it asks for heart rate access, then for access in the background; without them the watch app says "Heart rate access is off". Since 2.14.2 it also counts steps with the watch's own step counter, one row per minute, read in the same batch as the heart rate so it adds no wake-ups; this needs the Physical activity permission, asked for on start, and the status card says "Step counting is off" without it, or that the watch has no step counter.

While the watch is off the wrist for a minute, it stops measuring heart rate, which is what costs the most battery, and starts again as soon as it is back on. Turning the screen on or taking the watch off the charger also restarts it, in case the watch cannot tell it was put on while the sensor rests. A watch without an off-body sensor measures all the time.

Since 2.15.2 the watch also measures the height climbed from its barometer, which needs no permission: a rise counts once it reaches 3 m, so the barometer's small wobble does not add up, and then with all of its metres; one value per clock minute, a week of history. A watch without a barometer records none.

On the phone, the watch's screen has a **Watch Sync** card. Tapping **Sync watch**:

- Copies the heart rate recorded since the last sync into Health Connect, so it shows on the heart screens like any other source. A sync that stops part-way keeps what arrived and continues from there next time.
- Writes the watch's steps as one Health Connect record per minute, reaching five minutes back because a minute can still grow when late steps arrive. Minutes without watch steps are not written, so the phone's own count fills them. A watch app from before 2.14.2 is not asked for steps and keeps syncing as before.
- Since 2.15.0, writes each of those minutes as a cadence (steps per minute) too, and, once your weight is known from Health Connect or the body profile, as an estimate of the calories walking cost above rest. The estimate uses the cadence equation of Moore and colleagues (Med Sci Sports Exerc 2021), which holds for level walking: hills and stairs are not counted, so it tends to come in low. A minute inside a workout Health Connect holds, a run or a ride, gets no estimate, so a recorded walk's calories are not counted twice. A run no app recorded is not recognised, though: its minutes are estimated as fast walking. An estimate, once written, stays: a weight entered later, or a workout saved after the sync, does not change it. Without a weight, or without Health Connect access to write cadence or active calories or to read workouts, the card says what is missing and offers the access, and the rest of the sync goes on; minutes synced before then stay without an estimate. An automatic sync with the app closed and no background access to Health Connect cannot see other apps' weights and workouts, so it writes no estimate.
- Since 2.15.2, writes the height climbed as floors, 3 m each with partial floors kept so a day's total adds up, and the same metres as elevation gained, one record per minute. The barometer cannot tell stairs from an elevator, so the height counts only when the watch counted at least 10 steps per floor in that minute and the one before. Distance is not sent by the watch: the opt-in "distance from steps" setting under Activities turns the watch's steps into distance like any other steps in Health Connect.
- Estimates each night from the recorded minutes and writes one sleep session per night, with estimated stages. A night that already has a sleep session from another app, or one entered by hand, is left alone: those win over an estimate. A night with fewer than three hours of wear is not written, so a watch left on the table or the charger produces nothing.
- Since 2.15.2, gives each finished night with sleep a resting heart rate: the lowest half-hour average of the heart rate during the night, written to Health Connect at the end of the night. A night still running gets none. It is a nocturnal value, so it sits a little below one measured sitting in a clinic. A day that already holds a resting heart rate from elsewhere, such as the vendor's app, keeps that one. This needs the Health Connect grants to read and write resting heart rate, and in the background the right to read other apps' data; without them nothing is written, and the watch card asks for the grant.

The card then says how many heart rate samples and nights of sleep the sync brought, or "Nothing new on the watch". A sync is refused while an activity is being recorded.

While the watch's device screen is open and the watch is worn, its status card shows the heart rate as it happens ("Now: 72 bpm"). The watch measures it for the phone only while someone looks, and nothing live is stored: the same readings arrive with the next sync.

**Turn on bedtime mode at night.** A sleeping watch wakes only every few minutes while the arm is still, so without bedtime mode most minutes arrive empty and the phone may find no night at all. While bedtime mode is on, and the watch is on the wrist and off the charger, the watch app keeps the watch awake enough to record every minute; the rest of the day it lets the watch sleep. The watch app's screen says which: recording every minute, paused while off the wrist, paused while charging, or a reminder to turn bedtime mode on.

The stages are an estimate, not a sleep lab: read them as when heart rate was low and steady versus high and variable. Checked against 31 nights recorded in a sleep lab, the estimate scored 90% of minutes correctly and placed the night's start within 9 minutes and its end within 13 minutes on average. Naps are not written, and the session's notes say it was estimated by OpenVitals.

Not there yet: series beyond heart rate, steps, floors and sleep, and the Garmin extras such as notification forwarding, watch settings and find-my-watch. If the vendor's app is still installed and writes to Health Connect, its data keeps reaching OpenVitals as before.

## Data Attribution

OpenVitals shows which app wrote each record, so data synced directly, through Gadgetbridge, or through a vendor app keeps its original source visible rather than appearing to come from nowhere.

Local derived views such as [Body Energy](body-energy.md) and [Daily Readiness](daily-readiness.md) are computed on device from Health Connect data, whatever wrote it — a watch synced through Gadgetbridge feeds them the same way a directly-synced Garmin does.

## Not The Same As BLE Sensors

[Bluetooth LE sensors](ble-sensors.md) — heart-rate straps, cycling cadence and power sensors, footpods — stream live values into an activity recording as it happens, and remain fully supported. A watch records on its own and syncs afterwards. The path chosen at pairing decides the role: a device added through the sensors flow is a live sensor, one added through Settings, Watches is a watch — even when it is physically the same smartwatch.

Phone-to-phone sync — copying Health Connect records to a nearby phone over Bluetooth — is also unaffected and remains supported.
