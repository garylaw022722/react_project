
const {Permissons}=require("../config/RoleList");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
                username :{ type:String,require :true , unique:true},
                password :{type:String ,require:true},
                roles :{type:[String] ,require:true ,default:[]},
                refreshToken :String
})

module.exports =mongoose.model("users", userSchema);