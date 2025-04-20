const express= require("express");
const { registeruser, loginUser, dashboardUser } = require("../controllers/userController");
const authenticateUser = require("../middlewares/authenticationHandler");
const router= express.Router();


router.route("/register").post(registeruser);

router.route("/login").post(loginUser);

router.route("/dashboard").get(authenticateUser,dashboardUser);

module.exports=router;