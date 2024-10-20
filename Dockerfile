# Use the official Node.js 20.18.0 Alpine image as the base image
FROM node:20.18.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy node requirements
COPY package.json ./
COPY node_modules ./node_modules

# Copy app server files
COPY .next ./.next

# Copy API server files
# Will be done with volume mapping

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
