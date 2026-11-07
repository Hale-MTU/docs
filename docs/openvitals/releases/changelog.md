# Changelog

This page summarizes the English release notes for the local Android app.

For full localized notes, see the Android app repository changelog.

OpenVitals is a Kotlin app. It was rebuilt on Flutter in 2.0.1 and migrated back to Kotlin in 2.5.0, so entries between those two releases describe the Flutter implementation, and everything before and after describes the Kotlin one. (2.0.0 was prepared but never published, so 2.0.1 carries everything since 1.9.0.)

## 2.15.2 - 2026-11-01

This release keeps the dashboard filling when Health Connect runs out of patience. On Android 13, where Health Connect is a separate app with a stricter limit, a fresh install could show "no data" on every tile and a toast asking to wait a minute, forever; the app now spaces its calls, needs far fewer of them, counts down in a banner and asks again for the missing tiles by itself. Sync with another phone gains an Overwrite existing records option for records Health Connect holds but does not count, the CSV importer reads blood pressure logs and the app's own workout exports, and a Wear OS watch now sends the floors it climbed and a resting heart rate for each night, and rests its heart rate sensor while off the wrist. Every report, crash draft and log the app can hand out holds counts, types and reasons, never your values.

- **Health Connect rate limits.** When Health Connect refuses a read, the dashboard shows a banner that counts down and reloads the missing tiles by itself; the other tiles keep their data and their place, and the toast is gone. A repeated refusal waits longer each time. On Android 13, where Health Connect is a separate app with a stricter quota, calls are spaced out and the dashboard needs far fewer of them, so a fresh install fills instead of showing "no data" everywhere.
- **Overwrite existing records in a phone-to-phone sync.** A new checkbox on the "What to accept" step, off by default, makes this phone write every record the other phone sends under OpenVitals, for records Health Connect lists but leaves out of its totals, as after a backup restore or a phone transfer. The choice is local to the phone that ticks it, and the report says when it was on.
- **Workouts from a CSV file.** The CSV importer recognises the app's own workout export and imports each row as a workout: editable, deletable, and replaced rather than duplicated on a re-import. A hand-made file with the same headers imports the same way, so a history rebuilt from other apps' exports comes in one workout a row.
- **Blood pressure from a CSV file.** A systolic and a diastolic column, in mmHg, make one reading per row, with optional body position and cuff location columns read as words. A position or cuff the file leaves out takes a default chosen on the mapping step. Contributed by Anthon Pang.
- **Floors, elevation and resting heart rate from a Wear OS watch.** The watch measures the height climbed from its barometer; a sync writes it as floors and as elevation gained, counted only in minutes with enough steps, so elevators drop out. Each finished night also gives a resting heart rate, the lowest half-hour average of the night, unless the day already has one from elsewhere. The watch stops measuring heart rate after a minute off the wrist and starts again when worn, and the watch's screen in the app shows the heart rate live while open.
- **Reports, crash drafts and logs hold structure, not data.** Import reports, the sync report, the crash report and the Report an issue draft hold counts, record types, reasons and masked error text, never a value, a time, a name or a file name. The crash report is deleted once sent and kept seven days at most. Copied reports are marked sensitive. The privacy policy is dated October 23, 2026, and asks for your consent once more.
- **Fixes:** two sessions from different sources covering one workout fold into one whatever their type, so statistics no longer count a walk twice; a phone whose key changed is asked about again on the watch instead of refused, and pairing the watch again keeps the key; Apple Health workouts without their route are listed on the import card instead of in the report; dashboard edit mode no longer swaps tiles where it showed an insert on a phone whose Health Connect lacks some metrics.

## 2.15.1 - 2026-10-23

This release lets the medical records import open a zip of FHIR files, the kind CommonHealth exports, and makes a file that cannot be imported explain why. The new report names each file and what was found in it, never the records themselves, so it can be shared to get a problem fixed without sharing your medical data.

- **A zip of FHIR files can be imported.** The medical records import now reads a zip of FHIR JSON files, as CommonHealth exports, whatever its folders. A file in it that is not FHIR is left out and named in the report, and the rest are imported.
- **A report when a file cannot be imported.** The import screen offers a report to copy or save: what stopped the import, and what the file holds, each file with its size, its kind, and for JSON its shape and record types. It holds none of the records' content. When nothing in a file can be added, the review offers the report of what was held back.

## 2.15.0 - 2026-10-23

This release is about typing in what no device sends. A body analysis scale without a connection gets one form for everything it shows, from weight and body fat to body water and bone mass, saved together at one time. Blood glucose and VO2 max get forms of their own, and every kind of medical record Health Connect holds can now be entered by hand, from visits and lab results to prescriptions and vital signs. Medical records are marked as a beta from this release on. A Wear OS watch's steps also become a cadence and an estimate of walking calories.

- **One form for a body analysis scale.** The Weight and Body fat tiles in Add entry are now one Body composition tile: weight, body fat, lean mass, body water, bone mass and BMR, saved together with the same time. Body water can be typed as a percentage of the weight on the same form. Each value can still be edited or deleted alone from the Body screens.
- **Blood glucose and VO2 max entry.** New Add entry tiles. Blood glucose is typed in mmol/L or mg/dL with its relation to a meal and the sample; VO2 max with how it was measured. Both can be edited and deleted from their detail screens. If you rearranged your tiles, add them from the grid's edit mode.
- **Every kind of medical record can be typed in:** visits, procedures, lab results, prescriptions, vital signs, social history, pregnancy, doctors and their roles, clinics, places and your personal details, beside vaccines, allergies, medications and conditions. Doctors, clinics, labs and places already entered are offered as you type.
- **Medical records are a beta.** A one-time notice on the first open says the area is still under development, and asks you to use it with care and review the data you import.
- **Cadence and walking calories from a Wear OS watch.** Each synced minute of steps is also written as a cadence and, once your weight is known, as an estimate of walking calories. Minutes inside a recorded workout get none. Contributed by Ludwig Ettner.
- **Fixes:** the medical records import counts each observation where Health Connect files it, a body weight under vital signs, and holds back one Health Connect would refuse; the sleep home-screen widget shows the time asleep, as the dashboard card does; a lab flag sent as a bare H, L, N or A reads as a word.

## 2.14.5 - 2026-10-18

This release lets a large Apple Health import run to the end. Health Connect refuses some values outright, such as a basal metabolic rate above 10,000 kcal a day, and one such sample anywhere in an export stopped the whole import with an error, however far it had got. That sample is now left out and listed in the import report, and the import carries on.

- **An Apple Health import that stopped on one value.** A single sample Health Connect cannot store, such as a day's basal metabolic rate logged by an app as a one-hour sample (more than 35,000 kcal a day), stopped the whole import with an error. Such a sample is now counted as failed, with the reason in the import report, and the import carries on. The same goes for any other measurement or logged meal outside what Health Connect accepts, and for a systolic blood pressure above 200 mmHg. Importing the same file again with the same categories picks up where the import stopped.

## 2.14.4 - 2026-10-18

This release makes a workout's FIT export carry the whole workout. The FIT and TCX files held heart rate and the session totals and nothing else, so a ride opened in a FIT viewer showed a heart-rate line. They now carry the speed and cadence the workout screen shows, and a workout with a GPS route can be saved as a FIT with the route in it. Routes imported from a file or synced from a Garmin watch also keep every point instead of being cut to 2,000.

- **A FIT file with the GPS route.** A workout with a route can be saved or shared as a FIT that carries the route, the altitude and the distance covered beside heart rate, speed and cadence. The Export workout card groups its formats under "With the GPS route" (GPX, KMZ, FIT) and "Without the GPS route" (TCX, CSV, FIT).
- **Speed and cadence in the FIT and TCX exports.** The workout export held heart rate and the session totals only, so a ride opened in a FIT viewer showed a heart-rate line and nothing else. FIT and TCX now carry the speed and cadence the workout screen shows, and every FIT marks where the timer starts and stops and the local time of the workout.
- **Imported routes keep every point.** Route files and Garmin watch activities with more than 2,000 GPS points were cut to 2,000; the map, splits and route analysis now use every point. A route too large for one Health Connect record is still thinned until it fits.

## 2.14.3 - 2026-10-17

This release brings lab results from providers that still serve the older FHIR DSTU2 format, LabCorp among them, into Health Connect: their records are converted on import, family names included, and the results held inside a diagnostic report are imported instead of being dropped with it. The activity form offers every exercise type Health Connect knows, and a FIT file's yoga, pilates or climbing session keeps its sport. The cycle screen reaches the whole recorded history, and the CSV import counts rows, records and journal days apart.

- **Lab results in the older FHIR format.** LabCorp still serves FHIR DSTU2, and CommonHealth passes it on unchanged, so the records of a plain FHIR file went to Health Connect as R4 and were refused. The importer now recognises a DSTU2 record by its shape and converts it, encounters, locations and the family names in every name included.
- **Results inside a diagnostic report.** Health Connect stores a report's results, not the report, and a report used to be left out with the results it contained. Every contained result is now imported as a record of its own, taking the report's patient, visit, time, performer and laboratory category where it has none. A file of reports whose results are elsewhere says to import the Observation files instead.
- **Every exercise type on the activity form.** The form lists every Health Connect session type instead of 22, each with the fields that fit it: GPS and distance, a distance without a route, or time with an optional heart rate strap. A FIT file's yoga, pilates, swimming, racket and ball sports, climbing, dancing and more import as themselves instead of "Other workout".
- **The whole cycle history.** The cycle screen stopped at about nineteen cycles, the last eighteen months. It now reads the whole recorded history; the history card shows the newest twelve cycles and Load 10 more reveals older ones.
- **CSV import results as three tallies.** The result card keeps the rows of the file (read, imported, rejected, nothing to import), the Health Connect records written and replaced, and a drip export's journal days apart, instead of one sentence that never added up. A drip observation marked excluded is listed as "Excluded in the source app", and every row is accounted for.
- **Where the maximum heart rate comes from.** The cardio load explanation gives Banister's weighting for men and women and the source of the maximum heart rate, with Tanaka's and Gulati's papers linked there and from Body Energy. With an age on the profile and no measured maximum high enough to count, the estimate is now the age formula alone. Contributed by Ludwig Ettner.
- **Fixes:** a drip note with quotes in it reads as typed; the last English words in the German, French, Italian and Polish translations are translated.

## 2.14.2 - 2026-10-14

This release lets a blood pressure reading carry the pulse the monitor shows: an optional field on the blood pressure form, saved as a heart rate record at the reading's time and shown beside the reading. The Wear OS watch app starts counting steps, one minute at a time, and a sync from the phone writes them into Health Connect. And the age-predicted maximum heart rate for women now follows Gulati's formula instead of Tanaka's, which lowers it and with it the cardio load, intensity minutes, heart rate recovery and Body Energy computed for women.

- **The pulse on the blood pressure form.** A home monitor shows the pulse with every reading, so the blood pressure entry takes it as an optional third value. It is saved as a heart rate record at the time of the reading, so it appears under Heart rate, and it shows beside the reading in the blood pressure list and when the reading is edited. Editing the reading moves or replaces it, clearing the field removes it, and deleting the reading deletes it too. Saving a pulse asks once for heart rate write access; a reading without one never does.
- **Step counting on the Wear OS watch.** The watch app counts steps with the watch's own step counter, one row per minute, batched with the heart rate so it adds no wake-ups, and asks for the Physical activity permission on start. A sync from the phone writes one steps record per minute into Health Connect, reaching five minutes back for late steps. The watch's status card shows how many minutes of steps it holds, or that counting is off or the watch has no step counter. Older watch apps keep syncing as before.
- **Maximum heart rate for women.** The age-predicted maximum heart rate used Tanaka's formula for everyone. For women it now uses Gulati's, 206 - 0.88 x age; men and an unknown sex keep Tanaka's, 208 - 0.7 x age. At 40 that is 171 instead of 180 bpm. Cardio load, intensity minutes, heart rate recovery and Body Energy all follow the sex set in the body profile, and Body Energy is rebuilt once after the update.

## 2.14.1 - 2026-10-14

This release brings a cycle history kept in drip into OpenVitals: the CSV importer recognises drip's export and needs no column mapping. To hold everything drip records, the cycle journal gains the cervix as felt and a desire scale, both in the day log. A very large CSV, such as a heart rate export of a million rows, no longer stops when Health Connect runs out of quota: the import waits and carries on. Wear OS watches can sync on a schedule, and the cardio load on the Activities screens now matches the dashboard's.

- **Cycle history from drip.** The CSV importer under Settings > Import & export recognises a CSV exported by the drip cycle tracker and needs no column mapping: five switches choose what to bring over. Bleeding becomes period flow and spotting in Health Connect, morning temperatures land at their recorded time, cervical mucus comes over as texture and feeling, and sex as protected, unprotected or unknown. Pain and mood become symptoms, mood and energy levels, the cervix, desire and every note go into the cycle journal on the phone. Importing the same export again replaces rather than duplicates.
- **The cervix and desire in the cycle journal.** The day log gains the cervix as felt, opening, firmness and position, under cervical mucus, and desire as a fourth 1 to 5 scale beside pain, mood and energy. Both travel with the journal backup and the phone-to-phone sync.
- **Automatic sync for Wear OS watches.** The Automatic sync card shows for a Wear OS watch too; a scheduled run copies the heart rate into Health Connect and writes the night's estimated sleep, as a tap on Sync does.
- **CSV import waits out Health Connect's quota.** A batch Health Connect refused for quota used to end the import. It now pauses, from 15 seconds up to 5 minutes, with a countdown, and writes the same batch again; only half an hour without an accepted write stops the run. Cancel works during a pause, and the report counts the pauses.
- **Fixes:** the Activities screens compute cardio load with the body profile, as the dashboard does, so a day no longer shows two loads.

