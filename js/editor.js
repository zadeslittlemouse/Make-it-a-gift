'use strict';
/* editor, success page, my creations */
/* editor */
var G=blank(),step=1,reach=1,done=null;
function setPath(o,path,val){var p=path.split('.'),i;for(i=0;i<p.length-1;i++)o=o[p[i]];o[p[p.length-1]]=val}
function getPath(o,path){return path.split('.').reduce(function(a,k){return a==null?a:a[k]},o)}
function validate(upTo){
  var e={},m;
  if(!G.occasion)e.occasion='Pick an occasion to continue.';
  if(upTo>=2&&!G.theme)e.theme='Pick a style to continue.';
  if(upTo>=3){
    if(!G.to.trim())e.to='Who is this for? A name or nickname is perfect.';
    if(!G.title.trim())e.title='Give your gift a title.';
    m=G.message.trim().length;if(m<10)e.message=m?'A few more words, please. At least 10 characters.':'Write a little message for them.';
    if(!G.from.trim())e.from='Add your name or nickname so they know who it\'s from.';
  }
  return e;
}
function showErrs(e,ids){var first=null;ids.forEach(function(k){var el=$('#e-'+k),inp=$('#f-'+k);if(!el)return;if(e[k]){el.textContent=e[k];el.hidden=false;if(inp)inp.setAttribute('aria-invalid','true');if(!first)first=inp||el}else{el.hidden=true;if(inp)inp.removeAttribute('aria-invalid')}});if(first&&first.focus)first.focus();return !!first}
function stepTitle(t,sub){return '<h1 class="stepc" id="stepc" tabindex="-1">'+t+'</h1><p class="lead">'+sub+'</p>'}
function s1(){
  var occ=OCCMAP[G.occasion];
  return stepTitle('What\'s the occasion?','Pick the one that fits best. It shapes the suggestions you\'ll see next.')+
  '<div class="occ-grid" role="group" aria-label="Occasion">'+OCC.map(function(o){return '<button type="button" class="pick" data-action="pick-occ" data-id="'+o.id+'" aria-pressed="'+(G.occasion===o.id)+'">'+icon(o.id)+'<b>'+esc(o.label)+'</b><span class="d">'+esc(o.desc)+'</span></button>'}).join('')+'</div>'+
  '<p class="err" id="e-occasion" role="alert" hidden></p>'+
  (occ?'<div class="note" id="occ-note"><strong>A taste of what you might write:</strong> <span class="hand" style="font-size:1.3rem">'+esc(occ.ph)+'</span></div>':'');
}
function s2(){
  var sug=(OCCMAP[G.occasion]||{}).theme;
  return stepTitle('Choose a gift style','Every style changes the whole look of the finished gift. You can switch any time.')+
  '<div class="theme-grid" role="group" aria-label="Gift style">'+THEMES.map(function(t){
    var g=JSON.parse(JSON.stringify(G));g.theme=t.id;g.x.sticker.on=false;
    return '<button type="button" class="tpick" data-action="pick-theme" data-id="'+t.id+'" aria-pressed="'+(G.theme===t.id)+'">'+(sug===t.id?'<span class="sug">Suggested</span>':'')+thumbHTML(g,'sq')+'<b>'+esc(t.name)+'</b><span class="d">'+esc(t.desc)+'</span></button>'}).join('')+'</div><p class="err" id="e-theme" role="alert" hidden></p>';
}
function fld(id,label,val,max,ph,o){
  o=o||{};var tagN=o.area?'textarea':'input';
  return '<div class="field"><div class="row"><label for="f-'+id+'">'+label+(o.opt?' (optional)':'')+'</label><span class="cnt" data-cnt="'+(o.path||id)+'">'+val.length+' / '+max+'</span></div>'+
  '<'+tagN+' id="f-'+id+'" data-bind="'+(o.path||id)+'" maxlength="'+max+'" placeholder="'+esc(ph)+'" aria-describedby="e-'+id+(o.hint?' h-'+id:'')+'"'+(o.area?' rows="'+(o.rows||7)+'">'+esc(val)+'</textarea>':' value="'+esc(val)+'">')+
  (o.hint?'<p class="hint" id="h-'+id+'">'+o.hint+'</p>':'')+'<p class="err" id="e-'+id+'" role="alert" hidden></p></div>';
}
function s3(){
  var occ=OCCMAP[G.occasion]||OCCMAP.other;
  return stepTitle('Make it personal','Write the way you talk. Short and honest beats polished.')+
  '<div class="two">'+fld('to','Recipient\'s name or nickname',G.to,LIM.to,'Maya')+fld('from','Your name or nickname',G.from,LIM.from,'Sam')+'</div>'+
  fld('title','Gift title',G.title,LIM.title,occ.title)+
  fld('message','Personal message',G.message,LIM.message,occ.ph,{area:true,rows:9,hint:'Anyone with your gift link can read this, and links can show up in browser history, chat previews and screenshots. Please keep passwords, addresses and other private details out.'})+
  '<div class="helper"><button type="button" class="btn small" data-action="helper" aria-expanded="'+(!!helperOpen)+'" aria-controls="helper-box">Need a nudge?</button><div id="helper-box"'+(helperOpen?'':' hidden')+'><p class="hint">Built-in starters for this occasion. No AI service is connected. Tap one to add it, then make it yours.</p>'+
  occ.s.map(function(s,i){return '<button type="button" class="s" data-action="use-starter" data-i="'+i+'">'+esc(subst(s,G))+'</button>'}).join('')+'</div></div>'+
  '<div class="field"><span class="lbl">Photo (optional)</span><div class="up"><input type="file" id="f-photo" class="sr" accept="image/jpeg,image/png,image/webp"><label for="f-photo" class="btn small">'+(G.photo?'Change photo':'Add a photo')+'</label><span id="photo-ui">'+photoUI()+'</span></div><p class="hint">JPG, PNG or WebP up to 6 MB. It is shrunk in your browser and stays on this device. Photos won\'t appear when you share the gift link; use Download as Image to share them.</p><p class="err" id="e-photo" role="alert" hidden></p></div>'+
  fld('closing','Closing line',G.closing,LIM.closing,'Made with a little love, just for you.',{opt:true,hint:'Shown at the very end of the gift.'})+
  '<div class="field"><label style="display:flex;gap:.7rem;align-items:center;cursor:pointer;font-weight:400"><input type="checkbox" data-bindc="music"'+(G.music?' checked':'')+'> Offer soft background music (off until the recipient turns it on)</label></div>';
}
var helperOpen=false;
function photoUI(){return G.photo?'<img class="th" src="'+G.photo+'" alt="Selected photo preview"> <button type="button" class="btn quiet small" data-action="rm-photo">Remove</button>':'<span class="hint" style="margin:0">No photo yet.</span>'}
function galUI(){return G.gallery.map(function(p,i){return '<span style="position:relative;display:inline-block"><img class="th" src="'+p+'" alt="Gallery photo '+(i+1)+'"> <button type="button" class="btn quiet small" data-action="rm-gal" data-i="'+i+'">Remove</button></span>'}).join('')}
function xcard(k,title,desc,body){
  var on=G.x[k].on;
  return '<div class="xcard'+(on?' on':'')+'"><div class="xhead"><input type="checkbox" id="x-'+k+'" data-bindc="x.'+k+'.on"'+(on?' checked':'')+' aria-controls="xb-'+k+'"><label for="x-'+k+'">'+title+'<span class="d">'+desc+'</span></label></div>'+(on?'<div class="xbody" id="xb-'+k+'">'+body+'</div>':'')+'</div>';
}
function s4(){
  var x=G.x,ta=function(k,max,ph,label){return '<label for="xi-'+k+'">'+label+'</label><textarea id="xi-'+k+'" rows="4" maxlength="'+max+'" data-bind="x.'+k+'.text" placeholder="'+esc(ph)+'">'+esc(x[k].text)+'</textarea>'};
  return stepTitle('Add little extras','All optional. The simplest gift already looks complete.')+'<p><button type="button" class="btn small" data-action="skip-extras">Skip extras for now</button></p>'+
  (G.x.note2.on||G.x.caption.on||G.x.secret.on||G.x.smile.on||G.x.appreciate.on||G.x.gallery.on||G.x.sticker.on?'':'')+
  xcard('note2','A second letter or note','A little more room for what didn\'t fit.',ta('note2',LIM.note,'One more thing I wanted to say…','Second note'))+
  xcard('caption','A memory caption','A handwritten line under your photo.','<label for="xi-caption">Caption</label><input id="xi-caption" maxlength="'+LIM.cap+'" data-bind="x.caption.text" value="'+esc(x.caption.text)+'" placeholder="The day we got lost and loved it">')+
  xcard('gallery','A photo gallery','Up to four more photos, shown as polaroids.','<div class="up"><input type="file" id="f-gal" class="sr" accept="image/jpeg,image/png,image/webp" multiple><label for="f-gal" class="btn small">Add photos</label><span id="gal-ui">'+galUI()+'</span></div><p class="hint">Up to 4 photos. Photos stay on this device and are not included in the shareable link.</p><p class="err" id="e-gal" role="alert" hidden></p>')+
  xcard('sticker','A decorative sticker','Stick one on the corner of your message.','<div class="stk" role="group" aria-label="Sticker">'+Object.keys(STICKERS).map(function(k){return '<button type="button" data-action="sticker" data-k="'+k+'" aria-pressed="'+(x.sticker.kind===k)+'" aria-label="'+STK_NAMES[k]+' sticker">'+stickerSVG(k)+'</button>'}).join('')+'</div>')+
  xcard('secret','A hidden message','Revealed when they tap a sealed envelope.',ta('secret',LIM.secret,'Something I\'ve never said out loud…','Hidden message'))+
  xcard('appreciate','Things I appreciate about you','A short list, one line each.','<div id="ap-list">'+apList()+'</div>'+(x.appreciate.items.length<6?'<button type="button" class="btn small" data-action="add-item">Add a line</button>':''))+
  xcard('smile','Open when you need a smile','A folded note they can open on a rough day.',ta('smile',LIM.smile,'Remember the time we…','Note'));
}
function apList(){return G.x.appreciate.items.map(function(v,i){return '<div class="li-row"><label class="sr" for="ap-'+i+'">Line '+(i+1)+'</label><input id="ap-'+i+'" maxlength="'+LIM.item+'" data-bind="x.appreciate.items.'+i+'" value="'+esc(v)+'" placeholder="The way you laugh at your own jokes"><button type="button" class="btn quiet small" data-action="del-item" data-i="'+i+'" aria-label="Remove line '+(i+1)+'">Remove</button></div>'}).join('')}
function s5(){
  return '<div class="s5-wrap">'+stepTitle('Here\'s your gift','Check it over. Nothing is saved or shared until you choose.')+
  '<div class="s5-actions"><button type="button" class="btn" data-action="goto" data-s="3">Edit details</button><button type="button" class="btn" data-action="goto" data-s="2">Change theme</button><button type="button" class="btn" data-action="fs-preview">Preview full screen</button><button type="button" class="btn quiet" data-action="save-draft">Save draft</button><button type="button" class="btn primary" data-action="create-gift" id="create-btn">Create my gift</button></div>'+
  '<div class="pv-frame"><div class="pv-scroll" style="max-height:none" id="pv">'+giftHTML(G,{ghost:true,tag:'h2'})+'</div></div></div>';
}
function editor(){
  var names=['Occasion','Style','Personalize','Little extras','Preview'];
  var prog='<ol class="prog" aria-label="Progress">'+names.map(function(n,i){return '<li class="'+(step>i+1?'done':'')+'"'+(step===i+1?' aria-current="step"':'')+'><button type="button" data-action="goto" data-s="'+(i+1)+'"'+(i+1>reach?' disabled':'')+'><span class="n">'+(i+1)+'</span><span class="t">'+n+'</span></button></li>'}).join('')+'</ol>';
  var withPv=step===3||step===4,body=[s1,s2,s3,s4,s5][step-1]();
  var nav=step===5?'':'<div class="nav-row"><div class="grp">'+(step>1?'<button type="button" class="btn" data-action="back">Back</button>':'')+'<button type="button" class="btn quiet" data-action="save-draft">Save draft</button></div><div class="grp"><button type="button" class="btn primary" data-action="next">'+(step===4?'Preview my gift':'Continue')+'</button></div></div>';
  return '<section class="wrap page"><h1 class="sr">Create a gift</h1>'+prog+'<div class="ed-grid'+(withPv?' with-pv':'')+'"><div class="ed-main">'+body+nav+'</div>'+
   (withPv?'<aside class="pv-col" aria-label="Live preview"><div class="pv-frame"><div class="pv-bar"><span>Live preview</span><span>Updates as you type</span></div><div class="pv-scroll" id="pv">'+giftHTML(G,{ghost:true,tag:'h2'})+'</div></div></aside>':'')+'</div>'+
   (withPv?'<button type="button" class="btn primary pv-fab" data-action="fs-preview">Preview</button>':'')+'</section>';
}
var pvT=0;
function updatePreview(){clearTimeout(pvT);pvT=setTimeout(function(){var p=$('#pv');if(p)p.innerHTML=giftHTML(G,{ghost:true,tag:'h2'})},60)}
function drawEditor(focus){
  var m=$('#main');m.innerHTML=editor();m.classList.remove('enter');void m.offsetWidth;m.classList.add('enter');
  fitThumbs();if(focus){var h=$('#stepc');if(h)h.focus({preventScroll:true});window.scrollTo(0,0)}
}
function readPhoto(file,max){
  return new Promise(function(res,rej){
    if(!/^image\/(jpeg|png|webp)$/.test(file.type))return rej(new Error('That file type isn\'t supported. Please choose a JPG, PNG or WebP image.'));
    if(file.size>6*1024*1024)return rej(new Error('That photo is over 6 MB. Please choose a smaller one.'));
    var url=URL.createObjectURL(file),img=new Image();
    img.onload=function(){var s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.width*s));c.height=Math.max(1,Math.round(img.height*s));
      var ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);
      try{res(c.toDataURL('image/jpeg',.78))}catch(e){rej(new Error('That photo couldn\'t be processed.'))}};
    img.onerror=function(){URL.revokeObjectURL(url);rej(new Error('That photo couldn\'t be opened. Try a different file.'))};
    img.src=url;
  });
}
function perr(id,msg){var e=$('#'+id);if(!e)return;e.textContent=msg||'';e.hidden=!msg}

