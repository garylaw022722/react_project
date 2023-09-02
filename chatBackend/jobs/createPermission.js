const Permission  =require("../model/Permission")
const {createHash} =require("crypto")

const createPermission = async (req,res)=>{
    const permissionList = req.body.map((Permission)=>{
            Permission.ref_Code=createHash("sha256")
                                .update(`${Permission.ref_Code}`)
                                .digest("hex")
            return Permission
    });

    console.log(permissionList)
    try{

        await Permission.insertMany(permissionList);
        return  res.send("done");

    }catch(err){
         console.log(err);
    }
    res.send("Server Excpetion");;
}

module.exports= createPermission;