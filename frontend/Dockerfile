FROM node:20.2.0-alpine3.18 as builder

ARG VITE_BASE_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
  