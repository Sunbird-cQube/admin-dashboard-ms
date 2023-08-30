FROM node:14.21.2 as build
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --omit=dev

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html