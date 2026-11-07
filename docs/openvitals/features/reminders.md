# Reminders

> **Status:** Current implemented behavior.
> **Audience:** Users and contributors.
> **Implementation:** `features/hydration/reminders`, `features/mindfulness/reminders`, `features/cycle/reminders`, `features/settings`.
> **Navigation:** hydration detail, mindfulness detail, Settings > Cycle, reminder-related settings.
> **Related:** [Feature map](feature-map.md), [Hydration](hydration.md), [Mindfulness](mindfulness.md), [Cycle tracking](cycle-tracking.md).

OpenVitals reminders are local device notifications for supported wellness workflows.

## Hydration Reminders

Hydration reminders can use an active time window and interval schedule. They pause after the daily hydration goal is reached and resume on the next day. Saving a hydration entry can automatically hide an active hydration reminder.

## Mindfulness Reminders

Mindfulness reminders can help users return to timer or session logging workflows. Reminder settings stay local to the device.

## Cycle Reminders

Settings > Cycle holds three local cycle reminders, off by default: a daily check-in at a chosen time that is skipped once the day is logged, a heads-up one to three days before the estimated range of the next period, and a quiet prompt when a cycle runs past that range. What the notification says is a choice: neutral text by default, descriptive text, or a custom title and message. The lock screen always shows neutral text.

## Pill Reminder

When the contraceptive pill is tracked, a daily reminder fires on taking days at the chosen time and skips pause days. It stays quiet once today's pill is marked as taken, from the cycle screen or from the notification's own Taken action. It has its own switch and follows the cycle reminders' visibility setting.

## Android Permissions

On Android versions that require it, OpenVitals asks for notification permission before showing reminders. Boot completion permission is used to restore local schedules after a reboot, an app update, or a clock or time-zone change.

## Privacy

Reminder preferences are stored locally. Reminders do not upload health data and do not require an OpenVitals account.