## 2.14.0 - 2026-10-12

This release opens the CSV importer to nutrition: a spreadsheet with a row per meal becomes food entries in Health Connect, and the health report can now chart every nutrient Health Connect stores, from fibre to selenium. Skin temperature is read as what it is, a variation from your device's baseline, with the day's samples on a chart. Garmin watches that struggled to connect get a sturdier link, and a sync brings Pulse Ox, HRV values, thresholds and scores. The OpenVitals Wear OS app, still installed by hand, now syncs heart rate and an estimated night of sleep, and FFMI has a screen of its own.

- **Nutrition from a CSV file.** The CSV importer under Settings > Import & export takes nutrition as well as body measurements: a spreadsheet with a row per meal or per day becomes one food entry per row in Health Connect, at the row's own date and time. A column can be any nutrient Health Connect stores, from energy and the macros to vitamins, minerals and caffeine, plus an optional Food name. Each nutrient is read in the unit a nutrition label prints it in, or one you pick, and a header such as "Sodium (mg)" picks it for you. Importing a corrected file again replaces its entries rather than duplicating them.
- **Every nutrient in the health report.** The report builder lists every other nutrient Health Connect stores, under the nutrition screen's headings Carbohydrates, Fats, Vitamins and Minerals, each with its own chart, statistics and table in the unit a nutrition label uses. Ticking a heading ticks its whole group; Select all leaves them out.
- **An FFMI screen.** Tapping the FFMI tile opens an FFMI screen instead of the BMI one, with a history of one reading per body-fat measurement.
- **More from a Garmin watch.** A sync also writes the watch's Pulse Ox readings and five-minute HRV values to Health Connect, and shows functional threshold power, lactate threshold, hill score, endurance score and the night's restless moments on the Watch data screen.
- **Wear OS watch sync, for testers.** The OpenVitals Wear OS app records heart rate and what a sleep estimate needs. On the phone, the watch's new Watch Sync card copies the heart rate into Health Connect and writes one estimated sleep session per night, unless that night already has one. Turn on bedtime mode at night so every minute is recorded. The first time a phone connects, the watch asks you to allow it. The watch app is not on any store yet and is installed over adb from a computer.
- **Skin temperature as a variation.** Health Connect stores skin temperature as a change from the device's baseline, and the screen now reads it that way: signed degrees under Variation from baseline, charts centred on zero, the day's samples on the day chart, comparisons in degrees instead of a percent, and the device baseline on its own tile. The health report exports it as a variation too.
- **Garmin link.** For watches that had trouble connecting or syncing, the link writes the way the watch asks, redials up to twice after an Android Bluetooth error, gives a long first sync 30 minutes instead of 3, and completes the handshake with watches that never send their configuration. A new Large Bluetooth packets switch can be turned off for a watch that keeps dropping the link.
- **Cardio load for women.** The dashboard's cardio load uses Banister's weighting for women when your body profile says female. Contributed by Ludwig Ettner.
- **Wear OS app status.** The status card says what is wrong: Bluetooth off, the watch no longer paired, the watch waiting for you to allow this phone, this phone blocked, or an app that needs an update.
- **Translations.** Italian updated from Codeberg Translate. Everything new is translated into every language in the picker.
- **Fixes:** mindfulness sessions no longer pause when the screen times out; meals imported from Apple Health or synced from another phone no longer show as drinks; line charts no longer overshoot a peak or trough, and a series narrower than one unit fills its chart; the skin temperature tile no longer goes blank or shows "-0.0".

## 2.13.0 - 2026-10-07

This release brings the first bathroom scale to OpenVitals. Set up a Xiaomi Body Composition Scale S400 once in Settings > Scales, and every weigh-in is saved to Health Connect as it happens, with the app open or closed: weight and heart rate as the scale measured them, and body fat, lean body mass and body water estimated on the phone. OpenVitals never connects to the scale, and nothing is sent to the internet. A Wear OS watch now shows whether the OpenVitals watch app answers, Medical records are back in the Play build, a Garmin watch's Stay connected acts on the right signal, and the project has moved to GitHub.

- **Bathroom scales.** Settings has a new Scales section, for the Xiaomi Body Composition Scale S400. Add a scale by stepping on it, tapping Find in Android's own device dialog, and pasting the scale's Bluetooth key once, read from your Xiaomi account with a token extractor. From then on every weigh-in is saved to Health Connect as it happens, with the app open or closed: Android wakes OpenVitals when someone steps on the scale, and a silent notification shows for the seconds the result is read. OpenVitals never connects to the scale, and nothing is sent to the internet. On Android 11 and older, weigh-ins are saved while the app is open.
- **What a weigh-in saves.** Weight and heart rate as the scale measured them, plus body fat, lean body mass and body water mass estimated on the phone from the scale's impedance with published equations and the height and sex in your body profile; the estimates differ from what the scale displays. The first weigh-in tells OpenVitals which of the scale's users is you; weigh-ins the scale files under someone else are left out, with a That was me button to claim one. A weigh-in Health Connect cannot take at that moment waits on the phone and is written later. The scale's screen shows whether the phone is listening and the last weigh-in, and lets you rename the scale, change the key, delete the last weigh-in or remove the scale, which erases the key.
- **Wear OS app status.** A Wear OS watch added under Settings > Watches has a Wear OS App Status card: whether the watch is paired with this phone and whether the OpenVitals Wear OS app on it answers, with a Validate Wear OS App button to check again. The watch app itself is still in development and not yet published. A paired watch is recognised as Wear OS by its name or by the OpenVitals app on it; Garmin, Fitbit and Huawei watches no longer land in the Wear OS flow.
- **Medical records on Google Play.** The Play build includes the Medical records area again, with the camera for scanning a SMART Health Card. The two previous Play releases left it out while the listing moved to a Play account that can declare the medical permissions.
- **Privacy policy.** A new Bathroom Scales section describes the listening, the key and what is kept on the phone. The app asks you to read the updated policy once.
- **Translations.** Galician, Japanese and Simplified Chinese updated from Codeberg Translate. A Hebrew translation has started and joins the language picker once it passes 70%.
- **Fixes:** a Garmin watch's Stay connected now acts on Android's own signal that the watch is back in range; before, that signal reached the wrong part of the app, and the link resumed only because Android had started the app for it.

## 2.12.0 - 2026-10-05

This release opens manual nutrition logging to every nutrient and makes climbing numbers believable. The Carbs tile in Add entry becomes Nutrition: one form for calories, protein, carbs, fat and any other nutrient Health Connect stores, for anyone who keeps daily totals in an app that does not write to Health Connect. An entry can be edited from the Nutrition screen, and vitamins and minerals are typed in the micrograms and milligrams a label prints. GPS recordings stop counting indoor altitude noise as climbing, a glitching barometer can no longer add kilometers of climb, and the climb of each split now adds up to the workout's total.

- **One nutrition form for every nutrient.** The Carbs tile in Add entry is now Nutrition. Calories in, protein, carbs and fat are always on the form, and Add another nutrient brings in any other nutrient Health Connect stores. Fill in only the amounts you have: one save writes one entry, and the date and time can be set back to log an earlier day. Caffeine is still logged as a drink, and the Food tile works as before.
- **Edit a nutrition entry.** The entry list on the Nutrition screen has an edit button. An entry typed in the form, or an older carbs entry, opens the form with its values and time, and saving replaces it. A drink's edit button opens the drink. A logged food can still only be deleted; its values come from the food catalog.
- **Vitamins and minerals in label units.** Each nutrient is typed in the unit a nutrition label prints: micrograms for vitamins A, D, K and B12, folate, iodine, selenium and a few more; milligrams for vitamin C, the other B vitamins, cholesterol, caffeine and most minerals; grams for macros, fibre, sugar and fats. Before, every field took grams, so a label's 15 µg of vitamin K went in as 15 g. This applies to the nutrition form, foods and custom drinks; saved foods and drinks open in the new units.
- **Climb that matches the ground.** A GPS recording no longer counts altitude swings as climbing when the signal is poor, as indoors: an hour's walk on flat ground could show more than 14000 m of elevation gained. A glitching barometer reading no longer adds kilometers of climb either. Imported routes without altitude accuracy keep their gain as before.
- **Splits that add up.** The climb of each split, while recording and on the activity's detail screen, now comes from the same filtered elevation as the total. GPS jitter no longer gives every kilometer hundreds of meters of climb, and the splits add up to the total. A split boundary in the middle of a climb can move a few meters of it into the next split.
- **Fixes:** the wheel circumference of a speed sensor keeps values below 2100 mm; anything from 500 to 3000 mm is accepted, the field opens a number keyboard and turns red while the value is out of range.

## 2.11.2 - 2026-10-01

This release is about getting a workout's distance right. A ride on a stationary bike, or with GPS off, now shows cadence, speed and distance from Bluetooth bike sensors, and a wheel speed sensor measures the distance that is saved with the workout. A new setting, off by default, takes a workout's distance from its GPS route, for apps that save a route but estimate the distance from steps. Outlined buttons across the app also draw their border now.

- **Bike sensors without GPS.** A ride on a stationary bike, or a ride with GPS off, now shows cadence, speed, distance, average speed and max speed from your Bluetooth bike sensors. Before, these fields were hidden.
- **Distance from the wheel sensor.** A wheel speed sensor now counts distance from wheel turns while you record. Pauses do not count, and a sensor that reconnects neither loses nor doubles the distance. Once the sensor reports, its distance and top speed are used instead of the GPS ones on the recording screen, the notification, voice announcements and the saved workout; GPS still draws the route. A ride without a route fills the review form with the sensor distance.
- **Distance from GPS routes.** A new setting in Settings, Activities, off by default: a workout with a GPS route takes its distance from the route instead of the distance records, and pace and speed follow. It helps when an app saves a route but estimates the distance from steps. Workouts without a route keep their recorded distance; routes from other apps need the Exercise routes permission in Health Connect.
- **Fixes:** outlined buttons draw their border; before, they looked like plain text.

## 2.11.1 - 2026-09-28

This release makes OpenVitals read right in every language. The steps ring on the dashboard no longer says "steps" in English, heart rate shows the unit each language uses, counts of days, nights and tests agree with the number, and the health disclaimer matches the English again in Czech, Polish, Russian and Estonian. The Google Play listing now speaks all 14 app languages, with a new description and eight screenshots in each.

- **Your language, everywhere.** The steps ring on the dashboard read "steps of 8,000" in English in every language; it now uses your language. Heart rate shows your language's own unit where it has one, such as lpm in Spanish, ppm in Galician and tep/min in Czech.
- **Counts that agree with the number.** Days, nights and tests take the right form for the count in every language: "1 day", not "1 days".
- **Google Play in every app language.** The store listing now has a description and eight screenshots in all 14 languages the app speaks.
- **Fixes:** the health disclaimer in Czech, Polish, Russian and Estonian matches the English again; Czech says "tep/min" throughout, which also fits the heart rate chart axis.

## 2.11.0 - 2026-09-28

This release rebuilds cycle tracking around a day log: bleeding, pain, mood, energy, symptoms, notes and tests for one day, logged one thing at a time and saved together, with next-period ranges built from your own history, cycle reminders, a home-screen widget, a cycle section in the health report and a journal backup. It adds a contraceptive pill scheme with a daily reminder and a Taken mark, brings Day, Week, Month and Year to the caffeine screen, and fixes sections that drew their cards on top of each other. Health Connect keeps every record it has a type for; what it cannot hold stays on the phone.

