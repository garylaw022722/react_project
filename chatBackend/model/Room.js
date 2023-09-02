
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    room_id :{type:Number , require:true , unique:true},
    descript :{type:String ,require:true},
    create_At : {type:Date ,require:true},
    participants :{type:[String] , require:true },
    accessToken :{type:String , require:true},
    authorize: {type:[String]},
    sources:[
        {
            message:{type:String , require:true}, 
            sendTo :{ type:String, require:true},
            sender :{ type: String,require:true},
            sumited_at :{type: Date , require:true}
        }
    ]

})

RoomSchema.index({accessToken:1 });

module.exports = mongoose.model("Room",RoomSchema);