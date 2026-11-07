# GPX/KML/KMZ Route Import

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/manualentry/activity/routeimport`, `features/activity`.
> **Navigation:** `Screen.SettingsDataImport`, `Screen.ActivityEntry`.
> **Related:** [Feature map](feature-map.md), [FIT files import](fit-files-import.md), [Offline maps support](offline-maps-support.md), [Elevation correction](elevation-correction.md).

OpenVitals can import GPX, KML, and KMZ route files from Activity Entry, preview the result, and save supported activities to Health Connect.

## Supported Formats

- GPX for route tracks and timestamps where present.
- KML and KMZ for route geometry.

FIT activity, course, and workout files are imported from Settings, Data Importers. See [FIT files import](fit-files-import.md).

## Import Flow

The user opens Activity Entry and chooses route import, or shares a supported route file with OpenVitals. OpenVitals then shows the detected activity details before the user decides whether to save.

The review can include:

- Activity type.
- Title and notes.
- Start and end time.
- Route preview when usable route points are available.
- Distance and elevation.
- Estimated calories where available.

## Saved Data

When saved, OpenVitals writes supported Health Connect exercise session data and related records such as route, distance, elevation, active calories, and total calories where permissions and data allow.

When elevation correction is on and imported tiles cover the whole route, the file's altitudes are replaced by tile heights before the elevation gain is computed. See [Elevation correction](elevation-correction.md).

## Export

Every workout can be exported from the Export workout card on its detail screen. A workout with a GPS route offers two groups: **With the GPS route** has GPX, KMZ, and a FIT that carries the route, altitude and distance beside heart rate, speed and cadence; **Without the GPS route** has TCX, CSV, and a FIT with the session's totals and its heart rate, speed and cadence samples, and no location. A workout without a route offers the second group only.
