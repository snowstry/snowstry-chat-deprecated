FROM node:16.16-alpine
LABEL maintainers="rv178"

WORKDIR /opt/app
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "start"]
