require("dotenv").config()
const crypto =require("crypto")
const eccrypto = require("eccrypto");
const fs =require("fs"); 
const path = require("path");
const fsPromise = fs.promises; 
console.log()
const genPKC_with_X509 = (username)=>{
          try{

               const KEY_PAIR_OUTPUT_PATH = path.join(__dirname,"..", "keyStore", "KeyPairs", username);
               if(!fs.existsSync(KEY_PAIR_OUTPUT_PATH)) fs.mkdirSync(KEY_PAIR_OUTPUT_PATH);
               
               //create ECDH pairs 
               const keypiars = crypto.createECDH(process.env.EC_CURVE);
               keypiars.generateKeys();


               // save the publicKey Key 
               fs.writeFileSync(
                    path.join( KEY_PAIR_OUTPUT_PATH, "publicKey.pem"),
                    keypiars.getPublicKey().toString("hex")
               );

               // save the privateKey 
               fs.writeFileSync(
                    path.join( KEY_PAIR_OUTPUT_PATH, "privateKey.pem"),
                    keypiars.getPrivateKey().toString("hex")
               );
               
               console.log("PKC Pair created");

          }catch(err){ 
               console.log(err);
          }
          



}


module.exports ={genPKC_with_X509};