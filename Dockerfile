FROM node:alpine
RUN apk --no-cache add curl
RUN apk --no-cache add vim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]