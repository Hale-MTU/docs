# Manual Entry Of Metrics

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/manualentry` and child packages for activity, hydration, nutrition, body, vitals, and mindfulness.
> **Navigation:** `Screen.ManualEntry` and manual entry routes; widgets in `ManualEntryWidgetId`.
> **Related:** [Feature map](feature-map.md), [Permissions](../app/permissions.md), [Beverage logging and caffeine](beverage-logging-and-caffeine.md).

Manual entry flows let the user write explicit records to Health Connect. OpenVitals does not keep a separate health database for these records. The one exception is the cycle day log: what Health Connect has no record type for, such as pain, mood, energy, symptoms, and notes, stays in a journal on the phone, see [Cycle tracking](cycle-tracking.md).

## Body composition

The **Body composition** tile is one form for everything a body analysis scale shows: weight, body fat, lean mass, body water, bone mass and basal metabolic rate (BMR). Fill in what the scale shows and leave the rest blank. Every filled value is saved to Health Connect with the same time, and a save writes all of them or none. Body water can be typed as a percentage, which becomes a mass of the weight typed on the same form, never of an older one, or in kg or lb. Masses follow the weight unit setting.

Each value is its own Health Connect record afterwards, so the Body screens edit or delete it alone, through the same form showing that one field. Only OpenVitals-created entries can be edited or deleted. The daily BMR estimate OpenVitals can write from your profile is not offered for editing. Weight data also feeds body detail screens, BMI, body composition context, and statistics.

The tile replaced the Weight and Body fat tiles in 2.15.0; a saved tile order keeps it where those were. Height keeps its own tile.

## Supported Manual Entries

OpenVitals supports explicit logging for:

- Beverages/hydration, including drink/container choices, custom amounts, caffeine-aware presets, and selected nutrition defaults.
- Foods from a catalog you build yourself, each portion saved as one nutrition record, see [Food logging](food-logging.md).
- Nutrition totals typed in directly: calories in, protein, carbs and fat on one form, plus any other nutrient Health Connect stores (fibre, sugar, fats, vitamins, minerals) added with **Add another nutrient**. One save writes one Health Connect nutrition record; blank fields are left out, and the date and time can be set back to log earlier days. Caffeine is not offered, because it is logged as a drink. Amounts do not change with the unit system: energy in kcal, the macros in grams, and vitamins and minerals in the mg or µg a nutrition label uses. These entries are not drinks, so the beverage screens skip them, and they can be edited from the [Nutrition](nutrition.md) screen.
- Activity sessions of every exercise type Health Connect has, optionally with routes, distance, elevation, calories, repetitions, title, and notes. Each type shows the fields that fit it: a route sport takes GPS and distance, a machine or pool takes a distance and no route, and a timed session such as yoga takes the time and an optional heart rate strap.
- Mindfulness sessions through a timer or manual duration.
- Body measurements: a whole body composition weigh-in, and height.
- Vitals such as blood pressure, SpO2, respiratory rate, body temperature, heart rate variability (HRV), blood glucose, and VO2 max.
- Blood glucose in mmol/L or mg/dL, starting from the unit setting; switching the unit converts what is typed. A reading can say whether it was fasting, before or after a meal (and which meal), or general, and the sample: finger prick, sensor (interstitial fluid), plasma, serum or whole blood.
- VO2 max with how it was measured, optionally: a lab test (gas analysis), the Cooper test, the beep test, the Rockport walk test, or the heart rate ratio.
- The Blood glucose and VO2 max tiles came in 2.15.0. They are in the default grid; if you saved your own tile order, add them from the grid's edit mode.
- The pulse a blood pressure monitor shows, as an optional field on the blood pressure form. It is saved as a heart rate record at the time of the reading, so it appears under Heart rate, not under Resting heart rate, and beside the reading in the blood pressure list; editing the reading moves or replaces it, clearing the field removes it, and deleting the reading deletes it too. The first pulse asks for heart rate write access; a reading without a pulse never does.
- Cycle observations through a chooser: bleeding, how you feel, a pregnancy test, an ovulation test, sexual activity, basal body temperature, and cervical mucus, one at a time, saved as one day log.
- Every vitals form offers date and time pickers when adding as well as when editing, defaulting to now - a reading can be logged after the fact under the moment it was taken.

## Permission Handling

The Log screen opens with any or no write access. Each entry form checks only the write permissions its own metric needs; when they are missing it shows a "Some permissions are missing" callout whose Grant button asks Health Connect for exactly those. Write permissions can also be granted from the "Manual entry write access" card in Settings. The dashboard remains read-only even if write permissions have already been granted.

## External Records

Records created by other apps stay read-only in OpenVitals. OpenVitals checks ownership before allowing edits or deletes of records it created.
