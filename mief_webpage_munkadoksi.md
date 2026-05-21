# MIEF honlapfejlesztés – állapotösszefoglaló és folytatási terv

## 1. Projektcél

A cél a jelenlegi **mief.hu** oldal fokozatos kiváltása egy saját, Cloudflare-en futó honlappal.

Jelenlegi éles állapot:

```text
mief.hu → Notion oldal
```

Fejlesztési / preview állapot:

```text
mief.milanmor.workers.dev → új Astro-alapú MIEF honlap
```

Fontos döntés:  
A **mief.hu egyelőre maradjon a Notion-oldalon**, amíg az új honlap nincs tartalmilag és vizuálisan kész. Az új Cloudflare-es oldal fejlesztési/preview célra használható.

---

## 2. Eddig elvégzett technikai lépések

### 2.1. Node.js és npm ellenőrzése

A gépen elérhető:

```bash
node -v
# v22.14.0

npm -v
# 11.7.0
```

### 2.2. Astro projekt létrehozása

Eredetileg a Windows felhasználói mappában probléma volt az ékezetes útvonallal:

```text
C:\Users\Milán
```

Ezért a projekt ékezetmentes mappába került:

```text
C:\dev\mief-website
```

Projekt létrehozása:

```bash
npm create astro@latest mief-website
```

### 2.3. Helyi fejlesztői szerver

A honlap helyben futtatható:

```bash
cd C:\dev\mief-website
npm run dev
```

Helyi cím:

```text
http://localhost:4321
```

### 2.4. Tailwind CSS

A Tailwind be lett kötve, mert először a dizájn nem jelent meg. A működéshez szükséges volt:

`src/styles/global.css`:

```css
@import "tailwindcss";
```

`src/pages/index.astro` elején:

```astro
---
import '../styles/global.css';
---
```

`astro.config.mjs` várható tartalma:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

---

## 3. GitHub állapot

A projekt GitHubra felkerült.

Repository:

```text
PlasZeb / mief
```

Megjegyzés: a beszélgetésben először `milanmor/mief-website` szerepelt példaként, de a tényleges repo a képernyőkép alapján:

```text
https://github.com/PlasZeb/mief
```

A Git remote korábban hibásan ez volt:

```text
https://github.com/USERNAME/mief-website.git
```

Ezt javítani kellett erre:

```text
https://github.com/PlasZeb/mief.git
```

vagy arra az URL-re, amit a GitHub ténylegesen mutat.

Hasznos parancsok:

```bash
cd C:\dev\mief-website
git status
git remote -v
git add .
git commit -m "..."
git push
```

---

## 4. Cloudflare állapot

Az új oldal Cloudflare-en sikeresen deployolva lett.

Aktuális Cloudflare preview / production worker URL:

```text
https://mief.milanmor.workers.dev/
```

Ez jelenleg a fejlesztési/tesztelési cím.

A Cloudflare beállításoknál ilyen mezők jelentek meg:

```text
Build command:
npm run build

Deploy command:
npx wrangler deploy

Path:
/
```

A projekt gyökerébe került egy Cloudflare-konfigurációs fájl:

`wrangler.jsonc`:

```json
{
  "name": "mief",
  "compatibility_date": "2026-05-20",
  "assets": {
    "directory": "./dist"
  }
}
```

A Cloudflare-ben route is megjelent:

```text
*.mief.hu/*
```

De mivel a `mief.hu` jelenleg még a Notion-oldalra mutat, ezt egyelőre nem kell élesíteni a fődomainre.

Javasolt későbbi domain-beállítás, amikor kész az oldal:

```text
mief.hu/*
*.mief.hu/*
```

---

## 5. Jelenlegi honlapstruktúra

Az első Astro/Tailwind landing page jelenlegi szekciói:

1. Hero szekció  
   - cím: **MI Etika Szakmai Fórum**
   - rövid leírás
   - CTA: kapcsolatfelvétel
   - másodlagos CTA: miért fontos?

2. Küldetés / Miért fontos?  
   - MI nem pusztán technológiai kérdés
   - döntéshozatal, felelősség, oktatás, közélet, biztonság, emberi méltóság

3. Fókuszterületek  
   - Felelős MI
   - Oktatás és szakmai párbeszéd
   - Biztonság és társadalom

4. Következő lépés  
   - események, szakmai találkozók, közösségépítés

5. Kapcsolat  
   - e-mail gomb
   - mief.hu jelzés

