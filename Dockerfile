# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Copy the .env.sample file and rename it to .env
RUN cp .env.sample .env

# Copy the remix.config.selfhost.js file and rename it to remix.config.js
RUN cp remix.config.selfhost.js remix.config.js

# Build the application
RUN npm run build

# Expose the port your application listens on (replace 3000 with the actual port if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "selfhost"]
