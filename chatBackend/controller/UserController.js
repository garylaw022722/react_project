const {createChatRoom}= require("../jobs/createRoom");
const {logout} = require("../jobs/Logout")
const {jointRoom} =require("../jobs/jointRoom")
const {loadingMsg :loadPrivateMsg} = require("../jobs/loadingMsg")
const {getContactList} = require("../jobs/getContactList")



module.exports= {
    createChatRoom,
    logout,
    jointRoom,
    loadPrivateMsg,
    getContactList
}