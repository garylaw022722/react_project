const express =require("express");
const { retrieveAll_usr, createPermission, backupPermission } = require("../controller/AdminController");
const router = express.Router();

router.route("/get_all_Usrs").get(retrieveAll_usr);
router.route("/getMessage/:id")       
      .get(retrieveAll_usr);
router.route("/createPermission").post(createPermission);
router.route("/backupPermission").get(backupPermission);

module.exports=router


