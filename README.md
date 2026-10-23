# Fem visible el pensament · CRP Badalona

Web estàtic en català amb cercador i fitxes de rutines i destreses de pensament. Pensat per allotjar a **GitHub Pages** i actualitzar el catàleg des de **Google Sheets** mitjançant **Google Apps Script**.

## Què hi ha al projecte?

- `index.html`, `styles.css`, `app.js`: web accessible i adaptable a mòbil, sense dependències externes.
- `data/catalog.demo.json`: **18 fitxes de demostració** extretes del catàleg mestre, encara pendents de validació pedagògica. Només conté camps destinats a visualització.
- `data/catalog.json`: dades de producció; comença amb **zero fitxes publicades**, per evitar publicar esborranys accidentalment.
- `apps-script/Code.gs`: sincronitzador de Google Sheets a GitHub.
- `.github/workflows/pages.yml`: desplegament automàtic a GitHub Pages.

## Provar la web abans de publicar

1. Descomprimiu el ZIP.
2. Des de la carpeta del projecte, executeu `python -m http.server 8000`.
3. Obriu `http://localhost:8000/?demo=1` per veure les 18 fitxes en mode demostració.
4. Obriu `http://localhost:8000/` per veure el catàleg de producció (inicialment buit).

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
7. Marqueu **Estat = Publicat** únicament a les fitxes revisades i autoritzades.
8. Seleccioneu `Publicació web → Comprovar fitxes publicables` i després `Publicar catàleg a GitHub`.
9. Reviseu `data/catalog.json` al repositori i el resultat al web després del desplegament.

### Seguretat i governança

- El token és **secret**: no el poseu al repositori, en cel·les, captures ni missatges. Si es filtra, revoqueu-lo i creeu-ne un altre.
- `Script Properties` és una configuració del projecte, **no un magatzem segur davant altres editors del mateix script**. Limiteu-ne l'accés a personal de confiança.
- Només s'exporten les files amb `Estat = Publicat` i els camps enumerats a `FIELDS`. Les notes internes, l'estat de revisió i altres camps administratius no s'exporten.
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

No s'ha creat cap repositori ni s'ha publicat cap URL real, perquè encara cal autorització i accés al compte GitHub del CRP. Tampoc s'ha executat la sincronització real amb el Sheets de la XTEC. Les plantilles PDF/editables no s'han generat: els seus camps estan previstos per a futures incorporacions.
