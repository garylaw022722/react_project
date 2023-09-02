const express = require("express"); 
const cors = require("cors")
const {SHA512} = require("crypto-js");
const {writeLog, logging} = require("./middlewares/Logger")
const {connect : mongooseConnect} = require("./config/dbConnection")
const cookieParser = require("cookie-parser")
const   http = require("http");
require("dotenv").config();

const PORT = process.env.PORT;
const app= express();

// middle ware
app.use(express.static("./public"))
app.use(express.json());
app.use(cookieParser());
app.use(cors())


// registation Router
app.use("/registration",require("./routes/registerRouter") );

// user Authentication and token handling
app.use("/authetication", require("./routes/authenticationRouter"));

// admin operations
app.use("/adminRoute" , require("./routes/AdminRoute"));

// designated user actionsRoute
app.use("/nusrRoute", require("./routes/UserRoute"));

// db connections
mongooseConnect();

// web socket
const {connectWebSocket}=require("./config/webSocket");



//express server
const expressServer =app.listen(PORT,()=>console.log("Server is starting........"+PORT));
connectWebSocket(expressServer);


const cpus =require("os").cpus()
console.log(cpus.length);