# Introduction
This project is to create a instanct chat Channel with Socket.io and some basic react technology. The backend would be implemented by NodeJS , while fronend is using  typescript and reactjs

# Tech Stack
$ Back-end 
1. Encrpyion and Decryption algorithrim =  ECDH
2. Using Woker_thread to decrypted message and retriveve data for muti-threading (parallization) 
3. Async Await and Promisess to perform async  proccessing
4. Schema - mongoose
5. using docker to deploy mongodb.
6. JWT  

$ Front-End :
1. using redux to manage the component's  state
2. using Axios for data fetching or CRUD  operation
3. using react-query to maange the cache  and  invalid the query.

# Project Config
1. cd to chatBackend  and  execute docker compose up -d
2. npm install to load all of the dependency
3. nodemon index.js to kick start the application
4. cd ../chatui ,then npm start

using console to connect mongodb
1. docker exec -it chatmongo mongosh
2. use admin
3. db.auth("root") , then  input  "example"  , which is the db password
4. use test
5. show collections

