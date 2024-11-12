# Stufe 1: Bauen der Anwendung
FROM node:16-alpine AS build

# Arbeitsverzeichnis im Container erstellen und setzen
WORKDIR /app

# Package.json und package-lock.json kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Den gesamten Client-Code kopieren
COPY . .

# Build des React-Projekts
RUN npm run build

# Stufe 2: Bereitstellung der Anwendung mit NGINX
FROM nginx:alpine

# Kopiere den Build-Output nach NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponiere Port 80
EXPOSE 80

# Starten von NGINX
CMD ["nginx", "-g", "daemon off;"]