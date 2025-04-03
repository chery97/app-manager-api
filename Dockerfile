# Base image
FROM node:22-alpine as development

ENV PORT 3000
# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

RUN echo "development"

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

EXPOSE $PORT
# Start the server using the production build
CMD [ "node", "dist/main.js" ]


FROM node:22-alpine as production

ENV PORT 3000
# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

RUN echo "production"

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

EXPOSE $PORT
# Start the server using the production build
CMD [ "node", "dist/main.js" ]
