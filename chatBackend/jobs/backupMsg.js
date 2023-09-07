const priMsgDB = require("../model/PrivateMessage")
const userDB =require("../model/userDB");
const {createHash,randomBytes} =require("crypto");
require("dotenv").config();


const backupMsg = async(payload)=>{
    try{
        console.log("Calling backup function,..................")
        const participant =  [payload.sender , payload.sendTo];
        const room = await priMsgDB.findOne({
                        "participant" :{
                                $all :participant
                        }
                    })
        
            console.log("Update chatRoom content --- private ");
            room.sources.push(payload)
            room.save();

    }catch(err){
        console.log(err)
    }
    
}


module.exports ={backupMsg};