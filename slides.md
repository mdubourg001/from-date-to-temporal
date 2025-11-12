---
theme: "@ekino/slidev-theme-ekino"
transition: view-transition
title: "Gestion des dates en JavaScript : de Date à Temporal"
highlighter: shiki
mdc: true
layout: cover
---

# Gestion des dates en JavaScript : de Date à Temporal

<br />
<br />

<SpeakerCard name="Maxime Dubourg" title="Ingénieur Front-end">
  <p>@ maxime.dubourg@ekino.com</p>
</SpeakerCard>

::logo::

<img class="border-1 border-yellow-100" width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/500px-JavaScript-logo.png" />

---
class: flex items-center justify-center
--- 

# Pourquoi l'API Date c'est pas top ?{.view-transition-title}

---
layout: two-cols
--- 

::left::

![Brendan Eich, créateur de JavaScript](/brendan-eich.jpg){.max-w-[250px] .rounded-sm}

<small v-click class="text-xs italic">Brendan Eich, créateur de JavaScript</small>

::right::

# Pourquoi l'API Date c'est pas top?{.whitespace-nowrap .view-transition-title}

<br />

<v-clicks>

- 1995
- concurrence très forte entre Microsoft et Netscape
- volonté de rendre le web "interactif"
- forte pression sur Eich
- création de "Mocha" en **10 jours**
- fortement inspiré de Java et de son API Date
- rebaptisé JavaScript ensuite
- copie par Microsoft en 1996 : JScript
- standardisation ECMA en 1997

</v-clicks>

---
class: "flex flex-col items-center [&_pre]:!text-xl"
---

<br />
<br />
<br />
<br />

# Les mois sont zéro-indexés{v-click="1"}

<br />

<div v-click.hide>

```js
new Date(2025, 11, 1);
```

</div>

<div v-click="1" class="-translate-y-13">

```js
new Date(2025, 11, 1);
// 1er décembre 2025
```

</div>

---
class: "flex flex-col items-center [&_pre]:!text-xl"
---

<br />
<br />
<br />
<br />

# Les dates invalides ne throw pas et sont NaN{v-click="1"}

<br />

<div v-click.hide>

```js
new Date("gavé bien les dates en JS");
```

</div>

<div v-click="1" class="-translate-y-13">

```js
new Date("gavé bien les dates en JS");
// Invalid Date (aucune erreur levée)
// .getDate() => NaN
```

</div>

---
class: "flex flex-col items-center [&_pre]:!text-xl"
---

<br />
<br />

# L'overflow est reporté automatiquement{v-click="1"}

<small class="italic mt-0" v-click="1">Oui je sais c'est une feature mais...</small>

<br />

<div v-click.hide>

```js
new Date(2025, 0, 32);
```

</div>

<div v-click="1" class="-translate-y-13">

```js
new Date(2025, 0, 32);
// 1er février 2025
```

</div>

---
class: "flex flex-col items-center [&_pre]:!text-xl"
---

<br />

# Le parsing est inconsistent{v-click="1"}

<br />

<div v-click.hide>

```js
new Date(2025, 10, 12);
new Date('2025-11-12');
new Date('2025/11/12');
new Date('2025-11-12T00:00:00');
new Date('2025-11-12T00:00:00Z');
```

</div>

<div v-click="1" class="-translate-y-41">

```js
new Date(2025, 10, 12);
// 12 novembre 2025, minuit
new Date('2025-11-12');
// 12 novembre 2025, 1 heure
new Date('2025/11/12');
// 12 novembre 2025, minuit
new Date('2025-11-12T00:00:00');
// 12 novembre 2025, minuit
new Date('2025-11-12T00:00:00Z');
// 12 novembre 2025, 1 heure
```

</div>

---
class: "flex flex-col items-center [&_pre]:!text-xl"
---

<br />
<br />

# L'affichage n'est pas toujours intuitif{v-click="1"}

<br />

<div v-click.hide>

```js
const d = new Date('2025-11-12T00:00:00Z');
d.toString();
d.toUTCString();
```

</div>

<div v-click="1" class="-translate-y-27">

```js
const d = new Date('2025-11-12T00:00:00Z');
d.toString();
// "Wed Nov 12 2025 01:00:00 GMT+0100"
d.toUTCString();
// "Wed, 12 Nov 2025 00:00:00 GMT"
```

</div>

---
class: "flex flex-col items-center [&_pre]:!text-xl"
---

<br />
<br />

# La comparaison est pénible{v-click="1"}

<br />

<div v-click.hide>

```js
const d1 = new Date('2025-11-12T00:00:00Z');
const d2 = new Date('2025-11-12T12:00:00Z');

const isSameDay = // ?
```

