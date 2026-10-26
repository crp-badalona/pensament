const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');const assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const page=fs.readFileSync(path.join(root,'comencem.html'),'utf8');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.ok(index.includes('href="comencem.html"'));
assert.ok(index.includes('href="comencem.css?v=20261026-2"'));
assert.equal((page.match(/<h1\b/g)||[]).length,1);
const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
for(const m of page.matchAll(/href="(#[^"]+)"/g))assert.ok(ids.includes(m[1].slice(1)),m[1]);
for(const m of page.matchAll(/(?:href|src)="([^"]+)"/g)){
 const u=m[1];if(u.startsWith('#')||/^https?:/.test(u))continue;
 assert.ok(fs.existsSync(path.join(root,u.split(/[?#]/)[0])),u);
}
assert.ok(!page.includes('href="https://teach-think.org'));
for(const id of ['YP-2XqKtTT8','khAUy7FCjdA','tgUQgKfBx94'])assert.ok(page.includes('https://www.youtube.com/watch?v='+id));
assert.ok(!page.includes('<iframe'));
class Element{
 constructor(data={}){this.dataset=data;this.attrs={};this.events={};this.children=[];this.textContent='';}
 addEventListener(k,fn){this.events[k]=fn}
 setAttribute(k,v){this.attrs[k]=v}
 replaceChildren(...v){this.children=v}
 focus(){this.focused=true}
}
const contexts=['primaria','eso','fp'].map(context=>new Element({context}));
const nodes={};
const videos=[...page.matchAll(/data-video="([^"]+)" data-title="([^"]+)"/g)].map(m=>{
 const slot=new Element({video:m[1],title:m[2]});const btn=new Element();btn.closest=()=>slot;return {slot,btn};
});
const c={document:{querySelectorAll:s=>s==='[data-context]'?contexts:videos.map(x=>x.btn),getElementById:id=>nodes[id]??=new Element(),createElement:()=>new Element()},encodeURIComponent};
vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'comencem.js'),'utf8'),c);
for(const [i,routine,skill] of [[0,'R001','D001'],[1,'R003','D006'],[2,'R008','D004']]){
 contexts[i].events.click();assert.equal(nodes['routine-link'].href,'index.html#fitxa-'+routine);assert.equal(nodes['skill-link'].href,'index.html#fitxa-'+skill);
 assert.equal(contexts.filter(x=>x.attrs['aria-pressed']==='true').length,1);assert.ok(nodes['meta-example'].textContent.length>30);
}
for(const {slot,btn} of videos){btn.events.click();assert.equal(slot.children.length,1);const iframe=slot.children[0];assert.ok(iframe.src.startsWith('https://www.youtube-nocookie.com/embed/'));assert.ok(!iframe.src.includes('autoplay=1'));assert.ok(iframe.title);assert.equal(iframe.focused,true)}
console.log('OK: botó d’entrada, IDs i àncores únics, dependències locals, quatre reproductors sota demanda, tres contextos i enllaços a les fitxes correctes.');
