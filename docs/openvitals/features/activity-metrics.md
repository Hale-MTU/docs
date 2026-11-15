# Activity Metrics

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/activity`, `data/repository/ActivityRepository.kt`.
> **Navigation:** `Screen.Metric`; widgets `STEPS`, `DISTANCE`, `CALORIES_OUT`, `ACTIVE_CALORIES`, `FLOORS`, `ELEVATION`, `WHEELCHAIR_PUSHES`.
> **Related:** [Feature map](feature-map.md), [Statistics](statistics.md), [Recording of activity](activity-recording.md).

The activity feature owns period-based detail screens for movement metrics and workout sessions. It is separate from activity recording: recording and manual activity entry create records, while these screens read and explain existing Health Connect data.

## Implemented Metrics

Activity metric detail screens currently cover:

- Steps.
- Distance.
- Calories burned.
- Active calories.
- Floors.
- Elevation.
- Wheelchair pushes.

The workout/session area also covers activity lists, activity detail, route preview/export, heart-rate charts for workouts, activity summaries, and cardio-load context.

## Workout Distance

A workout's distance is the sum of the Health Connect distance records inside the session. When there are none, the route's length fills in.

Some apps save a GPS route but a distance estimated from steps, which can be half the real one. The **Distance from GPS routes** setting under Activities, off by default, makes a workout with a route take the route's length instead. Pace, speed, splits, the activity statistics, exports and the PDF report follow it. Workouts without a route keep their recorded distance.

Routes written by other apps are readable only with the Exercise routes permission, which you grant in Health Connect's own settings.

## Heart Rate Zones

Since 2.17.0 the activity detail shows how long a workout spent in each of five heart rate zones, on the ACSM's intensity classes (Garber et al. 2011, table 4): very light, light, moderate, vigorous and near-maximal.

- With a resting heart rate in the [body profile](settings-and-preferences.md), the zones are shares of the heart rate reserve, the span from resting to maximum: light from 30 %, moderate from 40 %, vigorous from 60 %, near-maximal from 90 %.
- Without one, they are shares of the maximum heart rate: light from 57 %, moderate from 64 %, vigorous from 77 %, near-maximal from 96 %.
- The maximum is the one you entered, else the highest reading of the year up to the workout when it is believable against the day's resting rate, else an age estimate (Gulati for women, Tanaka otherwise).
- Limits you set yourself in the [Body Energy](body-energy.md) calibration win over all of this.

The card names its basis: the maximum it used, or your own limits. A reading counts until the next one only when the two are at most five minutes apart, the same limit cardio load, intensity minutes and the calorie estimate use; the last reading counts for no time. OpenWatch places zones by the same rules, so one heart rate lands in the same zone in both apps.

## Calorie Estimates

A workout that measured no calories gets an estimate when it is entered by hand, recorded, or imported from a FIT or route file or in bulk. Since 2.17.0 it is worked out in this order:

1. **From the heart rate**, by Keytel et al. 2005, while the workout's mean heart rate lies between 57 and 90 % of your maximum and the body profile has a birth year. Each reading is weighted by the time it covers, and a gap over five minutes counts for nothing.
2. **From the distance**, for a walk or run at a pace ACSM's metabolic equations cover (walking at 50 to 100 m/min, running above 134 m/min): about 0.49 and 0.98 kcal per kg per km.
3. **From the activity's MET** in the 2024 Adult Compendium (Herrmann et al. 2024). An activity the Compendium does not cover gets no estimate.

The resting share for the same time is taken off: your Mifflin-St Jeor rate when the body profile has weight, height and birth year, else 1 MET. Without a sex in the profile, Keytel and Mifflin-St Jeor take the mean of the men's and women's equations.

Every estimate needs a weight in the body profile. Up to 2.16.0 a missing weight was taken as 70 kg; now there is no estimate, and the activity entry form names the body profile fields it misses. The maximum heart rate is the one every OpenVitals estimate uses: the one you entered, else the highest reading of the year before, else the age estimate. OpenWatch uses the same calculation for the workouts it writes, so the two apps give the same number for the same workout.

## Detail Pattern

Activity metric screens follow the shared period-detail model:

- Day, week, month, and year ranges.
- Selected anchor date.
- Previous/next period navigation.
- Calendar selection.
- Pull to refresh.
- Period charts and selected-day entry views where available.
- In the month view, a goal ring on each day, filled by the day's share of the daily goal and full on or past it. Workouts, hydration, mindfulness, and sleep show it too; nutrition does not yet.
- Statistics, comparisons, baselines, confidence, and source context.
- Reorderable metric detail sections.

The movement metrics share one metric screen configured per metric, which carries each metric's title, accent, required Health Connect permission, and value extraction. Calories, active calories and BMR render the calories aggregate instead.

Screen state lives in an activity `ViewModel` loading through `ActivityRepository`. Period selection is **not** owned by the view model — the shared metric-detail scaffold owns it and hands a selection down. New activity metric work should keep metric-specific charts and rows in `features/activity` and use the shared scaffold instead of adding a new screen shell.

## One Workout, Two Writers

Health Connect does not merge workouts. Two watches worn on one walk, or a watch and its vendor app, each file their own session, and the activity statistics would add both. OpenVitals folds such sessions into one before anything counts them: two sessions whose spans overlap by at least 85 percent and whose starts and ends lie within 15 minutes of each other are the same workout, and the one carrying more (a route, a distance, a heart rate, an OpenVitals entry over another app's) is kept. Since 2.15.2, two different apps may call the same outing different things, a walk on one wrist and a hike on the other, so between sources the exercise type is not compared. Within one source two overlapping sessions of different types are two deliberate records and are both kept.

Steps and distance through the day are not touched by this: Health Connect itself keeps one app's data where several apps overlap, in the order its Data sources and priority setting lists them. That order ranks apps, not devices, so two devices syncing through the same app still add up there.

## Related Features

- [`activity-recording.md`](activity-recording.md): GPS/repetition recording before saving to Health Connect.
- [`activity-training-plans.md`](activity-training-plans.md): planned workouts and activity setup defaults.
- [`route-file-import.md`](route-file-import.md): GPX/KML/KMZ route import review.
- [`fit-files-import.md`](fit-files-import.md): FIT activity, course, and workout import from Settings Data Importers.
- [`offline-maps-support.md`](offline-maps-support.md): local map packs for route display.
- [`non-health-connect-metrics-dashboard.md`](non-health-connect-metrics-dashboard.md): cardio load and other derived activity context.
