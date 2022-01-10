FROM node:10-slim

RUN mkdir -p /app/node_modules && chown -R node:node /app

RUN apt update \
     && apt install -y gcc \
        wget \
        git \
        openssh-server \
        python \
        curl \
    && rm -rf /var/cache/apt/* \
    && apt-get -qyy clean

WORKDIR /app

COPY package*.json ./

USER node

COPY --chown=node:node . .

RUN npm i && mkdir .tmp 
EXPOSE 8080

CMD [ "npm", "start" ]
