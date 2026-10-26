# Fem visible el pensament · CRP Badalona

Web estàtic en català amb cercador i fitxes de rutines i destreses de pensament. Pensat per allotjar a **GitHub Pages** i actualitzar el catàleg des de **Google Sheets** mitjançant **Google Apps Script**.

## Què hi ha al projecte?

- `index.html`, `styles.css`, `app.js`: web accessible i adaptable a mòbil, sense dependències externes.
- `data/catalog.demo.json`: **18 fitxes de demostració** extretes del catàleg mestre, encara pendents de validació pedagògica. Només conté camps destinats a visualització.
- `data/catalog.json`: instantània del catàleg públic consultat el 26/10/2026, amb R001 i els seus enllaços. No incorpora les fitxes noves pendents de validar.
- `apps-script/Code.gs`: sincronitzador de Google Sheets a GitHub.
- `.github/workflows/pages.yml`: desplegament automàtic a GitHub Pages.

## Provar la web abans de publicar

1. Descomprimiu el ZIP.
2. Des de la carpeta del projecte, executeu `python -m http.server 8000`.
3. Obriu `http://localhost:8000/?demo=1` per veure les 18 fitxes en mode demostració.
4. Obriu `http://localhost:8000/` per veure la còpia del catàleg públic existent (R001).

**No** obriu directament `index.html` amb `file://`: la càrrega del JSON requereix un servidor HTTP.

## Publicar a GitHub Pages

1. Creeu un repositori, per exemple `fem-visible-el-pensament` (pot ser públic; GitHub Pages públic mostra continguts públics).
2. Pugeu el **contingut de la carpeta** al directori arrel de la branca `main` (no una carpeta addicional que contingui els fitxers).
3. A `Settings → Pages`, seleccioneu **GitHub Actions** com a font de publicació.
4. A `Actions`, comproveu que el workflow `Deploy static site to Pages` ha finalitzat correctament.
5. L'URL serà habitualment `https://USUARI.github.io/fem-visible-el-pensament/`, substituint USUARI i el nom real del repositori. No doneu l'URL per vàlid fins que GitHub confirmi el desplegament.

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
