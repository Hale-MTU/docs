# VertMatch

[VertMatch](https://vertmatch.run) is a training service for runners. OpenBridge can send a workout from OpenVitals to your VertMatch training, and show your VertMatch training summary.

OpenVitals itself stays offline. The workout goes from OpenVitals to OpenBridge on your phone, and OpenBridge sends it to VertMatch.

## Set it up

1. In OpenVitals, turn on Settings, Share with other apps.
2. In OpenBridge, tap **Open VertMatch**, then **Connect VertMatch**. You sign in to VertMatch in your browser.
3. Allow **workouts** when Android asks. Allow **workout routes** too if you want a workout to go with its GPS track.

## Send a workout

The VertMatch screen lists the workouts of the last 30 days. Tap **Send to VertMatch** on one.

- **Nothing is sent automatically.** A workout goes only when you tap Send on it.
- **Sending again is safe.** VertMatch recognises the workout and changes nothing.
- **A workout without a distance** gets a warning first. If the VertMatch app also reads Health Connect on your phone, VertMatch cannot tell that the two copies are the same workout, so it can show up twice.
- **A workout VertMatch already has from another app** is not stored a second time.

## Delete a workout

- **Delete it in OpenVitals** and OpenBridge deletes VertMatch's copy the next time you open the VertMatch screen. If VertMatch cannot be reached then, OpenBridge tries again later.
- **Remove from VertMatch** deletes VertMatch's copy and keeps the workout in OpenVitals.
- **Delete it on VertMatch** and it stays deleted: OpenBridge does not offer to send it again.

## Training summary

The screen shows your goal race. With VertMatch Premium it also shows your training load, fitness and fatigue for the last seven days.

## Disconnect

**Disconnect VertMatch** deletes the sign-in and the list of sent workouts from your phone. Workouts already on VertMatch stay there, and VertMatch keeps the permission you gave OpenBridge until you remove it in your VertMatch account.

What is sent and received is listed in [Privacy](privacy.md).
