FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npx", "nx", "serve", "ui", "--host", "0.0.0.0"]
