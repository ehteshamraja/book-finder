FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN sudo chown -R $USER:$GROUP ~/.npm
RUN sudo npm cache clean --force
RUN rm -rf node_modules
RUN sudo npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "start"] 