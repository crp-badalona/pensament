# Materials de les 17 fitxes de pensament

Conté R002-R012 i D001-D006. No substitueix R001 ni els seus dos PDF.

## Què inclou

- 34 PDF d’una pàgina: dues versions per fitxa. La primera s’adreça a Infantil i Primària només quan el catàleg preveu Infantil; si no, indica Primària. La segona s’adreça a ESO, Batxillerat i FP.
- 17 plantilles HTML editables amb selector de versió. Es poden editar els títols, les preguntes i les respostes, desar una còpia HTML local i imprimir-la. La impressió d’HTML pot ocupar més d’una pàgina segons les respostes; els PDF proporcionats són d’una pàgina.
- 17 portades SVG amb text i gràfica vectorial propis.
- Taula d’URL en CSV, TSV i Excel, ordenada pels ID.

## Fer que les URL funcionin

1. Descomprimeix el ZIP.
2. Entra al repositori https://github.com/crp-badalona/pensament i obre la carpeta materials que ja existeix.
3. Tria Add file > Upload files i arrossega-hi els 68 fitxers de la carpeta materials d’aquest ZIP. No arrosseguis una altra carpeta materials dins de la que ja existeix: els fitxers han de quedar a pensament/materials/NOM_FITXER.
4. Desa els canvis amb Commit changes i espera que GitHub Pages completi la publicació.
5. Obre un PDF i una plantilla des de la taula d’URL per comprovar que es carreguen. Abans de pujar els fitxers, aquestes adreces encara no estaran disponibles.
6. No esborris ni substitueixis els PDF de R001. Els noms nous corresponen exclusivament a les altres 17 fitxes.

## Traspassar només les URL al Google Sheets

La taula URL_materials_pensament.xlsx conté una fila per ID i quatre columnes d’URL. No modifica els estats ni publica el catàleg.

Si el teu Sheets manté exactament l’ordre i les 33 columnes originals:
- X = URL plantilla editable.
- Y = URL PDF (Infantil/Primària o Primària segons la fitxa).
- Z = URL imatge.
- Afegeix una columna al final, després de Notes internes, amb la capçalera exacta URL PDF secundària. En l’Excel actualitzat és AH; si el teu Sheets ja tenia aquesta columna, reutilitza-la allà on sigui i no la dupliquis.
- R002-R012 i D001-D006 són les files 3-19. Copia les URL corresponents amb Enganxament especial > Només valors, després de comprovar els ID.

Si has reordenat files o columnes, localitza cada ID i cada capçalera abans d’enganxar. No enganxis els quatre camps sobre columnes consecutives sense mirar els noms: URL PDF secundària és al final del catàleg, mentre que les altres tres són X, Y i Z.

També pots utilitzar la funció actualitzaURLMaterials del fitxer ACTUALITZA_URL_MATERIALS.gs inclòs: enganxa primer la taula CSV en una pestanya del mateix Sheets anomenada URL materials, afegeix la funció al projecte Apps Script existent i executa-la una vegada. Comprova els ID, només actualitza les quatre columnes d’URL de les 17 fitxes i afegeix URL PDF secundària al final si falta. No modifica R001, textos ni estats i no publica a GitHub.

## Catàleg i web

Les 17 fitxes continuen En revisió. Generar un PDF no equival a validar-ne la metodologia, els exemples ni les condicions de difusió. Les portades i els organitzadors s’han elaborat per a aquest projecte; no s’han copiat les plantilles originals de tercers.

L’Apps Script de publicació del ZIP del web ja exporta URL PDF secundària si existeix. El seu app.js mostra el botó corresponent. Conserva els enllaços actuals de R001 i no substitueixis el JSON de producció per una demostració.

No s’ha creat cap Google Sites. El camp URL fitxa Sites es manté buit perquè el projecte utilitza GitHub Pages. Les URL font ja recullen les referències de cada fitxa; no es reemplacen per les URL dels materials.

Totes les adreces de la taula corresponen a fitxers inclosos al ZIP, però estan pendents de publicació a GitHub. No s’ha modificat el web públic.
