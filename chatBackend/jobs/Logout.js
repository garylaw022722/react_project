const userDB =require("../model/userDB");

const logout =async (req,res, next)=>{
    const cookies = req.cookies;
    
    if(cookies?.jwt){
        const refresh_token = cookies.jwt;
        const located_usr = await userDB.findOne({"refreshToken": refresh_token}).exec();
    
        if(located_usr){
            res.clearCookie("jwt"); 
            await  userDB.updateOne(
                {"refreshToken" : refresh_token}, 
                {$unset :{ "refreshToken" :1 }}
            )
        }
        
    }
    
    res.send("success to logout")




}

module.exports =logout;