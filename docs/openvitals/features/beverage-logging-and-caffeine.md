# Beverage Logging And Caffeine

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/manualentry/hydration`, `features/hydration`, `features/caffeine`, `features/nutrition`.
> **Navigation:** `Screen.HydrationEntry`, `Screen.HydrationEntryLogDrink`, widgets `HYDRATION`, `CAFFEINE`.
> **Related:** [Feature map](feature-map.md), [Hydration](hydration.md), [Nutrition](nutrition.md).

OpenVitals supports beverage logging as an explicit Health Connect write flow for hydration, caffeine, and selected nutrition values.

## Beverage Catalog

The beverage entry flow supports preset drinks, categories, custom drinks, and frequently consumed drinks. Common options include water, coffee, tea, soft drinks, energy drinks, sports drinks, oral rehydration solution, milk, fruit juice, and custom beverages.

Users can choose drink type, container size, custom amount, and saved beverage defaults.

## Hydration Values

Beverages can contribute an effective hydration amount. Some drinks can use hydration multipliers so the logged hydration value better matches the selected beverage.

Hydration entries created by OpenVitals can be edited or deleted when the app has the required Health Connect write permission.

## Caffeine Values

Caffeine-aware drinks can write caffeine nutrition values and feed the caffeine detail screen. The caffeine experience can show:

- Total caffeine intake.
- Active caffeine estimates.
- Source and time-of-day context.
- Daily limit and sensitivity settings.
- Bedtime guidance.

### Day, Week, Month And Year

The caffeine screen uses the same period model as the other metrics: a range picker, a period to step through, a date picker, and sections you can reorder. It opens on Day and remembers the last range. Day shows active caffeine or a past day's total, the day's curve with the threshold and each drink, and that night's bedtime level. Week, month, and year show the period summary, daily totals, the daily and bedtime impact card with the safe-night calendar, and statistics with a previous-period comparison. Drinks older than the seven-day lookback do not count toward a level.

### Drinking Over A Period

The Log drink dialog asks how long a caffeinated drink took - at once, 15 or 30 minutes, or 1, 2, or 3 hours - and stores it as the end time of the Health Connect nutrition record. The caffeine model spreads a dose across the record's interval, so a coffee nursed over two hours is absorbed across those two hours instead of arriving all at once at the first sip. "At once" keeps the previous behavior, and the drink sheet shows the duration a record carries.

## Nutrition Defaults

Selected beverages can include nutrition defaults that map to supported Health Connect nutrition fields. Health Connect remains the source of truth after the entry is saved.

## Relationship To Sleep

Existing caffeine records feed the standalone caffeine detail experience, where users can review active caffeine, timing, intake distribution, daily limits, sensitivity settings, and bedtime guidance. Direct sleep-detail integration is planned separately; current sleep scores are not adjusted by caffeine records.
