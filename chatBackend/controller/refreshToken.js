const config = require("dotenv").config();
const  jwt = require("jsonwebtoken");
const Permissons = require("../config/RoleList");
const userDB= require("../model/userDB")

const refreshToken = async (req,res ,next)=>{

    const cookies = req.cookies;
    
    if (cookies?.jwt){
        const retrieve_refreshToken = cookies.jwt 
        const chosenUsr = await userDB.findOne({"refreshToken": retrieve_refreshToken}).exec();
        console.log(chosenUsr)

        jwt.verify ( retrieve_refreshToken , process.env.REFRESH_TOKEN , (err,decode)=>{
            if(err){
                console.log(err)
                res.sendStatus(403)  
            }else{                
                const access_token = jwt.sign(                
                    {
                            "username":chosenUsr.username,
                            "roles":  chosenUsr.roles

                    },
                    process.env.ACCESS_TOKEN,
                    {expiresIn:'1h'}
                )
                res.send({access_token});
            }
        })
    }
}

module.exports = { refreshToken};