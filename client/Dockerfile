FROM node:14.15-alpine
COPY package*.json ./
RUN npm install
COPY src ./src
COPY public ./public
CMD ["npm", "start"]