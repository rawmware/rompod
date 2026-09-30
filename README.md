# Pocket Amp

A responsive desktop and mobile YouTube playlist player, published as [POCKET AMP](https://rawm-pocket-amp.r0man.chatgpt.site).

## Run locally

Requires Node.js 20 or newer. No dependencies or API key are required.

```sh
npm start
```

Open http://127.0.0.1:4178. Run `npm test` for playlist URL validation tests.

## Features

- Defaults to RAWM's playlist: `PLSs16p2GJ7MKDT4eOTUtrYjCAxc21sEIe`.
- Paste a YouTube playlist URL to load another playlist.
- Visible YouTube player with play/pause, previous/next, seek, volume, shuffle and repeat.
- Live queue, eight original themes, remembered playlist and volume, and keyboard shortcuts.
- Desktop two-column layout and mobile single-column layout.

YouTube decides whether each video and playlist can be embedded. The default playlist returned YouTube embed error 150 during local testing, so playback for that playlist remains unverified. The app links to YouTube when embedding is unavailable. The spectrum is decorative. It does not include Winamp `.wsz` skins, draggable windows, or an audio equalizer.