- **Cycle tracking, rebuilt around a day log.** One day, everything you record, saved together: bleeding (none, spotting, light, medium or heavy), pain, mood and energy on a 1 to 5 scale, symptoms in three groups with a one-tap copy of yesterday's, private notes, a pregnancy test, temperature disturbances and cervical sensation, next to the ovulation test, sexual activity, basal temperature and cervical mucus records. Health Connect keeps every record it has a type for; the rest lives in a journal on the phone that leaves it only through your own backup or phone-to-phone sync. Blank means not recorded, never "no symptoms".
- **Log one thing at a time.** The Log button asks what you want to log: bleeding, how you feel, a pregnancy test, an ovulation test, sexual activity, basal body temperature or cervical mucus, one card each, and opens only that section. The full day log stays one tap away, and a day that already has entries opens in full for editing.
- **Contraceptive pill.** Settings, Cycle gains a pill card: days taking and days pausing (21 and 7 by default), the first day of a pack, and a daily reminder at the time you choose. The cycle screen shows which day of the pack you are on with a "Mark as taken" button; the reminder stays quiet once today is taken and carries a Taken action of its own. The scheme and the taken days sync between your phones.
- **Estimates you can read.** The next period is a range built from your own history: the last cycle lengths, widened by an age band taken from your body profile and by the contexts you declare in Settings, Cycle (PMS, PMDD, endometriosis, PCOS, perimenopause, thyroid). Contexts never move a date, they only widen the range, and nothing assumes a 28-day cycle. Recorded facts and estimates are labelled apart everywhere. A cycle can be excluded from the estimate with a reason, and a past period can be added.
- **Today on the cycle screen.** The recorded cycle day, the phase when it can be told, a sourced tip or fact, cycle length statistics, a variability view with a bar per cycle, a basal temperature chart with a coverline once a sustained shift is found, and symptom patterns by phase. The screen is a month calendar over today's cards, with flow fills, the estimated window, cycle starts and observation dots; the range selector is gone, and the sections can be arranged like on any other metric screen.
- **Cycle reminders.** Three local reminders in Settings, Cycle, off by default: a daily check-in that is skipped once the day is logged, a heads-up before the estimated range, and a quiet prompt when a cycle runs past it. The text is neutral by default, with descriptive or custom wording as options, and the lock screen always shows neutral text.
- **Cycle widget and dashboard tile.** A home-screen widget shows the recorded cycle day, the estimated range and whether today is logged, never notes, symptoms, mood or energy, and redraws after midnight. A dashboard tile shows the same.
- **Cycle in the health report, and a journal backup.** The PDF report gains a Cycle tracking section: the cycle-day chart, length statistics, a table per cycle, bleeding and pain counts, symptom counts on and off bleeding days, the notes and a disclaimer. Settings, Cycle exports the journal, the excluded cycles, the contexts and the age band as a JSON file and imports one back; an import merges, and the newer edit per day wins.
- **Caffeine like the other metrics.** Day, Week, Month and Year with a period to step through, a date picker and sections you can reorder. Every card stays: the day's curve with the threshold and each drink, the bedtime level, period totals, the safe-night calendar, and statistics with a previous-period comparison. Drinks older than the seven-day lookback no longer count toward a level.
- **Fixes:** a section with a heading and a card no longer draws them on top of each other, which hid the hydration goal card behind the reminder card; leaving an edited day log with Back or the arrow works again; a day-log row in the cycle entries list keeps its title readable; a caffeine level counts as over the sleep threshold only when it shows as more than the threshold.

## 2.10.1 - 2026-09-26

This release puts a goal ring on each day of the Month view, so one look at the month shows which days reached the goal and how close the others came. It also stops the dashboard from shuffling its tiles on every refresh when "Sort empty tiles last" is on.

- **A goal ring on each day of the month.** In a metric's Month view, each day has a thin ring around its number. It fills clockwise from the top with the day's share of the daily goal: 7,500 steps against a 10,000 goal fills three quarters, and a day on or past the goal is full. Steps, distance, calories, active calories, floors, elevation, wheelchair pushes, workouts, hydration, mindfulness and sleep each use their own daily goal. Days with no data and future days get no ring, and nutrition has none yet. Based on a contribution by Teccheck.
- **Fixes:** with "Sort empty tiles last" on, the dashboard no longer shuffles its tiles on every refresh and then shuffles them back: a tile that is still loading keeps its place and moves only once its own data arrives; the Health Connect library (1.2.0-alpha06) and the other libraries the app is built on are updated; Spanish updates contributed by gallegonovato on Codeberg Translate.

## 2.10.0 - 2026-09-25

This release adds food logging: a catalog of your own foods with their nutrients, logged by portion as Health Connect nutrition records. Settings can estimate your basal metabolic rate and save it to Health Connect, off by default. Every chart speaks to a screen reader, Finnish and Polish join the language picker with every language complete, and phone-to-phone sync shows the code on both phones and seals every frame. A long list of fixes lands from an audit of the app: editing a workout no longer deletes its heart rate, power, cadence and speed, heart rate averages agree across the app, Bluetooth sensors reconnect after a reboot or a drop, and a finished recording survives until it is saved.

- **Food logging.** Add entry gains a Food tile. There are no preloaded foods: "New food" asks for a name, an amount, a category and any of Health Connect's 42 nutrients for that amount. Tapping a saved food logs a portion: the nutrients scale with the amount eaten and land in Health Connect as one nutrition record named after the food. A logged food never shows up in the drink history.
- **Basal metabolic rate estimate.** Settings, Body profile gains a Sex field and a "Basal metabolic rate" switch, off by default. On, OpenVitals estimates the calories your body burns at rest with Mifflin-St Jeor from your sex, birth year, weight and height, and saves one value per day to Health Connect for the last 90 days. Each day uses the weight measured on or before it. A day that already has a rate from another source, a watch or a CSV import included, is left alone, and switching off removes every estimate. The card shows today's estimate or names what the profile still lacks.
- **Charts for screen readers.** Every chart now tells a screen reader its title, the number of values, the lowest, the highest and the latest. Bar and line period charts also offer one element per day, so a reader can walk the period and select a day. Zoom in, zoom out and show the whole range are offered as actions, the scrubber offers next and previous point and reads the value, and the sleep schedule, the stage lanes and the Body Energy influence strip describe themselves. Not yet tried with TalkBack.
- **Finnish and Polish.** Both join the language picker, and every offered language is complete: Czech, German, Spanish, Estonian, Finnish, French, Galician, Italian, Japanese, Polish, Portuguese, Russian and Simplified Chinese.
- **Phone-to-phone sync shows the code on both phones.** The six-digit code used to be typed on one phone. Both phones now show a code and each user says whether they match; nothing is exchanged before both did, and "They do not match" ends the session with nothing sent. Every frame after the key exchange is sealed, so a changed, replayed, dropped or reordered frame ends the sync. The first phone to press Start now waits up to ten minutes for the other user instead of thirty seconds. Both phones need this version.
- **Privacy policy.** The policy now names every data flow the app has: watch sync, the position sent to a watch that asks, music controls, calendar, weather, phone-to-phone sync, imports and exports, activity recording, diagnostics, and what is kept outside Health Connect and for how long. Everyone is asked to accept it once. "Review policy" no longer crashes on a phone without a browser.
- **Heart rate averages agree.** The Today tile showed 71 bpm where the Heart rate screen showed 65: it folded Health Connect's hourly averages, which weight a workout hour by its samples. The tile, the week, month and year bars, the baselines and the reports now use the same day average as the day view, kept per day so a period opens without re-reading every sample.
- **Bluetooth sensors.** A reboot no longer leaves sensors on "Connecting": Android forgets unpaired sensors and most use a random address, so a forgotten sensor is found by a scan first. Sensors that slept during a pause reconnect on resume. A sensor with two data streams, such as cycling power with speed and cadence, delivers both. Each workout reads only the sensors that fit it: heart rate always, bike sensors for cycling, a foot pod for strides, and the setup card previews them. On Android 11 and older, adding a sensor no longer crashes, and watch and phone sync work again. Not yet confirmed on a phone.
- **Editing a workout deleted its sensor series.** Changing a title removed heart rate, power, cadence and speed for good, on every recorded and every watch-imported workout. An edit now leaves the series alone unless the time window moved. An edit or a delete also no longer wipes the metrics of a second activity that started inside the window, and an edit writes first and deletes last, so an interrupted save leaves a duplicate at worst.
- **Garmin watches.** A sync that failed part way no longer drops the files the watch had already archived; the next sync imports them. A workout that did not reach Health Connect, for a missing write grant or a rate limit, is fetched again, and a sync you started says so. The activity import reads the time zone per file, so a trip across time zones no longer skips or misplaces workouts. Pairing a new watch shows Android's companion dialog again, so background access can be granted. A running sync keeps the Bluetooth radio, so nothing opens a second connection to the same watch. Not yet confirmed on a watch.
- **Fixes:** step totals and series come from Health Connect's own aggregate, so they match the Health Connect app; text no longer shrinks below three quarters of its size, or below 12 sp, and what still does not fit ends in an ellipsis instead of showing a wrong value; a watch or folder import keeps the file's own start and end, is stored as recorded by the watch, and importing the same file twice updates the records instead of adding them; a finished recording stays on disk until it is saved or discarded, so a process killed before Save no longer loses it; a background widget refresh no longer redraws a good tile as "0" or "No data"; a cancelled dashboard load no longer leaves one tile on "Loading..."; the history caches and the step-distance backfill no longer take a failed or rate-limited read for "no data", and they skip a background pass that could only see the app's own records; the weight, height and step length fields stop rewriting what you type and accept a comma decimal; a saved drink of a litre or more reads back correctly in every locale; a rotation after a widget tap no longer opens another copy of the screen, and after opening a route file no longer imports it again; Settings sections open faster and Data transfer has its own screen; Spanish updates contributed by gallegonovato on Codeberg Translate.

## 2.9.1 - 2026-09-19

This release puts the phone's music on a Garmin watch: the watch shows what is playing, and its buttons play, pause, skip, seek and change the volume. Older Garmin watches with no settings tree, such as the first Instinct, get alarms from a list kept on the phone. "Send a point" reaches more watches, the drink dialog no longer hides nutrients, and the new watch texts are translated in every offered language.

- **Music controls on a Garmin watch.** "Music controls on watch", on the watch's device screen, puts the phone's player on the watch's music controls. The watch shows the player, track, artist, album and position; from the wrist you can play, pause, skip, seek and change the volume. Off by default, and it needs "Stay connected". Android shows the phone's players only to an app with notification access, so switching it on without that grant shows a disclosure first; the grant alone forwards no notifications. Track details go only to the watch over Bluetooth and are never stored. Confirmed on a vivoactive 5.
- **Alarms for older Garmin watches.** A watch with no settings tree, such as the first Instinct, had no Alarms action at all. It now opens a list kept on the phone: up to ten alarms, each with a time, repeat days, sound or vibration, backlight and one of the watch's preset labels. Edits save on the phone; nothing reaches the watch until you tap "Send to watch", and a send replaces every alarm on the watch. Alarms set on the watch do not show in the list. Not yet confirmed on a watch.
- **Fixes:** "Send a point" is now offered to watches that store points through Garmin's Explore sync, which were told that no paired watch can store points; the drink dialog sizes to the window, so nutrients no longer hide below a cut-off body, a bottom fade shows when more sits below, and hydration impact is a dropdown like Category; Spanish updates contributed by gallegonovato on Codeberg Translate, and the new watch strings are translated in every offered language.

## 2.9.0 - 2026-09-18

This release lets you choose the guideline that names your blood pressure readings - ACC/AHA, ESH, ESC or ISH - and send a point from the phone to a Garmin watch's saved locations. Elevation correction now covers activities recorded on the phone, Garmin watches show ringing calls, older ones such as the original Instinct receive notifications, Russian joins the language picker with every language back at 100%, and a round of fixes removes the freezes behind "app isn't responding".

- **Choose the blood pressure guideline.** The categories were fixed to ACC/AHA 2017, where high starts at 130/80 mmHg; Europe and the ISH start at 140/90. Settings gains a Vitals section with the choice: ACC/AHA 2017, ESH 2023, ESC 2024 or ISH 2020. ACC/AHA stays the default, and every guideline still flags a reading above 180 or above 120. The blood pressure screen gains "How it is classified", which explains how a reading gets its category, lists the thresholds and links the guideline's sources.
- **Send a point to a Garmin watch.** A watch that can store locations gets a "Send a point" row. Type a name and coordinates - decimal degrees, degrees and decimal minutes, or degrees, minutes and seconds - or share a place from a maps app: OpenVitals appears as "Send to watch" for geo: links and shared text, and reads Google Maps, OpenStreetMap and OsmAnd links. A shared place only fills the form; nothing is sent until you tap Send. The watch keeps the point in its saved locations, where it can be picked as a navigation target, and each way the send can fail has its own message. Asked for as Gadgetbridge's "Send Point". Not yet confirmed on a watch.
- **Elevation correction covers phone recordings.** 2.8.0 corrected imported routes only. A GPS activity recorded on the phone now goes through the same correction when it finishes, under the same rule: a route not fully covered by your tiles keeps its own altitudes. The figure shown while recording is still the sensor's; the corrected route and gain land on the review form. The switch is now called "Correct altitude from tiles".
- **Ringing calls on a Garmin watch.** Calls never reached any watch. A ringing call now shows on the wrist with the caller's name and leaves once it is answered. With a dialer that uses Android's call-style notification, the watch's accept and reject buttons work. No phone permission is needed and nothing reads the call log.
- **Notifications on older Garmin watches.** Older watches such as the original Instinct showed nothing. The phone now waits until the watch has declared its capabilities before it sends the start-up sequence, so these watches subscribe for notifications and list their files. A watch that asks what an app is called gets an answer instead of waiting forever. A dismissed notification is always withdrawn from the watch, so phantom entries no longer pile up until nothing new appears.
- **No more "app isn't responding" freezes.** Work that made the main thread wait now runs in the background: home widget refreshes, the quick beverage widget tap (it saves first and updates the tile after), beverage logging, heart rate charts over long periods, and the source labels on lists of readings, which made the Blood pressure screen sluggish. When Android does record a freeze, its trace - thread names and stack frames, no health values - goes into the report email and the debug log export.
- **Russian, and every language at 100%.** Russian joins the language picker, contributed by Xapitonov on Codeberg Translate. Czech, German, Spanish, Estonian, French, Galician, Italian, Japanese, Portuguese and Simplified Chinese are complete again; Italian updates contributed by NeriSal.
- **Fixes:** a night now claims a sleep session that starts before the "Night starts at" hour but spends more than half its span inside the night, so an early bedtime no longer shows as a nap on the evening before while the wake-up date has no sleep; a long Apple Health import error shows its start and points to Copy error or Download full report for the rest.

