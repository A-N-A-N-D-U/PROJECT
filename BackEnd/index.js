const express=require("express")
const app=express()
const mongoose=require("mongoose")
const router = require("./Routes")
require("dotenv").config()

const connectDB=async () => {
    await mongoose.connect(process.env.URI)
    console.log("DB Connected!");
}
connectDB();

app.use(express.json())

app.use("/api/v1",router)

app.listen(3000,()=>{
    console.log("Server is running successfully");
})