const express=require("express")
const authController = require("../Controller/authController")
const authRouter=express.Router()

authRouter.post("/register",authController.regUser);
authRouter.post("/login",authController.loginUser);

module.exports=authRouter;