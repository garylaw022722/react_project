const Permission  =require("../model/Permission")
const fsp =require("fs").promises;
const path =require("path")

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

module.exports = backupPermission;