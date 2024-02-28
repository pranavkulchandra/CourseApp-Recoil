const mongoose = require("mongoose")


const adminSchema = new mongoose.Schema({ 
    username : String, 
    password : String,
})

const courseSchema = new mongoose.Schema({ 
    title : String, 
    description : String, 
    imageLink : String,
    price : Number,
    published: Boolean
})


const Admin = mongoose.model("Admin", adminSchema)

const Course = mongoose.model("Course", courseSchema)


module.exports = ({ 
    Admin, 
    Course
})