const privMSG =  require("../model/PrivateMessage");
const loadingMsg = async(username)=>{

    
        try{
            console.log("called loading Messages............");
            const logs= await privMSG.find().where("participant")
                                .in([username])
                                .select({ _id: 0, "sources._id" :0 })
                                .exec();
            return logs;

        }catch(err){
            console.log(err);
        }


}


module.exports = {loadingMsg};