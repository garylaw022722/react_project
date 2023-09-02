const userDB =require("../model/userDB");

 const retrieveAll_usr = async (req,res)=>{         
    return  res.send( 
        await userDB.find({}).exec()
    )
}

module.exports=retrieveAll_usr;