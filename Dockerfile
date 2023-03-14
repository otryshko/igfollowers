FROM node:latest

WORKDIR /followers

COPY . .
RUN yarn install
RUN yarn run build
RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]


