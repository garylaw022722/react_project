const mongoose = require("mongoose");

const  PriMsg = new mongoose.Schema({
    privateRoom_Token: {type:String , require:true , unique: true},
    participant : [String],
    sources: [
        {
            message:{type:String , require:true}, 
            sendTo :{ type:String, require:true},
            sender :{ type: String,require:true},
            sumited_at :{type: Date , require:true}
        }
    ]
})
PriMsg.index({privateRoom_Token :1 })

 module.exports  = mongoose.model("PriMsg" , PriMsg);