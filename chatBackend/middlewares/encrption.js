const path =require("path"); 
const fs =require("fs");
const fsPromise = fs.promises;
const crypto =require("crypto");
const AES =require("aes256");
const { send } = require("process");

require("dotenv").config()
const  encrypt=async(req,res ,next)=>{
    try{
        // load recevier public keys 
        const {sender ,sendTo,message} = req.body;
        const receiver_pk =  await fsPromise.readFile(
                                    path.join( __dirname,"..","keyStore/KeyPairs",sendTo,"publicKey.pem"),
                                    "utf-8"
                        );
        
        // load sender  privatekey to compute  shareKeys 
        const sender_sk =  await fsPromise.readFile(
                            path.join( __dirname,"..","keyStore/KeyPairs",sender,"privateKey.pem"),
                            "utf-8"
                );
                  
        const  senderKeyPair = crypto.createECDH(process.env.EC_CURVE);
        senderKeyPair.setPrivateKey( sender_sk , "hex"); 
        const shareKey  = senderKeyPair.computeSecret(receiver_pk ,"hex" , "base64");

        req.body.message =AES.encrypt(shareKey,message);
        next();

    }catch(er){
        console.log(er);
    }
}

module.exports =encrypt;



                
  
