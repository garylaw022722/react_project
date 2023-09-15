const path =require("path"); 
const fs =require("fs");
const fsPromise = fs.promises;
const crypto =require("crypto");
const AES =require("aes256");
const { send } = require("process");
const { platform } = require("os");

require("dotenv").config()
const  decrypt=async(paylaod)=>{
    try{

        const { sender ,sendTo:receiver,message} =paylaod;
        // load recevier public keys 
        const  sender_pk =  await fsPromise.readFile(
                                    path.join( __dirname,"..","keyStore/KeyPairs",sender,"publicKey.pem"),
                                    "utf-8"
                        );
        
        // load sender  privatekey to compute  shareKeys 
        const receiver_sk =  await fsPromise.readFile(
                            path.join( __dirname,"..","keyStore/KeyPairs",receiver,"privateKey.pem"),
                            "utf-8"
                );
        
        // recover msg Receiver's keyPairs;
        const  recevierKeyPair = crypto.createECDH(process.env.EC_CURVE);
        recevierKeyPair.setPrivateKey( receiver_sk , "hex"); 

        const shareKey  = recevierKeyPair.computeSecret(sender_pk ,"hex" , "base64");

        return AES.decrypt(shareKey,message);


    }catch(er){
        console.log(er);
    }
}

module.exports ={decrypt};

// const ciphertext = encrypt("dev1329@gmail.com","dev0329@gmail.com" ,"dllm").then(ele=>console.log(ele));


                
  
