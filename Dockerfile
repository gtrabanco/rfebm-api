FROM oven/bun
LABEL org.opencontainers.image.source=https://github.com/gtrabanco/rfebm-api

ARG GITHUB_TOKEN
ENV SERVER_PORT 3000
ENV SERVER_ADDRESS 0.0.0.0
ENV NODE_ENV production
WORKDIR /app

COPY package.json .
COPY bunfig.toml .
COPY bun.lockb .
COPY src src
COPY tsconfig.json .
# COPY public public

RUN bun install --production --ignore-scripts

CMD ["bun", "start"]

EXPOSE 3000