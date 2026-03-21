FROM node:20

WORKDIR /app

# Nur die Package-Dateien kopieren für schnelleres Caching
COPY package*.json ./

RUN npm install

# Den Rest des Codes kopieren
COPY . .

EXPOSE 5173

# Vite braucht --host, damit Docker den Port nach außen reicht
CMD ["npm", "run", "dev", "--", "--host"]