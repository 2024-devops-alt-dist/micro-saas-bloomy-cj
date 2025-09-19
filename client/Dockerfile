# Étape 1 : Build React
FROM node:24-alpine AS builder
WORKDIR /app

# copier uniquement les fichiers nécessaires
COPY package*.json ./
RUN npm install
COPY . .                     
RUN npm run build            

# Étape 2 : Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# # Étape 1 : Utiliser une image Node.js
# FROM node:latest 

# # Étape 2 : Définir le répertoire de travail
# WORKDIR /app

# # Étape 3 : Copier les fichiers package.json et package-lock.json
# COPY package*.json ./ 

# # Étape 4 : Installer les dépendances
# RUN npm install

# # Étape 5 : Copier tout le reste du projet
# COPY . .

# # Étape 7 : Exposer le port de l'API
# EXPOSE 5173

# # Étape 8 : Commande pour démarrer le serveur
# CMD ["npm", "run", "dev"]