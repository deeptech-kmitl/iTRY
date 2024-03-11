# Specify the base image
FROM node:20

ENV NEXTAUTH_URL=https://itryweb.com
ENV NEXTAUTH_URL_INTERNAL=https://itryweb.com

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock* ./

# Install dependencies
RUN NODE_ENV=development npm i

# Copy the rest of the application code
COPY . .

RUN npm run build

EXPOSE 3000


# Start the Next.js app
CMD ["npm", "dev"]

