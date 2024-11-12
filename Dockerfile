# Dockerfile for backend
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node

# Copy the rest of your application files
COPY . .

# Start the application using ts-node
CMD ["ts-node", "index.js"]