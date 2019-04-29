FROM node:10 as base
RUN mkdir -p /app
WORKDIR /app
EXPOSE 3000

ENV NODE_ENV development
COPY package.json package-lock.json ./
RUN npm ci
COPY src ./src
COPY public ./public

CMD ["npm","start"]