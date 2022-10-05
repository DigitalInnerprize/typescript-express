ARG PORT=4000
ARG NODE_ENV=production

FROM node:16.17-alpine AS node

FROM node AS builder

WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig.json ./

RUN npm i

COPY . .

# Invoke the build script to transpile ts code to js
RUN npm run build

EXPOSE ${PORT}

USER node

# Run development server
ENTRYPOINT [ "npm", "run", "dev" ]

# ---- Production ----
FROM node AS prod
ENV NODE_ENV ${NODE_ENV}

# Update the system
RUN apk --no-cache -U upgrade

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

# Install PM2
RUN npm i -g pm2

# Copy package.json, package-lock.json and process.yml
COPY package*.json process.yml ./

# Install libraries as user node
RUN npm i --omit=dev

# Switch to user node
USER node

# Copy js files and change ownership to user node
COPY --chown=node:node --from=builder /app/dist ./dist

# Open desired port
EXPOSE ${PORT}

# Use PM2 to run the application as stated in config file
ENTRYPOINT ["node", "./dist/index.js"]

