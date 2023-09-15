const { handle_NewUsr} =  require("../jobs/registrations");
const express =require("express")
const path =require("path");
const router = express.Router();


router.post("/", handle_NewUsr);


module.exports =router