## 2.8.0 - 2026-09-12

This release corrects the altitude of imported routes from elevation tiles stored on the phone, so a drifting barometer no longer inflates the gain. Workout plans gain sets, weight and rest per exercise, home widgets refresh on an interval you choose, older Garmin watches such as the Instinct 2X now sync, voice cues duck your music, and Body Energy counts respiratory records and holds steady after a heart zone edit.

- **Elevation correction from offline elevation tiles.** Older barometric altimeters drift, so an imported route carries wrong altitude and an inflated gain. Settings > Activities gains Elevation correction: import SRTM .hgt tiles (or a zip holding one) downloaded on a computer, switch on Correct altitude on import, and every route imported from then on - GPX, TCX, KML, KMZ and FIT, whether one file, a folder or a watch sync - takes its altitude from the tiles and has its gain recomputed with the same smoothing a recording uses. A route with even one point outside your tiles keeps the altitudes it came with, and the import log says so. Phone recordings and activities already in Health Connect are untouched. The app downloads nothing; the tile card links to the guide that says where to get them.
- **Sets, weight and rest per exercise in workout plans.** A strength plan such as "lat pulldown, 3 sets of 12 at 50 kg, 2 min rest" took six rows to build. An exercise row now has Sets, Weight (kg) and Rest after each set. Saving unrolls the row so Health Connect and other apps see plain steps; loading folds identical runs back into one row. The weight goes all the way through: the guided run shows and speaks it and its banner adds "Set 2 of 3", the review form prefills it per set so a lighter or heavier set can be corrected before saving, and the workout detail shows a Weight row. Durations can be typed in seconds or minutes, and whole minutes read as "2 min" in the builder, the setup card, the run banner and the voice cues. Older drafts still load.
- **Choose how often home widgets refresh.** 2.7.3 fixed the widgets at every 30 minutes. Settings > Display now offers 15, 30, 60 or 120 minutes; 30 stays the default, and changing it re-plans the running refresh at once. Android decides the exact moment, and shorter intervals use more battery.
- **Older Garmin watches sync too.** Watches on Garmin's older Bluetooth transport, such as the Instinct 2X, used to pair and then fail on their first sync. They now sync and receive forwarded notifications. Live heart rate and step streaming need the newer transport, so such a watch syncs but shows no live readings. Body weight a watch relays from a paired Garmin scale lands in Health Connect. A watch that lists no files on the first try is asked a second way, and a sync cut off midway keeps what arrived and is reported as interrupted so the next sync retries the rest. Contributed by hawk01.
- **Voice announcements duck other audio.** Announcements and plan cues spoke over music at full volume. They now hold audio focus while speaking, so music dips and comes back when the last queued cue ends. Speech is tagged as guidance, so headphones play it on the media stream.
- **Body Energy counts respiratory records and holds steady after a heart zone edit.** The Respiration modifier always said "0 records": the 28-day respiratory baseline was never computed, and the day's records were only read once a baseline existed. Both now work the way HRV does. Changing the zone mode made the score alternate between two values: today opened on the neutral 50 until the history was rebuilt, then jumped back on the next load. Today now keeps its last known value while the rebuild runs, the rebuild starts as soon as the setting is saved, and the dashboard card and detail screen reload once it lands.
- **Fixes:** the adaptive launcher icon, broken on some devices, was redrawn as vectors following Android's guidelines (contributed by Teccheck); imported route gain goes through the same smoothing filter a recording uses instead of a raw sum; German translation updated to 99%, and Polish is progressing on Codeberg Translate.

## 2.7.3 - 2026-09-06

This release estimates sleep stages on the phone for Garmin watches that never record them, such as the Venu SQ, from the heart rate and movement the watch does hand over. Home widgets refresh every 30 minutes, a whole folder of FIT files imports again, the Log screen no longer demands every write permission before it opens, and a Start over button rebuilds Body energy, Recovery and Expenditure from scratch.

- **Sleep stages for Garmin watches that never record them.** Older watches such as the Venu SQ leave sleep staging to Garmin's servers, so their nights synced as nothing at all, or as an awake-only "sleep" session. What such a watch does hand over is a heart rate and a movement count for every minute, and OpenVitals now estimates the night from those on the phone: when sleep began and ended, and a light, deep, REM and awake timeline. One session per night, marked as estimated in its notes and rewritten in place as the night's files arrive over later syncs. A watch that records its own stages is left alone.
- **Home widgets refresh every 30 minutes.** The widgets relied on Android's own update timer, which Doze skips and some phones throttle, so they refreshed a few times a day. They now re-read Health Connect every half hour while at least one is placed, and redraw as soon as the dashboard has loaded today.
- **Import a whole folder of FIT files again.** The folder button on the FIT importer card was lost in the move to Kotlin (2.5.0), leaving only one file at a time. It is back: pick the folder and every FIT file inside it is written straight to Health Connect, sub-folders included, in the order the activities happened. Garmin wellness files in the folder land as nightly HRV. A file that will not read fails on its own and the rest carries on; a very large folder says how many files were taken, and a folder with no FIT files says so instead of erroring.
- **Log without handing over every write permission.** The Log screen used to lock itself until OpenVitals held every Health Connect write permission, even if you only wanted to record your weight. It now opens with any or no write access, and each tile asks Health Connect for just its own permissions when you tap it. Declining still opens the entry form, which offers Grant again whenever you are ready.
- **Onboarding needs only the reads.** Step one used to insist on the Activity and Sleep write permissions as well. Decline every write in the Health Connect dialog and you can still continue; the log asks for a tile's write access when you first use it.
- **Start Body energy, Recovery and Expenditure over.** These are the three metrics OpenVitals works out itself and keeps outside Health Connect, and the only way to make it forget a bad run of them was clearing app data, which takes every preference with it. Settings > Recovery gains a Start over card that wipes exactly that derived set - the history, the tuning learned from your watch, the baselines and the expenditure cache - and rebuilds it from Health Connect behind a confirmation. Health Connect data, body profile, heart zones and goals are kept.
- **One heart rate average per screen.** 2.7.2 corrected the day's heart rate on the dashboard, but the Statistics card on the heart rate detail screen's day view still averaged raw readings, so the same day showed 82 bpm on the dashboard and 116 bpm one tap deeper. That card, the HRV week and month charts and their statistics, the 28-day HRV baseline, the PDF report, the period charts for SpO2, body temperature, glucose and VO2max, respiratory rate and the overview captions all use the corrected averages now.
- **Fixes:** the entry forms ask for missing write access with the same "Some permissions are missing" callout as the rest of the app; the "Manual entry write access" card in Settings now includes heart rate variability, so the HRV tile can be granted from there; saving a vitals or mindfulness entry without write access shows the permission message instead of a raw error; metric detail screens no longer jump while they reload; updated Spanish, Japanese and Galician translations, and Polish is progressing on Codeberg Translate.

## 2.7.2 - 2026-09-02

This release fixes the day's heart numbers: averages now weight each reading by how long it held, so a 50-minute run no longer outvotes the other 23 hours and a day that truly averaged 79 bpm no longer prints as 115. Steps can now be imported from CSV files with an optional end-time column, the quick beverage widget logs again, and a workout plan made on this phone keeps its Edit and Delete entries.

- **A workout no longer skews the day's heart rate.** Averages now weight each reading by how long it held, not by how often the device wrote: a watch records a workout about once a second but the rest of the day about once a minute, so a 50-minute run outvoted the other 23 hours and a day that averaged 79 bpm printed as 115. Heart rate, HRV, respiratory rate, SpO2, the sleep score's overnight HRV and the stress score all use the corrected averages.
- **Steps in the CSV importer.** Steps join the metrics a CSV can bring in. Map an optional "End date and time" column and each row spans from its start to that end; a row without one counts as one minute. A row whose end cannot be read rejects only its steps - the other columns still import - and re-importing the same file replaces rather than duplicates.
- **The quick beverage widget logs again.** Tapping the 1x1 widget or the 2x1's Add button had silently stopped logging in 2.7.0 and 2.7.1.
- **Fixes:** a workout plan created on this phone keeps its Edit and Delete entries even when device sync relabels its source; the dashboard no longer shifts down while a sync runs; updated Czech, Spanish, French, Portuguese and Simplified Chinese translations, and Finnish and Polish have begun on Codeberg Translate.

## 2.7.1 - 2026-08-30

This release is about training with a plan. Build a routine once - blocks of exercises with reps or seconds, rests, and rounds - and start it as a guided run: the phone counts push-ups and squats with its proximity sensor where it can, timed steps and rests count down on a ring and move on by themselves, and every step is spoken and shown in the notification. Plans live in Health Connect, so one made in another app can be started too. Any workout can now be exported without its route as TCX, FIT or CSV, every language the picker offers is complete, and a nap from a Garmin watch finally counts as sleep.

- **Workout plans.** Build a routine once - blocks of exercises with a reps or seconds goal, rests, and rounds - and start it from the activity screen as a guided run: Step 2 of 6, reps counted against the goal, timed steps and rests counting down on a ring that empties clockwise, a spoken cue at every step, and the same progress in the notification. Plans live in Health Connect as planned exercise sessions, grouped as today, upcoming and past; one made in another app can be started or copied to today, a logged workout can be saved as a plan, and a saved workout keeps a link to the plan it came from.
- **Reps counted by the phone in a plan.** A plan step finds the same recognizer the single-exercise recording uses: push-ups and squats on the proximity sensor, pull-ups, rope skipping and trampoline jumping on the accelerometer. Squats are new to the proximity sensor, in plans and on their own, and a step named "Pushups", "push ups" or by the exercise's name in the phone's language counts as well as "Push-ups" does.
- **Workouts export without their route.** Every workout detail screen carries an Export workout card: type, times, duration, distance, calories and heart rate as TCX, FIT or CSV, with the GPS route deliberately left out - for sessions that never had one too.
- **Every language is complete.** Czech, Spanish, French, German, Italian, Estonian, Portuguese and Simplified Chinese are fully translated, workout plans and exercise names included.
- **Naps count as sleep.** A nap synced from a Garmin watch arrived with no stages and read as "nothing recorded"; it is recorded as light sleep now, as Gadgetbridge does. On the night's timeline the out-of-bed stretch takes a dusty rose in the Awake family instead of a brown, and Share of time in bed gets an Out of bed row.
- **Fixes:** a night Mi Fitness stores as overlapping records no longer shows 13h on the detail screen for 8h of stages; the rest countdown beeps for five seconds rather than three; the plan controls no longer wrap their labels mid-word.

## 2.7.0 - 2026-08-26

This release is about the app answering questions it used to leave to the user: the daily goal card says how far ahead or behind a week is and what each remaining day needs, offline maps rotate and follow the recording, the summary opens at once and fills tile by tile, a Garmin sync no longer tells the watch to drop data it never received, and the app speaks Simplified Chinese.

- **Goal balance and per-day catch-up.** The daily goal card on the activity screens now says how far ahead or behind the week is - not just how many days hit the goal - and what each remaining day needs to average for it to land on goal, today included. The statistics grid gets a Goal balance tile. Days with nothing logged count as zero, and the sign stays in your favour whichever way the goal points.
- **Maps rotate and follow the recording.** Both offline renderers take two-finger rotation, with a compass to reset north whenever the map is off it. While recording, the camera keeps the live fix centred; panning hands control to you, and the recenter button hands it back.
- **The summary opens at once.** The dashboard no longer waits on a batch of Health Connect reads before drawing anything - it renders with every tile loading and fills each one as its own read lands. A throttled Health Connect shows a fallback and says how long to wait instead of holding a spinner for minutes.
- **The app speaks Simplified Chinese.** A full translation, offered by the in-app language picker.
- **The recording screen leads with its tabs,** CoMaps guidance lives on the map tab, and Start asks before starting without a route instead of refusing with a toast. The sleep day view drops the averages of a single night and the key-metric cards that restated the chart.
- **Fixes:** a Garmin sync never tells the watch to drop a file it did not download, which was costing a day and a half of heart rate and steps; the recording screen's app bar - title, dashboard editor, outdoor toggle - is back, and focus and outdoor mode reach the whole screen; the bottom bar is pure black under AMOLED; and large Apple Health exports no longer run out of memory.

## 2.6.6 - 2026-08-22

This release is about the watch earning its place without a recording running: CoMaps guidance now reaches a Garmin watch on its own switch, a newly paired watch keeps the link its features depend on, a caffeinated drink can be logged over the time it took, and the app speaks French.

