# Use an official Node runtime as the base image
FROM node:20-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source by copying the rest of the code
COPY . .

# Make port 3000 available to the outside world
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]