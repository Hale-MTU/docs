# Body Energy

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/bodyenergy`, `features/readiness`; the calculation is `insights/BodyEnergyTimeline.kt` in [health-calculations](https://github.com/Hale-MTU/health-calculations), shared with OpenWatch.
> **Navigation:** `Screen.BodyEnergyDetails`, widget `BODY_ENERGY`, settings section `RECOVERY`.
> **Related:** [Feature map](feature-map.md), [Daily readiness](daily-readiness.md), [Sleep score and recovery](sleep-score-and-recovery.md), [Home screen widgets](home-widgets.md).

Body Energy is a local derived view that estimates available energy across the day from supported wellness signals. It is intentionally a selected-day experience rather than a canonical `Day / Week / Month / Year` metric-detail screen.

## What It Shows

Body Energy can appear in:

- The dashboard tile.
- The Body Energy detail view, which also hosts [Daily Readiness](daily-readiness.md).
- Android home screen widgets.

The detail view reads as a story for the selected day: the battery first (the score and the day's timeline share one card), then what moved it, then the Daily Readiness verdict those movements feed, then the inputs used and how the estimate is made. Day navigation moves the readiness card and the timeline together.

## Calibration

Body Energy supports calibration during onboarding and in Recovery settings. Calibration helps the local estimate better fit the user, and can be reset when needed. The calibration can also hold your own heart rate zone limits, which Body Energy and the activity detail's heart rate zones then use instead of the ones worked out from your maximum heart rate. Up to 2.16.0 the calibration could also fit itself to a Garmin watch's own body energy reading; that went with the watches to [OpenWatch](../../openwatch/index.md).

Recovery settings also carry a Start over card for the three metrics OpenVitals works out itself and keeps outside Health Connect: Body Energy, Recovery and Expenditure. Behind a confirmation it wipes their history, the tuning learned so far, the baselines and the expenditure cache, then rebuilds them from Health Connect as a fresh install would. Health Connect data, the body profile, heart zones and goals are kept.

## How The Battery Moves

The score is a running balance rather than a daily reset: a day opens where the
previous one closed.

**It charges** while you sleep, and far more slowly during genuinely quiet
waking time. How much a night charges depends on how long it lasted, how well it
went, your overnight heart-rate variability against your own baseline, and your
breathing rate.

**It drains** from basal metabolism — a gentle downward slope whenever nothing
else is happening — from active energy burned, from heart-rate-derived stress,
and from recovery debt after a hard session.

Where a stretch of the day has steps but no active calories from any source, its
walking cost stands in, from the cadence (Moore et al. 2021) and the weight in
your [body profile](settings-and-preferences.md). Without a weight nothing
stands in, and the detail view says which body profile fields are missing, with a
button to open the profile. Up to 2.16.0 every such step counted a flat 0.04 kcal.

## Heart Rate Zones

The heart rate parts of the balance place each reading in a zone on the heart
rate reserve, the span between your resting and maximum heart rate, on the ACSM's
intensity classes (Garber et al. 2011): light from 30 %, moderate from 40 %,
vigorous from 60 % and near-maximal from 90 %. A fifth bound at 75 % splits
vigorous in two so the zones stay five; it has no source of its own. Minutes from
the moderate zone up count as active, and from vigorous up as building recovery
debt. Since 2.17.0 moderate starts at 40 %, as the ACSM has it;
it was 45 %, so a little more time now counts as active.

The maximum heart rate is the one every OpenVitals estimate uses: the one you
entered in the body profile, else the highest reading of the year before when it
is believable against your resting rate, else an age estimate (Gulati for women,
Tanaka otherwise). Up to 2.16.0 Body Energy ignored an entered maximum and looked
for the highest reading in its own 28-day window. An entered resting rate is
still not used here. Limits you set yourself in the calibration replace these
zones.

Calibration nudges how strongly each of those counts for you; the shape above is
the same for everyone.

## Sleep Quality And Charge

How well you slept changes what the night charges, not just how long you slept.

This did not always hold. The charge counted the minutes and read overnight HRV,
and never asked how those minutes went — so an unbroken eight hours with a
healthy deep and REM share was worth within a couple of points of a shallow,
repeatedly interrupted eight hours. Two mornings that feel nothing alike arrived
at almost the same number.

What the charge now reads is the **quality** part of your
[sleep score](sleep-score-and-recovery.md): sleep efficiency, time spent awake
after falling asleep, and how much of the night was deep and REM sleep. Only
that part — the sleep score's other two pillars are duration and overnight HRV,
and the charge already counts both of those, so using the whole score would
count them twice.

What this means in practice:

- **An ordinary night charges what it always did.** Better nights charge more,
  worse nights less. The change spreads nights apart rather than moving everyone
  up or down.
- **The effect is capped at ±20%.** One night of odd-looking sleep staging
  cannot undo hours you actually slept, and how long you slept remains the
  bigger factor.
- **A flawless night now reads above a merely good one.** The sleep score itself
  stops distinguishing nights once they clear its clinical thresholds — that is
  correct for a score answering "was this healthy" — so the charge reads the
  same measurements on a continuous scale instead.
- **More deep sleep than the healthy range is not treated as better.** That one
  is genuinely a band, not a "more is better" number.
- **A night with no sleep staging is left exactly as it was.** If your source
  records only when you went to bed and when you got up, there is nothing to
  judge the quality by, and the app does not invent a verdict. Naps are not
  judged either.

Over eight hours in bed, before your personal calibration, the charge runs
roughly:

| Night | Charge |
| --- | --- |
| Flawless: 90 min deep, 115 REM, none awake | ~56 |
| Good: 75 deep, 95 REM, 15 min awake | ~54 |
| Ordinary: 50 deep, 70 REM, 35 min awake | ~48 |
| Poor: 25 deep, 45 REM, 60 min awake | ~39 |
| Broken: 10 deep, 20 REM, 150 min awake | ~38 |

When the calculation changes, previously stored days are recomputed, so your
history stays consistent with the current model rather than mixing two.

## Signals

Body Energy is calculated locally from available Health Connect-backed signals and app preferences. Missing or sparse source data lowers confidence instead of pretending the estimate is complete.

The measured battery also feeds the Daily Readiness verdict: a drained day holds training recommendations back, and a charged one lifts them. See [Daily Readiness](daily-readiness.md).

## Data Model

Body Energy is not a raw Health Connect record. It is an OpenVitals-derived wellness estimate and should be treated as general guidance, not medical advice.

## Privacy

The calculation runs on device. OpenVitals does not upload Body Energy inputs or results to an OpenVitals server.
