# Contributing

OpenVitals is early and practical feedback is valuable.

## Useful Bug Reports

Include:

- Device model.
- Android version.
- Health Connect provider and version if known.
- OpenVitals version.
- Which permissions were granted.
- Which screen or workflow failed.
- Whether the data exists in Health Connect.
- Screenshots or logs when they help explain the issue, without your health data: issues are public. Use made-up data for screenshots, paste the reports the app copies (they hold counts and reasons only), and send a diagnostics log by email from Settings → Report an issue rather than posting it.

## Where To Report Issues

Use the Android app repository for app bugs:

[github.com/Hale-MTU/android-app/issues](https://github.com/Hale-MTU/android-app/issues)

Use the documentation repository for documentation or website issues:

[github.com/Hale-MTU/docs/issues](https://github.com/Hale-MTU/docs/issues)

For contributor discussion, join the OpenVitals Zulip:

[openvitals.zulipchat.com](https://openvitals.zulipchat.com/)

## Development Workflow

OpenVitals is a Kotlin/Jetpack Compose app (Hilt, Room, Health Connect). See [Build from source](build.md) for the toolchain, including the prerequisite that most often bites: the SDK package is `platforms;android-37.0`, not `android-37`.

1. Clone the Android app repository.
2. Run the app with `./gradlew :app:installDebug`.
3. Run the checks before pushing:

   ```bash
   ./gradlew verifyCi
   ```

4. Kotlin annotation processing (Hilt, Room) runs as part of the Gradle build; there is no separate code-generation step to run by hand.
5. Keep the local app internet-free.
6. Keep Health Connect writes inside explicit Add entry or edit-entry workflows.
7. Add tests when changing shared behavior, permissions, period selection, formatting, or Health Connect query logic.

## Documentation Workflow

1. Clone the documentation repository.
2. Install npm dependencies.
3. Run `npm run dev` for local preview.
4. Run `npm run build` before opening a pull request.

```bash
git clone https://github.com/Hale-MTU/docs.git
cd docs
npm install
npm run build
```

## Translation Notes

Translate OpenVitals on Codeberg Translate:

[translate.codeberg.org/projects/openvitals/mobile-app](https://translate.codeberg.org/projects/openvitals/mobile-app/)

### Where The Strings Live

App strings are **Android string catalogs** (`strings.xml`). Weblate edits them directly and opens pull requests against the app repository, so a hand edit and a Weblate edit are the same kind of change.

- `app/src/main/res/values/strings.xml` is the template and source language.
- `values-de/`, `values-es/`, `values-it/`, `values-et/` are the shipped translations; `values-gl/` is hosted but below the shipping floor.
- The language picker's coverage data is generated at build time by `scripts/generate-translation-coverage.py`; nothing hand-maintained.

When adding or changing user-facing copy, edit the key in `values/strings.xml` and leave the other locales to Weblate. A missing key falls back to English. Validate with `./gradlew verifyTranslations`.

### Placeholders Are Android Format Strings

Placeholders use `%1$s` / `%1$d` positions, and a literal percent in a formatted string must be written `%%` — a bare `%` next to a letter parses as a conversion and crashes the screen that renders it (this shipped once, in four locales). Keep every plural quantity the language needs, even ones the English source does not have; the gate checks the extra branches against the source's `other`. Escape apostrophes the Android way: `Couldn\'t`.

### Hosting Versus Shipping

Hosting a language and shipping it are two different things:

- A language is **hosted** in Codeberg Translate from **0%**, so translators have somewhere to put their work.
- A language is **shipped** — offered in the in-app language picker and matched against the device locale — only once it is **above 70%** translated and someone adds the corresponding app-language constant. Crossing 70% is a notice from CI, never a build failure.

Shipped app languages today are English, Czech, Spanish, French, Galician, German, Italian, Japanese, Estonian, Finnish, Polish, Portuguese, Russian, and Simplified Chinese, all at 100%.
