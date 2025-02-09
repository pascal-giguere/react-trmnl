FROM node:22.13-alpine

# Set up working directory for `node` non-root user
USER node
RUN mkdir -p /home/node/trmnl-react/ && chown -R node:node /home/node/
WORKDIR /home/node/trmnl-react/

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
