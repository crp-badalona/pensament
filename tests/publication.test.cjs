const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.join(__dirname,'..');
const code=fs.readFileSync(path.join(root,'apps-script/Code.gs'),'utf8');
const demo=JSON.parse(fs.readFileSync(path.join(root,'data/catalog.demo.json'),'utf8')).items;
const base=JSON.parse(JSON.stringify(demo[1]));
Object.assign(base,{'Estat':'Publicat','Revisió pedagògica':'Validada','Data revisió':'2026-10-26','Llicència / drets':'Atribució i condicions de difusió comprovades per la persona revisora.'});
const headers=[...Object.keys(base),'Notes internes'];
let requests=0;
function context(records,cols=headers){
 const data=[cols,...records.map(r=>cols.map(h=>r[h]||''))];
 const c={SpreadsheetApp:{getActiveSpreadsheet:()=>({getSheetByName:()=>({getDataRange:()=>({getDisplayValues:()=>data})})}),getUi:()=>({alert:()=> 'YES',Button:{YES:'YES'},ButtonSet:{YES_NO:'YES_NO'}})},
  PropertiesService:{getScriptProperties:()=>({getProperty:key=>({GITHUB_OWNER:'crp-badalona',GITHUB_REPO:'pensament',GITHUB_TOKEN:'test-only',GITHUB_BRANCH:'main'})[key]})},
  LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},
  UrlFetchApp:{fetch:()=>{requests++;throw Error('No es permet xarxa a la prova')}}};
 vm.createContext(c);vm.runInContext(code,c);return c;
}
let passed=0;
function test(name,fn){fn();passed++;console.log('OK',name)}
function invalid(patch,pattern){assert.throws(()=>context([{...base,...patch}]).getPublicRecords_(),pattern)}
test('Publicat + Validada amb contingut complet s’exporta',()=>assert.equal(context([base]).getPublicRecords_().length,1));
test('Esborrany, En revisió i Arxivat no s’exporten',()=>assert.equal(context(['Esborrany','En revisió','Arxivat'].map(Estat=>({...base,Estat}))).getPublicRecords_().length,0));
test('Una fitxa Publicat amb revisió Pendent bloqueja tot el lot',()=>{
 const c=context([base,{...base,ID:'R003','Revisió pedagògica':'Pendent'}]);assert.throws(()=>c.getPublicRecords_(),/R003.*Validada/);
 assert.throws(()=>c.publishCatalog(),/Publicació bloquejada/);assert.equal(requests,0);
});
test('Revisió En revisió i buida es rebutgen',()=>{for(const v of ['En revisió',''])invalid({'Revisió pedagògica':v},/Validada/)});
test('Capçalera de revisió absent bloqueja, inclòs un lot buit',()=>assert.throws(()=>context([],headers.filter(h=>h!=='Revisió pedagògica')).getPublicRecords_(),/Falta la columna/));
test('Capçaleres duplicades es rebutgen',()=>assert.throws(()=>context([base],[...headers,'Estat']).getPublicRecords_(),/Columna duplicada/));
test('ID duplicat bloqueja',()=>assert.throws(()=>context([base,base]).getPublicRecords_(),/ID duplicat/));
test('Pas 4 absent bloqueja',()=>invalid({'Pas 4':''},/falta Pas 4/));
test('Exemple d’una etapa declarada absent bloqueja',()=>invalid({'Exemple Primària':''},/falta Exemple Primària/));
test('Etapes desconegudes i tipus incorrectes es rebutgen',()=>{invalid({'Etapes':'Universitat'},/etapa no reconeguda/);invalid({'Tipus':'Altres'},/Tipus no vàlid/)});
test('Dates buides, impossibles i malformades es rebutgen',()=>{for(const v of ['','2026-02-30','2026-13-01','26-10-26'])invalid({'Data revisió':v},/Data revisió vàlida/)});
test('Data local i dia de traspàs vàlids s’accepten',()=>{for(const v of ['26/10/2026','2024-02-29'])assert.equal(context([{...base,'Data revisió':v}]).getPublicRecords_().length,1)});
test('Drets pendents bloquegen encara que la revisió digui Validada',()=>{for(const v of ['Pendent de revisió','Cal verificar la llicència'])invalid({'Llicència / drets':v},/drets/)});
test('URL javascript i URL amb espais es rebutgen',()=>{for(const v of ['javascript:alert(1)','https://example.com/a b'])invalid({'URL PDF':v},/URL PDF/)});
test('PDF opcionals i PDF de secundària compatibles',()=>{
 const c=context([{...base,'URL PDF secundària':'https://example.com/secundaria.pdf'}],[...headers,'URL PDF secundària']);assert.equal(c.getPublicRecords_()[0]['URL PDF secundària'],'https://example.com/secundaria.pdf');
});
test('Notes, estat, revisió i data no s’exporten',()=>{
 const r=context([{...base,'Notes internes':'No publicar aquesta nota'}]).getPublicRecords_()[0];
 for(const k of ['Estat','Revisió pedagògica','Data revisió','Notes internes'])assert.equal(k in r,false);
});
console.log(passed+' proves superades. Cap accés a GitHub.');
