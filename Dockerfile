# Stage 1: Build the React app
# Node.js image with Alpine Linux (small footprint)
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (Docker caches this layer so reinstalls
# only happen when dependencies change, not on every code change)
COPY package*.json ./

# Install exact versions from the lock file (ci = "clean install")
RUN npm ci --ignore-scripts

# Now copy the rest of the source code
COPY . .

# Build the production bundle (outputs to /app/build)
RUN npm run build

# Stage 2: Serve with Nginx
# No need for Node.js to serve static files. Nginx is faster
# and uses ~10MB of RAM vs ~100MB+ for Node.
FROM nginx:alpine

# Copy the compiled site from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy our Nginx config (handles routing, caching, security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 inside the container
EXPOSE 80

# Start Nginx in the foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
