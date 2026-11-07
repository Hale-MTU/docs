# Privacy

OpenVitals is designed as a local-first app. The local Android app is intentionally separate from any connected app work.

The local app:

- Does not ship app-level internet permission.
- Does not create OpenVitals cloud accounts.
- Does not upload health data to an OpenVitals server.
- Does not include ads.
- Does not include an analytics SDK.
- Reads supported records through Health Connect.
- Writes supported records only after an explicit save, import, record, edit, or delete action.

Local app preferences may include onboarding state, acknowledged permission prompts, unit settings, language, theme, widget order, goals, reminders, Body Energy calibration, timer settings, and display choices.

## Health Connect Records

Health Connect is the source of truth. OpenVitals reads Health Connect records to show dashboard summaries, detail screens, readiness, statistics, achievements, and insights.

Manual entries are saved back to Health Connect only when the user chooses to save them. Supported Apple Health export records are written to Health Connect only when the user imports an export file from Settings. OpenVitals-created records can be edited later; records created by other apps remain read-only.

Apple Health exports are analyzed locally before the user chooses which categories to import. Import reports are generated locally when the user runs an import and chooses to copy or download the report. They hold counts, selected categories, reasons and the importer's log with error text masked, and no record's value or time, no names, no file names and no file locations, so they can be shared to get a problem looked into.

## Medical Records

On Android 14 and newer, where Health Connect offers medical records, OpenVitals can show, import and export them. Health Connect stores them in the FHIR format.

- OpenVitals asks for medical permissions only inside its Medical records area, never together with other permissions. Each category has its own permission.
- Records are shown as Health Connect holds them. OpenVitals does not interpret them.
- You can scan a health card's QR code with the camera. OpenVitals asks for the camera only when you tap Scan, reads each picture on the device, and keeps none.
- Imports read a file you pick on the device. Exports are files created on the device, and leave it only if you save or share them. The import report counts what was written, held back or refused, by record type and reason, and holds none of your records' content.
- When you import a file, you can choose to keep a copy in the app's private storage. The choice starts off every time. Kept copies are not backed up.
- Sync with another phone copies all your medical records when you select that category on both phones. Kept copies stay on the phone.

## Sensitive Data

Cycle tracking uses sensitive Health Connect records and is shown only after cycle permissions are granted explicitly.

Workout route previews require manual Health Connect approval in some cases. GPS recording requires location permission because OpenVitals needs location points to build the route. Imported PMTiles or Mapsforge map packs stay local on the device.

## Permission Details

See [Permissions](permissions.md) for the current permission list and why each group is requested.
