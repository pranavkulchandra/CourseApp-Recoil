const express = require("express");
const mongoose = require("mongoose");   
const app = express(); 
const cors = require("cors")
require("dotenv").config()
const port = 3000;
const mongooseString = process.env.MongooseString ;

const adminRouter = require("../Server/Routes/adminRoutes")

app.use(cors())
app.use(express.json());

app.use("/admin", adminRouter)

mongoose.connect(mongooseString, {dbName: "Course"})

app.listen(port, ()=> { 
    console.log(`BackEnd is running on port ${port}`)
})

