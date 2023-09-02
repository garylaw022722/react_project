const jwt =require("jsonwebtoken");
const config = require("dotenv").config();

const jwtVertify = async(req,res,next)=>{
        const token = req.headers["authorization"]
        jwt.verify(token, process.env.ACCESS_TOKEN ,(err, decode)=>{
            if(err){
                console.log(err)
                res.status(401).send({"response":"No confidentials"});
            }
            else{                
                req.username = decode.username;
                req.roles=decode.roles;
                next();
            }
        })

    
}

module.exports = jwtVertify;