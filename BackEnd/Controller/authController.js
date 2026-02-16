const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const Auth = require("../Model/authModel");

const authController={
    regUser:asyncHandler(async (req,res) => {
        const{name,email,password}=req.body;

        if (!name||!email||!password) {
            res.status(404).send("All the fields are required!")
        }
        
        const userFound=await Auth.findOne({email})

        if (userFound) {
            res.status(400).send("User already exists!")
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const regUser=await Auth.create({
            name,email,password:hashedPassword
        })

        if (!regUser) {
            res.status(400).send("Not registered Yet!")
        }

        res.status(201).json({message:"User registered Succesfully!",token})
    }),
    loginUser:asyncHandler(async (req,res) => {
        const{email,password}=req.body;

        if (!email||!password) {
            res.status(404).send("All the fields are required")
        }

        const userFound=await Auth.findOne({email})
        if (!userFound) {
            res.status(404).send("User not found")
        }

        const confirmPassword=await bcrypt.compare(password,userFound.password)
        if (!confirmPassword) {
            res.status(400).send("Invalid user Credentials!")
        }

        const payload={
            userId:userFound._id
        }
        const token=jwt.sign(payload,process.env.SECRET_KEY)

        res.status(201).json({message:"User logged in successfully!",token})
    })
}
module.exports=authController;