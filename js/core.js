'use strict';
/* functions & helpers */
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var mq=window.matchMedia('(prefers-reduced-motion: reduce)');var reduced=function(){return mq.matches};

/* ---------- vector bits ---------- */
var HEART='M30 52C8 36 6 18 18 12c6-3 10 0 12 5 2-5 6-8 12-5 12 6 10 24-12 40z';
var STAR4='M30 4l5 21 21 5-21 5-5 21-5-21-21-5 21-5z';
var MOON='M38 6a24 24 0 1 0 16 38A20 20 0 0 1 38 6z';
function sv(vb,inner,style,extra){return '<svg class="d" viewBox="'+vb+'" style="'+style+'" aria-hidden="true" focusable="false" '+(extra||'')+'>'+inner+'</svg>'}
function daisy(c1,c2){return '<g fill="'+c1+'"><ellipse cx="30" cy="15" rx="7" ry="11"/><ellipse cx="30" cy="45" rx="7" ry="11"/><ellipse cx="15" cy="30" rx="11" ry="7"/><ellipse cx="45" cy="30" rx="11" ry="7"/></g><circle cx="30" cy="30" r="6" fill="'+c2+'"/>'}
function sprig(c){return '<path d="M30 58C30 40 32 24 30 4" stroke="'+c+'" stroke-width="2" fill="none"/><g fill="'+c+'"><ellipse cx="22" cy="18" rx="8" ry="4" transform="rotate(-35 22 18)"/><ellipse cx="38" cy="26" rx="8" ry="4" transform="rotate(35 38 26)"/><ellipse cx="22" cy="36" rx="8" ry="4" transform="rotate(-35 22 36)"/><ellipse cx="38" cy="44" rx="8" ry="4" transform="rotate(35 38 44)"/></g>'}
function balloon(c,hl){return '<ellipse cx="30" cy="28" rx="20" ry="25" fill="'+c+'"/><ellipse cx="22" cy="18" rx="5" ry="8" fill="'+hl+'" opacity=".5" transform="rotate(25 22 18)"/><path d="M27 52h6l-3 5z" fill="'+c+'"/><path d="M30 57c-4 8 4 14 0 22" stroke="#393236" stroke-opacity=".5" fill="none"/>'}
var STICKERS={
 star:'<path d="'+STAR4+'" fill="#F5E5A8" stroke="#713D52" stroke-width="2.5" stroke-linejoin="round"/>',
 heart:'<path d="'+HEART+'" fill="#C98291" stroke="#713D52" stroke-width="2.5" stroke-linejoin="round"/>',
 flower:daisy('#F6E4E5','#F5E5A8'),
 moon:'<path d="'+MOON+'" fill="#F5E5A8" stroke="#713D52" stroke-width="2.5" stroke-linejoin="round"/>',
 sparkle:'<path d="'+STAR4+'" fill="#C8D5BE" stroke="#713D52" stroke-width="2.5" stroke-linejoin="round" transform="translate(0 0)"/><circle cx="48" cy="12" r="4" fill="#C98291"/>',
 sun:'<circle cx="30" cy="30" r="12" fill="#F5E5A8" stroke="#713D52" stroke-width="2.5"/><g stroke="#C98291" stroke-width="3" stroke-linecap="round"><path d="M30 6v8M30 46v8M6 30h8M46 30h8M13 13l6 6M41 41l6 6M47 13l-6 6M19 41l-6 6"/></g>'
};
var STK_NAMES={star:'Star',heart:'Heart',flower:'Flower',moon:'Moon',sparkle:'Sparkle',sun:'Sun'};
function stickerSVG(k,cls){return '<svg class="'+(cls||'')+'" viewBox="0 0 60 60" aria-hidden="true" focusable="false">'+(STICKERS[k]||STICKERS.star)+'</svg>'}
function bowSVG(c1,c2){return '<svg viewBox="0 0 60 36" aria-hidden="true"><path d="M30 18C20 2 4 4 6 16c2 12 18 6 24 2zM30 18C40 2 56 4 54 16c-2 12-18 6-24 2z" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/><path d="M30 18l-8 16M30 18l8 16" stroke="'+c2+'" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="18" r="5" fill="'+c1+'" stroke="'+c2+'" stroke-width="1.5"/></svg>'}
function envHTML(o){
  o=o||{};var st=o.style?' style="'+o.style+'"':'';
  return '<button type="button" class="env'+(o.cls?' '+o.cls:'')+'"'+st+' data-action="'+(o.action||'open-env')+'" aria-label="'+esc(o.label||'Open the envelope')+'"'+(o.expanded?' aria-expanded="false"':'')+'>'+
   '<span class="env-back"></span><span class="env-paper">'+(o.paper||'')+'</span><span class="env-front"></span><span class="env-flap"></span><span class="env-ribbon"></span><span class="bow">'+bowSVG(o.bow1||'#F6E4E5',o.bow2||'#C98291')+'</span></button>';
}
function icon(id){
  var b={
   birthday:'<rect x="10" y="26" width="28" height="14" rx="3" fill="#F6E4E5" stroke="#713D52" stroke-width="1.5"/><path d="M10 31c4 3 8 3 12 0s8-3 12 0 4 1 4 0" stroke="#C98291" fill="none" stroke-width="1.5"/><rect x="22" y="16" width="4" height="10" fill="#F5E5A8" stroke="#713D52" stroke-width="1.3"/><path d="M24 7c3 3 2 6 0 6s-3-3 0-6z" fill="#C98291"/>',
   friendship:'<circle cx="18" cy="26" r="11" fill="#C8D5BE" opacity=".85" stroke="#713D52" stroke-width="1.3"/><circle cx="30" cy="26" r="11" fill="#F6E4E5" opacity=".9" stroke="#713D52" stroke-width="1.3"/><path d="M24 20c3 3 3 6 0 9-3-3-3-6 0-9z" fill="#C98291"/>',
   anniversary:'<circle cx="18" cy="29" r="10" fill="none" stroke="#C98291" stroke-width="3"/><circle cx="30" cy="29" r="10" fill="none" stroke="#713D52" stroke-width="3"/><path d="M24 6l3.5 5.5h-7z" fill="#F5E5A8" stroke="#713D52" stroke-width="1.2"/>',
   thanks:'<path d="M24 44V26" stroke="#713D52" stroke-width="2"/><g fill="#F6E4E5" stroke="#713D52" stroke-width="1.3"><circle cx="24" cy="12" r="6"/><circle cx="33" cy="19" r="6"/><circle cx="15" cy="19" r="6"/><circle cx="30" cy="28" r="6"/><circle cx="18" cy="28" r="6"/></g><circle cx="24" cy="21" r="5" fill="#F5E5A8" stroke="#713D52" stroke-width="1.3"/>',
   congrats:'<path d="M24 4l5.5 13 14 1-10.7 9 3.4 14L24 33l-12.2 8 3.4-14L4.5 18l14-1z" fill="#F5E5A8" stroke="#713D52" stroke-width="1.5" stroke-linejoin="round"/><circle cx="40" cy="8" r="2.5" fill="#C98291"/><circle cx="8" cy="40" r="2.5" fill="#C8D5BE"/>',
   justbecause:'<path d="M24 41C6 29 4 15 13 10c5-2 9 0 11 5 2-5 6-7 11-5 9 5 7 19-11 31z" fill="#C98291" stroke="#713D52" stroke-width="1.5"/>',
   getwell:'<path d="M10 20h22v8a11 11 0 0 1-22 0z" fill="#F6E4E5" stroke="#713D52" stroke-width="1.5"/><path d="M32 22h3a4 4 0 0 1 0 8h-3" fill="none" stroke="#713D52" stroke-width="1.5"/><path d="M16 8c-2 3 2 4 0 7M23 8c-2 3 2 4 0 7" stroke="#C98291" fill="none" stroke-width="1.5"/>',
   longdistance:'<circle cx="8" cy="34" r="4" fill="#713D52"/><circle cx="40" cy="34" r="4" fill="#C98291"/><path d="M8 30C14 6 34 6 40 30" fill="none" stroke="#713D52" stroke-width="1.5" stroke-dasharray="3 4"/><path d="M24 9l2 4 4 .6-3 3 .7 4.2-3.7-2-3.7 2 .7-4.2-3-3 4-.6z" fill="#F5E5A8" stroke="#713D52" stroke-width=".8"/>',
   apology:'<path d="M9 40C19 31 28 22 38 8" stroke="#713D52" fill="none" stroke-width="2"/><g fill="#C8D5BE" stroke="#713D52" stroke-width="1.2"><ellipse cx="17" cy="28" rx="7" ry="3.5" transform="rotate(-40 17 28)"/><ellipse cx="25" cy="22" rx="7" ry="3.5" transform="rotate(40 25 22)"/><ellipse cx="29" cy="16" rx="6" ry="3" transform="rotate(-40 29 16)"/><ellipse cx="22" cy="34" rx="6" ry="3" transform="rotate(40 22 34)"/></g>',
   openwhen:'<rect x="6" y="12" width="36" height="26" rx="2" fill="#F6E4E5" stroke="#713D52" stroke-width="1.5"/><path d="M6 14l18 14 18-14" fill="none" stroke="#713D52" stroke-width="1.5"/><circle cx="24" cy="28" r="3.5" fill="#C98291"/>',
   other:'<path d="M24 5l4 14 14 5-14 5-4 14-4-14-14-5 14-5z" fill="#F5E5A8" stroke="#713D52" stroke-width="1.5" stroke-linejoin="round"/>'
  };
  return '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">'+(b[id]||b.other)+'</svg>';
}
