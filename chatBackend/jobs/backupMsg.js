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
        // find rind
        if (room===null){
             
            let content = await priMsgDB.count() ;
            console.log("Backupp catch");
            let privateRoom_token =  createHash(process.env.PRI_HASH).update(String(content)).digest("base64");
            
            privateRoom_token ="PRIV_"+ privateRoom_token;            
            
            const row = {
                "privateRoom_Token" : privateRoom_token,
                "participant": participant,
                "sources":[payload]
            }
            
            console.log(`data insert \n\t ${JSON.stringify(row, null ,4)}`);
            await priMsgDB.insertMany([row]);
        
        }else{

            console.log("Update chatRoom content --- private ");
            room.sources.push(payload)
            room.save();

        }
    }catch(erro){
        console.log(erro);
    }
        
    
}


module.exports ={backupMsg};