# ROMPOD — Rawmware Audio System

Day 2 of 365 Days of Showing Up: September 29, 2026. Expanded and published September 30, 2026.

An immersive Winamp-inspired music workstation evolved from the Pocket Amp beta. The interface uses metallic window bars, an LCD transport, modular panels and a full-size generative signal display.

## Run

Node.js 20 or newer; no dependencies or API key required.

```sh
npm start
npm test
```

Open http://127.0.0.1:4178. Public player: https://rawmware.com/365-days/projects/day-002

## Included

- YouTube playlist controls: play/pause, stop, previous/next, seek, volume, shuffle, repeat and live queue with best-effort titles.
- RAWM's original playlist remains the default. Paste another playlist URL to switch.
- Local audio files with real playback, a session queue, a ten-band Web Audio equalizer and four EQ presets. Files stay on the device.
- Orbit, wave and terrain visualizers. Local audio drives the analyser; YouTube visuals are explicitly generative rather than audio reactive.
- Eight original color skins, remembered skin/volume/playlist, desktop panel dragging on a grid, reset layout, transport window shade, immersive view and browser fullscreen.
- Responsive stacked mobile panels, reduced-motion support and keyboard controls: Space play/pause, Z/B previous/next, X play, C pause, V stop, L playlist input, Escape exit immersion.

## Verification and limits

JavaScript syntax and three playlist/time unit tests passed. Desktop browser checks verified local WAV playback advancing, non-zero analyser output, queue selection, play/pause/seek/stop, EQ presets/reset, source switching, skin persistence, visual modes, immersion, panel dragging/reset, invalid playlist handling and no application page errors. Layouts at 390, 768 and 1100 px had no horizontal overflow.

The supplied YouTube playlist returned embed error 150 in the local browser, so its audible playback remains unverified. YouTube determines availability and embedding permissions; the player exposes errors and links to the original playlist. No extraction or restriction bypass is attempted. Some mobile browsers use system volume, and background/lock-screen playback is browser-dependent.

This is an original Winamp-inspired interface, not Winamp or Webamp. It does not load `.wsz` files or claim a 100-skin museum. EQ affects local audio only. Local files and panel positions are session-only. Queue order comes from YouTube or local file selection; there is no queue reordering UI.

## AI involvement

Roman supplied the concept, music reference, design direction and requested redesign. Codex implemented and checked the interface and playback improvements. The attached briefs were treated as reference proposals, not a record of completed functionality.
