const mongoose= require("mongoose");
const  privMSG=require("../model/PrivateMessage")
const getContactList = async(req,res,next)=>{
    const  usrname = req.username;
    try{
        console.log("greppingn contact List ............");
        const logs= await privMSG.aggregate([
             {
                $project: { 
                            privateRoom_Token: 1,
                            participant: 1 ,
                            sources:{
                                    $slice:["$sources", -1]
                            }
                }
             },
             {
                $match :{
                    participant :{$in : [usrname]}
                }
             }
         ])
        return res.send(logs)   

    }catch(err){
        console.log(err);
    }


}

module.exports={getContactList}