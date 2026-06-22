# MIEF - Technikai Útmutató (Development Handbook)

Ez a dokumentum segítséget nyújt a weboldal karbantartásához és fejlesztéséhez.

## 🛠 Technológiai stack
- **Framework:** Astro 6 (SSR mód)
- **Design:** Tailwind CSS (v4)
- **Deployment:** Cloudflare Workers
- **Database:** Cloudflare D1 (SQL)

## 📁 Projektstruktúra
- `src/pages/`: Az oldal útvonalai (Főoldal, Admin oldalak).
- `src/components/`: Újrafelhasználható UI elemek (Navbar, Footer, Card).
- `public/assets/`: Képek és statikus fájlok.
- `schema.sql`: Az adatbázis szerkezete.
- `wrangler.jsonc`: Cloudflare konfiguráció.

## 🎨 Starwind scaffold
A projektben korábban egy Starwind-alapú Tailwind scaffold is megjelent, amely külön fájlokban maradt meg:
- `src/styles/starwind.css`
- `starwind.config.json`
- `.vscode/starwind.code-snippets`

Ebből a következők voltak a fő felhasznált elemek:
- Tailwind v4 alap
- CSS variable alapú szín- és radius rendszer
- `@tailwindcss/forms`
- `tw-animate-css`
- dark/light theme változók

A végleges, jelenleg használt nyilvános arculat már a `src/styles/global.css` és az új Astro komponensek alapján működik, nem a Starwind preset maradt az aktív design rendszer.

## 🚀 Helyi fejlesztés
1. Installáció: `npm install`
2. Környezeti változók: Hozz létre egy `.dev.vars` fájlt:
   ```env
   ADMIN_PASSWORD=te_jelszavad
   ```
3. Indítás: `npm run dev`

## 📊 Adatbázis kezelés (Cloudflare D1)
Az adatbázis tábláit a `wrangler` CLI segítségével tudod kezelni:
- Helyi változtatások élesítése: `npx wrangler d1 execute mief-db --file=schema.sql --remote`
- Adatok lekérése terminálból: `npx wrangler d1 execute mief-db --command="SELECT * FROM registrations" --remote`

## 🔐 Adminisztráció
Az oldal admin felülete a `/admin` útvonalon érhető el.
- **Események:** Új alkalmak felvitele, szerkesztése, törlése. A rendszer automatikusan kezeli a "Lezajlott/Tervezett" státuszt.
- **Tagok:** A jelentkezők listájának megtekintése és exportálása (manuálisan).
- **Szakértők:** A főoldali nyilvános szakértői lista kezelése.
- **Feliratkozók** (`/admin/subscribers`)**:** Az esemény-értesítőre feliratkozók listája (név + email). Törölhetők egyenként.

## 📧 Email integráció (Resend)
- Szolgáltató: [resend.com](https://resend.com)
- Trigger: új esemény mentésekor a `/admin/programs` felületen
- Címzettek: a `subscribers` tábla összes emailje
- API kulcs tárolása: Cloudflare Workers Secret (`RESEND_API_KEY`)
  - Feltöltés: `npx wrangler secret put RESEND_API_KEY`
  - Lokális fejlesztéshez: `.dev.vars` fájlba `RESEND_API_KEY=re_...`
- Feladó: `MIEF <noreply@mief.hu>` (domain hitelesítés szükséges a Resend dashboardon)

## 💡 Javaslatok a jövőre
1. **E-mail küldés:** Érdemes integrálni a [Resend](https://resend.com) szolgáltatást, hogy a regisztrációkról azonnali értesítést kapj.
2. **Biztonsági mentés:** Bár a D1 megbízható, havonta egyszer érdemes egy SQL dump-ot készíteni: `npx wrangler d1 export mief-db --remote --output=backup.sql`.
3. **Admin jelszó:** A jelszót a Cloudflare Dashboard-on bármikor megváltoztathatod a "Settings -> Variables" menüpont alatt (`ADMIN_PASSWORD`).

---

## 🔄 Aktuális fejlesztési fázis (2026. június) - Világos intézményi redesign
A honlap vizuális rétege most a világos intézményi irányba alakul, miközben a mély tengerészkék és a cián továbbra is a MIEF márka része marad.

### Elvégzett feladatok ✅
- **Globális design system:** Új, világos alapú szín- és tipográfiai rendszer a `src/styles/global.css` fájlban.
- **Új komponensek:** `Hero.astro`, `SectionHeader.astro`, `BriefCard.astro`, `ExpertCard.astro`, `EventCard.astro`, `CTA.astro`.
- **Navbar és Footer:** Egységes, világos fejlesztői/nyilvános arculatra hangolva.
- **Főoldal:** A nyitóélmény és a fő szekciók új vizuális rendszerre álltak át, a DB-logika változatlan maradt.
- **Tudástár:** Új `/tudastar` oldal készült szerkesztőségi, kategóriás felépítéssel; a régi `/publikaciok` cím átirányító burkolatként maradt meg.
- **Szakértőink oldal:** Világos, intézményi kártyarendszerre váltott.
- **Események oldal:** Az eseménylisták és feliratkozási felület új, tisztább vizuális keretet kaptak.
- **Publikációk oldal:** A tudástár új kártyarendszerrel és oldalszerkezettel jelenik meg.
- **English Summary:** Az angol összefoglaló oldal is az új arculatot követi.
- **Biztonsági mentés:** A redesign előtt helyi, fájlszintű mentés készült a jelenlegi állapotról.

### Következő lépések 🚀
1. **Tudástár bővítése (`/tudastar`):**
   - Kategóriák: MIEF Briefs, Állásfoglalások, Ajánlások.
   - Markdown alapú tartalomkezelés bevezetése a hosszú távú bővíthetőséghez.
2. **Admin felület vizuális összhangja:**
   - Az admin oldalak később kaphatnak könnyített, az új nyilvános designhoz illeszkedő frissítést.
3. **Szakértői profilok gazdagítása:**
   - Adatbázis sémabővítés (kulcstéma, miben kereshető mezők hozzáadása).
   - Admin felület felkészítése az új mezők szerkesztésére.

