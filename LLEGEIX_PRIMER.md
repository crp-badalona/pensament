# Fem visible el pensament · CRP Ciutat de Badalona

Paquet complet actualitzat el 26/10/2026. Web existent: https://crp-badalona.github.io/pensament/.

## Novetats

- Comencem? és el primer bloc, immediatament sota la capçalera.
- Botó Inici a les dues pàgines, dins de les fitxes del catàleg i a les 17 plantilles editables. La capçalera es manté visible mentre es desplaça la pàgina.
- Paleta del web del Servei Educatiu: verd llima #8aa500 i blau turquesa #0988a9, amb variants fosques per al contrast de text.
- Guia amb definicions, diferències, exemples, quatre vídeos, documents i bibliografia.
- Catàleg públic: 18 fitxes, instantània consultada el 26/10/2026. Les dades es continuen gestionant des del Sheets.
- Materials: 36 PDF de fitxes (R001 inclòs), 17 plantilles HTML, 18 portades SVG i dos PDF de referència.

## Actualitzar el web existent

1. Descomprimeix el ZIP. No pugis el ZIP directament.
2. Entra a https://github.com/crp-badalona/pensament i selecciona la branca main.
3. A Code → Add file → Upload files, arrossega EL CONTINGUT de la carpeta descomprimida. index.html ha de quedar a l’arrel, al mateix nivell que styles.css, app.js i theme.css. No arrosseguis la carpeta exterior sencera.
4. Conserva l’estructura de materials/ i data/. La carpeta .github/ és de configuració i pot estar amagada: si ja tens el desplegament actiu, conserva la que hi ha al repositori. No cal canviar apps-script/ ni els paràmetres del teu Sheets.
5. Escriu «Actualitza Comencem, navegació i colors» i prem Commit changes a main.
6. A Actions, espera que Deploy static site to Pages acabi en verd. Si la configuració de Pages no és aquesta, consulta el paràgraf següent.
7. Obre https://crp-badalona.github.io/pensament/ i fes Ctrl+Shift+R (Mac: Cmd+Shift+R).
8. Comprova que Comencem? surt primer, que el botó obre comencem.html i que Inici torna a la portada. Prova una fitxa del catàleg, una plantilla editable i els dos PDF de referència.

El paquet conté menys de 100 fitxers i cap supera 25 MiB. Si el navegador no et deixa pujar-los tots alhora, fes una primera pujada dels fitxers de l’arrel i una altra de materials/ i data/, sempre des de l’arrel del repositori. Si puges fitxers des de dins de materials/ a GitHub, arrossega el seu contingut, no la carpeta materials una altra vegada.

### Configuració de Pages

Com que el web ja funciona, mantén la configuració que ja et publica el lloc. El paquet inclou .github/workflows/pages.yml per a GitHub Actions. Si utilitzes aquest workflow, Settings → Pages → Build and deployment → Source ha de ser GitHub Actions; no cal crear cap workflow addicional. Si publiques directament des d’una branca, aquesta versió també funciona amb main i /(root): comprova el desplegament pages-build-deployment.

### Què cal fer al Sheets?

Per aquests canvis de disseny i navegació, no cal tocar el Sheets ni tornar a enganxar l’Apps Script. El paquet conserva el catàleg públic de 18 fitxes. Si has editat el Sheets després d’aquesta instantània, torna a executar el teu menú Publicació web → Publicar catàleg a GitHub després de pujar el paquet: així s’aplicaran les dades més recents.

### Si encara veus la versió antiga

Comprova primer que el darrer desplegament apareix en verd a Actions. Després fes una recàrrega completa. index.html, comencem.html i theme.css han de ser a l’arrel, no en una subcarpeta. Els estils i scripts duen un identificador de versió per facilitar l’actualització de la memòria cau.

### Comprovacions realitzades

Integritat de les rutes locals i dels materials de les 18 fitxes; ordre del bloc inicial; retorn Inici a totes les pàgines HTML i a la finestra de detall; interaccions de la guia; proves del control de publicació. No s’ha pogut obrir la versió local en el navegador de revisió: cal completar la comprovació visual al web després del desplegament. El paquet encara no s’ha publicat al repositori.

Fonts tècniques: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository i https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.

## Prova local opcional

Des de la carpeta del projecte, executa python3 -m http.server 8000 i obre http://localhost:8000/. index.html necessita HTTP per llegir el JSON del catàleg. ?demo=1 activa les dades de demostració, que no són el catàleg públic.

