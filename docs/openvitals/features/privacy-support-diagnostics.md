# Privacy, Support, And Diagnostics

> **Status:** Current implemented behavior and support policy.
> **Audience:** Users and contributors.
> **Implementation:** `features/settings`, diagnostics-gated settings, local support docs.
> **Navigation:** `Screen.SettingsDebugDiagnostics` in diagnostics builds, Settings support links.
> **Related:** [Feature map](feature-map.md), [Privacy](../app/privacy.md), [Support](../app/support.md).

OpenVitals is designed as a local-first Health Connect app.

For the standalone privacy reference, see [Privacy](../app/privacy.md). For support-oriented questions, see [FAQ](../app/faq.md).

## Privacy Model

OpenVitals does not require:

- An OpenVitals account.
- OpenVitals cloud sync.
- OpenVitals analytics.
- Ads.

Health data is read from and written to Health Connect on device. OpenVitals stores local preferences such as widget order, goals, reminders, calibration, and display choices.

## Internet Boundary

The app does not need app-level internet access for normal health features. Offline map packs, imports, widgets, and Health Connect reads are handled locally.

## Diagnostics

Diagnostics surfaces help users and maintainers understand local issues without sending health data automatically. They can include app version information, debug build separation, import reports, logs, and crash-report email drafts. Each holds structure, not data: counts, record types, reasons, and error text with numbers, dates, addresses and identifiers masked. Nothing in them is a record's value or time, a name, or a file name.

Apple Health import reports are explicit user downloads with the importer summary, logs, grouped diagnostics, worker logs, and on failure the masked exception stack; the per-record diagnostic log is capped per source (see [Apple Health import](apple-health-import.md#reports-and-diagnostics)) so a large repeated import cannot make the report unbounded, but grouped diagnostic counts stay complete.

The crash and Report an issue email drafts carry no log. After a crash the app keeps one report with the masked error, attaches it for seven days at most, and deletes it once it has gone into an email, a copy or a file. Diagnostics builds (debug and nightly) can also save or share the app's log from Settings → Debug diagnostics: every line is kept, with addresses, identifiers, file locations, dates and error details masked. Copied reports are marked sensitive, so Android keeps them out of the copy preview.

## Support Links

Settings and project metadata can point users toward support and community resources such as Zulip, GitHub, or donation links.

## Health Disclaimer

OpenVitals insights are wellness context. Scores, readiness estimates, cardio load, Body Energy, and sleep explanations are not medical diagnosis or treatment advice.

Medical records are shown as they were received. OpenVitals does not interpret them, and the health disclaimer says so.
