# Heart And Vitals

> **Status:** Current implemented behavior. One parametric screen serves all ten metrics.
> **Audience:** Users and contributors.
> **Implementation:** `features/heart`, `features/vitals`, `features/manualentry/vitals`, `data/repository/HeartRepository.kt`, `data/repository/VitalsRepository.kt`.
> **Navigation:** `Screen.Metric`, vitals entry routes; heart and vitals dashboard widgets.
> **Related:** [Feature map](feature-map.md), [Manual entry of metrics](manual-entry-metrics.md), [Statistics](statistics.md).

Heart and vitals are related but distinct feature areas, and the split is in the data layer, not the screen layer.

- `features/heart` owns heart-rate-oriented state, presentation mapping, and route wrappers for average heart rate, resting heart rate, and HRV.
- `features/vitals` owns vitals-facing screens and UI helpers such as blood pressure, SpO2, VO2 max, respiratory rate, body temperature, blood glucose, skin temperature, and the Today Vitals overview.
- The read split is real: `HeartRepository` serves heart rate / resting heart rate / HRV, `VitalsRepository` serves the rest, and `LoadHeartPeriodUseCase` combines them so one screen can load either family.

The current implementation still shares `HeartViewModel` and the heart period loader across heart and vitals routes. That is an intentional transitional boundary: the user-facing vitals UI lives in `features/vitals`, while some loading and state infrastructure remains shared until a deeper split is worth the extra complexity.

## Implemented Metrics

Heart metrics:

- Average heart rate.
- Resting heart rate.
- HRV.

Vitals metrics:

- Blood pressure.
- SpO2.
- VO2 max.
- Respiratory rate.
- Body temperature.
- Blood glucose.
- Skin temperature.

### Skin Temperature

Health Connect stores skin temperature as a variation: how far your skin moved from a baseline the device set, not a temperature you could read off a thermometer. A record may or may not carry that baseline, and it can span hours with a sample every minute. The skin temperature screen reads it that way:

- Every value is a variation in signed degrees, under "Variation from baseline". OpenVitals never adds the baseline back to make up an absolute temperature.
- Charts are centred on zero, with a dashed zero line. The day view draws the samples through the day instead of one dot at the end of the record.
- Comparisons are in signed degrees, not a percent of a small number (which used to print things like "-652 % vs previous day"). Your personal baseline keeps the days below zero, and the tile that compares with it is called "Vs usual average".
- The device's own baseline has a "Baseline" tile: the one the period's records share, or the newest one, marked "From the newest record", when they differ. It says "Not provided by source" when no record has one.
- A record with no samples reads "No variation recorded"; its baseline is never shown as a reading. The dashboard tile shows the newest record that has a variation.

## Detail Pattern

Heart and vitals detail screens use the shared metric detail scaffold:

- Day, week, month, and year ranges.
- Selected anchor date.
- Previous/next period navigation.
- Calendar date picking.
- Pull to refresh.
- Intraday charts where sample data is available.
- Period charts, statistics, thresholds, comparisons, data confidence, source labels, and entry lists.
- Reorderable sections.

OpenVitals-created vitals entries can be edited or deleted when the app has write permission and ownership can be verified, blood glucose and VO2 max included. External records stay read-only. Blood glucose and VO2 max can be entered from Add entry since 2.15.0, see [Manual entry of metrics](manual-entry-metrics.md).

## Blood Pressure Categories

The latest reading is named with the categories of one guideline. Settings, Vitals holds the choice: ACC/AHA 2017 (the default), ESH 2023, ESC 2024, or ISH 2020. ACC/AHA counts 130/80 mmHg as high; the other three count 140/90.

- A reading takes the highest category that either number reaches.
- Every guideline flags a reading above 180 systolic or above 120 diastolic.
- The "How it is classified" card on the blood pressure screen names the guideline, lists its thresholds, and links its sources.
- The thresholds are for adult readings taken in a clinic. Home readings often run lower.

## Today Vitals

Each heart and vitals dashboard tile opens its own focused metric screen directly - tapping Blood pressure opens the blood pressure detail, not an intermediate overview.

## Data Boundaries

Heart-rate and vitals records are read through feature-facing repository/use-case APIs rather than a global browser. Manual vitals entry lives under `features/manualentry/vitals`. Dashboard heart and vitals tiles open their per-metric screens directly.
