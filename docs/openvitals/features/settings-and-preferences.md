# Settings And Preferences

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/settings`, `data/repository/PreferencesRepository.kt`.
> **Navigation:** `Screen.Settings` and settings subsection routes; sections in `SettingsSection`.
> **Related:** [Feature map](feature-map.md), [Permissions](../app/permissions.md), [Metric detail customization](metric-detail-customization.md).

Settings centralize app preferences, Health Connect access, imports, sensors, goals, reminders, and diagnostics.

## Display

Users can configure:

- Language.
- Unit system.
- Theme mode, including system, light, dark, and AMOLED.
- Home widget refresh interval: 15, 30, 60 or 120 minutes.

Display preferences affect app presentation only. They do not rewrite Health Connect records.

## Metric Preferences

Metric-specific settings include:

- Activity week mode, such as Monday-to-Sunday or rolling last 7 days.
- Favorite or latest activity defaults used by activity entry and recording setup.
- Distance from GPS routes, off by default: a workout with a route takes the route's length as its distance. See [Activity metrics](activity-metrics.md#workout-distance).
- Calorie data mode, including optional OpenVitals total-calorie calculation when Health Connect totals are missing.
- Sleep range mode, including rolling 24 hours, noon boundary, and evening boundary.
- Caffeine sensitivity, daily limit, and bedtime guidance.
- Blood pressure guideline: ACC/AHA 2017, ESH 2023, ESC 2024 or ISH 2020, see [Heart and vitals](heart-and-vitals.md).
- Body profile: birth year, weight, height, resting and maximum heart rate, and sex, which only the basal metabolic rate estimate reads.
- Basal metabolic rate estimate, off by default: one Mifflin-St Jeor value per day written to Health Connect, see [Body metrics](body-metrics.md).
- Body Energy calibration.
- A Start over card that wipes and rebuilds the Body Energy, Recovery and Expenditure history OpenVitals worked out itself, see [Body Energy](body-energy.md).

## Goals And Reminders

Settings expose local goals and reminders for supported metric families, including hydration, mindfulness, and cycle reminders.

Goals and reminders are local app preferences. They help shape guidance and notifications but do not create Health Connect health records by themselves.

## Cycle

Settings > Cycle holds the tracking contexts (PMS, PMDD, endometriosis, PCOS, perimenopause, thyroid), the age band taken from the body profile's birth year, the three cycle reminders, the contraceptive pill scheme with its daily reminder, a JSON backup of the day-log journal, and a Delete cycle journal action. All of it is local; nothing here is written to Health Connect. See [Cycle tracking](cycle-tracking.md).

## Health Connect

Health Connect settings show permission categories, missing access, and actions for requesting or opening Health Connect permission management.

OpenVitals asks for read permissions for dashboard and detail views. Write permissions are requested only when a user enters, imports, records, edits, or deletes data that needs them.

## Data Importers And Sensors

Settings provide Data Importers for Apple Health export import and FIT activity/course/workout import, plus entry points for offline map pack import and Bluetooth LE sensor management.

**Sensors & devices** manages Bluetooth LE sensors that stream while an activity is recorded. **Watches** pairs a Garmin watch, or a Wear OS watch running the OpenVitals watch app, and copies what it recorded; any other watch syncs into Health Connect through Gadgetbridge or its vendor's app instead, see [Smartwatches](smartwatches.md). **Scales** saves weigh-ins from a supported Bluetooth scale, see [Bathroom Scales](scales.md). Apple Health exports are analyzed first so the user can choose detected categories before anything is written to Health Connect. Import results can be copied or downloaded as a full text report with summary, selected categories, logs, diagnostics, and failure details.

## Diagnostics And App Information

The settings area includes app version information, diagnostics/support surfaces, and privacy notes.
