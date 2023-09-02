const userDB =require("../model/userDB");
const Permission  =require("../model/Permission")
const {createHash} =require("crypto")
const fsp =require("fs").promises;
const path =require("path")


const retrieveAll_usr = async (req,res)=>{         
    return  res.send( 
        await userDB.find({}).exec()
    )
}

const backupPermission =async (req,res)=>{
 
    try{
        
        data = await Permission.find().select({"__v":0 ,"_id":0}).exec();
        fsp.writeFile(
            path.join(__dirname,"..","config","permissionConfig.json"),
            JSON.stringify(
                data,
                null,
                4
            )
        )
        return res.status(200).send("done");
    }catch{
        console.log(error)
    }
    
    return res.status(500).send("Server down")
}


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
module.exports = {backupPermission , createPermission, retrieveAll_usr};
