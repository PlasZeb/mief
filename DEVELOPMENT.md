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

## 💡 Javaslatok a jövőre
1. **E-mail küldés:** Érdemes integrálni a [Resend](https://resend.com) szolgáltatást, hogy a regisztrációkról azonnali értesítést kapj.
2. **Biztonsági mentés:** Bár a D1 megbízható, havonta egyszer érdemes egy SQL dump-ot készíteni: `npx wrangler d1 export mief-db --remote --output=backup.sql`.
3. **Admin jelszó:** A jelszót a Cloudflare Dashboard-on bármikor megváltoztathatod a "Settings -> Variables" menüpont alatt (`ADMIN_PASSWORD`).
