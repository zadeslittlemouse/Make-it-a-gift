'use strict';
/* router, actions, init */
/* ---------- router ---------- */
function parse(){var h=location.hash.slice(1)||'/',i=h.indexOf('?');return {path:i>-1?h.slice(0,i):h,qs:new URLSearchParams(i>-1?h.slice(i+1):'')}}
var TITLES={'/explore':'Explore gifts','/how':'How it works','/mine':'My creations','/create':'Create a gift','/done':'Your gift is ready','/privacy':'Privacy and safety'};
function render(){
  closeModal(true);closeFS(true);stopMusic();closeMenu();
  var r=parse(),m=$('#main'),parts=r.path.split('/').filter(Boolean),html='',key=r.path;
  document.body.classList.remove('viewing');
  if(parts[0]==='gift'&&parts[1]){document.body.classList.add('viewing');viewRoute(parts[1],false);return}
  if(parts[0]==='view'&&parts[1]){document.body.classList.add('viewing');viewRoute(decodeURIComponent(parts[1]),true);return}
  if(key==='/'||key===''){html=home();key='/'}
  else if(key==='/explore')html=explore();
  else if(key==='/how')html=how();
  else if(key==='/mine')html=mine();
  else if(key==='/privacy')html=privacy();
  else if(key==='/done'){if(!done){location.hash='#/mine';return}html=doneView()}
  else if(key==='/create'){
    var q=r.qs;
    if(q.get('new')){G=blank();step=1;reach=1;helperOpen=false;history.replaceState(null,'','#/create')}
    else if(q.get('tpl')&&TPMAP[q.get('tpl')]){G=fromTpl(TPMAP[q.get('tpl')]);step=3;reach=3;helperOpen=false;history.replaceState(null,'','#/create')}
    else if(q.get('edit')){var f=findGift(q.get('edit'));if(f){G=sanitizeFull(f);G.status=f.status;G.createdAt=f.createdAt;G.autoTheme=false;step=3;reach=5;helperOpen=false}history.replaceState(null,'','#/create')}
    html=editor();
  }
  else{html='<section class="wrap page"><div class="empty"><h1 style="font-size:2.2rem;margin-bottom:.6rem">That page isn\'t here</h1><a class="btn primary" href="#/">Go home</a></div></section>';key='/404'}
  document.title=(TITLES[key]?TITLES[key]+' | ':'')+'MAKE IT A GIFT';
  m.innerHTML=html;m.classList.remove('enter');void m.offsetWidth;m.classList.add('enter');
  window.scrollTo(0,0);m.focus({preventScroll:true});
  $$('.links a,.mmenu a').forEach(function(a){var h=a.getAttribute('href').slice(1).split('?')[0];if(h===key&&!a.classList.contains('btn'))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  if(key==='/explore')updateExplore();
  fitThumbs();
  if(key==='/done'){var h2=$('#done-h');if(h2)h2.focus({preventScroll:true})}
  if(key==='/create'){var s=$('#stepc');if(s)s.focus({preventScroll:true})}
}
function closeMenu(){var m=$('#mmenu');if(!m||m.hidden)return;m.hidden=true;var b=$('#menu-btn');b.setAttribute('aria-expanded','false');b.textContent='Menu'}

/* ---------- actions ---------- */
async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch(e){try{var ta=document.createElement('textarea');ta.value=t;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();var ok=document.execCommand('copy');ta.remove();return ok}catch(e2){return false}}}
async function copyLink(link){
  if(await copyText(link)){toast('Link copied. Paste it wherever you like.');return}
  var m=openModal('Copy this link','<p>Your browser blocked automatic copying. Select the link and copy it:</p><input readonly value="'+esc(link)+'" aria-label="Gift link"><div class="modal-actions"><button type="button" class="btn" data-action="close-modal">Close</button></div>');
  var i=$('input',m);i.focus();i.select();
}
function loadScript(u){return new Promise(function(res,rej){var s=document.createElement('script');s.src=u;s.onload=res;s.onerror=function(){rej(new Error('load'))};document.head.appendChild(s)})}
async function downloadImage(){
  var g=done&&done.gift;if(!g)return;
  var m=openModal('Making your image…','<p><span class="spin" aria-hidden="true"></span> Rendering your gift. This takes a moment.</p>');
  var host=null;
  try{
    if(!window.html2canvas)await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    if(document.fonts&&document.fonts.ready)await document.fonts.ready;
    host=document.createElement('div');host.style.cssText='position:fixed;left:-9999px;top:0;width:640px';host.innerHTML=giftHTML(g,{tag:'h2'});document.body.appendChild(host);
    var cv=await window.html2canvas(host.firstChild,{scale:2,backgroundColor:null,useCORS:true,logging:false});
    var url=cv.toDataURL('image/png');host.remove();
    openModal('Your gift as an image','<img class="big" src="'+url+'" alt="Your finished gift as an image"><p class="hint" style="margin-top:.8rem">Use Download, or press and hold the image to save it.</p><div class="modal-actions"><button type="button" class="btn quiet" data-action="close-modal">Close</button><a class="btn primary" href="'+url+'" download="make-it-a-gift.png">Download</a></div>');
  }catch(e){
    if(host)host.remove();
    openModal('Couldn\'t make the image','<p>Image export isn\'t available right now. This can happen offline or when the image tool is blocked. Your gift is still safe, and you can take a screenshot of the full-screen preview instead.</p><div class="modal-actions"><button type="button" class="btn primary" data-action="close-modal">OK</button></div>');
  }
}
function previewGift(g,label,tpl){openFS(viewerHTML(g,{preview:true})+(tpl?'<div class="fs-cta"><a class="btn primary" href="#/create?tpl='+tpl+'">Make one like this</a></div>':''),label||'Gift preview')}
var handlers={
  skip:function(el,e){e.preventDefault();$('#main').focus()},
  'dismiss-demo':function(){$('#demo').hidden=true;try{sessionStorage.setItem('miag:dd','1')}catch(e){}},
  menu:function(){var m=$('#mmenu'),b=$('#menu-btn'),o=m.hidden;m.hidden=!o;b.setAttribute('aria-expanded',String(o));b.textContent=o?'Close':'Menu'},
  'scroll-make':function(){var t=$('#make');if(t){t.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});t.focus({preventScroll:true})}},
  'hero-env':function(el){var open=el.classList.toggle('open');el.setAttribute('aria-expanded',String(open))},
  'open-gift':function(el){openGift(el)},
  'reveal-secret':function(el){var t=$('.secret-text',el.closest('.secret')),open=t.hidden;t.hidden=!open;el.setAttribute('aria-expanded',String(open))},
  music:function(el){musicToggle(el)},
  'close-modal':function(){closeModal()},
  'close-fs':function(){closeFS()},
  'clear-filters':function(){EX={occ:'',theme:'',rec:'',style:''};$$('[data-filter]').forEach(function(s){s.value=''});updateExplore()},
  'prev-tpl':function(el){previewGift(tplGift(TPMAP[el.dataset.id]),'Template preview',el.dataset.id)},
  'open-sample':function(){previewGift(tplGift(TPMAP.t5),'Sample gift','t5')},
  'skip-type':function(el){var r=el.closest('.reveal');if(r&&r._twDone)r._twDone()},'skip-open':function(el){var v=el.closest('[data-view]'),b=v&&$('.env',v);if(b)openGift(b,true)},
  'skip-extras':function(){step=5;reach=5;drawEditor(true)},
  'pick-occ':function(el){
    G.occasion=el.dataset.id;if(G.autoTheme||!G.theme){G.theme=OCCMAP[G.occasion].theme;G.autoTheme=true}
    reach=Math.max(reach,2);$$('.pick').forEach(function(b){b.setAttribute('aria-pressed',String(b===el))});perr('e-occasion','');
    var o=OCCMAP[G.occasion],n=$('#occ-note');var h='<strong>A taste of what you might write:</strong> <span class="hand" style="font-size:1.3rem">'+esc(o.ph)+'</span>';
    if(n)n.innerHTML=h;else{var d=document.createElement('div');d.className='note';d.id='occ-note';d.innerHTML=h;$('#e-occasion').after(d)}
  },
  'pick-theme':function(el){G.theme=el.dataset.id;G.autoTheme=false;reach=Math.max(reach,3);$$('.tpick').forEach(function(b){b.setAttribute('aria-pressed',String(b===el))});perr('e-theme','')},
  back:function(){step=Math.max(1,step-1);drawEditor(true)},
  goto:function(el){var s=+el.dataset.s;if(s>reach&&s!==3&&s!==2)return;step=s;drawEditor(true)},
  next:function(){
    var e=validate(step);
    if(step===1&&e.occasion){perr('e-occasion',e.occasion);$('.pick').focus();return}
    if(step===2&&e.theme){perr('e-theme',e.theme);return}
    if(step===3){var ids=['to','from','title','message'];if(showErrs(e,ids))return}
    step=Math.min(5,step+1);reach=Math.max(reach,step);drawEditor(true);
  },
  'save-draft':function(){var ok=saveGift(G);toast(ok?'Draft saved in this browser.':'This browser couldn\'t save the draft. Try fewer or smaller photos.')},
  helper:function(el){helperOpen=!helperOpen;el.setAttribute('aria-expanded',String(helperOpen));$('#helper-box').hidden=!helperOpen},
  'use-starter':function(el){
    var occ=OCCMAP[G.occasion]||OCCMAP.other,t=subst(occ.s[+el.dataset.i],G);
    G.message=clip((G.message.trim()?G.message.trim()+'\n\n':'')+t,LIM.message);
    var ta=$('#f-message');ta.value=G.message;ta.dispatchEvent(new Event('input',{bubbles:true}));ta.focus();
  },
  'rm-photo':function(){G.photo=null;$('#photo-ui').innerHTML=photoUI();var l=$('label[for=f-photo]');if(l)l.textContent='Add a photo';updatePreview()},
  'rm-gal':function(el){G.gallery.splice(+el.dataset.i,1);$('#gal-ui').innerHTML=galUI();updatePreview()},
  sticker:function(el){G.x.sticker.kind=el.dataset.k;$$('.stk button').forEach(function(b){b.setAttribute('aria-pressed',String(b===el))});updatePreview()},
  'add-item':function(){if(G.x.appreciate.items.length<6){G.x.appreciate.items.push('');drawEditor(false);var l=$$('[id^=ap-]');if(l.length)l[l.length-1].focus()}},
  'del-item':function(el){G.x.appreciate.items.splice(+el.dataset.i,1);drawEditor(false)},
  'fs-preview':function(){previewGift(G,'Full screen preview')},
  'create-gift':function(){finalize()},
  'copy-link':function(){copyLink(done.link)},
  'share-link':async function(){try{await navigator.share({title:'A little something for you',text:'I made you something.',url:done.link})}catch(e){if(!e||e.name!=='AbortError')copyLink(done.link)}},
  'preview-done':function(){previewGift(done.gift,'Gift preview')},
  'download-img':function(){downloadImage()},
  'start-new':function(){G=blank();step=1;reach=1;done=null;location.hash='#/create?new=1'},
  'prev-mine':function(el){var g=findGift(el.dataset.id);if(g)previewGift(sanitizeFull(g),'Gift preview')},
  'copy-mine':async function(el){var g=findGift(el.dataset.id);if(!g)return;try{copyLink(baseURL()+'#/gift/'+await encodeGift(g))}catch(e){toast('Couldn\'t make the link.')}},
  'del-mine':function(el){
    var g=findGift(el.dataset.id);if(!g)return;
    openModal('Delete this gift?','<p>"'+esc(g.title||'Untitled gift')+'" will be removed from this browser. This can\'t be undone.'+(g.status==='created'?' Links you already shared will still open, because the gift lives inside the link.':'')+'</p><div class="modal-actions"><button type="button" class="btn quiet" data-action="close-modal">Cancel</button><button type="button" class="btn primary" data-action="confirm-del" data-id="'+g.id+'">Delete gift</button></div>');
  },
  'confirm-del':function(el){var s=store();s.gifts=s.gifts.filter(function(g){return g.id!==el.dataset.id});persist();closeModal(true);toast('Gift deleted');var m=$('#main');m.innerHTML=mine();fitThumbs()}
};
document.addEventListener('click',function(e){
  var a=e.target.closest('[data-action]');
  if(a&&handlers[a.dataset.action])handlers[a.dataset.action](a,e);
  if(e.target.closest('.mmenu a'))closeMenu();
});
document.addEventListener('input',function(e){
  var t=e.target,p=t.dataset&&t.dataset.bind;
  if(!p)return;
  setPath(G,p,t.value);
  var c=$('[data-cnt="'+p+'"]');if(c)c.textContent=t.value.length+' / '+t.maxLength;
  if(t.getAttribute('aria-invalid')==='true'){t.removeAttribute('aria-invalid');var er=$('#e-'+t.id.slice(2));if(er)er.hidden=true}
  updatePreview();
});
document.addEventListener('change',async function(e){
  var t=e.target;
  if(t.dataset&&t.dataset.filter){EX[t.dataset.filter]=t.value;updateExplore();return}
  if(t.dataset&&t.dataset.bindc){
    var v=t.checked;setPath(G,t.dataset.bindc,v);
    if(/^x\./.test(t.dataset.bindc)){var st=$('#main').scrollTop;drawEditor(false);var again=$('#'+t.id);if(again)again.focus()}
    updatePreview();return;
  }
  if(t.id==='f-photo'&&t.files[0]){
    perr('e-photo','');$('#photo-ui').innerHTML='<span class="spin" aria-hidden="true"></span> Processing…';
    try{G.photo=await readPhoto(t.files[0],900)}catch(err){perr('e-photo',err.message)}
    t.value='';$('#photo-ui').innerHTML=photoUI();var l=$('label[for=f-photo]');if(l)l.textContent=G.photo?'Change photo':'Add a photo';updatePreview();
  }
  if(t.id==='f-gal'&&t.files.length){
    perr('e-gal','');var files=Array.prototype.slice.call(t.files),room=4-G.gallery.length;
    if(files.length>room)perr('e-gal','Only 4 gallery photos fit. Extra photos were skipped.');
    $('#gal-ui').innerHTML='<span class="spin" aria-hidden="true"></span> Processing…';
    for(var i=0;i<Math.min(room,files.length);i++){try{G.gallery.push(await readPhoto(files[i],700))}catch(err){perr('e-gal',err.message)}}
    t.value='';$('#gal-ui').innerHTML=galUI();updatePreview();
  }
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){if(!$('#modal-root').hidden){closeModal();return}if(!$('#fs-root').hidden){closeFS();return}closeMenu()}
  if(e.key==='Tab'){
    var c=!$('#modal-root').hidden?$('#modal-root .modal'):(!$('#fs-root').hidden?$('#fs-root .fs'):null);if(!c)return;
    var f=$$('a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"])',c).filter(function(x){return !x.disabled&&x.offsetParent!==null});if(!f.length)return;
    var first=f[0],last=f[f.length-1];
    if(e.shiftKey&&(document.activeElement===first||document.activeElement===c)){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
});
window.addEventListener('hashchange',render);
window.addEventListener('resize',fitThumbs);

(function init(){
  try{if(sessionStorage.getItem('miag:dd'))$('#demo').hidden=true}catch(e){}
  var svg="<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .3  0 0 0 0 .25  0 0 0 0 .25  0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
  $('.grain').style.backgroundImage='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';
  render();
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitThumbs);
})();
