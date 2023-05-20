FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk --no-cache add curl
RUN apk --no-cache add vim
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]