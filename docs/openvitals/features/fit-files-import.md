# FIT Files Import

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/manualentry/activity/routeimport`.
> **Navigation:** `Screen.SettingsDataImport`, then `Screen.ActivityEntry` for review.
> **Related:** [Feature map](feature-map.md), [GPX/KML/KMZ route import](route-file-import.md), [Recording of activity](activity-recording.md), [Elevation correction](elevation-correction.md), [Apple Health import](apple-health-import.md).

FIT import lives in Settings, Data Importers. It lets users bring supported activity, course, and workout files into OpenVitals for review before saving to Health Connect.

## What FIT Import Is For

FIT files commonly come from fitness devices and activity platforms. OpenVitals reads the Garmin FIT File Id type and handles Activity, Course, and Workout files differently: completed activities can provide timing, calories, distance, elevation, and optional GPS samples; courses provide route geometry and optional estimated duration; workouts provide structured workout metadata such as name, sport, and supported timed step duration.

The activity type comes from the file's sport and sub-sport, as Garmin's profile names them. Yoga, pilates, stretching, breathwork, elliptical, stair climbing, pool and open water swimming, the racket and ball sports, hockey, scuba diving, HIIT, martial arts, dancing, rock climbing and ice skating import as themselves instead of a generic workout.

## Review Before Save

Imported FIT files are not written immediately. The user reviews detected details, adjusts supported fields where needed, and then chooses whether to save the activity to Health Connect.

## Import A Folder Of FIT Files

Reviewing one file is the right thing for one file and the wrong thing for two hundred. The FIT importer card therefore has a second action, "Import a folder of FIT files", which writes every FIT file under the picked folder straight to Health Connect without the review screen.

- Pick the folder with the system folder picker. Every `.fit` file inside it is imported, including the ones in sub-folders where a watch buries them. No storage permission is needed; the pick itself grants access.
- Files are imported in name order, which for a watch is the order the activities happened, one file at a time.
- Activity files become activities. Garmin wellness files that carry nightly heart-rate variability are imported as HRV instead of failing. A file that will not read fails on its own and the rest of the folder carries on.
- A very large folder is capped at 50,000 files and the card says how many were taken. A folder with no FIT files in it is reported as such, not as an error.
- Because the folder import writes directly, it needs the same Health Connect write permissions as the route bulk import; the card offers to grant them.

The card shows progress while the folder imports, then the imported and failed counts.

## Relationship To Route Import

FIT uses the same activity review screen as route import after the file is selected from Settings. Unlike plain route files, FIT files do not need GPS route points; OpenVitals imports supported activity, course, or workout details and attaches a route only when usable route samples are present.

## Limits

FIT files vary by device and exporter. OpenVitals imports supported fields and leaves unsupported or missing fields out of the saved Health Connect record.
