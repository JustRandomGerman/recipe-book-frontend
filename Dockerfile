# Use the official Node.js image as the base image
FROM node:latest as build

# Copy custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code
COPY . .

# Build the React app
RUN npm run build

# Production environment
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
