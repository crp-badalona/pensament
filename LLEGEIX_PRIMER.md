# Actualització d’originals, autories i referents

29 d’octubre de 2026. Aquest paquet substitueix l’actualització anterior d’originals de Project Zero. És un paquet per afegir al web existent, no un lloc independent.

## Aplicar els canvis al web

1. Descomprimeix el ZIP.
2. Obre https://github.com/crp-badalona/pensament a la branca main.
3. Puja el contingut respectant les carpetes:
   - A l’arrel: substitueix index.html, app.js i comencem.html; afegeix autories.html.
   - A data: afegeix o substitueix originals-pz.json.
   - A materials: afegeix originals-pz i interpretacions, i substitueix les 17 plantilles HTML editables incloses.
4. Conserva la resta dels fitxers: styles.css, theme.css, comencem.css, comencem.js, els PDF de l’alumnat, imatges i el catàleg existent. No s’han de buidar les carpetes abans de pujar els fitxers.
5. Fes Commit changes i espera que el desplegament de Pages finalitzi.
6. Recarrega amb Ctrl+Shift+R. Comprova R001 (dos originals descarregables), R010 (Donna Ogle), R011 (autoria no confirmada), D001 (referent de comparació i contrast), D006 (SIFT i lectura lateral), les orientacions en català i el retorn a l’inici.

No cal executar l’Apps Script ni modificar el Sheets perquè el web mostri les atribucions corregides. El registre d’autories es carrega independentment del catàleg i no se sobreescriu en publicar des del Sheets. El paquet no inclou ni substitueix data/catalog.json ni data/catalog.demo.json.

## Organització de l’autoria

Cada fitxa i cada material HTML inclouen:
- Autoria confirmada de l’estratègia o referents pedagògics verificats.
- Estat de la verificació i límits d’atribució.
- Elaboració dels materials del catàleg, diferenciada de la invenció de l’habilitat.
- Enllaços de referència.

La pàgina autories.html reuneix les 18 entrades i les condicions dels documents. Es pot obrir des d’Inici, Comencem? i les fitxes.

R001–R009 i R012: rutines de Project Zero amb 20 PDF oficials, deu en anglès i deu en castellà. Còpies sense modificar amb crèdits i CC BY-NC-ND 4.0. El registre conserva la URL oficial, la data de verificació i SHA-256. R009 anglès correspon al PDF oficial de 2019 amb llicència explícita; la pàgina actual indica «Adapted» i no és una edició idèntica.

R010: K-W-L de Donna M. Ogle (1986), amb referència a l’article original i al seu DOI. No es redistribueix l’article: no s’ha verificat una llicència de redistribució.

R011: ús documentat a Bocins de música i autoria original pendent de confirmar. Ni allotjar una plantilla ni les metadades del document permeten acreditar la persona creadora. No es distribueix la plantilla de tercers.

D001: comparació i contrast documentada per Swartz i McGuinness (2014).
D002: classificació, entre altres marcs, a Dimensions of Learning de Marzano i col·laboradors.
D003: explicació causal documentada en Swartz i McGuinness (2014).
D004: presa de decisions amb destresa del TBL, desenvolupat per Swartz i col·laboradors.
D005: referent clàssic de Pólya, How to Solve It (1945).
D006: referents SIFT de Mike Caulfield i lectura lateral de Wineburg i McGrew.

Aquests referents no acrediten un creador exclusiu de les habilitats ni demostren que les fitxes del catàleg siguin adaptacions directes. Els textos ho indiquen expressament.

## Originals, interpretacions i fulls d’alumnat

Els originals es descarreguen sense canvis de llengua, maquetació o contingut. Les orientacions en català es presenten amb «Si vols la nostra interpretació en català...» i no es fan passar per traduccions oficials o autoritzades. Inclouen exemples i suports didàctics preparats per al CRP. Els fulls PDF per a l’alumnat es conserven intactes i apareixen com a materials diferents dels originals. La llicència de Harvard no s’aplica automàticament als materials propis ni a les altres fonts.

S’ha retirat de les recomanacions de Comencem? el recull visual que no identificava clarament l’autoria. No cal esborrar fitxers del repositori per instal·lar aquest paquet.

## Taules de consulta

URL_originals_Project_Zero.csv: fonts, idioma, PDF oficial i descàrrega al web, amb l’estat d’atribució actualitzat.
ATRIBUCIONS_CATALEG.csv: propostes corregides per als camps «Font / autoria», «URL font» i «Llicència / drets», relacionades per ID. És un document de consulta: si el traspasses al Sheets, fes-ho pel nom de columna i per ID, sense substituir textos, estats de publicació, validació o dates. El funcionament del web no depèn d’aquest traspàs.

## Verificació

18 atribucions i referents; 18 pàgines d’interpretació; 17 plantilles editables; navegació al registre; 20 originals PDF amb integritat SHA-256; sintaxi JavaScript i prova funcional dels blocs de fitxa comprovades. Els scripts de prova locals no s’inclouen com a contingut del web.

La publicació a GitHub no s’ha pogut fer perquè no hi ha una sessió connectada amb accés al repositori. Aquesta actualització no s’ha revisat visualment en un navegador després de publicar.
