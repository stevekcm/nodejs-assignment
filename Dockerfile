FROM node:latest
WORKDIR /opt/manulie
COPY package.json ./
RUN npm install
COPY build/ .
EXPOSE 3000
CMD npm start
