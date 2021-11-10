FROM node:9.11.1-alpine

WORKDIR /src
CMD node server/bin/index.js
EXPOSE 8080

COPY . .
RUN	cd /src/client/ && yarn install && yarn build && rm -r node_modules/ src/ && \
	cd /src/server/ && yarn install && yarn build && yarn install --production --ignore-scripts --prefer-offline --force && yarn cache clean