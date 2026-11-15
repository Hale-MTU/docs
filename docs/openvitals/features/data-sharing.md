# Share With Other Apps

OpenVitals can let another app on your phone read your data. It is off until you turn it on, and you decide which app reads which kind of data.

OpenVitals itself stays offline. An app you allow may not be: it can send what it reads elsewhere. Allow only apps you trust. [OpenBridge](../../openbridge/index.md) is Hale's own app for this.

This is in OpenVitals' nightly builds, and in its releases after 2.17.0.

## What you control

- **The switch.** Settings, Share with other apps. While it is off, no app gets anything.
- **Each kind of data, for each app.** The data is split into 11 groups. An app asks Android for a group, and Android shows you its own Allow or Deny dialog. Change an answer later in Android's settings for that app.
- **Health Connect data while OpenVitals is closed.** An app usually asks while OpenVitals is not open. Health Connect then lets OpenVitals read only if you allowed background reads. The screen offers that when it is missing.

The screen also lists every app that asked: what it may read now, when it last asked, a link to its Android settings, and a button to remove it from the list.

## The groups

| Group | What is in it |
|---|---|
| Activity | steps, distance, floors, elevation, wheelchair pushes, calories |
| Workouts | workouts, workout plans, speed, power, cadence, splits, the heart-rate recovery test, and a workout as a FIT file |
| Workout routes | GPS routes. A group of its own, because a route shows where you have been. |
| Sleep | sessions and stages, sleep score, efficiency |
| Heart | heart rate, resting heart rate, HRV, maximum heart rate |
| Vitals | blood pressure, SpO2, breathing rate, temperatures, VO2 max, blood glucose |
| Body | weight, height, body composition, BMR, BMI, FFMI |
| Nutrition | food and nutrients, hydration, caffeine |
| Recovery | Body Energy, mindfulness |
| Cycle | periods, fertility signs, predictions, the cycle journal, pill intakes. Journal notes are never shared. |
| Sexual activity | sexual activity records. A group of its own, because it is the most private. |

Medical records are never shared. Another app can only read: it cannot change or delete anything in OpenVitals.

## When an app gets less than it asked for

Every answer says why data may be missing:

- **Sharing is off.** Turn the switch on.
- **Background reads are not allowed.** Allow them on the sharing screen. What OpenVitals stores itself, such as Body Energy and the cycle journal, still arrives.
- **Health Connect asked OpenVitals to slow down.** The app can try again in a few minutes.
- **OpenVitals lacks a Health Connect permission**, or a read failed. The rest of the answer is still right.

Without Health Connect's history access, OpenVitals can share the last 30 days only, and says where the data starts.

## To stop

Turn the switch off, or deny the group in Android's settings for that app. Both take effect at once.
