FROM node:18-alpine

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
COPY ./.yarn /app/.yarn
COPY ./.yarnrc.yml /app/.yarnrc.yml

COPY apps/api/package.json ./apps/api/package.json
COPY apps/core/package.json ./apps/core/package.json
COPY packages/ui/package.json ./packages/ui/package.json

RUN --mount=type=cache,sharing=locked,target=/root/.yarn \
    yarn --frozen-lockfile

COPY . .
