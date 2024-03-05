# Specify the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock* ./

# Install dependencies
RUN npm install
RUN npm run build

# Copy the rest of the application code
COPY . .

EXPOSE 3000


# Start the Next.js app
CMD ["npm", "dev"]

