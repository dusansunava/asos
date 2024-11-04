FROM node:20.2.0-alpine3.18 as builder
ARG VITE_PORT
ARG VITE_BASE_URL

ENV VITE_PORT=${VITE_PORT}
ENV VITE_BASE_URL=${VITE_BASE_URL}

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine as production-build
COPY ./nginx/nginx.conf.template /etc/nginx/nginx.conf.template
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE ${VITE_PORT}

ENTRYPOINT ["/docker-entrypoint.sh"]
  