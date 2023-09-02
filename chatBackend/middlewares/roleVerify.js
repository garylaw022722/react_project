
const roleVerify  = (...allow_Roles)=>{
    return (req,res,next)=>{
        if(!req?.roles)return res.sendStatus(401);

        console.log(req.username)
        const extracted_roles= Object.values(req.roles[0])
        
        const result = extracted_roles.map(ele => allow_Roles.includes(ele))
                                      .find( isTrue => isTrue === true)

        
        if(!result) return  res.sendStatus(401);
        next();
    }

}

module.exports = {roleVerify}