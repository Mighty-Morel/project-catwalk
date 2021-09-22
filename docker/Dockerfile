# Recipe for a new image (https://hub.docker.com/_/node)
# Start with node (we are running version 14 on this comp)
FROM node:14
# Set up our structure
RUN mkdir -p /app
# Copy files everything in the same as docker folder
# Copy to the app directory
COPY . /app
# Make sure I am in the right directory
WORKDIR /app
# Install all the npm dependencies
RUN npm Install
# Create bundle
RUN npm run react-prod
# Expose a port
EXPOSE 3100
# Setup Server
CMD ["node", "server/index.js"]

# Run in terminal:
# use "docker images" to see what has been added
# "docker build -t demo(replace with name) ."

# "docker container ls" to see list of containers
# "docker run -d -p 3300:3100 demo(name)"
# "docker logs ID" to see the error messages