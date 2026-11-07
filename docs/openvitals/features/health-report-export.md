# Health Report Export

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/reports`, `data/repository/report`, `domain/report`.
> **Navigation:** `Screen.SettingsDataImport`, then `Screen.SettingsReportExport`.
> **Related:** [Feature map](feature-map.md), [Settings and preferences](settings-and-preferences.md), [Heart and vitals](heart-and-vitals.md).

Health report export builds a PDF of your health data straight from Health Connect: pick the metrics, a detail level, and how far back to go, and OpenVitals produces a document you can hand to a doctor or keep for your records. The report is generated entirely on the device with the platform's own PDF engine - nothing leaves the phone unless you share it.

## Building a Report

1. **Pick metrics.** All exportable metrics your Health Connect provider supports are listed, grouped by section.
   Under Nutrition, after hydration, calories in, protein, carbohydrates, fat and caffeine, every other nutrient Health Connect stores is listed under the nutrition screen's own headings: Carbohydrates (dietary fibre, sugar), Fats (energy from fat, the fatty acids, cholesterol), Vitamins and Minerals. Each is a metric of its own. Ticking a heading ticks its whole group, or clears it when all of it is already ticked. Select all leaves these nutrients out, so a full report gains only the ones you ask for, and keeps any you had already ticked.
2. **Pick detail and range.** Daily, weekly, or monthly buckets; a preset lookback (30, 90, 180, or 365 days) or a custom start and end date. Where Health Connect offers medical records, a **Medical records** option sits under the metrics; Select all never ticks it, and a report can hold medical records alone.
3. **Build.** Progress shows the metric being read, and the build can be cancelled. A metric that fails or times out costs its own section, never the report.
4. **Share or save.** The finished PDF can be shared to any app or saved through the system file picker.

## What the PDF Contains

Every metric gets a chart (bars for totals, a min-max banded trend line for averages), a stats strip, and a data table. Metrics with more structure get clinical sections:

- **Blood pressure:** separate systolic and diastolic statistics, averages by meal context, and every reading listed with its body position and cuff location. Contexts chosen at entry are shown as such; estimated ones are marked.
- **Blood glucose:** averages by relation to meal, fasting first. Continuous-monitor volumes fall back to the daily chart.
- **Workouts:** totals per activity type and the full session list.
- **Sleep:** average bedtime and wake-up, the deep/REM/light/awake stage mix, and one row per night.
- **Cycle tracking:** the cycle-day chart, length statistics over completed cycles, a table per cycle, bleeding and pain counts, symptom counts on and off bleeding days, the notes, and a disclaimer. The cycles come from Health Connect; the subjective fields come from the day log kept on the phone.
- **Body metrics** show their change over the range; **body temperature** lists every reading.
- **Skin temperature** is printed as a signed variation from the device's baseline, the way the [skin temperature screen](heart-and-vitals.md#skin-temperature) shows it, not as a temperature.
- **Nutrient breakdown:** each nutrient gets the same chart, stats and table as any other metric, printed in the unit a nutrition label uses: fibre, sugar and the fats in g; sodium, potassium or vitamin C in mg; vitamin D, B12 or selenium in µg; energy from fat in kcal. Amounts under ten keep one decimal.
- **Medical records**, when chosen, come last: every allergy, condition and medication with its recorded status, and the vaccines and lab results dated in the range, labs with their value and the flag the lab set. Records are shown as received. See [Medical records](medical-records.md).

## Honest About What Is Missing

The report says so, in print, when something could not be included: metrics without read permission, a range truncated by the missing history permission, a cancelled build, or a metric whose read failed. The medical section asks for no permission; it uses the medical access already given and names the categories it could not fully read.
