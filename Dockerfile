# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
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
