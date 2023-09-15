const mongoose= require("mongoose");
const  privMSG=require("../model/PrivateMessage");
const  {decrypt}=require("../jobs/Decryption");

const getContactList = async(req,res,next)=>{
    const  usrname = req.username;
    try{
        console.log("greppingn contact List ............");
        let logs= await privMSG.aggregate([
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

         console.log("contact List created ............" , logs);

         // decrypt the message before send out.
         logs = await Promise.all (
             logs.map(async(ele) =>{
                        if(ele.sources.length > 0)
                            ele.sources[0].message = await decrypt(ele.sources[0])
                            return ele;
                    })
            );

        return res.send(logs)   

    }catch(err){
        console.log(err);
    }


}

module.exports={getContactList}