# Bathroom Scales

> **Status:** Current behavior. Experimental.
> **Audience:** Users.
> **Related:** [Smartwatches](smartwatches.md), [Body metrics](body-metrics.md), [Health Connect](../app/health-connect.md), [Feature map](feature-map.md).

OpenVitals can save a weigh-in from a Bluetooth bathroom scale as it happens, with the app open or closed. It never connects to the scale: it listens for the broadcast the scale sends when someone steps on it, decodes it on the phone, and writes the result to Health Connect. Nothing is sent to the internet; the app has no internet permission.

## Supported Scales

| Scale | Model | What is saved | Notes |
| --- | --- | --- | --- |
| Xiaomi Body Composition Scale S400 | MJTZC01YM, MJTZC03YM | Weight, heart rate, body fat, lean body mass, body water mass | Needs the scale's Bluetooth key once, see below. Body composition is estimated by OpenVitals from the scale's impedance with published equations, so it differs from the figure the scale displays. |

Other scales are not supported yet. A scale that sends its measurements as Bluetooth advertisements, without an app having to connect, is the kind that can be added.

## Before You Start

The scale has to be set up once in Xiaomi Home, on any phone. That step does three things nothing else can:

1. It binds the scale to a Xiaomi account, which is the moment the scale's Bluetooth key is created. There is no key before that.
2. It creates your user profile on the scale (height, age, sex), so the scale recognises you and measures body fat and heart rate. A scale that does not recognise the person standing on it shows `----` and broadcasts nothing OpenVitals can use.
3. It makes the scale start broadcasting its weigh-ins.

Xiaomi Home can be closed afterwards. Do not remove the scale from the account inside Xiaomi Home: that unbinds it and the key stops working.

## Get the Bluetooth Key

The scale encrypts what it broadcasts with a 32-character key held by your Xiaomi account. OpenVitals never contacts Xiaomi, so you read the key yourself, once, with a token extractor such as [Xiaomi-cloud-tokens-extractor](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor): it signs in to your Xiaomi account from a computer and prints, for each device, its token and its `BLE key`. Copy the 32 hexadecimal characters of the scale's BLE key.

If you pair the scale again in Xiaomi Home, it gets a new key. OpenVitals then says the key no longer opens the scale; change it on the scale's screen.

## Add the Scale

1. Open Settings, Scales, and tap **Add a scale**.
2. Step on the scale so it lights up, then tap **Find**. Android lists the scales it hears and asks whether OpenVitals may use the one you pick. This registers the scale as a companion device, which is what lets Android wake OpenVitals when someone steps on the scale later.
3. Paste the key and save. The scale appears as a card.
4. Step on the scale once with the app open. The first weigh-in tells OpenVitals which of the scale's users is you; weigh-ins the scale files under another user are left out.

## What Happens on a Weigh-In

- The scale sends its result for about two seconds once it has finished measuring. Android wakes OpenVitals as soon as the scale starts advertising, and OpenVitals listens at full speed for up to 45 seconds, showing a silent notification while it does.
- Weight and heart rate are written to Health Connect as the scale measured them. Body fat, lean body mass and body water mass are estimates from the scale's impedance and the height and sex in your body profile; without those two, only weight and heart rate are written.
- Both impedance readings are kept on the phone, so the estimates can be recomputed if the equations change.
- A weigh-in Health Connect cannot take at that moment, for a missing permission or paused sync, waits on the phone and is written later.

On Android 11 and older, the phone hears the scale only while OpenVitals is open.

## The Scale's Screen

Tap the scale's card to see whether the phone is listening, the last weigh-in, what Health Connect still lacks, your user slot on the scale, and the key. From there you can rename the scale, change the key, delete the last weigh-in with all its records, or remove the scale.

The scale does not broadcast its battery level or expose any settings, so OpenVitals shows neither.
