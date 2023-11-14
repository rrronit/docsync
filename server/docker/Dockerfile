# Use an official Node.js runtime as a base image
FROM node:18.18.0

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory

# Install app dependencies 
COPY index.ts package*.json tsconfig.json ./
COPY prisma ./prisma


RUN npm i
RUN npx prisma generate
RUN npm start


EXPOSE 4000
# Define the command to run your application
CMD ["node", "build/index.js"]
