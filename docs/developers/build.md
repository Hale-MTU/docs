# Build From Source

## Android App

OpenVitals is a Kotlin/Jetpack Compose app (Hilt, Room, Health Connect). It was
Flutter between 2.0.0 and 2.4.1 and was migrated back in 2.5.0; the Dart
implementation survives only in git history.

### Prerequisites

- **JDK 17**.
- **Android SDK Platform 37**, with SDK Build-Tools 37.0.0. `compileSdk` is 37.

  Note the package is **`platforms;android-37.0`**, not `android-37` — Android
  ships minor-versioned platforms now. `sdkmanager` only *warns* on an unknown
  package and still exits 0, so a typo here does not fail there; it fails much
  later inside Gradle looking like an unrelated problem.

  ```bash
  sdkmanager "platforms;android-37.0" "build-tools;37.0.0"
  ```

- `minSdk` is 26 (a Health Connect requirement); `targetSdk` is 36.

### Build And Run

```bash
git clone https://github.com/Hale-MTU/android-app.git
cd android-app
./gradlew :app:installDebug
```

For a release build (unsigned unless the `OPENVITALS_RELEASE_*` environment
variables provide a keystore):

```bash
./gradlew :app:assembleRelease
```

### Checks

Run the same checks CI runs, before opening a pull request:

```bash
./gradlew verifyCi
```

That is the build, the unit tests, lint, the translation gate
(`verifyTranslations`, backed by `scripts/verify-translations.py`) and the
instrumentation-test compile. The instrumentation tests themselves — including
the visual goldens — need a connected device: `scripts/goldens.sh` runs them,
and `scripts/goldens.sh --update` re-records the golden baselines.

The local app is the Health Connect-only app and should stay internet-free.

## Documentation Site

Clone this documentation repository:

```bash
git clone https://github.com/Hale-MTU/docs.git
cd docs
npm install
npm run dev
```
