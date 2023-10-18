FROM node:18-alpine3.17 as build

ARG API_URL

WORKDIR /usr/app

COPY . .

RUN npm ci

RUN VITE_API_URL=${API_URL} npm run build


FROM nginx:mainline-alpine3.17

COPY --from=build /usr/app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]