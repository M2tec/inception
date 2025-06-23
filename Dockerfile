FROM node:18-alpine AS vite-build

RUN apk add --no-cache  python3 \
                        py3-pip \
                        py3-pkgconfig \
                        pixman \
                        pixman-dev \
                        cairo \
                        cairo-dev \
                        pango-dev \
                        make \
                        g++ \
                        nginx

RUN mkdir /inception
WORKDIR /inception

COPY ./package.json ./
COPY ./vite.config.js ./
COPY ./index.html ./
COPY ./src ./src
COPY ./public ./public

RUN npm install
RUN npm run build             

FROM nginx:stable-alpine AS server

COPY --from=vite-build /inception/dist /usr/share/nginx/html
