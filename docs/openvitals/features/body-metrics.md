# Body Metrics

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/body`, `features/manualentry/body`, `data/repository/BodyRepository.kt`.
> **Navigation:** `Screen.Metric`, body entry routes; widgets `WEIGHT`, `HEIGHT`, `BMI`, `FFMI`, `BODY_FAT`, `LEAN_MASS`, `BMR`, `BONE_MASS`, `BODY_WATER_MASS`.
> **Related:** [Feature map](feature-map.md), [Manual entry of metrics](manual-entry-metrics.md), [Statistics](statistics.md).

The body feature owns period-based detail screens for body measurement and composition metrics read from Health Connect.

## Implemented Metrics

Body metric detail screens currently cover:

- Weight.
- Height.
- BMI.
- FFMI.
- Body fat.
- Lean mass.
- Basal metabolic rate.
- Bone mass.
- Body water mass.

BMI and FFMI-style context are derived from available measurements. Derived values should explain missing prerequisites instead of pretending the calculation is complete.

## FFMI

Tapping the FFMI tile opens an FFMI screen of its own. FFMI (fat-free mass index) is calculated, not read: the headline is the dashboard tile's value, adjusted FFMI from your latest weight, body fat and height. The FFMI category card for that value sits with the statistics.

The chart, statistics and entries have one reading per body-fat measurement in the period, paired with the weigh-in nearest to it in time, which may sit just across the period's edge. A weigh-in with no body-fat reading adds no point: carrying an old body-fat percentage onto later weights would show fat lost as lean mass lost. Height is the latest on record, as BMI uses it. The readings are calculated, so their rows edit nothing.

## Basal Metabolic Rate Estimate

Off by default. Settings, Body profile has a "Basal metabolic rate" switch. On, OpenVitals estimates the resting daily burn with Mifflin-St Jeor from the profile's sex, birth year, weight and height, and writes one basal metabolic rate record per day to Health Connect.

- It covers the last 90 days. Each day uses the weight measured on or before it, falling back to the declared profile weight, so an old day is not rewritten with today's weight.
- A day that already has a rate from any other source, a watch import or a CSV row included, is left alone, and a rate that arrives later evicts the estimate for that day.
- Switching off removes every estimate; nothing else is ever deleted.
- The card names which profile inputs are still missing; until they are all there nothing is written. The Sex field in the body profile exists only for this formula.

## Detail Pattern

Body metrics follow the canonical period-detail pattern:

- Day, week, month, and year ranges.
- Previous/next period navigation capped at the current period.
- Calendar selection and pull to refresh.
- Period charts, selected-day entries, statistics, comparisons, personal baselines, and data confidence.
- Entry lists that allow edit/delete only for OpenVitals-created records.
- Reorderable metric detail sections.

Manual body entry lives under `features/manualentry/body` and writes explicit user-entered records to Health Connect. The Body composition form saves a whole weigh-in at one time, weight, body fat, lean mass, body water, bone mass and BMR, see [Manual entry of metrics](manual-entry-metrics.md#body-composition). Each value stays its own record, so the weight, body fat, lean mass, body water, bone mass and BMR screens each edit or delete their own OpenVitals entries. The dashboard and body detail screens remain read-oriented.

## Charts Over A Period

Week, month and year draw a trend line over a scale fitted to your values; only
Day uses the intraday chart.

Month and year used to show a calendar of coloured dots, one per day, shaded by
how big that day's number was. That works for something that can be zero and can
be huge, like steps. It does not work for weight, which spends its life inside a
narrow band: forty dots of near-identical colour answered "did you weigh
yourself on the 14th" while hiding the thing you opened the screen to see, which
is which way the line is going.

The scale is fitted to your readings rather than starting at zero, because a
kilogram of drift is invisible on an axis that begins at nothing.

## Data Boundaries

The body feature reads through `BodyRepository`. Each body dashboard tile opens its own focused metric screen directly — tapping Weight opens the weight detail, not an intermediate Body overview. New body metric work should keep feature-specific formatting, cards, charts, and rows in `features/body`; shared components should only move out when another feature really reuses them.
