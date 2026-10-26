'use strict';
const classroomContexts={
  primaria:{title:'Dues imatges de la platja de Badalona',description:'Observem dues fotografies del mateix indret en moments diferents. A Infantil, prioritzem la conversa i el registre amb dibuix o dictat a l’adult.',routine:'Veig · Penso · Em pregunto',routineText:'Descrivim detalls, proposem interpretacions i formulem preguntes. Separem allò que observem d’allò que suposem.',routineId:'R001',skill:'Comparar i contrastar',skillText:'Acordem què compararem, apliquem els mateixos criteris a les dues imatges i formulem una conclusió basada en els detalls registrats.',skillId:'D001',meta:'Quin criteri ens ha ajudat? Quina idea hem canviat? Què ens falta per comprovar les causes dels canvis?'},
  eso:{title:'Una notícia sobre el nostre entorn',description:'Analitzem una afirmació publicada sobre Badalona. Triem un tema que es pugui contrastar amb fonts accessibles i pertinents.',routine:'Afirmació · Evidència · Pregunta',routineText:'Precisem què afirma la notícia, identifiquem quines proves aporta i formulem una pregunta sobre allò que no queda prou justificat.',routineId:'R003',skill:'Avaluar la fiabilitat de fonts',skillText:'Localitzem l’autoria i l’origen de les dades, comprovem la data i el context i cerquem corroboració independent. Diferenciem allò fals d’allò que encara no podem confirmar.',skillId:'D006',meta:'Quina font ens ha fet revisar la primera impressió? Quina comprovació ha estat més útil? Què encara no podem confirmar?'},
  fp:{title:'Triar entre diverses solucions professionals',description:'En un cas simulat de l’especialitat, hem de triar un material o un procediment amb uns requisits concrets de qualitat, accessibilitat, recursos i seguretat.',routine:'Brúixola',routineText:'Explorem oportunitats, preocupacions, informació que falta i una primera posició sobre les alternatives, abans de prendre una decisió.',routineId:'R008',skill:'Prendre decisions amb criteris',skillText:'Distingim requisits imprescindibles de preferències, comparem alternatives amb dades i justifiquem la tria. Deixem explícites les condicions que la farien revisar.',skillId:'D004',meta:'Quin criteri ha pesat més i per què? Qui queda afectat per la decisió? Quina dada o prova ens faria canviar d’opció?'}
};
const contextButtons=document.querySelectorAll('[data-context]');
for(const button of contextButtons){button.addEventListener('click',()=>{
 const item=classroomContexts[button.dataset.context];if(!item)return;
 for(const peer of contextButtons)peer.setAttribute('aria-pressed',String(peer===button));
 const text={'context-title':item.title,'context-description':item.description,'routine-name':item.routine,'routine-example':item.routineText,'skill-name':item.skill,'skill-example':item.skillText,'meta-example':item.meta};
 for(const [id,value] of Object.entries(text))document.getElementById(id).textContent=value;
 for(const [id,kind,label] of [['routine-link','routineId','rutina'],['skill-link','skillId','destresa']]){
  const link=document.getElementById(id);link.href='index.html#fitxa-'+item[kind];link.textContent='Obre la '+label+' '+item[kind]+' →';
 }
});}
for(const button of document.querySelectorAll('.video-play')){button.addEventListener('click',()=>{
 const slot=button.closest('.video-slot');const id=slot.dataset.video;
 if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
 const iframe=document.createElement('iframe');
 iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?rel=0';
 iframe.title=slot.dataset.title;iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
 iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.setAttribute('tabindex','0');
 slot.replaceChildren(iframe);iframe.focus();
});}
