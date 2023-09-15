const express =require("express");
const router = express.Router();
const {authentication} = require("../controller/authenticateController");

const {createContactItem,getMessageByToken, createChatRoom ,logout,getContactList, jointRoom ,loadPrivateMsg, backupMsg} = require("../controller/UserController")
const jwtVerifier = require("../middlewares/jwtVerify");
const  encrpytion= require("../middlewares/encrption");


router.route("/login").post(authentication)


router.route("/createChatRoom").post(jwtVerifier,createChatRoom)


router.route("/jointGroup")
      .post(jwtVerifier,jointRoom )


router.route("/getPrivateMessage")
      .get(jwtVerifier, async(req,res)=>{
            const data = await loadPrivateMsg(req.username)
            console.log(data)
            res.send(data)    
      })

router.route("/getContactList")
      .get(jwtVerifier ,getContactList)

router.route("/getMessageByToken")
      .post(jwtVerifier ,getMessageByToken);


router.route("/createContactUsr")      
      .post(jwtVerifier ,createContactItem)
      

router.route("/backup")      
      .post(jwtVerifier,encrpytion ,backupMsg)
      
module.exports= router;