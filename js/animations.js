'use strict';
/* Motion layer: starfield, petals, cursor sparkles, tap hearts, confetti,
   card tilt, hero parallax, scroll reveals, headline entrance, "Motion" switch.
   Skipped entirely when the visitor prefers reduced motion. */
(function(){
  var RM=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(RM.matches)return;
  var root=document.documentElement,fine=window.matchMedia('(pointer: fine)').matches;
  var COL=['#F6E4E5','#C98291','#F5E5A8','#C8D5BE','#EDB9C6','#fff'];
  var rnd=function(a,b){return a+Math.random()*(b-a)},pick=function(a){return a[Math.floor(Math.random()*a.length)]};
  try{if(localStorage.getItem('miag:fx')==='off')root.classList.add('fx-off')}catch(e){}
  var on=function(){return !root.classList.contains('fx-off')&&!RM.matches};
  root.classList.add('js-anim');

  /* ambient sky: twinkling stars + slow petals */
  var sky=document.createElement('div');sky.className='sky';sky.setAttribute('aria-hidden','true');
  for(var i=0;i<46;i++){var s=document.createElement('span'),z=rnd(1,2.6);s.className='star';s.style.cssText='left:'+rnd(0,100)+'%;top:'+rnd(0,100)+'%;width:'+z+'px;height:'+z+'px;--d:'+rnd(2.6,6)+'s;--dl:-'+rnd(0,6)+'s';sky.appendChild(s)}
  for(i=0;i<9;i++){var p=document.createElement('span');p.className='petal';p.style.cssText='--x:'+rnd(0,100)+'%;--dx:'+rnd(-120,120)+'px;--d:'+rnd(16,28)+'s;--dl:-'+rnd(0,24)+'s;--c:'+pick(['#C98291','#F6E4E5','#F5E5A8'])+';opacity:.38';sky.appendChild(p)}
  document.body.prepend(sky);

  /* confetti (tiny canvas, removes itself) */
  window.burst=function(x,y,n){
    if(!on())return;n=n||90;
    var c=document.createElement('canvas');c.className='confetti';c.setAttribute('aria-hidden','true');
    var W=c.width=innerWidth,H=c.height=innerHeight,g=c.getContext('2d');document.body.appendChild(c);
    var ps=[];for(var k=0;k<n;k++){var a=rnd(-Math.PI,0),v=rnd(5,15);ps.push({x:x,y:y,vx:Math.cos(a)*v*rnd(.5,1.2),vy:Math.sin(a)*v-rnd(0,4),w:rnd(6,11),h:rnd(4,8),r:rnd(0,6),vr:rnd(-.3,.3),c:pick(COL),round:Math.random()<.35})}
    (function f(){g.clearRect(0,0,W,H);var alive=0;
      ps.forEach(function(q){q.vy+=.34;q.vx*=.992;q.x+=q.vx;q.y+=q.vy;q.r+=q.vr;if(q.y<H+20){alive++;g.save();g.translate(q.x,q.y);g.rotate(q.r);g.fillStyle=q.c;if(q.round){g.beginPath();g.arc(0,0,q.w/2.2,0,7);g.fill()}else g.fillRect(-q.w/2,-q.h/2,q.w,q.h);g.restore()}});
      if(alive&&on())requestAnimationFrame(f);else c.remove()})();
  };
  var rain=function(){var t=0,iv=setInterval(function(){window.burst(rnd(innerWidth*.2,innerWidth*.8),innerHeight*.35,40);if(++t>3)clearInterval(iv)},320)};

  /* cursor sparkle trail + tap hearts */
  if(fine){var last=0;document.addEventListener('mousemove',function(e){
    var t=performance.now();if(!on()||t-last<55)return;last=t;
    var s=document.createElement('span');s.className='spark';s.textContent=Math.random()<.5?'✦':'✧';
    s.style.cssText='left:'+e.clientX+'px;top:'+e.clientY+'px;--c:'+pick(COL)+';--dx:'+rnd(-14,14)+'px';document.body.appendChild(s);setTimeout(function(){s.remove()},950)})}
  document.addEventListener('click',function(e){
    if(!on()||e.target.closest('a,button,input,textarea,select,summary,label,.env,[role=button]'))return;
    for(var k=0;k<5;k++){var h=document.createElement('span');h.className='heart';h.textContent=pick(['♡','♥','✿','✦']);
      h.style.cssText='left:'+e.clientX+'px;top:'+e.clientY+'px;--dx:'+rnd(-60,60)+'px;--r:'+rnd(-40,40)+'deg;--s:'+rnd(14,26)+'px;--dl:'+k*.06+'s;color:'+pick(COL);document.body.appendChild(h);(function(n){setTimeout(function(){n.remove()},1800)})(h)}
  });

  /* envelope opens: confetti from the envelope */
  document.addEventListener('click',function(e){var env=e.target.closest('.env');if(!env||env.classList.contains('open'))return;
    var r=env.getBoundingClientRect();setTimeout(function(){window.burst(r.left+r.width/2,r.top+r.height*.4,env.closest('.view')?120:60)},900)});

  /* card tilt */
  document.addEventListener('mousemove',function(e){if(!fine||!on())return;
    var c=e.target.closest&&e.target.closest('.tcard'),t=c&&c.querySelector('.thumb');
    if(!t)return;var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    t.style.transform='perspective(700px) rotateY('+x*12+'deg) rotateX('+(-y*12)+'deg) translateY(-4px)'});
  document.addEventListener('mouseout',function(e){var c=e.target.closest&&e.target.closest('.tcard');if(c&&!c.contains(e.relatedTarget)){var t=c.querySelector('.thumb');if(t)t.style.transform=''}});
  /* hero parallax */
  document.addEventListener('mousemove',function(e){if(!fine||!on())return;var st=document.querySelector('.stage-h');if(!st)return;
    var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
    Array.prototype.forEach.call(st.children,function(el,i){el.style.marginLeft=(x*(10+i*5))+'px';el.style.marginTop=(y*(8+i*4))+'px'})});

  /* per-render enhancements: headline entrance, scroll reveals, success confetti */
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12}):null;
  var done=false;
  function enhance(){
    var h=document.getElementById('h1');
    if(h&&!h.querySelector('.hw')){var t=h.textContent;h.setAttribute('aria-label',t);h.textContent='';
      t.split(' ').forEach(function(w,i,a){var s=document.createElement('span');s.className='hw';s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i);s.textContent=w;h.appendChild(s);if(i<a.length-1)h.appendChild(document.createTextNode(' '))})}
    if(io)Array.prototype.forEach.call(document.querySelectorAll('main .sec-head,main .tcard,main .cta-band,main .strip figure,main .step,main .steps3>*'),function(el,i){
      if(el.classList.contains('rv'))return;var b=el.getBoundingClientRect();if(b.top<innerHeight*.9)return;
      el.classList.add('rv');el.style.setProperty('--rd',(i%4)*90+'ms');io.observe(el)});
    var m=document.getElementById('main'),txt=m?m.textContent:'';
    if(/Your little something is ready/i.test(txt)){if(!done){done=true;rain()}}else done=false;
  }
  var q=0,main=document.getElementById('main');
  if(main)new MutationObserver(function(){cancelAnimationFrame(q);q=requestAnimationFrame(enhance)}).observe(main,{childList:true});
  enhance();setTimeout(function(){Array.prototype.forEach.call(document.querySelectorAll('.rv:not(.in)'),function(el){var b=el.getBoundingClientRect();if(b.top<innerHeight)el.classList.add('in')})},1500);
  addEventListener('scroll',function(){/* failsafe so nothing stays hidden */},{passive:true});

  /* the Motion switch: lets anyone turn the extras off */
  var b=document.createElement('button');b.type='button';b.className='fxbtn';b.setAttribute('aria-pressed',String(on()));
  var lab=function(){b.textContent=on()?'✦ Motion: on':'✦ Motion: off';b.setAttribute('aria-pressed',String(on()))};lab();
  b.onclick=function(){root.classList.toggle('fx-off');try{localStorage.setItem('miag:fx',on()?'on':'off')}catch(e){}lab()};
  document.body.appendChild(b);
})();
