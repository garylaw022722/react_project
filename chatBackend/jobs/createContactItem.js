const  priMsgDB = require("../model/PrivateMessage")
const userDB = require("../model/userDB")
const axios = require("axios");
const  {createHash} = require("crypto")
const { getContactList } = require("./getContactList");


const  createContactItem =  async(req,res)=>{
    const {contactUser} = req.body;

    let isValid_user = await userDB.exists({username:contactUser}).exec()
    const  isDuplicated   = await priMsgDB.exists({
                            participant :{$all : [contactUser , req.username]}
                       }) 

    console.log(isValid_user)
    if (isDuplicated){
        console.log("Duplication : create  new contact user")
        return res.send({errorCode : "Doesn't be allowed to create the same contact user from the list !"})
    }
    if(!isValid_user){
        console.log("Invalid : No such users")
        return res.send({errorCode : "No such User , Please inpute correct username"})

    }

    let content = await priMsgDB.count() ;
    let privateRoom_token =  createHash(process.env.PRI_HASH).update(String(content+1)).digest("base64");
    privateRoom_token ="PRIV_"+ privateRoom_token;            


    const row = {
        "privateRoom_Token" : privateRoom_token,
        "participant": [req.username, contactUser]
    }
    await priMsgDB.insertMany([row]);
    console.log(`new Contact created.... \n\t ${JSON.stringify(row, null ,4)}`);
    
    res.send({result : "Success to create new  contact user"});


}



module.exports ={createContactItem}