- **CoMaps guidance reaches the watch on its own.** The next turn, the distance to it and the street appear on a Garmin watch whenever CoMaps is navigating, as a notification that updates in place. It has its own per-watch switch and is now separate from the activity recording integration: either one alone works, both together show in both places. Starting a GPS recording just to get directions on your wrist is no longer the price of admission.
- **A drink can be logged over the time it took.** The Log drink dialog asks how long a caffeinated drink took - at once, 15 or 30 minutes, 1, 2 or 3 hours - and stores it as the nutrition record's end time. Every drink used to be a one-second record, so a coffee nursed over two hours spiked at the first sip; it now spreads across those hours.
- **The app speaks French.** A full translation, offered by the in-app language picker.
- **New watches stay connected.** Stay connected is now on by default - on a newly paired watch, and on an existing one whose switch was never touched. Weather, find-my-phone, live heart rate and steps, a recording handed over the moment it ends, and guidance on the wrist all need the link, and a watch with none of it working gave no hint that one switch was the reason. It costs battery on both sides, and turning it off is remembered.
- **Fixes:** an activity synced from a Garmin watch now keeps the title given on the wrist; and a multi-hour ride no longer fails to import - its GPS route could exceed the size Health Connect accepts for one record, and took the whole sync down with it.


## 2.6.5 - 2026-08-19

This release is about the app doing its job without being watched: a Garmin watch can now sync itself on a schedule, phone-to-phone sync handles years of data and explains its failures, and a night slept in two goes stops booking the time out of bed as time awake.

- **The watch syncs itself.** A new Automatic sync setting syncs a Garmin watch on its own every 30 minutes, hour, or two hours - off by default and chosen per watch. Runs are quiet: a watch out of range at 3am is not an error, and the last sync time is what says the schedule is working. Android picks the exact moment, so the battery-optimization exemption offered during pairing is what keeps overnight runs on time.
- **The app speaks Czech.** A full translation, offered by the in-app language picker.
- **Notes on mindfulness sessions.** The timer and the manual entry form take a note, stored in Health Connect with the session. The list keeps notes behind a tap, and editing a session can change or clear its note.
- **Beers in the beverage catalogue.** Beer, lager, pilsner, stout, and alcohol-free beer, with nutrition filled in and honest hydration credit - an alcoholic beer counts less than its volume.
- **Sync with another phone handles years of data and slow links.** The transfer now streams instead of loading the whole library into memory, batches are capped by size on the wire so sample-heavy records cross a slow Bluetooth link before the other side gives up, and a Health Connect rate-limit pause no longer kills the session. When a sync does fail, the screen says why and how far it got, with the report ready to copy or share - and a transfer that lost records on the way no longer claims it completed.
- **Time out of bed is no longer time awake.** A night slept in two goes counted the get-up as awake - a 90-minute get-up read as 1h38m awake - dragging down sleep efficiency and the sleep score. The gap is now its own out-of-bed segment in both sleep charts, in a colour no sleep stage uses.
- **Fixes:** the mindfulness year heatmap shows the whole last twelve months instead of stopping at the calendar year; and mindfulness entries recorded by the old app no longer show the word "null" as a note.

## 2.6.4 - 2026-08-13

This release is about numbers that were technically correct and told you nothing: a battery that charged a broken night like a perfect one, a month of weight drawn as near-identical coloured dots, a nutrition total nobody eats by, and a step count short of what the watch had actually recorded.

- **Body Energy tells a good night from a bad one.** Overnight charge now reflects how well you slept - sleep efficiency, time spent awake, and the deep and REM share of the night - and not only how long you were in bed. Two eight-hour nights of very different quality used to land within a few points of each other; they now sit about fifteen apart. An ordinary night charges exactly what it did before, the effect is capped so no single night can undo hours you actually slept, and a sleep source that records no stages is left alone.
- **Weight is a line, not a calendar.** Week, month and year now draw body measurements as a trend line on a scale fitted to your values, instead of a calendar of coloured dots. A calendar shades a day by how big its number is, which says nothing about a weight that lives inside a two-kilo band.
- **Nutrition shows what you eat in a day, not in a month.** Over a week, month or year each nutrient tile leads with the daily average and keeps the period total underneath. A new Nutrition setting chooses whether the average divides by the days you logged food or by every day of the period.
- **Fixes:** Garmin step counts no longer come up short - overlapping step records were being partly discarded, so a day could read 889 steps when the watch had recorded 1,007; an entry list keeps how far you expanded it after you swipe an entry away; maximum heart rate is no longer invented from a quiet fortnight, and an estimated figure now says it is estimated; the cardio load target no longer reports impossible percentages; and chart date labels no longer arrive cut in half.

## 2.6.3 - 2026-08-12

This release is about the watch feeling paired, not just synced: a Garmin watch can now stay connected whenever it is in range, and that held link carries live readings, weather, your calendar, find-my-phone, and GPS ephemeris - all without the app gaining any internet access.

- **Your Garmin watch can stay connected.** A new Stay connected switch keeps the Bluetooth link open whenever the watch is in range, the way the vendor's app does. With it on, an optional Live readings switch streams the watch's current heart rate and step count - shown live on the watch screen and the dashboard. Both are off by default.
- **A watch tile on the dashboard.** The most recently synced watch, with its battery, last sync time, and a sync button. While live readings stream, the tile shows the current heart rate and steps instead.
- **Weather, calendar, and find-my-phone on the watch.** The weather glance is answered from a weather app on the phone (Breezy Weather is the tested one). The calendar glance can show the phone's upcoming events, off by default behind its own permission. And the watch's find-my-phone rings the phone, even when silenced.
- **Faster GPS fixes.** Import a satellite prediction (ephemeris) file and the phone hands it over when the watch asks, turning a minutes-long cold GPS fix into seconds. Nothing is downloaded.
- **Grant all permissions at once.** The first onboarding screen gets a Grant all button that requests every category in one dialog.
- **Sleep score rebuilt on sleep-science pillars.** Duration, quality, and overnight HRV recovery are scored using published sleep guidance, with age and night HRV feeding the score, recovery, and the dashboard.
- **Fixes:** cardio load and intensity minutes read workout heart rate instead of falling back to movement; body tiles open their own metric screens directly; the syncing banner is no longer clipped; a smartwatch added through the sensors flow stays a plain sensor; diagnostics exports include raw process logs.

## 2.6.2 - 2026-08-08

This release lets a reading into the app that no wearable took: HRV can now be logged by hand, and every hand-logged vitals reading can carry the moment it was actually taken.

- **Log HRV manually.** Heart rate variability joins the Log screen: enter an RMSSD value in ms and it is written to Health Connect, feeding the dashboard tile, the HRV screen, and baselines like any watch reading. Your own entries can be edited and deleted from the HRV day view; the tile can be removed in the Log screen's edit mode.
- **Pick the time on new entries.** Every vitals entry form - blood pressure, SpO2, respiratory rate, body temperature, HRV - now offers date and time pickers when adding, not only when editing. A reading taken this morning can be logged tonight under its real clock; the pickers default to now.
- **Fixes:** switching days on the dashboard answers instantly - the date flips at once, tiles show a loading state instead of the previous day's numbers, and the rings sweep in exactly once with the right values; the small weekly cardio tile no longer says "Loading" forever next to the cardio ring; returning from a metric screen keeps the widget page and scroll position; the hydration day graph no longer ends in a dot - dots mark entries only; a sleep window set within one day (such as 00:00 to 12:00) files each night on its own date.

## 2.6.1 - 2026-08-06

This release puts a navigator next to the recorder: with a CoMaps build that shares its navigation, a GPS recording shows the guidance you are actually following while OpenVitals keeps recording. CoMaps plans and navigates; OpenVitals reads and records.

- **Live CoMaps navigation while recording.** The next turn floats over the live map, the planned route is drawn point-for-point on the offline map with turn arrows and a destination flag, and the location dot becomes a compass arrow that points where the phone points. With the integration on, Start becomes a doorway - set the route up in CoMaps or dismiss the guidance card, then start. Guidance shown during the ride can be kept with the saved activity - on this device only, never in Health Connect. Off by default under Settings > Activity recording.
- **One launcher icon.** The release build ships the artwork the debug build had; debug keeps the shape and differs only in colour.
- **Fixes:** with 3-button system navigation the bar no longer covers the bottom of screens; heart and vitals tiles open their own metric screens instead of a shared overview; the swipe-to-delete red no longer shows through entry rows at rest; one reload shows one indicator, and dashboard widgets replay their animations only when a reload actually brought new data.

## 2.6.0 - 2026-08-05

This release is about the two conversations your health data has outside the app: with your doctor, and with you. A PDF report you can hand across a desk, menstrual cycle tracking that lives entirely in Health Connect, and blood-pressure logging that captures what clinicians actually ask about a reading.

- **Menstrual cycle tracking.** Log period flow, spotting, sexual activity, ovulation tests, cervical mucus and basal body temperature - one category at a time, each its own Health Connect record. Period days derive from your flow entries, and cycle statistics predict the next period; when cycles vary too much for an honest prediction, the app says so. Cycle data stays a separately granted permission category and is stored only in Health Connect.
- **Health report export (PDF).** Pick metrics, detail level and range, and OpenVitals builds a PDF on the device to share or save - charts, statistics and tables per metric, and clinical sections where the data has more to say: blood pressure with separate systolic/diastolic statistics and meal-context averages, glucose by relation to meal with fasting first, workouts by activity type with the full session list, and sleep with bedtime/wake-up averages and the stage mix. The report states its own gaps in print.
- **Richer blood-pressure logging.** Optional dropdowns for when the reading was taken, body position and cuff location, plus a collapsible guide with the standard home-measurement protocol.
- **Distance backfill from steps.** Opt-in under Activities: your stride length fills daily distance only for days that have steps and no distance from any source; derived records are marked and removed if you turn it off.
- **Portuguese added,** and Spanish, Italian, Estonian and German are complete again at 100%.
- **The dashboard keeps tiles with recent history.** A tile only sinks when its metric has no data today and none recently - Sleep no longer drops before tonight - and a "Sort empty tiles last" toggle makes it a choice.
- **Fixes:** year-long heart-rate reads are chunked so they cannot come back empty; duplicated blood-pressure records count once in the report; cycle screens allow screenshots; the base unit option is named "System" everywhere.

## 2.5.0 - 2026-08-04

OpenVitals is native Kotlin again. Every feature the 2.x line added has been rebuilt on the Android-native app; your data and settings from the previous version are imported automatically the first time you open it.

- **Smartwatches sync through Health Connect.** OpenVitals does not pair with watches: Gadgetbridge or your vendor's app syncs the watch into Health Connect and OpenVitals reads everything there - steps, heart rate, HRV, sleep and workouts - with the original source shown on each record. Bluetooth sensors are unaffected and still stream live into recordings.
- **Sync health data with another phone over Bluetooth.** Both phones stay offline - no account, no internet at any point - and records keep their original source across the transfer.
- **Import health data from CSV files** through a guided wizard that maps your own columns.
- **Units that follow your device.** The unit setting defaults to Android's measurement-system preference, and every quantity can override it on its own.
- **Sturdier reminders,** quick-add from the notification, GPS-free recording, a guided heart-rate recovery test, TCX and indoor-workout import, more accurate elevation, and a long list of fixes - see the app repository changelog for the full notes.

## 2.4.0 - 2026-07-28

Onboarding is rebuilt from the ground up, the dashboard stops nagging about permissions, and the whole app gets a quiet visual tune-up: consistently outlined icons and Material 3 text spacing.

- **Onboarding is now a four-step guide.** Permissions are grouped the way Health Connect itself groups them - Activity, Body measurements, Nutrition, Sleep, Vitals - so the row you tap and the system dialog it opens carry the same name. One tap per category asks to read *and* to save, so entries you create in OpenVitals go back to Health Connect. Only Activity and Sleep are required to start; everything else is optional and can be added later from Settings.
- **Mindfulness and cycle tracking are opt-in steps.** Mindfulness stays off unless you switch it on - some Health Connect versions crash their own permission screen when asked for it, so OpenVitals requests it alone, where it can't take anything else down. Cycle tracking is its own step with a plain description of what it covers, and a Not now.
- **Exercise routes get a walkthrough.** Reading route maps is the one permission Android hides behind Health Connect's *Additional access* page, out of reach of any app. If it's still missing after the Activity grant, the last step shows the three taps that finish it, with a button that lands one tap away.
- **The dashboard no longer asks for permissions.** The two prompt cards that used to stack on the home screen right after onboarding are gone. A metric without access simply shows no data; screens ask at the point of use instead.
- **Icons are consistently outlined** - the same glyph no longer appears filled on one screen and outlined on another - and **text spacing now follows Material 3**, restoring the letter-spacing the body and title styles had silently lost in the Flutter port.
- **OpenVitals never asks for a permission your device cannot grant.** Requests are filtered against what the installed Health Connect provider defines *and* what the app itself declares - the combination that could crash the system Health Connect app on some de-Googled ROMs, locking users out of granting anything at all. This also fixes phone-to-phone sync demanding a skin-temperature write permission that could never be granted.

The permission model is versioned: existing installs pass through the new onboarding once, then continue to the dashboard as usual. Nothing already granted is asked for again.