</div>

<div v-click="1" class="-translate-y-34">

```js
const d1 = new Date('2025-11-12T00:00:00Z');
const d2 = new Date('2025-11-12T12:00:00Z');

const isSameDay =
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();
```

</div>

---
class: "flex flex-col items-center [&_pre]:!text-xl"
---

<br />
<br />

# Pas de notion de durée ou d'intervalle{v-click="1"}

<br />

<div v-click.hide>

```js
const xmas = new Date(2025, 11, 25);
const now = new Date();

const hoursBeforeChristmas = // ?
```

</div>

<div v-click="1" class="-translate-y-34">

```js
const xmas = new Date(2025, 11, 25);
const now = new Date();

const msBeforeChristmas = 
  xmas.getTime() - now.getTime();
const hoursBeforeChristmas = 
  msBeforeChristmas / 36e5;
```

</div>

---
class: "flex flex-col items-center justify-center max-w-3/4 mx-auto [&_pre]:!text-xl"
---

# Principal problème : tous les concepts temporels sont représentés comme des timestamps UTC{.text-center}

<br />


```js
+new Date();
// 1762963546137
```

---
class: flex flex-col items-center justify-center
---

<logos-safari class="absolute top-20 left-60 animate-" />
<logos-chrome class="absolute top-35 left-130" />
<logos-firefox class="absolute top-25 left-180" />
<logos-nodejs-icon-alt class="absolute top-100 left-35" />
<logos-bun class="absolute top-90 left-110" />
<logos-internetexplorer class="absolute top-110 left-185" />

# Et tout ça varie selon le runtime et sa version...

---
class: flex flex-col items-center justify-center
---

# Les librairies tierces à la rescousse !{.view-transition-title}

---
class: "flex flex-col items-center [&_pre]:!text-xl"
---

# Les librairies tierces à la rescousse !{.view-transition-title}

<br />

```js
moment("20251112", "YYYYMMDD")
  .add(1, 'day')
  .format('YYYY-MM-DD');
```

<br />
<br />

<v-clicks>

- Moment.js, Day.js, date-fns...
- Corrige tous les problèmes de `Date`
- Mais comme toute dépendance :
  - bundlesize++,
  - maintenance,
  - déprécations et migrations...

</v-clicks>

---
class: "flex flex-col justify-center items-center [&_pre]:!text-xl"
---

# Temporal{.view-transition-title .!text-6xl .bg-gradient-to-r .from-blue-600 .via-green-500 .to-orange-400 .inline-block .text-transparent .bg-clip-text}

---
class: flex flex-col items-center
---

<br />
<br />

# Temporal{.inline}&nbsp;&nbsp;<img aria-hidden="true" src="/tc39.svg" class="w-6 inline" />

<br />

<v-clicks>

