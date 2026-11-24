# Standard Bluetooth Devices

> **Status:** Current behavior, since OpenWatch 0.5.0. Experimental.
> **Audience:** Users.
> **Related:** [Watches](watches.md), [Xiaomi S400 scale](scale.md), [Connected apps](connected-apps.md), [Permissions](permissions.md).

Many heart rate straps, bathroom scales, blood pressure monitors and glucose meters speak one of the Bluetooth standard health profiles. OpenWatch pairs them as one kind of device and writes what they measure to Health Connect, where OpenVitals and other apps read it. Everything travels over Bluetooth between the device and the phone; the app has no internet permission.

These devices were built against the published Bluetooth profiles and have not yet met many real ones. If yours pairs but shows nothing, or writes something odd, [open an issue](https://github.com/Hale-MTU/OpenWatch/issues) with its make and model.

## Supported Devices

| Device | Bluetooth profile | What is written to Health Connect |
| --- | --- | --- |
| Heart rate strap | Heart Rate (`0x180D`) | One heart rate record a minute, while the strap's screen is open in OpenWatch or an app you allowed records with it |
| Bathroom scale | Weight Scale (`0x181D`) | Each weigh-in it hands over when it wakes |
| Blood pressure monitor | Blood Pressure (`0x1810`) | Each reading it hands over when it wakes, and the pulse it measured as a heart rate |
| Glucose meter | Glucose (`0x1808`) | The readings it stored, with where the sample came from and its relation to a meal; a check with control solution is not written |

A device is offered by the profile it advertises. A Xiaomi S400 scale has a page of its own: it is read from its broadcast, not over this profile.

## Pair a Device

1. Wake the device: put the strap on, step on the scale, or switch the monitor or meter on and open its Bluetooth or pairing mode (its manual says how).
2. In OpenWatch, add a device from the home screen and choose it under **Other devices**.
3. A scale, a monitor or a meter asks Android to pair, as their profiles require, and to let OpenWatch reach the device in the background. A strap needs neither: it is read only while something collects its heart rate.

The device then appears in the home screen's device list.

## Readings

- **A heart rate strap** shows its live heart rate on its screen in OpenWatch. While that screen is open, or while an app you allowed under [Connected apps](connected-apps.md) records with it, each minute is written as one heart rate record. If the strap drops out while something collects it, OpenWatch dials it again after ten seconds.
- **A scale, a monitor or a meter** hands over its readings when it wakes and the phone is near, and OpenWatch writes each one as it arrives. A reading's time is the device's own clock read in the phone's time zone; when the device sends no time, one its clock cannot know, or one more than ten minutes ahead, the time it arrived is used instead.

Each record carries the device it came from, so two devices of the same kind keep records of their own.

## Permissions

The records need Health Connect's write permissions for heart rate, weight, blood pressure and blood glucose. They are listed, with the device each comes from, on OpenWatch's "What OpenWatch reads and writes" screen and on the [Permissions](permissions.md) page.

## Remove a Device

Forgetting a device in OpenWatch stops its readings and, for a scale, a monitor or a meter, drops its Android pairing and background access too. Records already in Health Connect stay there.
