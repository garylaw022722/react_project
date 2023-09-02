const mongoose = require("mongoose");
require("dotenv").config()
const connect = async (conUrl =process.env.DB_URL )=>{
    try{
        console.log("db is starting...........")
        await mongoose.connect(conUrl);
        console.log("Connect success")
    }catch(err){
        console.log(err)
    }
}

module.exports ={connect}