---

## 6. Tartalmi alapok és korábbi elképzelések

A MIEF teljes neve:

```text
MI Etika Szakmai Fórum
```

Lehetséges angol megnevezés / arculati elem:

```text
AI Ethics Forum
AI Ethics HUB
MIEF – AI Ethics HUB
```

A fórum célja:

- szakmai közösség építése a mesterséges intelligencia etikai kérdései körül;
- interdiszciplináris párbeszéd technológiai, jogi, oktatási, filozófiai, újságírói, közszolgálati és biztonságpolitikai szempontból;
- események, workshopok, szakmai beszélgetések szervezése;
- később állásfoglalások, szakmai anyagok, publikációk, közösségi működés.

Lehetséges célcsoportok:

- informatikusok,
- jogászok,
- oktatók,
- kutatók,
- újságírók,
- filozófusok / etikusok,
- közszolgálati szakemberek,
- katonai és biztonságpolitikai szakemberek,
- döntéshozók,
- érdeklődő szakmai közönség.

---

## 7. Javasolt következő fejlesztési irány

### 7.1. Rövid távú cél

A jelenlegi landing page legyen professzionálisabb:

- jobb hero szekció;
- letisztultabb tipográfia;
- MIEF logó vagy szóvédjegy;
- navigációs sáv;
- eseményblokk;
- „Kinek szól?” blokk;
- „Mit csinálunk?” blokk;
- kapcsolat és regisztrációs CTA;
- mobilnézet finomítása;
- SEO metaadatok.

### 7.2. Javasolt oldalszerkezet első éles verzióhoz

Egyoldalas honlapként:

```text
1. Hero
2. Mi az MI Etika Szakmai Fórum?
3. Miért fontos most?
4. Kinek szól?
5. Mit csinálunk?
6. Következő esemény
7. Csatlakozás / kapcsolat
8. Impresszum / adatkezelés
```

### 7.3. Későbbi bővítési lehetőségek

- külön eseményoldal;
- eseményarchívum;
- publikációk / szakmai anyagok;
- blog;
- hírlevél;
- többnyelvű verzió, legalább HU/EN;
- regisztrációs űrlap;
- adatkezelési tájékoztató;
- tagi / közösségi oldal;
- MIEF mint egyesület bemutatása, ha jogilag aktuális lesz.

---

## 8. Technikai folytatási javaslat másik sessionhöz

A következő sessionben érdemes így folytatni:

### 8.1. Kiinduló mondat az új sessionhöz

```text
A MIEF honlapját fejlesztjük tovább. Astro + Tailwind projekt van GitHubon: PlasZeb/mief. Cloudflare-en fut: https://mief.milanmor.workers.dev/. A mief.hu egyelőre maradjon a Notion oldalon. Segíts iterálni a landing page designját és tartalmát.
```

### 8.2. Első technikai ellenőrző parancsok

```bash
cd C:\dev\mief-website
git status
npm run dev
```

### 8.3. Fejlesztési ciklus

Minden módosítás után:

```bash
git add .
git commit -m "Update landing page design"
git push
```

A Cloudflare ezután automatikusan deployolhatja az új verziót, ha a GitHub-integráció aktív.

---

## 9. Fontos óvatosság

A `mief.hu` domaint **ne irányítsuk át véglegesen az új Cloudflare oldalra**, amíg:

- nincs kész a végleges design;
- nincs rendben a mobilnézet;
- nincs legalább minimális impresszum/adatkezelés;
- nincs ellenőrizve a regisztrációs/kontakt funkció;
- nincs jóváhagyott szöveg;
- nincs eldöntve, mi marad a Notionból és mi kerül át az új oldalra.

Addig a hivatalos cím maradjon:

```text
mief.hu → Notion
```

Az új oldal maradjon fejlesztési/preview címen:

```text
mief.milanmor.workers.dev
```

---

## 10. Következő konkrét feladat

A következő munkaülés első valódi feladata:

```text
Készítsünk egy professzionálisabb, MIEF-arculathoz illő landing page designt a jelenlegi src/pages/index.astro helyére.
```

Javasolt stílus:

- sötét, professzionális háttér;
- modern, de nem túl tech-startupos;
- akadémiai-szakmai hitelesség;
- letisztult kártyák;
- cyan / blue / white hangsúlyok;
- opcionálisan finom gradient;
- kevés animáció;
- mobilbarát szerkezet.
