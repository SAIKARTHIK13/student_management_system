# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Render (or other CaaS) allows you to set ARG at build time to configure the API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Serve stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist

# Render typically provides a $PORT environment variable.
# 'serve' automatically respects the $PORT env variable when serving files.
CMD ["serve", "-s", "dist"]
