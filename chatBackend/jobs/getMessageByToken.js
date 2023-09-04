require("dotenv").config()
const privMSG = require("../model/PrivateMessage")
const getMessageByToken = async (req,res,next)=>{
    
    try{
        console.log("grepping the message by id....")
        const {token ,page} = req.query;
        const NUM_PAGE_ELE =Number (process.env.MESSAGGREP_PER_PAGE)
        
        const log = await privMSG.aggregate( [
            {
                $match : {"privateRoom_Token" :  token}
            },
            {
                $project: {
                    _id : 0,
                    sources: { $reverseArray : "$sources"}
                }
            },
            {$unwind : "$sources"}
        ])
        .skip(NUM_PAGE_ELE * page)
        .limit(NUM_PAGE_ELE)
        console.log(log.length)
        res.send(log)        
    }catch(Err){
        console.log(Err)
    }

}


module.exports ={getMessageByToken}