'use strict';
/* toasts, modal, fullscreen */
/* ---------- toasts, modal, fullscreen ---------- */
function toast(m){var t=document.createElement('div');t.className='toast';t.textContent=m;$('#toasts').appendChild(t);setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove()},450)},4000)}
var opener=null;
function syncInert(){var m=!$('#modal-root').hidden,f=!$('#fs-root').hidden;$('main').inert=m||f;$('.hdr').inert=m||f;$('.foot').inert=m||f;$('#fs-root').inert=m;document.body.style.overflow=(m||f)?'hidden':''}
function openModal(title,inner){
  closeModal(true);opener=document.activeElement;var r=$('#modal-root');
  r.innerHTML='<div class="scrim" data-action="close-modal"></div><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt" tabindex="-1"><h2 id="mt">'+esc(title)+'</h2>'+inner+'</div>';
  r.hidden=false;syncInert();$('.modal',r).focus();return $('.modal',r);
}
function closeModal(silent){var r=$('#modal-root');if(r.hidden)return;r.hidden=true;r.innerHTML='';syncInert();if(!silent&&opener&&document.contains(opener))opener.focus()}
var fsOpener=null;
function openFS(html,label){
  fsOpener=document.activeElement;var r=$('#fs-root');
  r.innerHTML='<div class="fs" role="dialog" aria-modal="true" aria-label="'+esc(label)+'"><button type="button" class="fs-close" data-action="close-fs">Close preview</button>'+html+'</div>';
  r.hidden=false;syncInert();$('.fs-close',r).focus();
}
function closeFS(silent){var r=$('#fs-root');if(r.hidden)return;stopMusic();r.hidden=true;r.innerHTML='';syncInert();if(!silent&&fsOpener&&document.contains(fsOpener))fsOpener.focus()}
