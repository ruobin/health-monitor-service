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

COPY package.json ./

USER node

COPY --chown=node:node . .

# RUN rm -rf package-lock.json node_modules \
RUN npm install && mkdir .tmp
EXPOSE 8080

CMD [ "npm", "start" ]
