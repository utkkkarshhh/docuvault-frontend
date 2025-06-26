# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (cache efficient)
COPY package.json package-lock.json ./
RUN npm install

# Copy remaining source code
COPY . .

# Expose default React port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
