# setup react build
FROM node:8-alpine as client
MAINTAINER dronuts_4

# Change working directory
WORKDIR /usr/app/client
COPY client/package*.json ./
RUN npm install
# Issue in newest ajv version
RUN npm uninstall ajv
RUN npm install ajv@6.8.1
COPY client/ ./
RUN npm run build

# setup express
FROM node:8-alpine

WORKDIR /usr/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/app/server/
COPY express/package*.json ./
RUN npm install
COPY express/. .

# Copy App Source
#TODO Run any build scripts here

EXPOSE 80
CMD [ "npm", "start" ]