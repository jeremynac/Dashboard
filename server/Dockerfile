FROM node:14.15.0-alpine
COPY package*.json ./
RUN npm install
COPY src ./src
EXPOSE 8080
CMD [ "node", "src/index.js" ]