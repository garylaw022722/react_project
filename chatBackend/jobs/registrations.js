
const  fsPromise =require("fs").promises;
const path = require('path');
const {SHA512} = require("crypto-js");
const { error } = require("console");
const  permissionDB =require("../model/Permission");
const  {genPKC} =require("../jobs/genPKC");
const userSchema = require("../model/userDB");

const handle_NewUsr = async(req,res)=>{
    genPKC();
    const { email , password,rights} =  req.body; 
    console.log("registeration execured");
    if (!email || !password) return res.status(404).send({"msg":"user name and password is required...."});
    console.log(req.body);
    const countFound = await userSchema.findOne({username: email}).exec();
    if(countFound)
        return res.status(409).send({"msg":"You're already register for such email address"});
    try{
        console.log(rights);
        const PERMISSION_REF_CODE =await permissionDB
                                        .find({})
                                        .where("Description")
                                        .in(rights)
                                        .select({"_id":0 , "ref_Code":1})
                                        .then(doc=>{
                                            return (
                                                 doc.map(rights => rights.ref_Code)
                                            );
                                        })

        console.log(PERMISSION_REF_CODE)

          const updateRecord=  await userSchema.create({
                            "username":email,
                            "password":SHA512(password).toString(),
                            "roles": PERMISSION_REF_CODE
            });
        
        console.log(updateRecord)

    

        res.send({"Response" :"success to registrate Account !"});
    }catch(Err){
        console.log(Err)
        res.status(500).send({
            "msg":"server exception"
        })

    }
}

module.exports = {handle_NewUsr}