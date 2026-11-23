const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..');
const pages=['index.html','caixa-eines.html','documentacio.html','autories.html','sobre.html'];
const labels=['Inici','Caixa d’eines. Explora el catàleg','Documentació i bibliografia','Autors i fonts','Sobre el projecte'];
for(const page of pages){
 const html=fs.readFileSync(path.join(root,page),'utf8');
 const nav=html.match(/<nav aria-label="Navegació principal">(.*?)<\/nav>/s)[1];
 const links=[...nav.matchAll(/<a([^>]+)>(.*?)<\/a>/g)];assert.equal(links.length,5);
 links.forEach((a,i)=>{assert(a[1].includes(`href="${pages[i]}"`));assert(a[2].includes(labels[i]));assert.equal(a[1].includes('aria-current="page"'),page===pages[i]);});
 assert.equal((html.match(/<h1\b/g)||[]).length,1,page);
 assert(html.includes('navigation.css?v=20261123'));
}
for(const [file,hash,target] of [['index.html','#fitxa-R001','caixa-eines.html#fitxa-R001'],['index.html','#cataleg','caixa-eines.html#cataleg'],['index.html','#sobre','sobre.html'],['comencem.html','#videos','documentacio.html#videos'],['comencem.html','#conceptes','index.html#conceptes'],['documentacio.html','#aula','index.html#aula'],['index.html','#bibliografia','documentacio.html#bibliografia']]){
 let result='';const ctx={location:{pathname:'/pensament/'+file,hash,search:'?demo=1',replace:s=>result=s},window:{addEventListener(){}}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'legacy-links.js'),'utf8'),ctx);const [fileTo,anchor='']=target.split('#');assert.equal(result,fileTo+'?demo=1'+(anchor?'#'+anchor:''));
}
class El{constructor(){this.children=[];this.value='';this.style={};this.events={};this.open=false;}append(...v){this.children.push(...v)}replaceChildren(...v){this.children=v}addEventListener(k,f){this.events[k]=f}setAttribute(){}scrollIntoView(){this.scrolled=true}showModal(){this.open=true}close(){this.open=false}}
(async()=>{
 const nodes={};const context={document:{getElementById:id=>nodes[id]??=new El(),createElement:()=>new El()},location:{pathname:'/pensament/caixa-eines.html',search:'',hash:''},URL,URLSearchParams,history:{replaceState(){}},console,fetch:async u=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,u.split('?')[0]),'utf8'))})};
 vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8').replace(/init\(\);\s*$/,''),context);await vm.runInContext('init()',context);
 const all=JSON.parse(fs.readFileSync(path.join(root,'data/catalog.json'),'utf8')).items;assert.equal(nodes.results.children.length,all.length);assert.equal(nodes.categoryCards.children.length,6);
 for(const [i,goal] of ['Observar','Investigar','Argumentar','Comparar','Perspectives','Reflexionar'].entries()){
  nodes.categoryCards.children[i].events.click();assert.equal(nodes.goal.value,goal);assert(nodes.propostes.scrolled);
  const count=all.filter(x=>x['Finalitat principal']===goal||String(x['Finalitats secundàries']).split(';').includes(goal)).length;assert.equal(nodes.results.children.length,count,goal);
 }
 nodes.clear.events.click();assert.equal(nodes.results.children.length,all.length);
 nodes.results.children[0].children.at(-1).events.click();assert.equal(nodes.detail.open,true);assert(nodes.detailContent.children.length>4);
 console.log('OK: cinc pàgines, menú ordenat i actiu, rutes antigues, sis finalitats amb filtratge real, neteja de filtres i obertura de fitxa.');
})().catch(e=>{console.error(e);process.exit(1)});
