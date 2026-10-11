'use strict';
/* recipient viewer, typed reveal, music */
/* ---------- viewer ---------- */
function viewerHTML(g,o){
  o=o||{};var to=(g.to||'').trim()||'you';
  var paper='For '+esc(to)+',<br>with love';
  return '<div class="view t-'+g.theme+'" data-view>'+
   '<section class="stage" aria-label="A gift for you"><p class="v-hello">A little something for you, <span class="hand">'+esc(to)+'</span>.</p>'+
   envHTML({cls:'big',action:'open-gift',label:'Open your gift',paper:paper,style:themeEnvVars(g.theme),bow1:themeBow(g.theme)[0],bow2:themeBow(g.theme)[1]})+
   '<p class="v-hint">Tap the envelope to open it.</p><button type="button" class="btn quiet small" data-action="skip-open">Skip the animation</button></section>'+
   '<div class="reveal" hidden>'+giftHTML(g,{tag:'h1',view:true,preview:o.preview})+
   (g.music?'<button type="button" class="music" data-action="music" aria-pressed="false">Play soft music</button>':'')+
   '</div></div>';
}
function themeEnvVars(t){
  var m={love:'--eb:#EAC9CE;--ef:#F2D6DA;--efl:#F6E0E3;--er:#C98291;--erl:#8a3f55;--ep:#FFF9F3',
    scrap:'--eb:#E8D5B8;--ef:#EFE0C6;--efl:#F4E8D2;--er:#F5E5A8;--erl:#C9A94A;--ep:#fff',
    garden:'--eb:#C8D5BE;--ef:#D6E1CC;--efl:#E1EAD9;--er:#F6E4E5;--erl:#C98291;--ep:#FFF9F3',
    midnight:'--eb:#3a2a47;--ef:#44324f;--efl:#4d3a5a;--er:#F5E5A8;--erl:#b69e4b;--ep:#F3ECE4',
    postcard:'--eb:#E0D1AF;--ef:#E8DBBD;--efl:#EFE3C8;--er:#A8453D;--erl:#7a2e29;--ep:#F6EEDC',
    confetti:'--eb:#F6E4E5;--ef:#FBEFF0;--efl:#fff;--er:#F5E5A8;--erl:#C98291;--ep:#fff'};
  return m[t]||m.love;
}
function themeBow(t){return {love:['#C98291','#8a3f55'],scrap:['#F5E5A8','#C9A94A'],garden:['#F6E4E5','#C98291'],midnight:['#F5E5A8','#b69e4b'],postcard:['#A8453D','#7a2e29'],confetti:['#F5E5A8','#C98291']}[t]||['#F6E4E5','#C98291']}
function openGift(btn,instant){
  var view=btn.closest('[data-view]');if(!view||btn.classList.contains('open'))return;
  btn.classList.add('open');
  setTimeout(function(){
    $('.stage',view).hidden=true;var r=$('.reveal',view);r.hidden=false;if(instant)r.classList.add('instant');r.classList.add('in');
    var h=$('#g-h1',r);if(h)h.focus({preventScroll:true});if(!instant&&!reduced())typeMsg(r);
    var sc=view.closest('.fs');if(sc)sc.scrollTop=0;else window.scrollTo(0,0);
  },(instant||reduced())?0:1250);
}
/* typed-in reveal for the main message (merged from v1); skippable, off for reduced motion */
function typeMsg(r){
  var m=$('.g-msg',r);if(!m)return;var orig=m.innerHTML,n=0,words=[];
  (function walk(nd){Array.prototype.slice.call(nd.childNodes).forEach(function(c){
    if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}var s=document.createElement('span');s.className='tw';s.textContent=w;words.push(s);f.appendChild(s)});c.parentNode.replaceChild(f,c)}
    else if(c.nodeType===1&&c.nodeName!=='BR')walk(c)})})(m);
  if(!words.length)return;
  var step=Math.min(55,2600/words.length);words.forEach(function(s,i){s.style.animationDelay=(i*step)+'ms'});
  var b=document.createElement('button');b.type='button';b.className='btn quiet small tw-skip';b.setAttribute('data-action','skip-type');b.textContent='Skip animation';
  r.insertBefore(b,r.firstChild);
  var done=function(){clearTimeout(t);m.innerHTML=orig;b.remove()};r._twDone=done;
  var t=setTimeout(done,words.length*step+700);
}
/* gentle original ambient music via WebAudio (no files) */
var aud={ctx:null,t:null,on:false};
function musicToggle(btn){
  if(aud.on){stopMusic();btn.setAttribute('aria-pressed','false');btn.textContent='Play soft music';return}
  var AC=window.AudioContext||window.webkitAudioContext;if(!AC){toast('Music isn\'t supported in this browser.');return}
  aud.ctx=aud.ctx||new AC();if(aud.ctx.resume)aud.ctx.resume();
  var notes=[261.63,329.63,392,329.63,440,392,329.63,293.66],i=0;aud.on=true;
  function play(){var c=aud.ctx,o=c.createOscillator(),g=c.createGain(),t=c.currentTime;o.type='sine';o.frequency.value=notes[i++%notes.length];g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+.06);g.gain.exponentialRampToValueAtTime(.0001,t+1.8);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+1.9)}
  play();aud.t=setInterval(play,800);
  btn.setAttribute('aria-pressed','true');btn.textContent='Pause music';
}
function stopMusic(){if(aud.t)clearInterval(aud.t);aud.t=null;aud.on=false}
