#!/bin/sh

# Générer les types Prisma
npx prisma generate

# Exécuter les migrations
npx prisma migrate deploy

# Nettoyer et repeupler la BD
npm run clean-seed

# Démarrer l'application
npm run start
