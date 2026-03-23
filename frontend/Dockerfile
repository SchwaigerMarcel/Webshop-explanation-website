# 1. Build-Schritt
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx vite build

# 2. Auslieferungs-Schritt (Nginx)
FROM nginx:stable-alpine
# Kopiere den Inhalt von /dist in das Nginx-Verzeichnis
COPY --from=build /app/dist /usr/share/nginx/html
# Wichtig für React Router (verhindert 404 beim Refresh)
RUN echo "server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]