import {test} from 'node:test';
import assert from 'node:assert/strict';
import {playlistId,SEED,time} from '../dist/core.mjs';
test('accepts playlist, video-with-list, music, and share links',()=>{for(const host of ['www.youtube.com','music.youtube.com','m.youtube.com','youtu.be'])assert.equal(playlistId(`https://${host}/watch?v=test&list=${SEED}&si=share`),SEED);assert.equal(playlistId(SEED),SEED);assert.equal(playlistId(`youtube.com/playlist?list=${SEED}`),SEED);});
test('rejects wrong sites, injection, missing and malformed playlists',()=>{for(const value of ['https://evil.com/?list='+SEED,'https://youtube.com.evil.com/?list='+SEED,'https://youtube.com/watch?v=abc','javascript:alert(1)','https://youtube.com/?list=<script>',''])assert.throws(()=>playlistId(value));});
test('formats elapsed and long tracks',()=>{assert.equal(time(65.9),'1:05');assert.equal(time(-5),'0:00');assert.equal(time(3661),'61:01');assert.equal(time(NaN),'0:00');});