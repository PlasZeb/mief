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

## 🔄 Aktuális fejlesztési fázis (2026. június) - Rebranding
A `mief20.md` specifikáció alapján a honlap tartalmi és szerkezeti megújítása zajlik.

### Elvégzett feladatok ✅
- **Főoldal:** Hero szekció, Küldetés, Mivel foglalkozunk, Miért a MIEF, Szakterületeink és Tudástár (Hírek helyett) szekciók frissítve.
- **Navigáció:** Teljesen megújult, reszponzív hamburger menü (z-index fixálva, görgethető, 2xl breakpoint). A logó és márkanév a főoldalra linkelve.
- **Favicon:** Javítva, minden oldalon megjelenik.
- **Szakértőink oldal:** Dedikált `/szakertok` aloldal létrehozva, alapító kiemelve, dinamikus lista bekötve.
- **Eseménytár:** Dedikált `/esemenyek` aloldal létrehozva, múltbeli és jövőbeli események különválasztva.
- **English Summary:** Dedikált `/english` aloldal létrehozva, angol nyelvű tartalom ide áthelyezve a főoldalról.

### Következő lépések 🚀
1. **Tudástár kialakítása (`/tudastar`):**
   - Kategóriák: MIEF Briefs, Állásfoglalások, Ajánlások.
   - Első Brief vázlatok (#001: AI Act, #002: GenAI oktatás).
   - Markdown alapú (Astro Content Collections) tartalomkezelés bevezetése a könnyű bővíthetőségért.
2. **Footer frissítése:**
   - Navigációs linkek bővítése (Szakértők, Események, Tudástár, English).
   - Rövid intézményi leírás frissítése.
3. **Szakértői profilok gazdagítása:**
   - Adatbázis sémabővítés (kulcstéma, miben kereshető mezők hozzáadása).
   - Admin felület felkészítése az új mezők szerkesztésére.

