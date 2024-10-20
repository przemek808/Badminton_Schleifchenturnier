# Deployment Guide

You can find all steps in order to build and run this application in a docker container here.

## Build

1. Install node dependencies:

    `npm install`

2. Build Application:

    `npm run build`

3. Install production dependencies only:

    `npm install --production`

4. Build Docker:

    `docker build -t badminton .`

5. Run Docker:

    `docker run -p 3000:3000 -v ./json-server:/app/json-server badminton`
