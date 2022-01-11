# Health Monitor Service
A health monitor service for APIs, able to specify the url, request and frequency of the API you want to monitor.


# Getting Started with docker-compose
run `docker-compose up --build` in the project root directory


# Getting Started with metal


## 1. create mongodb
run


`docker run -p 20217:20217 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=111222 --name health-monitor-dev -d mongo`

config the correct mongodb uri in `.env` file by adding this line


`MONGODB_URI=mongodb://localhost:27017/health-monitor-dev`


## 2. start node project
run `npm install && npm start` in the project root directory



