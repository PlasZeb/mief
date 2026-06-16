# Changelog - MI Etika Fórum (MIEF)

Minden jelentős változtatás ebben a fájlban kerül rögzítésre.

## [1.6.1] - 2026-06-16
### Megváltoztatva
- **Névcsere – Műhelyek/Programok:** A saját MIEF alkalmak (korábban „Eseménytár") átnevezve „Műhelyek"-re a navigációban, főoldalon és az `/esemenyek` oldalon. A külsős programajánló a navigációban „Programok" névvel szerepel (belső neve marad: Programajánló).
- **Főoldal szekciók:** „Eseménytár" szekciókicker → „Műhelyek"; gomb szövege → „Teljes műhelytár megnyitása".

### Hozzáadva
- **Programajánló – Előadó mező:** Új „speaker" oszlop a `programs` táblában. Az admin felületen megadható, ki(k) adnak elő MIEF tagok közül. A főoldalon a kártyán 🎤 ikonnal jelenik meg.

## [1.6.0] - 2026-06-16
### Hozzáadva
- **Feliratkozói rendszer:** Új `subscribers` tábla az adatbázisban (név, email, dátum). Külön, a `registrations` táblától független.
- **Feliratkozó form:** Az Eseménytár oldal (`/esemenyek`) alján megjelent egy feliratkozási űrlap, ahol névvel és email címmel lehet feliratkozni az új esemény-értesítőkre.
- **Admin: Feliratkozók menüpont:** Új `/admin/subscribers` oldal, ahol látható az összes feliratkozó név/email/dátum adatokkal, egyenként törölhetők.
- **Email értesítés (Resend integráció):** Új program admin felvételénél automatikusan email megy ki az összes feliratkozónak a Resend API-n keresztül. A `RESEND_API_KEY` titok Cloudflare Workers Secrets-ben tárolva.
- **Admin navigáció:** „Feliratkozók" link megjelent minden admin oldalon (Események, Tagok, Szakértők).

## [1.5.2] - 2026-06-09
### Megváltoztatva
- **Programok Admin:** Az automatikus törlés helyett vizuális kiemelés. A lejárt események (dátum alapján) piros háttérrel és "Lejárt" felirattal jelennek meg, manuálisan törölhetők.

## [1.5.1] - 2026-06-09
### Hozzáadva
- **Programok Admin:** "Felvivő neve" mező hozzáadva a beküldő nyomon követéséhez (csak admin felületen).
- **Automata takarítás:** A programajánlók a rögzítés után 3 nappal automatikusan törlődnek.

### Javítva
- **Navigáció:** A fejléc "Csatlakozás" gombja most már a regisztrációs szekcióhoz (`#regisztracio`) görget a kapcsolat helyett.

## [1.5.0] - 2026-06-08
### Hozzáadva
- **Programok Admin felület:** Új, dedikált külső adminisztrációs felület a programok kezeléséhez (`/admin/programs`).
- **Szerkesztési funkció:** A programok mostantól közvetlenül az admin felületen keresztül szerkeszthetők.
- **Custom Favicon:** Az alapértelmezett Astro ikon lecserélve a MIEF saját `favicon.ico`-jára.

### Javítva
- **Admin UI:** Szintaktikai hibák javítva a programkezelő felületen, amelyek korábban build hibákat okoztak.

## [1.4.1] - 2026-05-28
### Hozzáadva
- **Navigáció:** "Események" menüpont hozzáadva a fejléchez a könnyebb elérhetőség érdekében.

## [1.4.0] - 2026-05-25
### Hozzáadva
- **LinkedIn Hírek szekció:** Új, vizuális blokk a kezdőlapon a szakmai tartalmak és írások kiemelésére.
- **Navigációs fejlesztés:** "Hírek" menüpont a fejlécben, amely közvetlenül a LinkedIn szekcióhoz görget.
- **Prominensebb Social link:** A fejlécben a LinkedIn ikon mellett szöveges felirat is megjelent a jobb érthetőség érdekében.

## [1.3.0] - 2026-05-21 (Aktuális munkamenet lezárása)
### Hozzáadva
- **Esemény Csatlakozási Link:** Külön `join_url` mező az adatbázisban és az admin felületen (Teams, Zoom, Teamspeak linkekhez).
- **Angol nyelvű szekció:** Diszkrét "Who We Are" blokk nemzetközi látogatóknak.
- **Navigációs fejlesztés:** "English" menüpont a fejlécben és a láblécben.
- **Inkluzivitás:** "...és további szakterületek" címke a célcsoportoknál.

### Javítva
- **Admin Szerkesztés:** Minden egyes esemény és szakértő külön-külön szerkeszthetővé vált (Data-attribútum alapú fix).
- **Helyesírás:** "képviselői" elírás javítva a bemutatkozásban.
- **Branding konzisztencia:** "Szakmai" szó eltávolítva a láblécből és a metaadatokból.
- **E-mail címek:** Az összes elérhetőség frissítve az új `info@mief.hu` címre.

## [1.2.0] - 2026-05-21
### Hozzáadva
- **Dinamikus Szakértői Lista:** Admin felületről kezelhető nyilvános névsor.
- **LinkedIn integráció:** Közvetlen linkek a MIEF céges oldalára.
- **Esemény státuszok:** Automatikus "Lezajlott" és "Tervezett" jelzések dátum alapján.
- **Notion Adatmigráció:** A korábbi 6 szakmai alkalom importálva a screenshot alapján.

## [1.1.0] - 2026-05-21
### Hozzáadva
- **Admin Dashboard:** `/admin` felület (Események, Tagok, Szakértők).
- **Adatbázis (Cloudflare D1):** Valódi SQL tárolás a tartalomnak.
- **Astro SSR:** Dinamikus szerveroldali működés Cloudflare Workers-en.

## [1.0.0] - 2026-05-21
### Hozzáadva
- **Kezdőlap:** Astro + Tailwind "Tech-Focused Dark Mode" landing page.
- **Branding:** Saját logó (`miem2.jpg`) beillesztése.
