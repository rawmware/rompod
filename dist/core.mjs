export const SEED = 'PLSs16p2GJ7MKDT4eOTUtrYjCAxc21sEIe';
export function playlistId(value) {
  const raw = value.trim();
  if (/^(PL|UU|OLAK5uy_|RD)[a-zA-Z0-9_-]{8,}$/.test(raw)) return raw;
  let url;
  try { url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`); } catch { throw new Error('Paste a valid YouTube playlist link.'); }
  if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be'].includes(url.hostname) || !['https:', 'http:'].includes(url.protocol)) throw new Error('Use a playlist link from YouTube.');
  const id = url.searchParams.get('list');
  if (!id || !/^[a-zA-Z0-9_-]{10,150}$/.test(id)) throw new Error('This link has no playlist. On YouTube, open a playlist and copy its link.');
  return id;
}
export function time(seconds) { const s = Math.max(0, Math.floor(Number(seconds) || 0)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }
