'use strict';
/* theme decor + gift renderer */
/* ---------- decor per theme ---------- */
function decor(t){
  var d='';
  if(t==='love'){
    d=sv('0 0 400 24','<rect width="400" height="24" fill="#C98291"/><path d="M0 12H400" stroke="#FFF9F3" stroke-width="1.5" stroke-dasharray="7 6" opacity=".8"/>','top:0;left:0;width:100%;height:22px','preserveAspectRatio="none"')+
      sv('0 0 60 60','<path d="'+HEART+'" fill="#C98291" opacity=".4"/>','right:5%;bottom:3rem;width:48px;transform:rotate(12deg)')+
      sv('0 0 60 60','<path d="'+HEART+'" fill="#C98291" opacity=".25"/>','left:6%;bottom:6rem;width:30px;transform:rotate(-14deg)')+
      sv('0 0 60 60','<circle cx="30" cy="30" r="26" fill="#8a3f55"/><circle cx="30" cy="30" r="20" fill="none" stroke="#C98291" stroke-width="1.5"/><path d="'+STAR4+'" fill="#F6E4E5" transform="translate(15 15) scale(.5)"/>','left:50%;top:3.6rem;width:42px;margin-left:-21px;opacity:.9');
  } else if(t==='scrap'){
    d=sv('0 0 100 28','<rect width="100" height="28" fill="#F5E5A8" opacity=".9"/>','top:.6rem;left:-1.4rem;width:96px;transform:rotate(-34deg)')+
      sv('0 0 80 16','<path d="M4 8q10-8 20 0t20 0t20 0t12 0" stroke="#C98291" fill="none" stroke-width="3" stroke-linecap="round"/>','top:1.4rem;right:1.2rem;width:90px;transform:rotate(8deg)')+
      sv('0 0 60 60','<path d="'+STAR4+'" fill="#F5E5A8" stroke="#713D52" stroke-width="2.5" stroke-linejoin="round"/>','left:4%;bottom:5rem;width:40px;transform:rotate(-12deg)')+
      sv('0 0 40 70','<path d="M14 62V16a8 8 0 0 1 16 0v38a5 5 0 0 1-10 0V20" fill="none" stroke="#9a8f96" stroke-width="2.5" stroke-linecap="round"/>','right:4%;bottom:3rem;width:26px;transform:rotate(14deg)')+
      sv('0 0 60 60',daisy('#F6E4E5','#C98291'),'right:6%;top:42%;width:46px;transform:rotate(20deg);opacity:.9');
  } else if(t==='garden'){
    d=sv('0 0 60 60',daisy('#F6E4E5','#F5E5A8'),'top:1rem;left:-.8rem;width:84px;transform:rotate(-14deg);opacity:.95')+
      sv('0 0 60 60',sprig('#8aa57e'),'top:1rem;right:.6rem;width:70px;transform:rotate(18deg);opacity:.9')+
      sv('0 0 60 60',sprig('#8aa57e'),'bottom:1rem;left:.4rem;width:80px;transform:rotate(-20deg) scaleX(-1);opacity:.85')+
      sv('0 0 60 60',daisy('#fff','#C98291'),'bottom:1.2rem;right:-.6rem;width:96px;transform:rotate(10deg)')+
      sv('0 0 60 60',daisy('#F5E5A8','#C98291'),'bottom:5.5rem;right:3.4rem;width:44px;transform:rotate(-8deg)');
  } else if(t==='midnight'){
    d=sv('0 0 60 60','<path d="'+MOON+'" fill="#F5E5A8"/>','top:1.2rem;right:1.4rem;width:64px;filter:drop-shadow(0 0 14px rgba(245,229,168,.6))')+
      sv('0 0 60 60','<path d="'+STAR4+'" fill="#F5E5A8"/>','top:6rem;left:8%;width:20px','class="d tw"').replace('class="d" ','')+
      sv('0 0 60 60','<path d="'+STAR4+'" fill="#fff"/>','top:14rem;right:12%;width:14px')+
      sv('0 0 60 60','<path d="'+STAR4+'" fill="#F5E5A8"/>','bottom:8rem;left:6%;width:16px')+
      sv('0 0 60 60','<path d="'+STAR4+'" fill="#fff"/>','bottom:4rem;right:9%;width:22px');
  } else if(t==='postcard'){
    d=sv('0 0 70 86','<rect width="70" height="86" fill="#F6EEDC"/><rect x="4" y="4" width="62" height="78" fill="none" stroke="#E9DEC5" stroke-width="7" stroke-dasharray="4 4"/><rect x="11" y="11" width="48" height="64" fill="#C8D5BE" stroke="#4C6A86" stroke-width="1.2"/><circle cx="35" cy="34" r="10" fill="#F5E5A8" stroke="#A8453D" stroke-width="1.2"/><path d="M11 62c10-12 20-12 24-4s14 4 24-6v23H11z" fill="#A8453D" opacity=".7"/><text x="35" y="72" font-size="7" text-anchor="middle" fill="#3b3226" font-family="monospace">POST</text>','top:1.4rem;right:1.2rem;width:62px;transform:rotate(4deg);filter:drop-shadow(0 2px 3px rgba(0,0,0,.25))')+
      sv('0 0 90 60','<circle cx="30" cy="30" r="22" fill="none" stroke="#3b3226" stroke-width="1.5"/><circle cx="30" cy="30" r="15" fill="none" stroke="#3b3226" stroke-width="1"/><path d="M52 18q8-6 16 0t16 0M52 28q8-6 16 0t16 0M52 38q8-6 16 0t16 0" fill="none" stroke="#3b3226" stroke-width="1.5"/>','top:1.6rem;right:5.2rem;width:100px;opacity:.38;transform:rotate(-8deg)');
  } else if(t==='confetti'){
    d=sv('0 0 60 82',balloon('#C98291','#fff'),'top:.6rem;left:.4rem;width:58px;transform:rotate(-10deg)')+
      sv('0 0 60 82',balloon('#F5E5A8','#fff'),'top:1.6rem;left:3.6rem;width:46px;transform:rotate(8deg)')+
      sv('0 0 60 82',balloon('#C8D5BE','#fff'),'top:.8rem;right:.8rem;width:54px;transform:rotate(12deg)')+
      sv('0 0 60 60','<path d="'+STAR4+'" fill="#F5E5A8" stroke="#713D52" stroke-width="2.5" stroke-linejoin="round"/>','bottom:4rem;right:6%;width:38px;transform:rotate(12deg)')+
      sv('0 0 60 20','<rect x="2" y="4" width="14" height="6" fill="#C98291" transform="rotate(20 8 7)"/><rect x="24" y="8" width="14" height="6" fill="#C8D5BE" transform="rotate(-25 30 11)"/><rect x="44" y="3" width="12" height="6" fill="#F5E5A8" transform="rotate(35 50 6)"/>','bottom:3rem;left:6%;width:70px');
  }
  return '<div class="g-decor" aria-hidden="true">'+d+'</div>';
}

