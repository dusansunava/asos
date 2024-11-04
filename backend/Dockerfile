FROM node:20.2.0-alpine3.18

WORKDIR /app
COPY . .
RUN npm install
EXPOSE ${BE_PORT}
CMD ["npm", "run", "prod:migrate"]
