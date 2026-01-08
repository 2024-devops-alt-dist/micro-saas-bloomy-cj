![CI](https://github.com/2024-devops-alt-dist/micro-saas-bloomy-cj/actions/workflows/ci.yml/badge.svg)

# 🌸 Micro SaaS Bloomy

> 🔗 Contexte du projet disponible dans le repo original : 
> [2024-devops-alt-dist/micro-saas-bloomy-cj](https://github.com/2024-devops-alt-dist/bloomy_CJ)

Ce projet a été construit sous la forme d'un **monorepo** contenant deux sous-applications :
- `api/` → Backend Node.js / Express
- `client/` → Frontend React / Vite

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/) (>= 18 recommandé)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

Vérifie les versions installées :
```bash
node -v
npm -v
git --version
```

---

## 🚀 Installation du projet

```bash
# 1️⃣ Cloner le projet
git clone https://github.com/2024-devops-alt-dist/micro-saas-bloomy-cj.git bloomy_cj
cd bloomy_cj

# 2️⃣ Installer les dépendances
npm install
cd api && npm install
cd ../client && npm install

# 3️⃣ Installer Lefthook (hooks Git)
npm install --save-dev @evilmartians/lefthook
npx lefthook install
```

---
### Configuration des variables d’environnement
Dans le dossier api, créez un fichier .env :
```
DB_USER=****************
DB_PASSWORD==****************
DB_NAME==****************
DB_HOST==****************
JWT_ACCESS_SECRET==****************
JWT_REFRESH_SECRET==****************
JWT_ACCESS_EXPIRES==****************
JWT_REFRESH_EXPIRES==****************
DB_PORT==****************
API_PORT==****************
FRONT_URL==****************

DATABASE_URL==****************
VITE_API_URL==****************
```
---

## 🧩 Lancer les apps
```bash
# Backend
cd api
npm run dev

# Frontend
cd client
npm run dev
```

## 💻 Lancer les commits
```bash
# Backend
cd api
git cz

# Frontend
cd client
git cz
```

## 🧪 Tests E2E (Playwright)
Les tests End-to-End sont réalisés avec Playwright.

```bash
# Étape 1 : Lancer le server front

# Étape 2 : à la racine du projet
npm run test:e2e

# Interface Playwright
npx playwright test --ui
```

Note : l'extension VsCode "[Playwright Test For VsCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)" est sympa pour lancer les tests rapidement.


## 🌐 URL de déploiement
Le projet est déployé et accessible à l'adresse suivante : en cours ...