const priMsgDB = require("../model/PrivateMessage")
const userDB =require("../model/userDB");

const {createHash,randomBytes} =require("crypto");
const {backupMsg} =require("../jobs/backupMsg");

require("dotenv").config();

const sendMessage =(chatApp ,socket)=>{
    return async(payload)=>{
        try{
            const sockets = await chatApp.fetchSockets();
            if (payload?.sendTo){
                
                for( const s of sockets) 
                    console.log(s.userInfo);
            
                const {sendTo}=payload
                const  msgReceiver = sockets.map(usr => usr.userInfo)
                                            .find(e => e?.username === sendTo);
                
                
                const IS_VALID_RECEIVER=await userDB.exists({username:sendTo}).exec();
                //receiver online 
                if(msgReceiver || IS_VALID_RECEIVER){
                    console.log(`Prepared to send to ${sendTo}`)
                    try{
                        socket.to(msgReceiver.socket_id).emit("message", payload);                    
                    }catch(err){
                        console.log(`the receiver ${sendTo} is offine ....` )
                    }finally{
                        // backupMsg(payload);
                    }
                }

        }

        }catch(err){
            console.log(err);
        }
    }
}


    


module.exports ={sendMessage};