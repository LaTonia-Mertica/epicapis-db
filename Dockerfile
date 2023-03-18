FROM node:19
EXPOSE 3001

COPY . /srv

WORKDIR /srv
RUN npm install

CMD node index.js
