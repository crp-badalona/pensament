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

## Connectar el Google Sheets mestre

1. Pugeu el fitxer Excel mestre a Google Drive i obriu-lo com a Google Sheets.
2. Confirmeu que la primera fila del full `Catàleg mestre` conté els noms de columnes originals (no els modifiqueu).
3. Obriu `Extensions → Apps Script` dins del Sheets.
4. Copieu el contingut de `apps-script/Code.gs` a l'editor i deseu-lo.
5. A **Configuració del projecte → Propietats de l'script**, creeu:
   - `GITHUB_OWNER`: usuari o organització propietària.
   - `GITHUB_REPO`: nom del repositori.
   - `GITHUB_BRANCH`: `main` (opcional).
   - `GITHUB_TOKEN`: token de GitHub *fine-grained* amb accés **només** al repositori i permís `Contents: Read and write`.
6. Torneu a carregar el full de càlcul. Apareixerà el menú **Publicació web**.
7. Quan la revisió estigui acabada, marqueu **Revisió pedagògica = Validada**, completeu **Data revisió** (AAAA-MM-DD o DD/MM/AAAA), deixeu les condicions de drets resoltes i marqueu **Estat = Publicat**. No marqueu Validada només perquè el text estigui complet.
8. Seleccioneu `Publicació web → Comprovar fitxes publicables` i després `Publicar catàleg a GitHub`.
9. Reviseu `data/catalog.json` al repositori i el resultat al web després del desplegament.

### Seguretat i governança

- El token és **secret**: no el poseu al repositori, en cel·les, captures ni missatges. Si es filtra, revoqueu-lo i creeu-ne un altre.
- `Script Properties` és una configuració del projecte, **no un magatzem segur davant altres editors del mateix script**. Limiteu-ne l'accés a personal de confiança.
- Només s'exporten les files amb `Estat = Publicat` i `Revisió pedagògica = Validada`, amb data de revisió, continguts obligatoris i drets sense pendents i els camps enumerats a `FIELDS`. Les notes internes, l'estat de revisió i altres camps administratius no s'exporten.
- El fitxer de demostració és accessible públicament si el repositori es publica. No hi afegiu dades personals ni documents no autoritzats.
- Les fitxes de demostració estan pendents de revisió de continguts, fonts i drets. No les confongueu amb fitxes aprovades.
- La publicació actualitza tot el JSON. Si una fitxa passa a `Arxivat`, desapareixerà en la següent sincronització.
- GitHub Pages és públic: no hi publiqueu dades personals d'alumnat ni documents interns.

## Proves d'acceptació

- [ ] `/?demo=1` mostra 18 fitxes.
- [ ] Cerca textual insensible a accents i majúscules.
- [ ] Filtres d'etapa, finalitat i tipus combinables.
- [ ] Fitxa detallada amb passos, preguntes, exemples i fonts.
- [ ] Navegació per teclat i modal tancable amb Escape.
- [ ] Bona visualització en mòbil i ordinador.
- [ ] La web pública normal només mostra fitxes amb `Estat = Publicat` després de sincronitzar.
- [ ] Edició d'una fitxa a Sheets i sincronització visible al web.
- [ ] Eliminació d'una fitxa publicada en canviar l'estat a `Arxivat`.

## Límits d'aquesta primera versió

El web ja està publicat a https://crp-badalona.github.io/pensament/. Aquest paquet no s’ha desplegat ni ha executat la sincronització real amb el Sheets de la XTEC. Es conserva el botó del PDF de secundària. No s’han generat plantilles noves.


## Actualització del 26 d’octubre de 2026

- R002–R012 i D001–D006 ampliades amb quatre passos, preguntes, exemples de les etapes indicades, suports DUA i evidències orientatives. R001 es conserva.
- Les 17 fitxes ampliades consten com a **En revisió** a l’Excel. Les fonts de les rutines es precisen; les sis destreses es presenten com a propostes didàctiques pròpies, sense atribució a un programa concret.
- Fonts i condicions d’ús es mostren a cada fitxa. Els textos d’aplicació i exemples no s’han de presentar com a traduccions oficials de les plantilles originals.
- No s’afegeixen criteris curriculars oficials ni es pressuposa que els indicadors proposats ho siguin.
- El control de publicació bloqueja tot el lot si alguna fila Publicat no és Validada, té una data invàlida, drets pendents, camps obligatoris buits, etapes desconegudes, exemples absents per a les etapes indicades, URL no http(s) o ID duplicat entre fitxes publicades.
- Les URL de PDF i plantilles són opcionals. No cal inventar enllaços per publicar una fitxa textual. La columna **URL PDF secundària** és opcional i compatible amb el web actual.
- No s’exporten Estat, Revisió pedagògica, Data revisió ni Notes internes al JSON públic.

### Aplicar els canvis al projecte existent

1. Conserveu una còpia del catàleg i del full de treball actuals.
2. Al Google Sheets existent, actualitzeu les files per **ID** amb el contingut de l’Excel. Preserveu els enllaços a PDF o materials que hi hàgiu incorporat després i els camps propis addicionals. No substituïu el full de producció cegament amb aquest Excel.
3. Substituïu el codi del projecte Apps Script vinculat al Sheets per **apps-script/Code.gs** d’aquest paquet. Conserveu les propietats d’autenticació existents. Si el menú Publicació web no apareix, torneu a obrir el full.
4. Al repositori **crp-badalona/pensament**, actualitzeu **app.js**, **README.md** i, si voleu oferir la demostració revisada, **data/catalog.demo.json**. El Code.gs del repositori és una còpia de referència: canviar-lo només a GitHub no actualitza l’Apps Script vinculat al Sheets.
5. **Conserveu data/catalog.json del repositori.** El del ZIP és una instantània de R001, no una nova publicació validada ni una còpia futura del full viu. El catàleg de producció s’ha d’actualitzar amb el sincronitzador després de validar les fitxes. Conserveu també els PDF i altres fitxers del repositori que no inclou aquest paquet.
6. Reviseu el contingut de cada fitxa, la fidelitat de l’atribució, les condicions de reutilització i els enllaços. Registreu Validada, la data i les condicions de drets resoltes només quan s’hagin comprovat. Manteniu R011 pendent fins a aclarir l’autoria i els drets originals.
7. Executeu **Comprovar fitxes publicables** i després **Publicar catàleg a GitHub**. Una fila amb Estat Publicat i revisió no validada atura tot el lot; no s’omet silenciosament.
8. Comproveu el resultat al web públic i a **/?demo=1**, inclosos els botons dels dos PDF de R001 si els seus enllaços són presents al catàleg vigent.

La demostració és accessible públicament si se’n puja el JSON; continua identificada com a material pendent de revisió. El paquet no conté credencials ni modifica estats automàticament.

### Verificació local

Executeu `node tests/publication.test.cjs` per provar els controls sense credencials ni peticions a GitHub. Les proves no executen la sincronització real ni substitueixen la revisió editorial.


## Materials de les altres 17 fitxes

El paquet actual incorpora 34 PDF, 17 plantilles HTML editables i 17 portades SVG a materials/. Les seves URL ja consten a la demostració i a l’Excel. La nova columna URL PDF secundària s’afegeix al final (AH) sense desplaçar les columnes originals. Les fitxes continuen En revisió. Pugeu els fitxers de materials al repositori existent sense eliminar els de R001; manteniu el catàleg de producció i actualitzeu-lo amb el sincronitzador quan s’hagin validat les fitxes.
