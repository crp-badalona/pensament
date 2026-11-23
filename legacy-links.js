'use strict';
function routeLegacyLinks(){
 const page=location.pathname.split('/').pop();const hash=location.hash;
 const intro=['#conceptes','#diferencies','#aula','#primers-passos','#rutines-destreses'];
 const resources=['#videos','#recursos','#bibliografia'];
 if(page==='comencem.html'){
  const target=resources.includes(hash)?'documentacio.html':'index.html';
  location.replace(target+location.search+(hash||'#rutines-destreses'));return;
 }
 if(page==='documentacio.html'&&intro.includes(hash)){location.replace('index.html'+location.search+hash);return}
 if((page==='index.html'||page==='')&&resources.includes(hash)){location.replace('documentacio.html'+location.search+hash);return}
 if(hash.startsWith('#fitxa-')||hash==='#cataleg'){location.replace('caixa-eines.html'+location.search+hash);return}
 if(hash==='#sobre')location.replace('sobre.html'+location.search);
}
routeLegacyLinks();window.addEventListener('hashchange',routeLegacyLinks);
