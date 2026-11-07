# Home Screen Widgets

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/homewidgets`.
> **Navigation:** Android launcher widget configuration activities; dashboard widgets in `DashboardWidgetId`.
> **Related:** [Feature map](feature-map.md), [Health Connect metrics dashboard](health-connect-metrics-dashboard.md), [Daily readiness](daily-readiness.md).

OpenVitals provides Android home screen widgets for quick health summaries and fast beverage logging.

## Widget Types

- Daily Readiness.
- Body Energy.
- Today Vitals.
- Configurable metric summary widgets.
- Quick beverage logging widgets.
- Cycle.

Metric widgets are configured when the widget is added. They show selected OpenVitals dashboard metrics without turning the launcher widget into a second dashboard screen.

## Cycle Widget

The cycle widget starts concealed. Revealed, it shows the recorded cycle day, the estimated range of the next period, and whether today is logged. It never shows notes, symptoms, mood, or energy, and it redraws after midnight. Tapping it opens the Log chooser for today. See [Cycle tracking](cycle-tracking.md).

## Quick Beverage Logging

The quick beverage widget can be configured for a saved drink choice. It is meant for repeated entries such as water, coffee, tea, or another frequently used beverage.

When a beverage is logged, OpenVitals writes the supported hydration, caffeine, and nutrition values through the same explicit entry flow boundaries used inside the app.

## Data Source

Widgets read from Health Connect-backed repositories and local derived calculations. Health Connect remains the source of truth for health records, while local preferences store widget configuration and display choices.

## Refresh Behavior

Widgets refresh from the same app-local data paths used by the dashboard and detail screens. While at least one widget is placed, a background job re-reads Health Connect and redraws every widget on the interval chosen in Settings > Display (15, 30, 60 or 120 minutes; 30 by default), with Android choosing the exact moment; the widgets also redraw when the dashboard finishes loading today. If permissions are missing, data is unavailable, or Health Connect cannot be reached, widgets show a limited state instead of inventing values.

## Privacy

Home widgets stay on device. OpenVitals does not upload widget data to an OpenVitals server.
