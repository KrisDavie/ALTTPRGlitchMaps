FROM node:20.2.0-alpine3.16

# Bundle APP files
COPY dist .
COPY ecosystem.config.js .

RUN npm install pm2 -g

# Expose the listening port of your app
EXPOSE 8216

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]