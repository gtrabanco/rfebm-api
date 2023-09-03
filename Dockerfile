FROM oven/bun:0.7
LABEL org.opencontainers.image.source=https://github.com/gtrabanco/rfebm-api

ARG GITHUB_TOKEN
ARG DEBUG off
ENV SERVER_PORT 3000
ENV SERVER_ADDRESS 0.0.0.0
ENV NODE_ENV production
WORKDIR /app
VOLUME [ "/app/public" ]

COPY package.json .
COPY bunfig.toml .
COPY bun.lockb .
COPY src src
COPY tsconfig.json .
# Would be best idea not to inlclude public in the Image
# and use a folder in the VPS to serve public files
COPY public public

RUN bun install --production --ignore-scripts

CMD ["bun", "start"]

EXPOSE 3000