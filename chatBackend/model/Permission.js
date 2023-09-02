const mongoose =require("mongoose")
const PermissionSchema= mongoose.Schema({
    Description:{type:String ,require :true },
    ref_Code:{type:String    ,require:true}
})
module.exports =  mongoose.model("Permission", PermissionSchema);