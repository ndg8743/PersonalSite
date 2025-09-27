# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Handle environment variables
ARG REACT_APP_CONTACT_EMAIL
ENV REACT_APP_CONTACT_EMAIL=${REACT_APP_CONTACT_EMAIL}

# Copy source code and config files
COPY public/ ./public/
COPY src/ ./src/
COPY tsconfig.json ./
COPY eslint.config.mjs ./

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY conf/default.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
