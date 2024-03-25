FROM node:latest

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .
RUN yarn build

# COPY .next ./.next

CMD ["yarn", "dev"]