## 2.3.2 - 2026-07-25

A small release for the activity screen: the offline route map stops freezing and crashing, PMTiles packs actually draw their map, and the route export from the pre-Flutter app is back.

- **Export a workout's route again.** The route card on an activity got its buttons back from the pre-Flutter app: open the route in a map app, save it as GPX, or save it as KMZ. Files are named after the activity and its start time, and the save goes through the system save dialog so you pick where it lands.
- **Offline maps no longer freeze the activity screen - or crash the app.** With a Mapsforge pack active, scrolling to the map could hold the whole screen for seconds while tiles were prepared, and past five seconds Android kills the app as unresponsive. Tiles are now read and prepared in the background, so the screen stays smooth while the map draws in.
- **PMTiles packs draw their base map again.** An imported .pmtiles pack rendered nothing but the plain background behind the route; the vector base map now appears as it should.

## 2.3.1 - 2026-07-24

A polish release about honesty at the edges: the day boundary, the year view, and the hours your tracker spends off your wrist. Widgets stop freezing overnight, mornings show last night's vitals instead of "No data", Body Energy keeps living while the watch charges, and a Garmin Edge can now be a live sensor and a sync device at once.

- **A Garmin Edge can be two things at once.** A bike computer now broadcasts as a live sensor during a recording - heart rate, speed, cadence, power, the way a strap does - while still syncing its recorded rides afterwards. WearOS smartwatches are also recognised as their own device type, with a Health Connect sources card in diagnostics.
- **Widgets stop freezing overnight and ask for what they need.** The refresh alarm survives Android's battery saving, placing a widget offers the "Alarms & reminders" permission that keeps refreshes on schedule (declining keeps the widget), and widgets refresh the moment a watch sync or an Apple Health import lands new data.
- **Body Energy keeps living while the tracker is off.** Once the day has shown any data, baseline metabolism keeps draining through the gaps, and a walk recorded by the phone's own step counter drains too. Untracked days hold steady rather than sliding to zero.
- **Mornings show last night.** HRV, resting heart rate, respiratory rate, SpO2 and skin temperature read from your night window, so the dashboard has your overnight values at breakfast instead of "No data" until the first daytime sample.
- **Caffeine and streak fixes.** The bedtime projection describes the night ahead, the dashboard tile shows the caffeine active right now with today's intake beneath it, goal streaks survive midnight until the day genuinely fails, and a drink just before midnight still anchors the hydration reminder schedule.
- **The Calories year view tells the truth.** No more doubled and missing days around the clock changes, no phantom kilocalories in empty years, no piling up reads until the screen hangs when paging quickly through years.
- **Garmin sleep stages sit where they happened,** intensity minutes count the whole week toward the weekly goal, and every top-level screen survives the largest text size.

## 2.3.0 - 2026-07-22

> **Note:** The direct watch connectivity described below (watch pairing, sync, alarms, and on-watch settings) has since been removed from OpenVitals. Watches now sync into Health Connect through Gadgetbridge or the vendor's app — see [Smartwatches](../features/smartwatches.md). Bluetooth LE sensors and phone-to-phone sync remain.

The biggest release so far. OpenVitals can now read a Garmin watch directly over Bluetooth - no Garmin account, no Connect app - and copy your health records to another phone the same way. Body Energy gets a plot on your home screen, sleep gets a night window you set yourself, and the Calories year view that used to take half a minute now opens straight away.

- **Garmin watch sync.** Pair a Garmin watch and copy what it recorded straight off the wrist over Bluetooth. Sleep, heart rate, HRV, VO2 max, SpO2, respiration, steps, distance and workouts go to Health Connect; the measures Health Connect has no place for - stress, Body Battery, intensity minutes, training readiness, recovery time and training load - are kept in the app and shown on a Watch data screen. Nothing goes through Garmin's servers, and the app still has no internet permission.
- **Your watch's alarms and settings, from your phone.** Switch alarms on and off, retime, rename, add and delete them, and browse the watch's own settings menus - all read live from the watch, in the language the watch is set to. There is also a Find button to make the watch alert when you have mislaid it.
- **Sync with another phone.** Copy Health Connect records to a nearby phone over Bluetooth, with no account and no internet. All 41 record types are supported, the two phones pair with a code you confirm on both, and a report tells you exactly what moved.
- **Body Energy on your home screen.** The Body Energy widget draws the day's curve beside the score. Sleep also gets a night window you set yourself, replacing the fixed range modes.
- **Much faster everywhere.** The Calories year view opens immediately instead of taking up to half a minute, the dashboard reads its metrics concurrently, the charts stop repainting every frame, and a recording no longer writes every sensor event to disk as it arrives.
- **Fixes.** A partly-staged night draws whole and merged nights open their detail; a day's steps are no longer doubled by syncing twice; reminders survive a long absence; reading the log and importing a route file no longer freeze the app; floors, elevation and wheelchair pushes land in the right period; and widgets show fresh data after the background isolate is reused.

## 2.2.8 - 2026-07-20

This release adds heart-rate recovery, rebuilds hydration and mindfulness reminders so they survive an app update rather than only a reboot, and ties the numbers on screen to the research behind them. It also fixes a Calories screen that could hang and a 30-day calendar that only drew part of the month.

- **Heart-rate recovery.** A guided test measures how quickly your heart rate falls in the minute after exertion. Recovery also appears on a workout, and is tracked over weeks and months, read from the samples Health Connect already holds. It is measured only from a deliberate test now, so a heart rate that rose after exercise is no longer misreported as a recovery.
- **Reminders that survive an app update.** Hydration and mindfulness reminders were rebuilt from the ground up so they keep firing after every update, not just after a reboot. Hydration nudges now anchor to your last drink — the countdown resets each time you log one, and is skipped if you drank recently — and fire on the exact minute when you allow exact alarms.
- **Every number shows its science.** The sleep, daily-readiness, body-energy, cardio-load and caffeine screens carry tappable links to the research behind their calculations. The sleep goal also counts only the time you were actually asleep, so awake time inside a sleep session no longer counts toward it.
- **Tap a day in the month calendar to open it.** On any metric's month view, tapping a day drops you straight into that day's detail. You can also read the time off the sleep hypnogram by scrubbing across it, and it steps aside when a night is only partly staged instead of drawing a misleading graph.
- **The Calories Day view could hang on its loading spinner forever** on some phones; it no longer does. The "Last 30 days" calendar now shows all thirty days across a month boundary instead of only the part that fell in one calendar month, and a past 30-day window is titled by its dates rather than a single month it mostly is not in.
- **The sleep score and sleep efficiency detail screens are reachable again**, and the sleep day view no longer draws the hypnogram over its own labels, drops stats that did not belong there, and calls the duration "time in bed".
- **Recording fixes.** A workout could fail to save because it never asked to write its own heart rate; a session could end before its last sample; and your own edits now show immediately, writing through the daily cache instead of waiting for the next sync.
- Spanish, German, Estonian and Italian are fully translated.

## 2.2.7 - 2026-07-17

A maintenance release that brings back editing and deleting your own entries, makes large Apple Health imports dramatically faster with a working report at the end, and fixes the sleep chart, the workout rest bell and the hydration widget.

- **Editing and deleting the entries you logged in the app works again.** Swipe a hydration, nutrition, caffeine or mindfulness entry to delete it, tap the pencil to edit a hydration or mindfulness entry, and edit or delete an activity from its detail screen. Only entries OpenVitals wrote are editable; records from other apps stay read-only. These were lost when the app moved to Flutter.
- **Large Apple Health imports are dramatically faster.** The per-batch duplicate check is bounded to the batch's own time window instead of scanning your whole history on every batch, which grew slower and slower as the import went on. The report you can copy or save when it finishes works again too: a big export's report reaches tens of megabytes, which the previous store could not hold, so it is now written to a file.
- **The workout rest-timer bell ducks your music or podcast for the chime** instead of stopping it, then restores it to full volume.
- **Logging a drink from the 1x1 home-screen widget clears an active hydration reminder**, the same as logging it inside the app.
- **The sleep chart no longer looks broken.** The day view no longer draws its stage graph over its own lane labels at larger system font sizes, and a day that includes a nap keeps the same rounded bars as every other day in the month view.

## 2.2.6 - 2026-07-17

The largest release since the Flutter rebuild. Large Apple Health exports import without running out of memory, Garmin FIT files import from a folder, and the long-range overviews are much faster.

- **Importing a large Apple Health export no longer runs out of memory.** The export is now read a piece at a time instead of loaded whole, so a multi-gigabyte file that used to crash a minute or two into the analysis now imports. Re-importing the same export no longer creates duplicate entries either — the identifier each record is matched on is stable again, so records you already imported are recognised instead of written twice.
- **Body Energy.** A new screen that scores how much energy your body signals support today, from recovery-side inputs — sleep, heart-rate variability, resting heart rate, physiological stress, temperature, hydration, nutrition and mindfulness — on a 0-100 scale, and calibrates to how you say you feel.
- **Garmin FIT files import from a folder.** Point the importer at a Garmin export and it reads sleep, heart-rate variability, resting heart rate and basal metabolic rate. Files it cannot map are reported as skipped rather than failing the whole import.
- **The Year and other long-range overviews are much faster.** They keep a local cache of daily summaries and update only what changed since the last sync, instead of re-reading a year of records every time you open them.
- **Sleep is more accurate.** Daytime naps are separated from the night, and overlapping sessions recorded by more than one source — a watch and a phone logging the same night — are de-duplicated instead of double-counted.
- **Charts pinch to zoom on every range**, and the zoom keeps working while you scroll the page.

## 2.2.5 - 2026-07-14

The download now says which phone it is for.

- **The APKs on the releases page are named after the architecture they are for.** 2.2.4 split the download in two, one per architecture, but named them after an internal version code, which tells you nothing about which one your phone wants. They are now clearly labelled `arm64-v8a` and `armeabi-v7a`. Take the arm64-v8a one unless you know your phone is an older 32-bit device; F-Droid and the Play Store still pick for you. The app inside each APK is byte-for-byte what 2.2.4 shipped.

## 2.2.4 - 2026-07-14

Half the download, and none of it for a phone you do not have.

- **The APK no longer carries libraries for architectures your phone cannot run.** Every download held both builds of the app — the 64-bit one and the 32-bit one — so whichever phone you have, half of what you downloaded was for somebody else's. It also held a third set of libraries, for x86_64, that could never have run at all. There is now one APK per architecture, containing only its own, and the download falls from 60 MB to 34. The releases page offers two APKs: nearly every phone made in the last decade wants the arm64-v8a one, and armeabi-v7a is there for older 32-bit devices. F-Droid and the Play Store pick the right one on their own.

## 2.2.3 - 2026-07-13

The last of the Google out of the build.

- **Google's dependency blob is no longer stamped into the APK.** Android's build tools quietly attach a block to every APK they sign: a list of every library the app was built from, encrypted with a Google key so that only the Play Store can read it. It survived the removal of Google Play Services because it is not a dependency at all — it is added at the moment of signing, after everything else is done. It is gone from the APK now. The app bundle uploaded to Play keeps it, because that is the one place it is actually read.

## 2.2.2 - 2026-07-13

The second half of what 2.2.1 started. 2.2.1 took Google's proprietary code out of the app so that F-Droid could build it; this one makes the build reproducible, which is what F-Droid needs in order to ship it.

- **The app now builds bit-for-bit identically on someone else's computer.** F-Droid does not take our word for what is in the APK: it builds the app from source on its own servers and compares the result, byte by byte, against the release published here, and only distributes the copy we signed if the two match. Everything already matched except twenty bytes in one library: a build-id, a hash the linker stamps in that silently records the paths of the machine that did the build. It is no longer stamped, so the app you download is provably the one the source produces.

## 2.2.1 - 2026-07-13

A packaging release, and a short one. OpenVitals no longer contains a line of Google proprietary code, which is what it takes for F-Droid to build it.

- **Google Play Services are gone from the app.** The location plugin depended on Google's proprietary location library, and the app never used it. Route recording has always asked Android's own location manager for satellite fixes directly, because Google's fused provider quietly mixes in network and wifi positions that are not the GPS readings a recorded route is actually made of. So the library sat in every build being nothing but a dependency, and it was the one thing standing between OpenVitals and F-Droid, whose scanner refuses to build an app that carries it. Nothing about recording changes.

## 2.2.0 - 2026-07-13

This release is about the charts. Every one of them was a picture you could look at and not ask anything of: you could see that the line went up somewhere in the afternoon, and no way to ask when, or how much. The numbers were in the data and never on the screen. They answer now.

