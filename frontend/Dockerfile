FROM node:20.2.0-alpine3.18 as builder
ARG VITE_PORT
ARG VITE_BASE_URL

ENV VITE_PORT=${VITE_PORT}
ENV VITE_BASE_URL=${VITE_BASE_URL}

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE ${VITE_PORT}

CMD ["npm", "run", "preview"]
  