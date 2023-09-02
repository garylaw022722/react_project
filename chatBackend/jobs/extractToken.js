export const showData =(req,res)=>{
    console.log("Call showData")
    res.send({
        "data":"retrieve" , 
        "loginUsr" : req.username,
        "roles": req.roles

    });
}