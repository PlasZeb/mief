# Changelog - MIEF Weboldal

Minden jelentős változtatás ebben a fájlban kerül rögzítésre.

## [1.2.0] - 2026-05-21
### Hozzáadva
- **Dinamikus Szakértői Lista:** Mostantól az admin felületről kezelhető a nyilvános szakértők névsora.
- **LinkedIn integráció:** Közvetlen linkek a MIEF céges oldalára a fejlécben és a láblécben.
- **Esemény státuszok:** Automatikus "Lezajlott" és "Tervezett" címkék a dátum alapján.
- **Notion Adatmigráció:** A korábbi 6 szakmai alkalom sikeresen importálva a D1 adatbázisba.

### Módosítva
- **Branding:** Cím frissítve "MI Etika Fórum"-ra.
- **Design:** Valódi logó (`miem2.jpg`) beillesztése a placeholder elemek helyére.
- **Regisztráció:** Saját szakterület manuális megadásának lehetősége.

## [1.1.0] - 2026-05-21
### Hozzáadva
- **Admin Dashboard:** `/admin` felület események és tagok kezeléséhez.
- **Adatbázis (Cloudflare D1):** SQL alapú perzisztens tárolás.
- **Tagregisztráció:** Működő jelentkezési űrlap adatbázis-mentéssel.

## [1.0.0] - 2026-05-21
### Hozzáadva
- **Kezdőlap:** Astro-alapú "Tech-Focused Dark Mode" landing page.
- **Struktúra:** Navbar, Hero, Küldetés, Fókuszterületek, Kapcsolat szekciók.
- **SSR:** Cloudflare Workers adapter beállítása a dinamikus funkciókhoz.
