/**
 * Afegiu aquesta funció al projecte Apps Script del Sheets existent.
 * Abans, importeu URL_materials_pensament.csv en una pestanya «URL materials».
 * Actualitza només quatre camps d’URL per ID; no publica ni canvia estats.
 */
function actualitzaURLMaterials() {
 const lock=LockService.getDocumentLock();
 if(!lock.tryLock(30000))throw new Error('Ja hi ha una actualització en curs');
 try {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const target=ss.getSheetByName('Catàleg mestre');
  const source=ss.getSheetByName('URL materials');
  if(!target||!source)throw new Error('Calen les pestanyes Catàleg mestre i URL materials');
  const rows=target.getDataRange().getDisplayValues();
  const links=source.getDataRange().getDisplayValues();
  const header=(rows[0]||[]).map(v=>String(v).trim());
  const sourceHeader=(links[0]||[]).map(v=>String(v).replace(/^\uFEFF/,'').trim());
  const fields=['URL PDF','URL PDF secundària','URL plantilla editable','URL imatge'];
  ['ID',...fields].forEach(h=>{
   if(sourceHeader.indexOf(h)<0)throw new Error('Falta la columna '+h+' a URL materials');
   if(sourceHeader.indexOf(h)!==sourceHeader.lastIndexOf(h))throw new Error('Columna duplicada a URL materials: '+h);
  });
  ['ID',...fields.filter(f=>f!=='URL PDF secundària')].forEach(h=>{
   if(header.indexOf(h)<0)throw new Error('Falta la columna '+h+' a Catàleg mestre');
  });
  ['ID',...fields].forEach(h=>{
   if(header.includes(h)&&header.indexOf(h)!==header.lastIndexOf(h))throw new Error('Columna duplicada a Catàleg mestre: '+h);
  });
  const allowed=[];
  for(let n=2;n<=12;n++)allowed.push('R'+String(n).padStart(3,'0'));
  for(let n=1;n<=6;n++)allowed.push('D'+String(n).padStart(3,'0'));
  const ids=new Map();
  rows.slice(1).forEach((row,i)=>{
   const id=String(row[header.indexOf('ID')]||'').trim();
   if(!allowed.includes(id))return;
   if(ids.has(id))throw new Error('ID duplicat a Catàleg mestre: '+id);
   ids.set(id,i+2);
  });
  const found=new Set();const updates=[];
  links.slice(1).forEach((row,i)=>{
   if(row.every(v=>!String(v).trim()))return;
   const id=String(row[sourceHeader.indexOf('ID')]||'').trim();
   if(!allowed.includes(id))throw new Error('ID no previst a URL materials, fila '+(i+2)+': '+id);
   if(found.has(id))throw new Error('ID duplicat a URL materials: '+id);
   if(!ids.has(id))throw new Error('No trobo '+id+' a Catàleg mestre');
   found.add(id);
   fields.forEach(field=>{
    const url=String(row[sourceHeader.indexOf(field)]||'').trim();
    const prefix='https://crp-badalona.github.io/pensament/materials/'+id+'_';
    const extension=field==='URL imatge'?'.svg':field==='URL plantilla editable'?'.html':'.pdf';
    if(!url.startsWith(prefix)||!url.endsWith(extension)||/\s/.test(url))
     throw new Error(id+': URL absent o incompatible a '+field);
    updates.push({row:ids.get(id),field,url});
   });
  });
  const missing=allowed.filter(id=>!found.has(id));
  if(missing.length)throw new Error('Falten ID a URL materials: '+missing.join(', '));
  // Totes les comprovacions anteriors precedeixen la primera escriptura.
  let secondaryColumn=header.indexOf('URL PDF secundària')+1;
  if(!secondaryColumn){
   secondaryColumn=target.getLastColumn()+1;
   if(secondaryColumn>target.getMaxColumns())target.insertColumnAfter(target.getMaxColumns());
   target.getRange(1,secondaryColumn).setValue('URL PDF secundària');
  }
  updates.forEach(u=>{
   const col=u.field==='URL PDF secundària'?secondaryColumn:header.indexOf(u.field)+1;
   target.getRange(u.row,col).setValue(u.url);
  });
  ss.toast('17 fitxes: 68 URL actualitzades. No s’ha modificat R001 ni s’ha publicat cap fitxa.','Materials de pensament',10);
 } finally { lock.releaseLock(); }
}
