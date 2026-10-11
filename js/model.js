'use strict';
/* gift model */
/* ---------- gift model ---------- */
function uid(){try{return (crypto.randomUUID().replace(/-/g,'')).slice(0,12)}catch(e){return Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4)}}
function blank(){return {id:uid(),v:1,occasion:'',theme:'',autoTheme:true,to:'',title:'',message:'',from:'',closing:'',music:false,photo:null,gallery:[],
  x:{note2:{on:false,text:''},caption:{on:false,text:''},gallery:{on:false},sticker:{on:false,kind:'star'},secret:{on:false,text:''},appreciate:{on:false,items:['','','']},smile:{on:false,text:''}},
  status:'draft',createdAt:0,updatedAt:0}}
function fromTpl(t){
  var g=blank();g.occasion=t.occ;g.theme=t.theme;g.autoTheme=false;
  t.x.forEach(function(k){g.x[k].on=true});
  return g;
}
function tplGift(t){
  var g=fromTpl(t),s=t.s;g.to=s.to;g.title=s.title;g.from=s.from;g.message=s.message;
  if(s.ap)g.x.appreciate.items=s.ap.slice();if(s.n2)g.x.note2.text=s.n2;if(s.secret)g.x.secret.text=s.secret;if(s.smile)g.x.smile.text=s.smile;if(s.stk)g.x.sticker.kind=s.stk;
  if(g.x.caption.on)g.x.caption.text='A day we keep thinking about';
  return g;
}
var LIM={to:40,title:70,message:1200,from:40,closing:120,note:500,cap:100,secret:400,item:80,smile:400};
function clip(s,n){return String(s==null?'':s).slice(0,n)}
function sanitize(o){
  if(!o||typeof o!=='object')return null;
  var g=blank(),x=o.x||{};
  g.id=clip(o.id,24)||g.id;g.occasion=OCCMAP[o.occasion]?o.occasion:'other';g.theme=THMAP[o.theme]?o.theme:'love';
  g.to=clip(o.to,LIM.to);g.title=clip(o.title,LIM.title);g.message=clip(o.message,LIM.message);g.from=clip(o.from,LIM.from);g.closing=clip(o.closing,LIM.closing);g.music=!!o.music;
  function on(k){return !!(x[k]&&x[k].on)}
  g.x.note2={on:on('note2'),text:clip(x.note2&&x.note2.text,LIM.note)};
  g.x.caption={on:on('caption'),text:clip(x.caption&&x.caption.text,LIM.cap)};
  g.x.gallery={on:on('gallery')};
  g.x.sticker={on:on('sticker'),kind:STICKERS[x.sticker&&x.sticker.kind]?x.sticker.kind:'star'};
  g.x.secret={on:on('secret'),text:clip(x.secret&&x.secret.text,LIM.secret)};
  var it=(x.appreciate&&Array.isArray(x.appreciate.items))?x.appreciate.items.slice(0,6).map(function(i){return clip(i,LIM.item)}):[];
  g.x.appreciate={on:on('appreciate'),items:it};
  g.x.smile={on:on('smile'),text:clip(x.smile&&x.smile.text,LIM.smile)};
  return g;
}
function paras(t){return String(t).split(/\n{2,}/).map(function(p){return '<p>'+esc(p).replace(/\n/g,'<br>')+'</p>'}).join('')}
function subst(s,g){return s.replace(/\{to\}/g,(g.to||'').trim()||'you')}
