# Image Builder
FROM node:20-alpine as builder
WORKDIR /usr/src/ms-beneficiaries
COPY package*.json .
RUN npm install --force
COPY . .
RUN npm run build

# Image for production
FROM node:20 as production
ENV PORT=8100
WORKDIR /usr/src/ms-beneficiaries
COPY package*.json .
RUN npm install --production --force
COPY --from=builder /usr/src/ms-beneficiaries/dist ./dist
COPY .env .env
EXPOSE 8100
CMD [ "node", "./dist/main.js" ]
