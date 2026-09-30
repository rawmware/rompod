const $=id=>document.getElementById(id);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let motion=!reduced.matches, mode='orbit', intensity=.55, frame=0, phase=0, lastTime=0;
const canvas=$('scope'),ctx=canvas.getContext('2d');let width=0,height=0;
function resize(){const box=canvas.getBoundingClientRect();width=box.width;height=box.height;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);draw();}
new ResizeObserver(resize).observe(canvas);
function draw(){
 if(!width || !height)return;
 const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
 ctx.fillStyle='#08090b';ctx.fillRect(0,0,width,height);
 let energy=.18;const real=document.body.dataset.source==='local' && window.rompodAnalyser;
 const samples=new Uint8Array(real?real.frequencyBinCount:128);if(real){real.getByteFrequencyData(samples);energy=samples.slice(0,80).reduce((a,b)=>a+b,0)/80/255;}
 const t=phase, cx=width/2,cy=height/2, power=intensity*(.5+energy*2);
 ctx.strokeStyle='#ffffff09';ctx.lineWidth=1;for(let x=0;x<width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();}for(let y=0;y<height;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke();}
 ctx.strokeStyle=accent;ctx.lineWidth=1;
 if(mode==='orbit'){
  for(let ring=0;ring<34;ring++){ctx.beginPath();const radius=Math.min(width*.31,height*.48)+ring*1.1;for(let j=0;j<=160;j++){const a=j/160*Math.PI*2;const distortion=Math.sin(a*3+t+ring*.14)*20*power+Math.cos(a*7-t*.5)*8*power;const r=radius+distortion;const x=cx+Math.cos(a)*r*(1.38+.1*Math.sin(t*.3+ring*.07));const y=cy+Math.sin(a)*r*.7+Math.sin(a*2+t+ring*.1)*18; j?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.globalAlpha=.12+ring/65;ctx.stroke();}
 }else if(mode==='wave'){
  for(let line=0;line<32;line++){ctx.beginPath();ctx.globalAlpha=.15+line/60;for(let x=0;x<=width;x+=4){const u=x/width;const amplitude=real?samples[Math.min(samples.length-1,Math.floor(u*200))]/255:.5+.5*Math.sin(u*10+t);const y=cy+(line-16)*5+Math.sin(u*18-t+line*.12)*Math.sin(u*Math.PI)*height*.27*power*(.5+amplitude);x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
 }else{
  for(let row=0;row<36;row++){ctx.beginPath();ctx.globalAlpha=.1+row/42;for(let col=0;col<=70;col++){const u=col/70;const depth=row/35;const scale=.2+depth*1.2;const x=cx+(u-.5)*width*scale;const value=real?samples[Math.floor(u*150)]/255:.5+.5*Math.sin(u*13+depth*7+t);const y=height*.3+depth*height*.65-Math.sin(u*Math.PI)*value*80*power;col?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
 }
 ctx.globalAlpha=1;ctx.fillStyle=accent;for(let i=0;i<35;i++){const x=(i*127.3+t*8)%width,y=(i*83.7)%height;ctx.globalAlpha=.15+(i%4)*.1;ctx.fillRect(x,y,2,2);}ctx.globalAlpha=1;
}
function animate(now){frame=requestAnimationFrame(animate);if(document.hidden || !motion)return;if(now-lastTime<32)return;phase+=Math.min((now-lastTime)/1000,.05);lastTime=now;draw();}
requestAnimationFrame(animate);
function setMotion(value){motion=value;$('motion').textContent=motion?'Motion on':'Motion off';$('motion').setAttribute('aria-pressed',String(motion));draw();}
setMotion(motion);$('motion').onclick=()=>setMotion(!motion);reduced.addEventListener('change',e=>setMotion(!e.matches));
document.querySelectorAll('[data-mode]').forEach(button=>button.onclick=()=>{mode=button.dataset.mode;document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('visual-mode-label').textContent=({orbit:'01 — ORBITAL FIELD',wave:'02 — WAVE INTERFERENCE',terrain:'03 — SIGNAL TERRAIN'})[mode];draw();});
$('intensity').oninput=e=>{intensity=Number(e.target.value)/100;draw();};
new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['style']});
$('immersive').onclick=()=>{const active=document.body.classList.toggle('immersed');$('immersive').textContent=active?'Exit immersion':'Immerse';$('immersive').setAttribute('aria-pressed',String(active));};
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('message').textContent='Full screen is unavailable in this browser. Use Immerse for an expanded view.';}};
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
document.addEventListener('keydown',e=>{if(e.key==='Escape' && document.body.classList.contains('immersed'))$('immersive').click();});
const started=Date.now();setInterval(()=>{const seconds=Math.floor((Date.now()-started)/1000);$('session-clock').textContent='SESSION '+String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');},1000);
// Desktop panels move on a 12px grid; narrow layouts stay in document flow.
const panels=[...document.querySelectorAll('[data-window]')];let z=5;
for(const panel of panels){let drag=null,x=0,y=0;const bar=panel.querySelector('.window-bar');
 bar.addEventListener('pointerdown',e=>{if(e.target.closest('button') || innerWidth<=1100 || document.body.classList.contains('immersed'))return;drag={startX:e.clientX,startY:e.clientY,x,y};bar.setPointerCapture(e.pointerId);panel.classList.add('dragging');panel.style.zIndex=++z;});
 bar.addEventListener('pointermove',e=>{if(!drag)return;const rect=panel.getBoundingClientRect();const baseLeft=rect.left-x,baseTop=rect.top-y;x=Math.round((drag.x+e.clientX-drag.startX)/12)*12;y=Math.round((drag.y+e.clientY-drag.startY)/12)*12;x=Math.max(8-baseLeft,Math.min(innerWidth-rect.width-8-baseLeft,x));y=Math.max(85-baseTop,Math.min(innerHeight-48-baseTop,y));panel.style.transform='translate('+x+'px,'+y+'px)';});
 const end=()=>{drag=null;panel.classList.remove('dragging');};bar.addEventListener('pointerup',end);bar.addEventListener('pointercancel',end);
 panel.addEventListener('reset-panel',()=>{x=0;y=0;panel.style.transform='';panel.style.zIndex='';end();});
}
$('reset-layout').onclick=()=>panels.forEach(panel=>panel.dispatchEvent(new Event('reset-panel')));
window.addEventListener('resize',()=>{if(innerWidth<=1100)$('reset-layout').click();});
