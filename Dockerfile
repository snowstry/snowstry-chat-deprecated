FROM archlinux:base-devel
LABEL maintainers="rv178"

WORKDIR /opt/app
COPY . .

RUN pacman -Sy --noconfirm nodejs-lts-gallium yarn
RUN yarn install

CMD ["yarn", "dev"]