- **Drag a chart to read it.** A crosshair follows your finger, a ring marks the sample, and a tooltip gives the value and the time it was taken. It snaps to a reading that was actually measured, never to a point the app invented between two of them — the curve between two readings is an interpolation, and a tooltip may only report a number that was really recorded.
- **The caffeine curve has a scale at last.** It drew the decay of caffeine in a body with no axes and no way to tell when any of it happened. It now reads milligrams down the side and midnight to midnight along the bottom, with a dashed line for the level to be under by bedtime, and a tick under each drink, so every rise sits above the drink that caused it.
- **Charts draw themselves in** — the line left to right, the bars up out of the axis, the ring round to its value. It is not decoration: it is the chart telling you which way to read it. If you have asked your phone to reduce motion, they are simply there, fully drawn.
- **Charts load into a chart-shaped skeleton instead of a spinner**, so the page no longer jumps when the data arrives. And an empty chart now looks like an empty chart, with an icon and a sentence, instead of a stray line of grey text.
- **New chart colours.** Eight of the seventeen metric accents were too faint to see against the background — gold scored 1.59:1 where 3:1 is the floor for a graphical object you are meant to see. Every accent clears it now, and keeps the hue it has always had: steps are still green, water is still blue, the heart is still rose.
- **Body Energy could draw a score above 100**, or below the lowest reading of the day, on a score defined as 0 to 100. The curve can no longer leave the range of the data it was drawn from, and it gained the 0-100 scale it never had.
- An axis could label two different heights with the same number, and a chart could fill the area under a line that was not there. Both fixed.
- German, Estonian and Italian said route import took GPX/KML/KMZ, while the app has read TCX since 2.1.0 — the one file type an indoor athlete would look for was the one those languages said it could not read. German, Spanish, Estonian and Italian are now complete.

## 2.1.0 - 2026-07-13

This release is about the activities the app was throwing away. A treadmill run, a trainer ride, a strength session — anything recorded without GPS — was refused at the door as a broken file. It was not broken. It had no route, and the app had quietly decided those were the same thing.

- **Import a whole folder of FIT files.** Pick the folder; every FIT file inside it is imported, including the ones in the sub-folders where a watch buries them. A file that will not read fails on its own and the rest of the folder carries on.
- **TCX files are now read** — the format Strava and Garmin actually export an indoor activity as, and one the app could not open at all. It is XML, so it used to fall through to the GPX reader, which found no track and blamed the file.
- **Indoor activities could not be imported.** A FIT file records *total* calories and has no active-calorie field, so the app filled the blank with an estimate — and stood that estimate next to the number the file had actually measured. A treadmill run arrived as 226 estimated active calories against its own recorded 208 total, and Health Connect refuses a record whose total is below its active. A guess was allowed to contradict a measurement. It is now estimate both or estimate neither.
- **An indoor bike ride imported as a run.** The app decided what an activity was by mashing the sport, the name and the *file name* into one string and testing "run" before "cycling" — so `Indoor_CyclingiSmoothRun.fit` was read as a run, and a 27 km ride was saved as one. The file's own sport is now asked first, and on its own. A stationary bike is also an activity type of its own at last, so a trainer ride is no longer saved as an outdoor one.
- **A GPX with no locations in it was refused.** Real exporters write indoor sessions as track points carrying a time, a heart rate and no coordinates at all — 1,931 of them for a strength session, in one of the files this was fixed against. The session was in the file the whole time: the timestamps give the start, the end and the duration, and the extensions give the heart rate.
- **A GPX with a heart rate in it lost the heart rate**, and imported as a bare line on a map.
- **Activities show an elevation profile** — where you climbed, not just how much. Health Connect stores one total for a session, so it can tell you that you climbed 240 m and never where; the profile is drawn from the route's own altitudes.
- **A speed graph appears even when the device recorded no speed**, which is most watches. It is rebuilt from the splits, which knew each segment's distance and duration all along, and drawn as a step — one flat run per split, because that is the resolution those numbers really have.

## 2.0.4 - 2026-07-12

The app's insides were rebuilt this release, and the rebuild is what found the bugs. Moving every calculation out of the screens that were doing it mid-draw put a lot of arithmetic side by side for the first time — and several numbers, it turned out, disagreed with each other.

- **The sleep card called your watch's recordings "hand-typed", and never noticed the ones that really were.** Health Connect labels how a record was made — actively recorded, automatically recorded, typed in by a person — and the data-confidence card was checking that label against the wrong value. It warned you about manual entries whenever your watch had recorded the night properly, and a night you genuinely did type in was never counted at all.
- **The hydration goal bar filled up if you logged a single day.** It measured the average of the days you *logged* against your goal — so a week in which you logged Monday, hit your target and never opened the app again showed a completely full bar, with "1 of 1 days met" above it. Log nothing and you cannot fall short of anything. It now counts the days you met your goal against the days that have actually happened, and stops at today.
- **A day's heart rate could print an average outside its own low and high.** The average came from Health Connect's summary of the day while the low and the high came from the individual readings — two different sets of numbers printed as one. All three now come from the readings.
- **The skin-temperature card went blank while its own chart carried on drawing.** A reading that arrives without a temperature difference emptied the card while the chart underneath it plotted the readings that had one.
- **Respiratory rate showed two different averages on one screen**, and said neither which was which: the average of your days under the chart, the average of every reading on the card below it.
- **An Apple Health import that failed on permissions offered no way to fix it.** The "grant permission" button could never appear, because a permission failure was never reported as one.
- **Screens could spin forever after a failed permission check** — on the dashboard, in onboarding, and while saving an activity, the error was thrown where nothing was listening.
- **The app was rebuilt on Flutter's app-architecture guidelines.** Every screen now works out what to show once, when its data loads, rather than recalculating charts, totals and statistics on every redraw while you scroll. It is invisible if it went well, which is the point — and it is the groundwork for iOS.

## 2.0.3 - 2026-07-12

- **An activity could show no heart rate at all, and its splits fell back to estimates.** Health Connect stores heart rate, speed and cadence as *series* records — one record holding many timestamped samples — and filters them by the boundary of the record, never by the times of the samples inside it. A device may group a whole day of beats into a single record, and a 36-minute workout sitting inside one was therefore invisible: the read succeeded and returned nothing, so the activity reported "Not available" for a heart rate it had recorded the entire time. The same read backs the speed samples, so the 1 km splits quietly dropped to being estimated from the average on exactly the same activities.
- **The sleep graphs were blank.** The night's stage timeline and the "share of time in bed" bars drew their coloured bands with zero height — beside durations and percentages that were correct all along.
- **The weekly activities view lost the strip showing which days you trained.** It is back.
- **Beverages logged from a home-screen widget were silently dropped.** The release build strips code it cannot see being used, and the widget's buttons are found by reflection at the moment you tap them — so the tap did nothing and the drink was never recorded.
- **A strength session was cut into distance splits.** A phone left on a bench picks up a couple of hundred metres of GPS drift, and a lifting session was sliced into "1.0 km" and "181 m" laps at a 30:29 min/km pace. Whether an activity has splits is now a question about the kind of activity, not about whether a distance happens to exist for it.
- **Focus mode now fills the screen.** It was rendering under an app bar whose Back arrow did exactly what focus mode's own exit button — and the system back gesture — already do. The height it was taking now goes to the metrics.

## 2.0.2 - 2026-07-12

- **A walk or run recorded by a watch now shows its steps, distance, calories and elevation.** A watch writes an activity as a session carrying little more than a duration, and puts those numbers in *separate* Health Connect records covering the same window — so the activity's page reported "Not available" for figures the watch had in fact recorded, directly above a chart of that same activity's step cadence and splits that added up to a distance the page refused to show. A device that records speed but no distance at all, such as a treadmill, now gets a distance derived from its speed, by the same arithmetic the splits already used.
- **Speed and cadence recorded on a ride or run are charted again**, and the metrics list no longer advertises figures the activity was never going to have — "Wheelchair pushes" and "Floors climbed" on a bike ride, permanently "Not available". A metric now appears when it has a value, or when its absence is worth reporting for that kind of activity; a value that was actually recorded is never hidden.
- Fix the large empty gap above and below the recording dashboard, which in outdoor mode's black background read as a broken screen.
- Fix the crash when importing an offline map pack or a large Apple Health export. The file picker read the whole file into memory before the import began, so a 205 MB pack ran out of memory before any import code ran.
- Fix adding a home-screen widget: the metric widget opened the beverage picker (and vice versa), the picker could crash after a selection, and the widget was sometimes never created at all.

## 2.0.1 - 2026-07-11

- **Your Health Connect data is not affected by this update.** Health Connect stores it outside OpenVitals, so the rewrite cannot touch it: steps, sleep, workouts, heart rate, hydration, and every other record stay exactly as they are.
- **Two app settings reset:** the dashboard tile order, and the beverage picked in the quick-beverage home-screen widget. Set them again after updating. A one-time migration carries the rest across automatically — goals, units, theme, the caffeine profile, the body and heart-rate profile, reminders, custom drinks, paired Bluetooth LE sensors, activity marker notes, offline map packs, and your logged beverages.
- Rebuild OpenVitals on Flutter. Same app, same features, same Health Connect data — and the foundation for an iOS version later. The package name and signing certificate are unchanged, so it installs as a normal update.
- **Activity splits.** Any activity with a distance is broken into segments — 1 km by default, configurable in Settings — showing pace, average heart rate, elevation, and how each segment compares to the activity's own average. Laps recorded by a watch are shown exactly as recorded; an activity with no per-time distance data is split evenly and labelled as an estimate rather than presented as a measurement.
- Make Apple Health imports much faster on large exports by skipping records in categories you did not select, and show real progress while the export is scanned instead of sitting at 0%.
- Fix missing heart rate at the start of a recorded activity.
- Fix the dashboard showing the default daily goals instead of yours, the beverage breakdown showing the app's package name instead of drink names, the missing beverage list in the Day view, and the metric carousel refusing to swipe after a tile was moved between pages.
- Share sanitized diagnostics logs directly from Settings.
- **Reminders may now arrive a few minutes later than the time you set.** Google restricts exact alarms to alarm-clock and calendar apps, so hydration and mindfulness reminders are delivered within a short window instead of on the dot.

## 1.9.0 - 2026-07-09

- Make Apple Health imports resumable with checkpointed parsing, staged write batches, and better recovery after interruptions.
- Move GPX, KML, KMZ, and FIT imports into Settings, Data Importers, and add bulk GPX/KML/KMZ import for saving multiple route files directly.
- Add Activities filtering by activity type and aggregate activity-type statistics for distance, duration, calories, heart rate, pace, and sessions.
- Improve period navigation with rolling day, week, month, and year ranges and clearer localized titles.
- Fix mindfulness availability handling, polish weight entry behavior, and add Weblate translation validation plus stronger language-picker coverage.

## 1.8.0 - 2026-07-06

- Add Estonian and an in-app language picker so the interface can be switched independently of the system language.
- Refine starting activities and the sleep graph in the weekly and monthly views.
- Improve Body Energy and fix a file permission issue affecting imports.
- Fix the quick-beverage home-screen widget and dashboard refreshing, and harden the XML importer against malformed data.
- Polish the design system across the app.

## 1.7.7 - 2026-07-05

- Add Body Energy explainability, breaking down which factors drive your daily score over time with a dedicated timeline chart.
- Clean up and harden the Apple Health importer with clearer category handling, geo-distance helpers, and more consistent activity/route/workout conversions.
- Improve the quick-beverage home-screen widget with better drink ordering and configuration handling.
- Refresh docs for the Apple Health import and privacy/support/diagnostics pages.

## 1.7.6 - 2026-07-04

- Add a configurable quick beverage home-screen widget so saved containers can log hydration, caffeine, and nutrition faster.
- Improve beverage entry with tap-to-save containers, better daily-goal context, custom amount and category handling, and persisted nutrition defaults.
- Upgrade activity import with richer FIT activity/course/workout parsing, route-less FIT support, imported calories, duration and title inference, and clearer import errors.
- Split Heart and Vitals into clearer metric destinations, add a blood-pressure vitals view, and streamline Settings and navigation flows.
- Refresh docs, README screenshots, and Play Store screenshots, including the reorganized app guide, feature guide, how-to pages, and offline maps notes.

## 1.7.5 - 2026-07-03

- Add a dedicated Caffeine detail flow with active-caffeine modeling, source and time-of-day insights, bedtime guidance, dashboard support, and configurable sensitivity and limits.
- Expand beverage logging with a Room-backed drink catalog, 215 preset drinks, editable categories, custom drinks, and nutrition defaults while keeping Health Connect records as the source of truth.
- Save richer beverage entries by pairing effective hydration with caffeine and nutrition values, and preserve custom drink ordering and categories across app launches.
- Backfill activity detail data from related Health Connect records so historical workouts can show more complete sessions and metrics.
- Improve support and release stability with crash-report email drafts, database migration coverage, Zulip links, and cleaner Gradle/Woodpecker release steps.

## 1.7.4 - 2026-07-02

- Add a dedicated Body Energy detail flow with calibration controls, timeline loading, dashboard support, and widget data.
- Show saved Bluetooth LE sensor connection status and battery levels in dashboard and recording surfaces.
- Add a rest-timer bell for repetition activity recordings.
- Use fuller raw samples in day metric views so same-day charts and detail data stay more accurate.
- Keep the local app internet-free by removing inherited network access, while improving diagnostics, Apple Health import logging, and release automation.

## 1.7.3 - 2026-06-30

- Remove the local dashboard summary cache and related warmup controls so metric refreshes read directly from Health Connect with less stale state.
- Simplify dashboard refresh loading and repository queries after cache removal.
- Improve sleep handling by merging overlapping sessions and surfacing sleep summary data more consistently.
- Fix weekly activity progress markers so past days without activity are not drawn as completed.
- Fix data source attribution text fitting for long provider and app names, with regression coverage.

