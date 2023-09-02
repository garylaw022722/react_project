const jwt =require("jsonwebtoken");
const { decode } = require("punycode");
require("dotenv").config()
const roomDB = require("../model/Room");
const {Worker} =require("worker_threads");
const jointRoom = async(req,res)=>{
    
    let  join_Group_Token = req.query.token; 
    console.log(join_Group_Token);
    
    jwt.verify(
            
            join_Group_Token,
            process.env.CHAT_ROOM_ACCESS_TOKEN_PASSPHRASE,
            async(err,decode)=>{
                if(err){
                    console.log("Error occrured \n" ,err);
                }else{
                    const new_Participant = req.username;
                    const isUpdated= await roomDB.findOneAndUpdate(
                        {accessToken : join_Group_Token ,  participants :{$nin:[ new_Participant]}},
                        {$push : {participants: new_Participant}}

                    )
              
                    if (isUpdated){
                        console.log(` user ${req.username} is joint the room with id ${decode.room_id}`);
                        return res.status(400).send(
                            {
                                "successMsg": `Success to Joint the group - ${decode.descript}`
                            }
                        );
                    }else{
                        console.log(`User: ${new_Participant} is reuse the joint group token........`)
                        
                        return res.status(400).send(
                                    {
                                        "response_Msg":`You're already joint the group - ${decode.descript}`
                                    }
                                );
                    }
                }
            }

        )


}
module.exports = {jointRoom}