FROM node:10-stretch-slim


# set a working directory
WORKDIR /usr/src/app

# Copy Node Packages Requirement
COPY package*.json ./

# Install node modules based on node packages requirements
RUN apt-get update && \
    npm i -g npm && \
    npm i

# Copy Node Source Code File
COPY . .

# Expose Application Port
EXPOSE 9000

# Run The Application
CMD ["npm", "start"]
