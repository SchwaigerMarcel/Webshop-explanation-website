# 1. Build-Schritt
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx vite build

# 2. Auslieferungs-Schritt (Nginx)
FROM nginx:stable-alpine

# Die neue Config von oben in den Container kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Die gebaute App kopieren
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]