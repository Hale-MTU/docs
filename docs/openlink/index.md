# OpenLink

OpenLink is the connection between [OpenVitals](../openvitals/index.md) and [OpenWatch](../openwatch/index.md) on the phone. Health data travels through Health Connect; OpenLink carries what Health Connect cannot:

- the **body profile** (birth year, sex, height, weight), kept the same in both apps, the newest change winning;
- the **paired watches and scale**, with their battery and last sync, and a request to sync one: OpenVitals' dashboard tile;
- a request to **keep a watch streaming** while OpenVitals records an activity, and the **live heart rate** it streams into the recording.

It works only inside the phone: no network, no account, no server. OpenWatch decides, per app, what each one may do, from the app's signing certificate; OpenVitals is trusted without a prompt, any other app asks first. What you see of it is OpenWatch's [Connected apps](../openwatch/connected-apps.md) screen and OpenVitals' Settings, OpenWatch.

## For developers

OpenLink is an Android library, licensed under the AGPL-3.0-or-later like the apps: a bound service with an AIDL interface, a trust store on the host side, and a consent screen. The protocol, the trust model and the versioning rules are in the [Specification](specification.md).

| Module | What |
| --- | --- |
| `contract` | AIDL interfaces, parcelables, constants |
| `host` | for the app that owns a capability: the binder, the trust rules, the exported service |
| `client` | for the app that uses it: binding, reconnects, replay, flows |

Add the repository as a git submodule at `openlink/`, include it as a Gradle composite build, and depend on the host or the client:

```kotlin
// settings.gradle.kts
includeBuild("openlink")

// build.gradle.kts
implementation("tech.mmarca.openlink:client")
```

`./gradlew verifyCi` runs the unit tests (the trust rules, session ownership and the client's replay run on the JVM) and lint of the three modules.

## Source

[github.com/Hale-MTU/OpenLink](https://github.com/Hale-MTU/OpenLink)
