# 🏍️ Free Torque - Frontend

> ⚠️ Projet interrompu avant lancement – conservé à des fins démonstratives.

Frontend du site **Free Torque**, une plateforme de **location de motos customisées**, avec un design responsive et une UX pensée pour les débutants et passionnés.

## 🎯 Objectif du site

- Mettre en valeur les véhicules disponibles à la location (motos/scooters)
- Intégrer un formulaire de **réservation intelligent** avec pré-remplissage
- Gérer dynamiquement les images, tarifs, et redirections
- Offrir une base réutilisable (landing page / mini site / vitrine pro)

---

## ⚙️ Stack utilisée

- [SvelteKit](https://kit.svelte.dev/) – Framework frontend léger et performant
- [Bootstrap 5](https://getbootstrap.com/) – Grille responsive + composants UI
- [API REST](../server) – Connectée au backend via `fetch` pour envoyer les données

---

## ✨ Fonctionnalités côté client

- 🖼️ Catalogue dynamique (motos, fiches détails)
- 📄 Fiche véhicule avec bouton de réservation
- 🧠 Formulaire avec calcul automatique de prix
- 📬 Appel API REST `/api/contact` pour envoi d’e-mail via Resend
- 🔁 Composants modulaires pensés pour l’évolutivité

---

## 🚀 Structure du projet



---

## 📦 Déploiement

- Hébergé sur **Netlify**
- Appels API vers backend Railway
- Clés API via `.env`

---

## 🧪 Statut

✅ Fonctionnel – utilisé pour démonstration et évolution future  
❌ Projet interrompu avant sa mise en ligne officielle

---










# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
