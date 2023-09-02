const express =require("express");
const router = express.Router();
const {authentication} = require("../controller/authenticateController");

const {createChatRoom ,logout, jointRoom ,loadPrivateMsg} = require("../controller/UserController")
const jwtVerifier = require("../middlewares/jwtVerify");
const { sendMessage } = require("../jobs/sendMessages");
const jwtVertify = require("../middlewares/jwtVerify");

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

      

module.exports= router;