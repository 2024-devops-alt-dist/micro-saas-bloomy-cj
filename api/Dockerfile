# Étape 1 : Utiliser une image Node.js
FROM node:latest 

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

RUN npm install -g prisma

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le reste du projet
COPY . .

# Étape 5b : Copier et donner les permissions au script d'entrée
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Étape 6 : Exposer le port de l'API
EXPOSE 3000

# Étape 7 : Commande pour démarrer le serveur
CMD ["/app/entrypoint.sh"]
