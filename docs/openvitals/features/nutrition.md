# Nutrition

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/nutrition`, `features/manualentry/nutrition`, `data/repository/NutritionRepository.kt`.
> **Navigation:** `Screen.Nutrition`, `Screen.NutritionEntry`, `Screen.FoodEntry`, `Screen.Metric`; widgets `CALORIES_IN`, `PROTEIN`, `CARBS`, `FAT`; entry widgets `FOOD`, `NUTRITION`.
> **Related:** [Feature map](feature-map.md), [Manual entry of metrics](manual-entry-metrics.md), [Food logging](food-logging.md), [Preloaded beverage nutrition reference](preloaded-beverage-nutrition.md).

The nutrition feature owns period-based nutrition detail screens for intake metrics read from Health Connect.

## Implemented Metrics

Nutrition metric detail screens currently cover:

- Calories in.
- Protein.
- Carbohydrates.
- Fat.

Caffeine is intentionally separate. It is a caffeine-specific analytics and setup experience described in [`beverage-logging-and-caffeine.md`](beverage-logging-and-caffeine.md).

## Detail Pattern

Nutrition metrics follow the canonical period-detail pattern:

- Day, week, month, and year ranges.
- Selected anchor date.
- Previous/next navigation and calendar selection.
- Pull to refresh.
- Goal progress for supported intake metrics.
- Period charts, selected-day breakdowns, entries, statistics, comparisons, confidence, and source labels.
- Reorderable detail sections.

Nutrition records remain in Health Connect. OpenVitals writes nutrition records through explicit entry flows: food logging, the nutrition entry form and beverage logging. The [CSV importer](csv-import.md) can also bring in a spreadsheet of meals, one food entry per row.

The entry list on the nutrition screens (reached from the Calories in, Protein, Carbs and Fat widgets) lets you act on what OpenVitals wrote:

- Every OpenVitals entry swipes to delete. Records from other apps are read-only.
- An entry typed in the nutrition form has an edit button that opens the form with its values and time. Saving replaces the entry in place. Older carbs-only entries edit the same way.
- A drink has an edit button that opens the drink: its nutrients follow the drink's volume, so they are not edited apart from it.
- A logged food portion can only be deleted, so the food catalog stays the one place its nutrients are set.
- A food imported from a CSV file can only be deleted too: correct the spreadsheet and import it again, and the entry is replaced.

## Daily Averages Over A Period

Nobody eats by the month. Over a week, month or year each nutrient tile leads
with the **daily average** and keeps the period total underneath, so the number
you read first is the one that means something. This covers the vitamin and
mineral grids as well as calories, protein, carbs and fat.

A single day is left alone: its total already is the day.

### Which days the average divides by

Settings, Nutrition holds one switch: **Average logged days only**, on by
default.

- **On** — divides by the days you logged food. The average of the meals you
  actually recorded, undiluted by the days you did not.
- **Off** — divides by every day of the period so far. A day with nothing
  recorded counts as a day you ate little.

Either way, a period still running divides only by the days that have happened.
On the 13th of the month, your monthly average is this month's food over
thirteen days, not thirty-one.

## Related Features

- [`manual-entry-metrics.md`](manual-entry-metrics.md): the nutrition entry form.
- [`food-logging.md`](food-logging.md): foods from your own catalog.
- [`beverage-logging-and-caffeine.md`](beverage-logging-and-caffeine.md): beverage nutrition defaults.
- [`preloaded-beverage-nutrition.md`](preloaded-beverage-nutrition.md): preset beverage reference data.
