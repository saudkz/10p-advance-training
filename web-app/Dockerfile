FROM node:latest

# Set your working directory
WORKDIR /usr/src/WEB-APP

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port 
EXPOSE 4000

# Start application
CMD [ "npm", "start" ]
