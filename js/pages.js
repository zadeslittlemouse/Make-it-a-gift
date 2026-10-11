'use strict';
/* home, explore, how it works */
/* ---------- views ---------- */
function heroStage(){
  var scene1='<svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="#F6E4E5"/><circle cx="68" cy="34" r="14" fill="#F5E5A8"/><path d="M0 74c18-22 34-22 50-6s34 8 50-8v40H0z" fill="#C8D5BE"/><path d="M0 86c20-14 40-12 60-2s30 4 40-4v20H0z" fill="#C98291" opacity=".75"/></svg>';
  var scene2='<svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="#F5E5A8" opacity=".7"/><path d="M26 44h42v18a21 21 0 0 1-42 0z" fill="#fff" stroke="#713D52" stroke-width="2.5"/><path d="M68 48h6a8 8 0 0 1 0 16h-6" fill="none" stroke="#713D52" stroke-width="2.5"/><path d="M38 28c-4 6 4 8 0 14M50 28c-4 6 4 8 0 14" stroke="#C98291" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>';
  var cardArt='<svg viewBox="0 0 80 60" style="width:70%;margin:0 auto" aria-hidden="true"><g transform="translate(14 4) scale(.7)">'+daisy('#F6E4E5','#F5E5A8')+'</g><g transform="translate(36 12) scale(.5)">'+daisy('#C8D5BE','#C98291')+'</g><path d="M30 44c8-4 14-4 22 0" stroke="#713D52" fill="none" stroke-width="1.5"/></svg>';
  return '<div class="stage-h"><div class="hc-card">'+cardArt+'<p class="hand">Happy Birthday,</p><h3>Maya</h3></div>'+
   '<div class="pol hp1">'+scene1+'</div><div class="pol hp2">'+scene2+'</div>'+
   '<svg class="clip" viewBox="0 0 30 70" aria-hidden="true"><path d="M10 60V14a7 7 0 0 1 14 0v36a4.5 4.5 0 0 1-9 0V18" fill="none" stroke="#9a8f96" stroke-width="2.4" stroke-linecap="round"/></svg>'+
   '<svg class="st1" viewBox="0 0 60 60" aria-hidden="true"><path d="'+STAR4+'" fill="#F5E5A8" stroke="#713D52" stroke-width="2.5" stroke-linejoin="round"/></svg>'+
   '<div class="hero-env">'+envHTML({action:'hero-env',label:'Open the envelope to read a preview message',expanded:true,paper:'Hey you, I just wanted to remind you how much you mean to me…<br><span style="font-size:.9em;opacity:.8">xo, Sam</span>'})+'</div>'+
   '<p class="slip" aria-hidden="true">made just for you ♡</p>'+
   '<p class="cap-h">Tap the envelope to peek inside.</p></div>';
}
function tplCard(t,cap){
  return '<article class="tcard">'+thumbHTML(tplGift(t))+'<h3>'+esc(t.name)+'</h3>'+(cap?'<p class="muted" style="margin:0">'+esc(cap)+'</p>':'')+'<div class="tags"><span class="tag">'+esc(OCCMAP[t.occ].label)+'</span><span class="tag">'+esc(THMAP[t.theme].name)+'</span><span class="tag">'+esc(t.rec)+'</span><span class="tag">'+esc(t.style)+'</span></div>'+
   '<div class="acts"><a class="btn primary small" href="#/create?tpl='+t.id+'">Use this template</a><button type="button" class="btn small" data-action="prev-tpl" data-id="'+t.id+'">Preview</button></div></article>';
}
function home(){
  var sample=tplGift(TPMAP.t2);
  var strip=THEMES.map(function(t){var g=tplGift(TPMAP.t2);g.theme=t.id;g.x.sticker.on=false;return '<figure style="margin:0">'+thumbHTML(g)+'<figcaption>'+esc(t.name.replace('The ',''))+'</figcaption></figure>'}).join('');
  return '<div class="wrap"><section class="hero" aria-labelledby="h1"><div><p class="eyebrow">A LITTLE INTERNET MAGIC</p><h1 id="h1">Someone deserves a little something.</h1>'+
   '<p class="lede">Turn your words, memories, and favorite little things into a digital gift they\'ll want to keep.</p>'+
   '<div class="cta-row"><a class="btn primary" href="#/create?new=1">Create a Gift →</a><button type="button" class="btn" data-action="scroll-make">See What You Can Make</button></div>'+
   '<p style="margin:-.6rem 0 1.4rem"><button type="button" class="btn quiet small" data-action="open-sample">Or open a sample gift ↗</button></p>'+
   '<ul class="benefits"><li>Made in minutes.</li><li>Personal in every detail.</li><li>Easy to share.</li></ul></div>'+heroStage()+'</section></div>'+
   '<section class="section blushbg" id="make" tabindex="-1" aria-labelledby="mk"><div class="wrap"><div class="sec-head"><h2 id="mk">Six ways to say it</h2><p class="lead">Pick a style and your message becomes a real little page. Here is the same note in every one.</p></div><div class="strip">'+strip+'</div></div></section>'+
   '<section class="section" aria-labelledby="ft"><div class="wrap"><div class="sec-head"><h2 id="ft">A few little things you can make</h2><p class="lead">Open any example to see exactly what the recipient sees, then make it your own.</p></div><div class="grid3">'+[[TPMAP.t2,'A gift for your best friend'],[TPMAP.t5,'A letter for someone far away'],[TPMAP.t9,'A tiny surprise for no particular reason']].map(function(a){return tplCard(a[0],a[1])}).join('')+'</div><p style="margin-top:2rem"><a class="btn" href="#/explore">Explore all gifts</a></p></div></section>'+
   '<section class="section" aria-labelledby="hw"><div class="wrap"><div class="cta-band"><h2 id="hw">Choose a style. Make it personal. Send a smile.</h2><p class="lead" style="max-width:34rem">No account, no design skills, no cost. Most gifts take two to five minutes.</p><div class="acts" style="justify-content:center"><a class="btn primary" href="#/create?new=1">Create a Gift →</a><a class="btn" href="#/how">How it works</a></div></div></div></section>';
}
var EX={occ:'',theme:'',rec:'',style:''};
function explore(){
  function sel(id,label,opts,val){return '<div><label for="'+id+'">'+label+'</label><select id="'+id+'" data-filter="'+id.slice(2)+'"><option value="">All</option>'+opts.map(function(o){return '<option value="'+esc(o[0])+'"'+(val===o[0]?' selected':'')+'>'+esc(o[1])+'</option>'}).join('')+'</select></div>'}
  return '<section class="wrap page"><header class="page-head"><h1>Explore gifts</h1><p class="lead">Start from a finished idea. Each template opens the editor with its occasion, style and extras ready for your words.</p></header>'+
   '<div class="filters">'+sel('f-occ','Occasion',OCC.map(function(o){return [o.id,o.label]}),EX.occ)+sel('f-theme','Visual theme',THEMES.map(function(t){return [t.id,t.name]}),EX.theme)+
   sel('f-rec','Recipient',['Friend','Partner','Family','Anyone'].map(function(r){return [r,r]}),EX.rec)+sel('f-style','Message style',['Heartfelt','Playful','Short and sweet','Reflective'].map(function(r){return [r,r]}),EX.style)+'</div>'+
   '<p id="xcount" class="muted" aria-live="polite"></p><div id="xres" class="grid3"></div></section>';
}
function updateExplore(){
  var res=$('#xres');if(!res)return;
  var list=TPLS.filter(function(t){return (!EX.occ||t.occ===EX.occ)&&(!EX.theme||t.theme===EX.theme)&&(!EX.rec||t.rec===EX.rec)&&(!EX.style||t.style===EX.style)});
  $('#xcount').textContent=list.length+(list.length===1?' gift idea':' gift ideas');
  res.innerHTML=list.length?list.map(function(t){return tplCard(t)}).join(''):'<div class="empty"><h3>No templates match yet</h3><p>Try fewer filters, or start from a blank gift.</p><div class="acts" style="justify-content:center"><button type="button" class="btn" data-action="clear-filters">Clear filters</button><a class="btn primary" href="#/create?new=1">Create a Gift</a></div></div>';
  fitThumbs();
}
function how(){
  var tg=[ 'love','scrap','midnight'].map(function(t){var g=tplGift(TPMAP.t2);g.theme=t;g.x.sticker.on=false;return thumbHTML(g)}).join('');
  return '<section class="wrap page"><header class="page-head"><h1>How it works</h1><p class="lead">Three simple steps, and nobody needs to sign up for anything.</p></header>'+
   '<div class="steps3"><div class="s3"><div class="vis"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;width:100%">'+tg+'</div></div><h2>1. Choose a style</h2><p>Pick the look that fits your person: a love letter, a scrapbook, a garden, a midnight note, a retro postcard or a confetti burst.</p></div>'+
   '<div class="s3"><div class="vis"><div class="mock" aria-hidden="true"><i></i><i></i><i></i><i></i><span class="hand" style="font-size:1.4rem;color:var(--berry)">Hey you, I just wanted to remind you…</span></div></div><h2>2. Make it personal</h2><p>Add a message, a photo, a list of things you appreciate, a hidden note, or a sticker. Skip anything you like.</p></div>'+
   '<div class="s3"><div class="vis"><div style="width:min(240px,100%);display:grid;gap:1rem;justify-items:center">'+envHTML({action:'noop',label:'Decorative envelope',style:'width:100%;pointer-events:none'})+'<span class="chiplink">make-it-a-gift/#/gift/…</span></div></div><h2>3. Send a smile</h2><p>Copy the link and send it however you like. We never message anyone for you. Opening the link shows only the gift.</p></div></div>'+
   '<p style="margin-top:3rem"><a class="btn primary" href="#/create?new=1">Create a Gift →</a></p></section>';
}
