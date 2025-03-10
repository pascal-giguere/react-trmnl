FROM node:22.13-slim

COPY --chown=node:node --chmod=755 assets/fonts/ usr/local/share/fonts/
RUN apt-get update; apt-get install -y fontconfig
RUN fc-cache -f -v

# Set up working directory for `node` non-root user
USER node
RUN mkdir -p /home/node/react-trmnl/ && chown -R node:node /home/node/
WORKDIR /home/node/react-trmnl/

# Install dependencies as a first step to leverage Docker layer caching
COPY --chown=node:node ../.yarn/releases/ .yarn/releases/
COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./
RUN yarn install

# Copy source code and build project
COPY --chown=node:node src/ src/
COPY --chown=node:node assets/ assets/
COPY --chown=node:node tsconfig.json ./
RUN yarn build

# Run container on specified port
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE $PORT
CMD ["yarn", "serve"]
