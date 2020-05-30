FROM node:12-alpine AS base
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig.json ./

# ---- Development ----
FROM base AS dev
ENV NODE_ENV development

RUN npm install
COPY . .
USER node
CMD ["npm", "dev"]

# ---- Copy Files/Build ----
FROM base AS builder
COPY ./src ./src
# Build react/vue/angular bundle static files
USER node
RUN npm run build

# ---- Production ----
FROM base AS production
ENV NODE_ENV production
# optional
# RUN npm -g install serve
# Install app dependencies
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
USER node
CMD ["node", "dist/index.js"]

