# Non Health Connect Metrics Dashboard

> **Status:** Current implemented behavior for local derived views.
> **Audience:** Users and contributors.
> **Implementation:** `features/activity`, `features/readiness`, `features/bodyenergy`, `features/recovery`, `domain/insights`.
> **Navigation:** `Screen.Metric`, `Screen.DailyReadiness`; widgets `CARDIO_LOAD`, `WEEKLY_CARDIO_LOAD`, `BODY_ENERGY`.
> **Related:** [Feature map](feature-map.md), [Daily readiness](daily-readiness.md), [Body Energy](body-energy.md).

Some OpenVitals dashboard values are not raw Health Connect record types. They are local calculations built from Health Connect data and app preferences.

## Cardio Load

Cardio load estimates training strain from available activity and heart-rate signals. When heart-rate coverage is good, OpenVitals uses a TRIMP-style calculation based on heart-rate reserve. When heart-rate data is missing or incomplete, the app can fall back to movement-only context with lower confidence.

The detail screen explains:

- Daily and weekly cardio load.
- Calculation method.
- Heart-rate coverage.
- Activity windows and activity minutes.
- Resting and maximum heart-rate context.
- Confidence and method labels.

The TRIMP weighting follows Banister: a = 0.64 and b = 1.92 for men, a = 0.86 and b = 1.67 for women, and the values for men when the body profile has no sex. The maximum heart rate comes from the body profile. If none is set, OpenVitals uses the highest heart rate it has measured, when that is high enough to count; otherwise it estimates the maximum from your age, 206 - 0.88 x age for women (Gulati) and 208 - 0.7 x age for everyone else (Tanaka). The age estimate stands on its own: it is not raised to a lower measured peak. The explanation links Banister's, Tanaka's and Gulati's papers.

## Other Derived Views

Derived views also include readiness-style summaries, body energy, sleep score, sleep efficiency, total-calorie estimates, and body composition calculations such as BMI and FFMI where the source records are available.

## Safety Boundaries

These values are wellness and information features. They are not medical diagnosis, treatment, or disease-prevention tools. The UI keeps caveats and confidence context near the derived result when the input data is incomplete.
