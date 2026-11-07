# Cycle Tracking

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/cycle`, `features/manualentry/cycle`, `features/cycle/reminders`, `domain/cycle`, `data/repository/CycleRepository.kt`, `data/local/cycle`.
> **Navigation:** `Screen.Metric`, `Screen.CycleEntryChooser`, `Screen.CycleEntry`, `Screen.SettingsCycle`, widget `CYCLE`, Health Connect permission category.
> **Related:** [Feature map](feature-map.md), [Reminders](reminders.md), [Home widgets](home-widgets.md), [Settings](settings-and-preferences.md), [Health report export](health-report-export.md), [Sync with another phone](device-sync.md), [Privacy](../app/privacy.md).

Cycle tracking reads and writes Health Connect cycle records and adds a day log on the phone for what Health Connect cannot hold. Recorded facts and computed estimates are labelled apart on every screen, and cycle permissions stay an explicit, separately granted category you can skip entirely.

## Two Kinds Of Information

Every item on a cycle screen is one of two things:

- **Recorded**: something you or another app wrote. Flow, spotting, symptoms, notes, temperatures, and the cycle day counted from a recorded period start.
- **Estimated**: something computed from your recorded history. The next period range, the current phase on a day without bleeding, the ovulation transition.

An estimate is always a range with the history it came from. The app never turns it into a diagnosis or a fertility claim, and nothing assumes a 28-day cycle.

## What You Can Log

Health Connect keeps every record it has a type for: menstruation flow and the period intervals derived from it, spotting, ovulation tests, cervical mucus, basal body temperature, and sexual activity.

A journal on the phone keeps what Health Connect has no record type for: a "no bleeding" mark that separates "checked, none" from "not logged", pain, mood, energy and desire on a 1 to 5 scale, symptoms from a fixed catalog in three groups, private notes, a pregnancy test result, temperature disturbance flags, cervical sensation, and the cervix as felt: opening, firmness and position. Blank always means not recorded, never "no symptoms".

## Logging One Thing At A Time

The Log button opens a chooser with one card each for bleeding, how you feel, a pregnancy test, an ovulation test, sexual activity, basal body temperature, and cervical mucus. A card opens the day log on that section alone; "Log everything for the day" opens the full log. A day that already has entries, reached from the calendar, the entry list, or the Today card, opens in full for editing.

Everything for one day is saved together. Saving reconciles each Health Connect record kind separately, updating or deleting records OpenVitals owns and leaving records from other apps alone. Leaving with unsaved changes asks first.

## The Cycle Screen

The screen is a month calendar over today's cards. The arrows and the date picker move the month, and the sections can be arranged from the app bar like on any other metric screen. In the default order:

- The recorded cycle day and the phase, or an invitation to log the first period.
- The calendar: recorded flow, spotting, the estimated window outline, cycle-start markers, and observation dots. A day opens its log.
- Today's observations, when something is logged today.
- The contraceptive pill card, when the pill is tracked.
- The entries list.
- The next-period estimate.
- A sourced tip for the phase, or a cycle fact when the phase cannot be told.
- Statistics: count, mean and range of recorded cycles, the period's counts, and a data-confidence card.
- The cycle history as a bar per cycle against a 21 to 35 day reference band, newest first, twelve at a time with a Load 10 more button, over the whole recorded history, the basal temperature chart with a coverline once a sustained shift is found, and symptom patterns by phase.

## Estimates

The next period is a range built from your own history: the last cycle lengths, widened by an age band taken from your body profile's birth year and by the contexts you declare in Settings, Cycle. PMS, PMDD, and endometriosis add symptom suggestions to the day log; PCOS, perimenopause, and thyroid widen the estimate. Contexts never move a date and are never inferred.

Two recorded starts give a first estimate. With fewer, the screen says it is waiting for history; when the intervals are out of range, it says so instead of guessing. A cycle can be excluded from the estimate with a reason, and a past period can be added so the estimator has history sooner.

## Contraceptive Pill

Settings, Cycle holds a pill card: days taking and days pausing (21 and 7 by default), the first day of a pack, and a daily reminder at the time you choose. The cycle screen shows which day of the pack you are on with a "Mark as taken" button. The reminder fires on taking days, stays quiet once today is taken, and carries a Taken action of its own. The scheme and the taken days sync between your phones; the reminder switch and time stay on each phone.

## Reminders, Widget, Report, Backup

- Three local cycle reminders and the pill reminder, see [Reminders](reminders.md).
- A home-screen widget and a dashboard tile show the recorded cycle day, the estimated range, and whether today is logged, see [Home widgets](home-widgets.md).
- The PDF health report offers a Cycle tracking section, see [Health report export](health-report-export.md).
- Settings, Cycle exports the journal, the excluded cycles, the contexts, and the age band as a JSON file and imports one back. An import merges: the newer edit per day wins.

## Permissions

Cycle permissions are their own Health Connect category. Writing a day log needs the write permission for each record kind it touches; a section that lacks it says so and offers to ask. Journal-only sections never need a Health Connect permission.

## Privacy

Cycle data stays in Health Connect and in the app's own database on the device. The journal, the exclusions, the contexts and age band, the pill scheme, and the taken days move with the cycle category of phone-to-phone sync, like Health Connect records do. Notifications default to neutral text, and the widget starts concealed. OpenVitals has no internet permission.
