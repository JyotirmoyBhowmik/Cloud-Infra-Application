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
EXPOSE 3001

# Cmd
CMD ["npm", "run", "start:prod"]
