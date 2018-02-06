FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY *.js ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 8123

VOLUME "/usr/src/app"
