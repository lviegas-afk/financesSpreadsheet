# Use an official Node.js image as the base image
FROM node:14

# Create a directory for the application
RUN mkdir -p /app

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install Tailwind CSS
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# Create a Tailwind configuration file
RUN npx tailwindcss init -p

# Copy the application code
COPY . .

# Expose the port used by the application
EXPOSE 5173

# set the host
ENV HOST=0.0.0.0

# Start the Vite development server
CMD ["npm", "run", "dev", ]