- Nouvelle API JS de gestion des dates et heures
- Remplacement complet de l'API `Date`
- Proposition initiée en 2019 au sein du TC39
- À atteint le [Stage 4](https://tc39.es/proposal-temporal/docs/) en 2024

</v-clicks>

---
class: "[&_table]:!text-sm"
---

# Les objets de Temporal{.view-transition-title}

<v-clicks>

|                          |                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `Temporal.PlainDate`     | Une date sans heure ni fuseau horaire (ex. `2025-11-12`).                                        |
| `Temporal.PlainTime`     | Une heure sans date ni fuseau horaire (ex. `13:45:30`).                                          |
| `Temporal.PlainDateTime` | Une date et une heure sans fuseau horaire (ex. `2025-11-12T13:45:30`).                           |
| `Temporal.ZonedDateTime` | Une date, une heure avec un fuseau horaire (ex. `2025-11-12T13:45:30+01:00[Europe/Paris]`).      |
| `Temporal.Instant`       | Un instant précis en temps universel (UTC).                                                      |
| `Temporal.Duration`      | Une durée (ex. “3 jours et 2 heures”).                                                           |
| `Temporal.Now`           | Namespace de manipulation du temps courant.                                                      |

</v-clicks>

--- 

![Modèle de persistence de Temporal](/persistence-model.svg){.p-4 .border-2 .-translate-y-10}

---
class: "flex flex-col items-center justify-center"
---

# On veut du code !

---
layout: two-cols
---

<br />
<br />
<br />

# "Eh salut, t'es né quand toi ?"{.text-center}

<br />

::left::

```js
new Date(1998, 02, 26);
// à minuit, avec un offset implicite GMT+1...
```

::right::

```js{none|all}
new Temporal.PlainDate(1998, 03, 26);
// pas d'heure, pas d'offset ou de timezone
```

---
layout: two-cols
---

<br />
<br />
<br />

# "Mais à quelle heure ?"{.text-center}

<br />

::left::

```js{3,4}
new Date(1998, 02, 26);

new Date(1998, 02, 26, 16, 26, 0);
// toujours avec un offset implicite GMT+1
```

::right::

```js{0|3,4}
new Temporal.PlainDate(1998, 03, 26);

new Temporal.PlainTime(16, 26);
// pas de date, pas d'offset ou de timezone
```

---
layout: two-cols
---

<br />
<br />
<br />

# "Du coup ca fait... ?"{.view-transition-dialog .text-center}

<br />

::left::

<div class="view-transition-left">

```js{3,4}
new Date(1998, 02, 26);

new Date(1998, 02, 26, 16, 26, 0);
// toujours avec un offset implicite GMT+1
```

</div>

::right::

<div class="view-transition-right">

```js{0|5,6}
new Temporal.PlainDate(1998, 03, 26);

new Temporal.PlainTime(16, 26);

new Temporal.PlainDateTime(1998, 03, 26, 16, 26);
// toujours pas d'offset ou de timezone
```

</div>

---
layout: two-cols
---

<br />

# "Moi je suis né le 25 décembre 2000 à 14h pile à Sao Paulo !"{.view-transition-dialog .text-center}

<br />

::left::

<div class="view-transition-left">

```js{5,6}
new Date(2000, 11, 25);

new Date(1998, 02, 26, 16, 26, 0);

new Date("2000-12-25T14:00:00-03:00");
// l'info de la timezone est perdue après l'init
```

</div>

::right::

<div class="view-transition-right">

```js{0|7-16}
new Temporal.PlainDate(1998, 03, 26);

new Temporal.PlainTime(16, 26);

new Temporal.PlainDateTime(1998, 03, 26, 16, 26);

Temporal.ZonedDateTime.from({
  timeZone: 'America/Sao_Paulo',
  year: 2000,
  month: 12,
  day: 25,
  hour: 14
});
// info de la timezone conservée,
// offset automatiquement calculé
// -02:00 ! Pas -03:00 car DST supprimé en 2019
```

</div>

---
layout: two-cols
---


# "Mais ca te fait quel âge exactement ?"{.view-transition-dialog .text-center}


::left::

<div class="view-transition-left">

```js{0-4|all}
let bday = new Date("1998-03-26T16:26:00+01:00");
let now = new Date();

const diffMs = now - bday;

const totalSecs = Math.floor(diffMs / 1000);
const totalMinutes = Math.floor(totalSecs / 60);
const totalHours = Math.floor(totalMinutes / 60);
const totalDays = Math.floor(totalHours / 24);
// approximations...
const totalMonths = Math.floor(totalDays / 31);
const totalYears = Math.floor(totalDays / 365);

const months = totalMonths % 12;
const days = totalDays % 30;
const hours = totalHours % 24;
const minutes = totalMinutes % 60;

console.log(/* ... */);
```

</div>

::right::

<div class="view-transition-right">

```js{none|0-10|all}
let bday = Temporal.ZonedDateTime.from({
  timeZone: 'Europe/Paris',
  year: 1998,
  month: 03,
  day: 26,
  hour: 16,
  minute: 26
});
let now = 
  Temporal.Now.zonedDateTimeISO('Europe/Paris');

// Temporal.Duration
let age = now.since(bday, { 
  largestUnit: 'years',
  smallestUnit: 'minutes'
});

age.toLocaleString();
// "27 ans, 7 m., 17 j, 5 h et 50 min"
```

</div>

---
layout: two-cols
---

<br />
<br />


# "Tu connais ton signe chinois ?"{.view-transition-dialog .text-center}

<br />

::left::

<div class="view-transition-left">

```js
// ???
```

</div>

::right::

<div class="view-transition-right">

```js{0-6|all}
let bday = Temporal.PlainDate.from({
  year: 1998,
  month: 03,
  day: 26,
  calendar: "iso8601"
});

date.toLocaleString('fr-FR', { 
  calendar: "chinese", 
  dateStyle: 'long' 
});
// "28 èryuè wu-yin"
// 🐯
```

</div>

---
class: "flex flex-col items-center justify-center"
---

# Le support des runtimes ?

<br />

- Supporté par <logos-firefox /> et <logos-chrome /> depuis très peu
- Supporté par <logos-safari /> derrière un flag
- Support dans v8 derrière un flag, pas encore dans <logos-nodejs-icon-alt /> stable
- Polyfill officiel : `@js-temporal/polyfill`
- **Utilisez le sur votre prochain projet !**

---
layout: thank_you
---
