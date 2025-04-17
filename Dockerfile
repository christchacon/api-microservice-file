# Image Builder
FROM node:16-alpine as builder
WORKDIR /usr/src/ms-beneficiaries
COPY package*.json .
RUN npm install --ignore-scripts --force
COPY . .
RUN npm run build

# Image for production
FROM node:16-alpine as production
ENV PORT=8100
WORKDIR /usr/src/ms-beneficiaries
COPY package*.json .
RUN npm install --production --ignore-scripts --force
COPY --from=builder /usr/src/ms-beneficiaries/dist ./dist
EXPOSE 8100
CMD [ "node", "./dist/main.js" ]
