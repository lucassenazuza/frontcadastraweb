
FROM node:alpine
RUN npm install -g vue-cli
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install
COPY ./ ./
CMD [ "npm", "run", "serve"]
