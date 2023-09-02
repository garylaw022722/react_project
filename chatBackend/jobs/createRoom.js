const { insertMany } = require("../model/PrivateMessage");
const RoomDB=require("../model/Room");
const jwt = require("jsonwebtoken");
require("dotenv").config();
 
const createChatRoom = async(req,res,next)=>{

    try{
        let numRoom = await RoomDB.find().count() ;
        const {  descript ,date } =  req.body
        let  row = {
            "room_id" : numRoom++,
            "descript" : descript,
            "create_At" : new Date(),
            "participants" :[req.username],
            "authorize":[req.username],
        }
        
        let  CHAT_ROOM_ACCESS_TOKEN =jwt.sign(
            row,
            process.env.CHAT_ROOM_ACCESS_TOKEN_PASSPHRASE,
            {
                expiresIn : process.env.CHAT_ROOM_ACCESS_TOKEN_EXPIRE_PERIOD,
                algorithm:process.env.CHAT_ROOM_ACCESS_TOKEN_ALGO
            }
        );
        
        row.accessToken =CHAT_ROOM_ACCESS_TOKEN; 
        console.log(row);
        console.log("Access token in db" + CHAT_ROOM_ACCESS_TOKEN);
        
        await RoomDB.create(row);
        console.log(`Room with id [${row.room_id}] is created by  ${req.username}`);
        return res.status(400).send(CHAT_ROOM_ACCESS_TOKEN);
    }catch(err){
        console.log(err);
    }

    res.status.send("Exceptions........");
}

module.exports ={createChatRoom};