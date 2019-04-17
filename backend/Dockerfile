# setup react build
FROM node:8-alpine as client
MAINTAINER dronuts_4

# Change working directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./
RUN npm install

# Copy App Source
COPY . .
#TODO Run any build scripts here

EXPOSE 80
CMD [ "npm", "start" ]