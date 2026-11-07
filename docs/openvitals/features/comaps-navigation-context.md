# CoMaps Navigation Context

OpenVitals can show the turn-by-turn guidance CoMaps is giving at that moment: the next street, the distance to the turn, route progress, and the planned route drawn under the recorded track. CoMaps plans and navigates; OpenVitals only reads what CoMaps is already doing, and cannot start, stop, or steer a route.

There are two independent places that guidance can appear, each with its own switch:

- **In an activity recording** - the turn strip, the route on the offline map, and the dashboard tile described below. Off by default, switched on in Settings > Activity recording.
- **On a Garmin watch** - the next turn sent to the wrist as a notification that updates in place. Off by default, switched on per watch on its device screen. See [Smartwatches](smartwatches.md).

Neither one requires the other. Guidance on the watch alone reaches the watch without a recording running, the recording integration alone shows in the recording, and both on shows in both places. Either way it needs a CoMaps build that shares navigation data, and is guarded by CoMaps' own runtime permission - each surface requests that permission for itself.

## What Appears While Recording

- **Turn strip on the map tab**: a green overlay with the turn direction, the distance to it, and the next street, floating over the live map.
- **Route on the offline map**: the planned route drawn point-for-point - the same geometry CoMaps draws - as a wide cased blue line with white bent arrows through every turn and a flag on the destination. The location dot becomes a compass arrow that points where the phone points.
- **Dashboard tile**: a `CoMaps guidance` tile joins the stats layout editor while the integration is on - the distance to the turn as the value, the street it turns onto as the label.
- **Start gate**: with the integration on, Start on the activity setup opens the armed recording view - set the route up in CoMaps, or dismiss the guidance card to record without guidance; then Start begins the session.
- **Dismissable**: the overlay and the state cards carry a close button. A reroute, a state change or a new session bring the guidance back.

## Saved Guidance

With the separate "Save CoMaps guidance with activity" toggle on, the readings shown during the recording are kept with the saved activity and listed on its detail screen: the street, the distances, the direction, the time, and route progress.

Saved guidance is app-local support data. It is never written to Health Connect, and deleting the activity deletes it.

## How It Reads CoMaps

Observed, not polled: CoMaps announces each navigation change and OpenVitals listens; a phone that is navigating nowhere is never queried. Distances and times arrive pre-formatted from CoMaps and are shown as sent, so both apps always agree on units.
