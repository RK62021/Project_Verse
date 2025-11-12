# import node image

FROM node:20-alpine
# set working directory

WORKDIR /app
# copy package.json and package-lock.json

COPY package*.json ./

# install dependencies

RUN npm install
# copy all files
COPY . .

# expose port

EXPOSE 5173

# Enable file watching
ENV CHOKIDAR_USEPOLLING=true
# start the application
CMD ["npm", "run", "dev"]