/* ---------- gift renderer ---------- */
function giftHTML(g,o){
  o=o||{};var ghost=!!o.ghost,tag=o.tag||'h2',occ=OCCMAP[g.occasion]||OCCMAP.other,x=g.x;
  function v(t,fb){t=(t||'').trim();return t?{t:t,gh:false}:(ghost?{t:fb,gh:true}:{t:'',gh:false})}
  var to=v(g.to,'Someone special'),ti=v(g.title,occ.title),from=v(g.from,'Your name'),msg=v(g.message,subst(occ.s[0],{to:'Someone special'}));
  var closing=(g.closing||'').trim()||'Made with a little love, just for you.';
  var h='<div class="gift t-'+g.theme+(o.view?' in-view':'')+'">'+decor(g.theme)+'<div class="g-wrap">';
  h+='<header><p class="g-kicker'+(to.gh?' ghostt':'')+'">For '+esc(to.t||'you')+'</p><'+tag+' class="g-title'+(ti.gh?' ghostt':'')+'"'+(tag==='h1'?' id="g-h1" tabindex="-1"':'')+'>'+esc(ti.t||occ.title)+'</'+tag+'></header>';
  h+='<section class="g-card">'+(x.sticker.on?'<span class="g-sticker">'+stickerSVG(x.sticker.kind)+'</span>':'')+'<div class="g-msg'+(msg.gh?' ghostt':'')+'">'+paras(msg.t)+'</div>'+(from.t?'<p class="g-from'+(from.gh?' ghostt':'')+'">With love, '+esc(from.t)+'</p>':'')+'</section>';
  var cap=x.caption.on?v(x.caption.text,'A moment worth keeping'):{t:''};
  if(g.photo){h+='<figure class="g-pol" style="margin-top:0"><img src="'+esc(g.photo)+'" alt="A photo chosen for you">'+(cap.t?'<figcaption>'+esc(cap.t)+'</figcaption>':'')+'</figure>'}
  else if(cap.t){h+='<p class="g-from'+(cap.gh?' ghostt':'')+'" style="text-align:center;margin:0 0 1.8rem">'+esc(cap.t)+'</p>'}
  if(x.gallery.on){
    if(g.gallery.length)h+='<div class="g-gal">'+g.gallery.map(function(p){return '<figure class="g-pol"><img src="'+esc(p)+'" alt="A photo from the gallery"></figure>'}).join('')+'</div>';
    else if(ghost)h+='<div class="g-gal" aria-hidden="true">'+[1,2].map(function(){return '<figure class="g-pol"><div class="phold">Your photo</div></figure>'}).join('')+'</div>';
  }
  var n2=x.note2.on?v(x.note2.text,'A second note can go here, for the things that didn\'t fit in the first.'):{t:''};
  if(n2.t)h+='<section class="g-card"><div class="g-msg'+(n2.gh?' ghostt':'')+'">'+paras(n2.t)+'</div></section>';
  if(x.appreciate.on){
    var items=x.appreciate.items.map(function(i){return i.trim()}).filter(Boolean),gh=false;
    if(!items.length&&ghost){items=['The way you listen','Your terrible jokes','How you show up'];gh=true}
    if(items.length)h+='<section class="g-card"><h3 class="g-h">Things I appreciate about you</h3><ul class="g-list'+(gh?' ghostt':'')+'">'+items.map(function(i){return '<li>'+esc(i)+'</li>'}).join('')+'</ul></section>';
  }
  var sm=x.smile.on?v(x.smile.text,'Remember the time we couldn\'t stop laughing? Come back to that.'):{t:''};
  if(sm.t)h+='<details class="smile"><summary>Open when you need a smile</summary><p'+(sm.gh?' class="ghostt"':'')+'>'+esc(sm.t)+'</p></details>';
  var se=x.secret.on?v(x.secret.text,'A hidden message waits here.'):{t:''};
  if(se.t)h+='<section class="secret"><button type="button" class="sealbtn" data-action="reveal-secret" aria-expanded="false"><svg viewBox="0 0 96 70" aria-hidden="true"><rect x="2" y="8" width="92" height="58" rx="4" fill="var(--g-paper)" stroke="var(--g-accent)" stroke-width="2"/><path d="M2 10l46 32 46-32" fill="none" stroke="var(--g-accent)" stroke-width="2"/><circle cx="48" cy="40" r="9" fill="var(--g-accent)"/><path d="M48 34l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" fill="var(--g-bg)"/></svg><span>A hidden message. Tap to open.</span></button><div class="secret-text'+(se.gh?' ghostt':'')+'" hidden>'+paras(se.t)+'</div></section>';
  h+='<p class="g-close">'+esc(closing)+'</p>';
  if(o.view)h+='<div class="g-final"><p>Someone made this just for you.</p>'+(o.preview?'':'<a href="#/">Make a little something for someone you love</a>')+'</div>';
  h+='</div></div>';
  return h;
}
function thumbHTML(g,cls){return '<div class="thumb '+(cls||'')+'" aria-hidden="true"><div class="thumb-in">'+giftHTML(g,{ghost:true,tag:'div'})+'</div></div>'}
function fitThumbs(){$$('.thumb').forEach(function(t){var i=$('.thumb-in',t);if(!i||!t.clientWidth)return;var s=t.clientWidth/520;i.style.transform='scale('+s+')'})}
