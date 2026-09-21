# SportSee

Tableau de bord d'analyse sportive pour les coureurs : l'utilisateur se connecte et suit ses performances (distance parcourue, fréquence cardiaque, objectif hebdomadaire) ainsi que ses statistiques depuis son inscription.

Projet réalisé dans le cadre de la formation Développeur Full-Stack d'OpenClassrooms.

## Technologies

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [React Router 7](https://reactrouter.com/)
- [Recharts 3](https://recharts.org/) pour les graphiques

## Prérequis

- **Node.js 20.19+ ou 22.12+** (version minimale requise par Vite 8)
- npm (fourni avec Node.js)
- [Yarn](https://yarnpkg.com/) pour le back-end

## Installation

L'application a besoin de son API pour fonctionner. Le back-end est hébergé dans un dépôt séparé, il faut donc cloner les deux projets.

### 1. Lancer le back-end

```bash
git clone https://github.com/AlexCh79/P6-OpenClassrooms-Sportsee.git
cd P6-OpenClassrooms-Sportsee
yarn
yarn dev
```

L'API est disponible sur `http://localhost:8000`.

### 2. Lancer le front-end

Dans un second terminal :

```bash
git clone https://github.com/AlexCh79/Sportsee.git
cd Sportsee
npm install
npm run dev
```

L'application est disponible sur `http://localhost:5173`.

## Connexion

Trois comptes de test sont fournis par le back-end :

| Utilisateur   | Identifiant    | Mot de Passe  |
| ------------- | -------------- | ------------- |
| Sophie Martin | `sophiemartin` | `password123` |
| Emma Leroy    | `emmaleroy`    | `password789` |
| Marc Dubois   | `marcdubois`   | `password456` |

Les mots de passe se trouvent dans le fichier `app/data.json` du back-end.

## Fonctionner sans le back-end

Des données simulées sont disponibles dans `src/datas/`. Pour les utiliser, passez `USE_MOCK_DATA` à `true` dans `src/config/api.js` :

```js
export const USE_MOCK_DATA = true;
```

Les mêmes identifiants fonctionnent alors sans que l'API soit lancée.

## Structure du projet

```
src/
├── components/   Composants réutilisables (header, footer, cartes, graphiques…)
├── config/       URL de l'API et bascule vers les données simulées
├── context/      Contexte d'authentification (utilisateur connecté, connexion, déconnexion)
├── datas/        Données simulées
├── hooks/        Hook useApiRequest (chargement, erreur, annulation des requêtes)
├── pages/        Pages de l'application (Login, Dashboard, Profile, Error)
├── services/     Appels à l'API
└── utils/        Fonctions utilitaires (dates, calculs de statistiques, cookies)
```

## Choix techniques

- **Authentification** : le JWT renvoyé par l'API est stocké dans un cookie (`SameSite=Strict`) et envoyé dans l'en-tête `Authorization` de chaque requête. Les pages Dashboard et Profil sont protégées par un composant `PrivateRoute`.
- **Requêtes** : le hook `useApiRequest` centralise les états de chargement et d'erreur, et ignore les réponses arrivées après un changement de période pour éviter d'afficher des données périmées.
- **Survol des graphiques** : les changements de couleur au survol sont gérés en CSS plutôt qu'avec un état React, ce qui évite de re-rendre les graphiques et garde la légende stable.
- **Logo animé** : le logo du footer est dessiné en SVG et animé en CSS pour reproduire l'animation de la maquette. L'animation est désactivée si l'utilisateur a demandé à réduire les animations (`prefers-reduced-motion`).
- **Données manquantes** : si l'API ne renvoie pas une information du profil (genre, taille…), le champ est laissé vide sur la page Profil.
