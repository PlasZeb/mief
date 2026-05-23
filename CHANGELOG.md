# Changelog - MI Etika Fórum (MIEF)

Minden jelentős változtatás ebben a fájlban kerül rögzítésre.

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
