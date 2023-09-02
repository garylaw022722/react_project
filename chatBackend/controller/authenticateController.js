const userDB = require("../model/userDB")
const config = require("dotenv").config();
const  fsPromise =require("fs").promises;
const path = require('path');
const {SHA512} = require("crypto-js");
const  jwt = require("jsonwebtoken");


const authentication = async (req,res ,next)=>{

    const  {email ,password} =req.body;

    if (!email || !password)
        res.status(404).send({
        "msg":"missing email and password"
    })

    const user =  await userDB.findOne({username:email}).exec()

    console.log(user);
    if (user){
        if (user.password ===  SHA512(password).toString()){
            console.log("Login Successful");
          
            var access_Token =jwt.sign(
                            {
                                "username": user.username ,
                                "roles":user.roles
                            },
                            process.env.ACCESS_TOKEN,
                            {expiresIn : '1d', algorithm:'HS512'}
                        );
                        
            var refresh_token  =jwt.sign(
                                {
                                    "username": user.username ,
                                    "roles":user.roles
                                },
                                process.env.REFRESH_TOKEN,
                                {expiresIn : '1d'}
                            );
            
            console.log(refresh_token)
            await userDB.findOneAndUpdate(
                {"username":user.username},
                {"refreshToken": refresh_token}
            )
                    
                   
            
        }

        
        res.cookie("jwt",refresh_token ,{httpOnly:true, maxAge:24 *60*60 *1000})
        res.send({access_Token})

    }
    
}
const showData =(req,res)=>{
    console.log("Call showData")
    res.send({
        "data":"retrieve" , 
        "loginUsr" : req.username,
        "roles": req.roles

    });
}
module.exports = { authentication, showData};