## 1.7.2 - 2026-06-30

- Add a sleep-stage time graph so overnight sessions are easier to scan by time of night.
- Improve drag-and-drop mechanics for reorderable dashboard widgets and metric detail sections.
- Fix dashboard carousel behavior after widget and layout changes.
- Fix weekly activity visuals when a day has no activity.
- Expand connected-flow and visual-regression coverage for dashboard, hydration, manual entry, settings, and shared Material components.

## 1.7.1 - 2026-06-30

- Extend reorderable metric detail sections across activities, calories, hydration, nutrition, heart/vitals, sleep, and body screens.
- Improve Apple Health import diagnostics with clearer error/report copy actions and more detailed import logging.
- Fix heart data loading for days with more than 1,000 samples by paging reads before chart aggregation.
- Refine dashboard and metric internals with feature-owned repositories, presentation mappers, and smaller screen components for steadier refreshes.
- Stabilize release/debug build signing and add coverage for weekly sleep and hydration layouts.

## 1.7.0 - 2026-06-29

- Add controls for reordering metric detail sections so charts, statistics, entries, and guidance can match your workflow.
- Add a high-contrast outdoor recording theme and improve widget-edit scrolling while recording.
- Add post-activity speed and cadence charts, and trim duplicated heart-rate sensor samples during recording.
- Make Apple Health imports safer for large exports with targeted lookups and time-window chunking.
- Fix Health Connect permission handling and reduce oversized heart/chart reads that could trigger CursorWindow errors.

## 1.6.3 - 2026-06-28

- Add a manual carbohydrate entry flow that writes total-carbohydrate NutritionRecords to Health Connect.
- Add offline activity maps by importing PMTiles or Mapsforge map packs from Settings.
- Show imported offline maps while recording activities and previewing saved or imported routes, with map recentering and background import progress.

## 1.6.2 - 2026-06-27

- Add a configurable activity recording dashboard with Focus mode for a cleaner in-recording view.
- Add strength training recording with heart-rate monitoring and richer repetition training heart-rate stats.
- Keep the screen awake during activity recording when enabled and make recording setup and review flows cleaner.
- Improve Bluetooth LE sensor timeout handling so stale sensor values drop out more reliably.
- Fix daily HRV loading and defer heavier dashboard widget reads to improve dashboard responsiveness.
- Fix release automation so the signed Android App Bundle is found reliably during publishing.

## 1.6.1 - 2026-06-27

- Fix activity tracking notifications so tapping the notification reopens the active recording screen.
- Improve dashboard and background metric loading performance, including coalesced refreshes and more efficient summary reads.
- Add Italian translations and make Italian available in the in-app language selector.

## 1.6.0 - 2026-06-27

- Add a dedicated debug version that can be installed alongside production builds for safer troubleshooting.
- Automatically hide hydration reminder notifications after a hydration entry is saved.
- Add Fat-Free Mass Index (FFMI) to body composition insights when weight, height, and body fat data are available.
- Add experimental Bluetooth LE sensor integration for activity recording.
- Implement a refreshed UI/UX across the app with clearer navigation, metric screens, and entry flows.

## 1.5.1 - 2026-06-24

- Add persistent derived metric storage for dashboard and home widget summaries so calculated metrics can be reused across refreshes.
- Fix Daily Readiness and metric home widgets so cached and freshly calculated values load more reliably.
- Let OpenVitals-owned activities be deleted directly from the activity summary flow with swipe-to-delete handling.
- Improve activity entry and recording flows with safer training-plan updates, corrected planned start times, clearer repetition stats, and a fix for repetitive activity recording crashes.
- Persist the last custom hydration amount more reliably and keep release automation aligned with the restored direct Google Play production upload path.

## 1.5.0 - 2026-06-24

- Add configurable Android home screen widgets for Daily Readiness, Body Energy, Today Vitals, and selected metric summaries.
- Improve GPS activity recording with split analysis, voice announcements, marker preferences, and cleaner non-GPS activity validation.
- Add set-based training timers and Health Connect training-plan support for activity entries and recordings.
- Let OpenVitals-owned hydration, body, vitals, and mindfulness entries edit their date and time as well as values.
- Add a cached metric summary layer and background warmup to make dashboard and period detail loads faster.
- Make large Apple Health imports safer with streaming conversions, narrower import repository boundaries, and clearer worker dependency handling.
- Restore direct Google Play production uploads from the approved Woodpecker deployment.
- Refresh Health Connect permission guidance, remember the last custom hydration amount, update runtime/test dependencies with Gradle locks, add `Gemfile.lock`, and split large feature files.

## 1.4.1 - 2026-06-13

- Fix metric hydration totals so small entries such as 150 ml display as `0.15 L` instead of rounding to `0.2 L`.
- Keep hydration preset taps writing the exact tapped container volume, with regression coverage for the 150 ml tea cup preset.
- Remove the selected highlight from hydration container presets in normal add mode because tapping a preset now saves immediately.
- Remove the redundant Today label above the hydration goal progress wave.

## 1.4.0 - 2026-06-13

- Add Daily Readiness with local Body Energy, Training Readiness, HRV status, intensity minutes, physiological stress, adaptive goals, and explanation screens.
- Improve hydration logging so tapping a container size can save immediately, with container controls shown before beverage type and better today progress feedback.
- Refresh hydration details with a wavy day trend, clearer week charts, and corrected totals based on the rounded values shown in the app.
- Let day-based detail screens move between days by swiping the date header, and refresh the dashboard automatically after saving manual entries.
- Move cycle tracking into explicit Health Connect permission categories in onboarding and Settings.
- Fix the monochrome launcher icon and keep release CI publishing Codeberg artifacts while automated Google Play uploads/promotions remain disabled.

## 1.3.2 - 2026-06-10

- Move Apple Health export imports to a WorkManager-backed background job so large `export.xml` or `export.zip` imports can continue after leaving Settings.
- Add live import progress, foreground notification text, and clearer parsed, imported, duplicate, unsupported, skipped, and failed result counts.
- Stream Apple Health parsing and record writing to reduce memory pressure on large exports while preserving diagnostics and per-type summaries.
- Declare the data-sync foreground service path needed for reliable long-running Apple Health imports on newer Android versions.

## 1.3.1 - 2026-06-10

- Update AndroidX Health Connect to 1.2.0-alpha04 and align activity recording with newer activity-recognition, health foreground-service, and high-sampling sensor permissions.
- Expand recorded activity support with newer exercise types and repetition-set details where Health Connect provides them.
- Redesign the Apple Health import implementation into a dedicated importer package with clearer parser/converter tests and broader write-permission handling for supported records.
- Split dashboard, settings, manual entry, activity recording, route import, period helpers, and metric sections into smaller feature-owned files.
- Move app-local models, insights, and preferences into domain packages while keeping HealthRepository focused on availability, permissions, and dashboard aggregation.

## 1.3.0 - 2026-06-09

- Add Apple Health export import from Settings for supported activity, heart, body, hydration, and vitals records.
- Add FIT route file import alongside GPX/KML/KMZ, with parser tests and clearer route metadata handling.
- Add wheelchair activity support, wheelchair push summaries, charts, dashboard widgets, and Health Connect permission coverage.
- Expand Heart & Vitals with a combined overview screen, stronger charts, and high/low heart-rate check summaries.
- Unify Body and Nutrition detail screens with richer period overviews, body composition coverage, and meal/macro chart improvements.
- Rework Settings into grouped sections with data import permissions, clearer controls, and improved unit and chart formatting.

## 1.2.3 - 2026-06-09

- Add a Calories detail screen with period statistics, total and active calorie trends, BMR context, and day-level breakdown rows.
- Link dashboard and Activities calorie cards to the new Calories screen so calorie data has a full drill-down path.
- Clarify dashboard messaging for missing Health Connect total-calorie records and OpenVitals active calories plus BMR estimates.
- Improve hydration entry cup-size controls with better alignment and more readable saved values.
- Add auto-resizing text to compact dashboard, metric, and chart cards.
- Fix Activities today handling and update CI/build tooling for Android SDK 37, AGP 9.1.1, and the newer Material 3 library.

## 1.2.2 - 2026-06-09

- Move the app toward a Summary-first flow by folding the old Activities and Sleep tab content into richer metric detail screens with overview cards and direct metric links.
- Add a total-calories preference that keeps Health Connect totals as the default and can optionally fill missing totals from active calories plus BMR.
- Make weekly cardio load respect the Activity week setting, so Last 7 days uses a rolling selected-date window while Mon-Sun remains fixed.
- Persist edited hydration container sizes per preset and add a discard action for unfinished GPS recording drafts.
- Polish dashboard, activity, and sleep UI with clearer colors, denser widgets, and better text fitting.

## 1.2.1 - 2026-06-06

- Remember the latest recorded activity type and preselect it for future activity entries.
- Add a Settings option to choose a favorite activity type that overrides the latest recorded activity default.
- Return to the dashboard after saving a new activity so users do not land back on the activity-entry screen.

## 1.2.0 - 2026-06-06

- Add System, Light, Dark, and AMOLED theme options, with AMOLED keeping Material You accent colors and pure black backgrounds.
- Add swipe-to-delete for OpenVitals-owned hydration, activity, mindfulness, body measurement, and vitals entries while keeping records from other apps read-only.
- Let users edit the default hydration container size so quick hydration logging can match their real bottle or glass.
- Add configurable mindfulness reminders alongside the existing hydration reminder support.
- Improve GPS activity recording by using the already locked GPS fix, keeping finished recordings recoverable after navigating back, and renaming the final action to Save activity.
- Compact the dashboard sleep widget and improve its contrast.

## 1.1.1 - 2026-06-01

- Show sleep score and its rating directly in the dashboard sleep widget.
- Fix achievements history loading by allowing step-only history and chunking long activity-history reads.
- Keep average pace and average speed visible after GPS recording ends.
- Use moving time for activity pace and speed when pause segments are available.

## 1.1.0 - 2026-06-01

- Add achievement badges for activity history.
- Add opt-in hydration reminders with active hours, interval scheduling, notification permission handling, boot rescheduling, and automatic pause after the daily goal is reached.
- Add an Activities setting for fixed Monday-Sunday weeks or rolling last 7 days.
- Add one-tap onboarding for requestable read, write, and additional Health Connect permissions.
- Keep cycle tracking explicitly opt-in and workout route access manual.

## 1.0.0 - 2026-05-31

- Revamp the dashboard with a denser widget grid, editable widget ordering, and clearer summary cards.
- Add recovery views with sleep score, sleep efficiency, trend detail screens, confidence notes, and localized explanations.
- Add an Activities overview with cardio load, weekly progress, route-aware activity summaries, and a cardio load detail screen.
- Open saved GPS routes in external map apps.
- Import GPX, KML, and KMZ route files and export activity routes as GPX or KMZ.
- Add high and low heart-rate threshold checks with adjustable settings.
- Improve Health Connect query performance and test coverage.

## 0.7.1 - 2026-05-28

- Edit OpenVitals-created hydration, activity, mindfulness, body measurement, and vitals entries from detail and browse lists.
- Keep records from other apps read-only.
- Verify Health Connect ownership before every update.
- Prefill edit screens with existing values and save changes back to the original Health Connect record.
- Add localized release notes and Play Store changelogs.

## 0.7.0 - 2026-05-27

- Add Activity entry support for Health Connect exercise sessions with optional route, distance, elevation gain, active calories, and total calories records.
- Import GPX, KML, and KMZ routes with preview and review before saving.
- Record GPS activities in OpenVitals with pause, resume, discard, route preview, distance, elevation gain, moving time, and a persistent recording notification.
- Estimate active and total calories for imported routes and recorded activities.
- Update release flow for beta publishing and production promotion.

## 0.6.1 - 2026-05-26

- Refresh the app shell with Material 3 adaptive navigation, updated theming, clearer dashboard cards, and scroll-aware detail screens.
- Move Add entry into a contextual create action.
- Improve manual-entry UX and accessibility.
- Update mindfulness entry with bell previews, looping background sounds, circular timer, and simplified minutes input.
- Add new Play screenshots.

## 0.6.0 - 2026-05-25

- Add a dedicated Add entry area.
- Keep the dashboard read-only while manual entries save directly to Health Connect.
- Add hydration entries with drink and serving choices.
- Add manual entries for weight, height, body fat, blood pressure, blood oxygen, respiratory rate, and body temperature.
- Add mindfulness timer and manual minute entry.
- Modernize app architecture with Hilt, shared period queries, cached Health Connect reads, and CI/release improvements.

## 0.5.2 - 2026-05-24

- Show timeframe-scoped entry lists across metric detail screens.
- Let week and month charts reveal a tapped day's entries.
- Simplify the dashboard workout widget.
- Improve dashboard edit mode and carousel reordering.

## 0.5.1 - 2026-05-24

- Refresh OpenVitals branding with the new logo and launcher icons.
- Use distinct launcher icons for production and debug builds.
- Show the new logo during onboarding.
- Update README screenshots and project branding.