/* done */
function doneView(){
  if(!done)return '';
  var g=done.gift,hasPh=!!g.photo||g.gallery.length;
  return '<section class="wrap page"><div class="done"><svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true"><rect x="14" y="40" width="92" height="62" rx="4" fill="#F6E4E5" stroke="#713D52" stroke-width="2"/><path d="M60 40v62M14 66h92" stroke="#C98291" stroke-width="7"/><path d="M60 40C46 8 20 20 36 38zM60 40c14-32 40-20 24-2z" fill="#F5E5A8" stroke="#713D52" stroke-width="2"/></svg>'+
  '<h1 id="done-h" tabindex="-1">Your little something is ready.</h1><p class="lead">Now send a little happiness their way.</p>'+
  (hasPh?'<div class="note" style="text-align:left;width:100%" role="note"><strong>Photos won\'t appear in this link.</strong> Use Download as Image to share the full gift with photos.</div>':'')+
  '<div class="linkbox"><label class="sr" for="link-in">Gift link</label><input id="link-in" readonly value="'+esc(done.link)+'"><button type="button" class="btn primary" data-action="copy-link">Copy Gift Link</button></div>'+
  '<div class="acts" style="justify-content:center">'+(navigator.share?'<button type="button" class="btn" data-action="share-link">Share…</button>':'')+'<button type="button" class="btn" data-action="preview-done">Preview Gift</button><button type="button" class="btn" data-action="download-img">Download as Image</button><button type="button" class="btn" data-action="start-new">Start Another Gift</button></div>'+
  '<div class="note" style="text-align:left;width:100%"><strong>About this link</strong><ul class="facts"><li>The gift is stored inside the link itself. No server holds a copy, and you can try it in a fresh browser tab.</li><li>Anyone who has the link can open the gift. Share it only with the person it\'s for.</li><li>Because the gift is inside the link, it can show up in browser history, chat link previews and screenshots. Keep private details out of gifts.</li><li>Once sent, a link can\'t be taken back. Deleting the gift from My Creations removes only your saved copy.</li>'+
    (location.protocol==='file:'?'<li>You\'re running this from a file on your computer, so this link only works on this computer. Host the page first for links that work elsewhere.</li>':'')+
  '</ul></div><p><a href="#/mine">See all your creations</a></p></div></section>';
}
async function finalize(){
  var e=validate(3);if(Object.keys(e).length){toast('A few details are still missing.');step=e.occasion?1:(e.theme?2:3);drawEditor(true);return}
  var b=$('#create-btn');if(b){b.disabled=true;b.innerHTML='<span class="spin" aria-hidden="true"></span> Creating…'}
  G.status='created';G.createdAt=Date.now();
  var ok=saveGift(G),link;
  try{link=baseURL()+'#/gift/'+await encodeGift(G)}catch(err){link=''}
  if(!link){G.status='draft';if(b){b.disabled=false;b.textContent='Create my gift'}toast('Something went wrong while making the link. Please try again.');return}
  done={gift:JSON.parse(JSON.stringify(G)),link:link};
  if(!ok)toast('Your gift is ready, but this browser couldn\'t save a copy. Try fewer or smaller photos.');
  location.hash='#/done';
}
function mine(){
  var gs=store().gifts;
  var h='<section class="wrap page"><header class="page-head"><h1>My creations</h1><p class="lead">Drafts and finished gifts saved on this device.</p></header><div class="note"><strong>Stored in this browser only.</strong> These gifts live in this browser\'s storage and won\'t appear on another device or if you clear your site data. There\'s no account, so there\'s nothing to sync.</div>';
  if(!gs.length)return h+'<div class="empty"><h2>Nothing here yet</h2><p>Save a draft or create a gift and it will show up here.</p><a class="btn primary" href="#/create?new=1">Create a Gift</a></div></section>';
  return h+'<div class="mine-grid">'+gs.map(function(g){
    var made=g.status==='created';
    return '<article class="tcard">'+thumbHTML(g)+'<div><span class="badge'+(made?' made':'')+'">'+(made?'Created':'Draft')+'</span></div><h3>'+esc(g.title||'Untitled gift')+'</h3><p class="muted" style="margin:0">For '+esc(g.to||'someone special')+', saved '+esc(new Date(g.updatedAt||Date.now()).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'}))+'</p>'+
     '<div class="acts"><a class="btn small primary" href="#/create?edit='+g.id+'">Edit</a><button type="button" class="btn small" data-action="prev-mine" data-id="'+g.id+'">Preview</button>'+(made?'<button type="button" class="btn small" data-action="copy-mine" data-id="'+g.id+'">Copy link</button>':'')+'<button type="button" class="btn small quiet" data-action="del-mine" data-id="'+g.id+'">Delete</button></div></article>'}).join('')+'</div></section>';
}
function privacy(){
  return '<section class="wrap page"><header class="page-head"><h1>Privacy and safety</h1><p class="lead">What happens to what you write, in plain words.</p></header><div class="prose">'+
  '<h2>What is stored</h2><ul><li>Gifts you save or create are kept in your browser\'s local storage on this device: the text, theme, extras, and any photos you add. Nothing is uploaded.</li><li>There are no accounts, no recipient contact details, and no analytics or advertising trackers on this page.</li><li>Fonts load from Google Fonts, so Google can see that your browser requested them.</li></ul>'+
  '<h2>How gift links work</h2><ul><li>When you create a gift, the link contains the gift\'s text, theme and extras, compressed and encoded. No server stores it.</li><li><strong>Anyone with the link can open the gift.</strong> Share it only with the person it is for.</li><li>Photos are not included in the link. They stay on this device unless you download the gift as an image.</li><li>Because the gift is inside the link, it can appear in browser history, chat link previews and screenshots. Please keep private details out of gifts.</li><li>Nothing is sent to anyone automatically. You choose how and whether to share.</li></ul>'+
  '<h2>Removing a gift</h2><ul><li>Delete a gift in My Creations to remove your saved copy from this browser.</li><li>Because the gift lives inside the link, a link you already sent cannot be recalled. A live deployment with a backend can support revocable links; see the README.</li></ul>'+
  '<h2>Photo uploads</h2><ul><li>Only JPG, PNG and WebP images up to 6 MB are accepted. They are resized in your browser before being stored locally.</li></ul></div></section>';
}
function viewRoute(payload,local){
  var main=$('#main');
  main.innerHTML='<div style="min-height:70vh;display:grid;place-items:center;text-align:center;gap:1rem"><div><span class="spin" aria-hidden="true"></span><p class="muted" style="margin-top:1rem">Unwrapping your gift…</p></div></div>';
  function show(g){main.innerHTML=viewerHTML(g);var h=$('.env',main);if(h)h.focus({preventScroll:true});document.title='A little something for '+(g.to||'you')}
  function fail(){main.innerHTML='<section class="wrap page"><div class="empty"><h1 style="font-size:2.2rem;margin-bottom:.6rem">This gift link looks incomplete</h1><p>It may have been cut off when it was copied or pasted. Ask the sender to share the link again.</p><a class="btn primary" href="#/">Make a gift of your own</a></div></section>'}
  if(local){var g=findGift(payload);g?show(sanitizeFull(g)):fail();return}
  decodeGift(payload).then(function(g){g?show(g):fail()}).catch(fail);
}
function sanitizeFull(g){var s=sanitize(g);s.photo=(typeof g.photo==='string'&&g.photo.indexOf('data:image/')===0)?g.photo:null;s.gallery=(g.gallery||[]).filter(function(p){return typeof p==='string'&&p.indexOf('data:image/')===0}).slice(0,4);return s}
