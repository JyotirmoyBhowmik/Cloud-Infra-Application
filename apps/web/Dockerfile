# Base image
FROM node:18-alpine

WORKDIR /usr/src/app

# Dependencies
COPY package*.json ./
RUN npm install

# Source code
COPY . .

# Build
RUN npm run build

# Port
EXPOSE 3000

# Cmd
CMD ["npm", "run", "start"]
