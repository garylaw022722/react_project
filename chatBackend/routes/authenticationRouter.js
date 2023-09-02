const express =require("express")
const router = express.Router();
const {authentication} = require("../jobs/authenticate")
const jwtVertify = require("../middlewares/jwtVerify");
const { refreshToken } = require("../controller/refreshToken");
const { roleVerify} = require("../middlewares/roleVerify")
const {Permissons} = require("../config/RoleList");
const { logout } = require("../controller/LogoutController");

router.route("/").post(authentication);


router.route("/refreshToken").post(jwtVertify,refreshToken);

router.route("/logout").put(logout);


module.exports = router