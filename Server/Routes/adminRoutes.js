const express = require("express"); 
const mongoose = require("mongoose")
const {Admin, Course} = require("../DB/index.js")
const authenticateJwt = require("../Middleware/index.js")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET = process.env.SECRET

const router = express.Router();


router.get("/me", authenticateJwt, async (req, res) => { 
    const admin = await Admin.findOne({username : req.user.username});
    if ( admin ) { 
        res.status(200).json({ 
            username : admin.username
        })
    } else { 
        res.status(403).json({Message : `Admin username not found.`})
    }
})


router.post("/signup", async(req, res) => { 
    const {username, password} = req.body;
    const admin = await Admin.findOne({username})
    if ( admin ) { 
        res.status(404).json({ Message : `Admin ${username} already exists, try using a different username, THankyou!!`})
    } else { 
        const adminObj = {username, password}
        const newAdmin = Admin(adminObj);
        await newAdmin.save()

        const token = jwt.sign({username, role: "Admin"}, SECRET, {expiresIn: "1h"} )
        res.status(201).json({ Message : `User ${username} has been sucessfully signed Up`, token})
    }
})


router.post("/login", async(req, res) => { 
    const { username, password } = req.body; 

    const admin = await Admin.findOne({username, password})
    if ( admin ) { 
        const token = jwt.sign({username, role: "Admin"}, SECRET, { expiresIn : "1h"})
        res.status(201).json({ Message : `${username} sucessfully LoggedIn`, token})
    } else { 
        res.status(401).json({ Message : "Invalid Username or password "})
    }
})

router.post("/courses", authenticateJwt, async(req, res) => { 
    const course = new Course(req.body);
    await course.save()
    res.status(201).json({Message : `${course.title} created Sucessfully`, courseId : course._id})
})

router.get("/courses", authenticateJwt, async(req, res) => { 
    const courses = await Course.find({})
    if(courses) { 
        res.status(201).json({ courses: courses })
    } else { 
        res.status(401).json({Message : "No Course Found"})
    }
})

router.get("/course/:courseId", authenticateJwt, async(req, res) => { 
    const courseId = req.params.courseId; 
    const course = await Course.findById(courseId); 
    if ( course) { 
        res.status(201).json({course: course})
    } else { 
        res.status(401).json({"Message" : `Course with courseid ${courseId} not found`})
    }
})


router.put("/course/:courseId", authenticateJwt, async(req, res) => { 
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body);
    if ( course ) { 
        res.status(201).json({Message : `Course ${course._id} has been updated Sucessfully`})
    } else { 
        res.status(401).json({ Message : `Course with courseId ${req.params.courseId} not found`})
    }
})

router.delete("/course/:courseId", authenticateJwt, async( req, res) => { 
    const courseId = req.params.courseId; 
    const course = await Course.findByIdAndDelete(courseId)
    if(course) { 
        res.status(201).json({ Message : `courseId ${courseId} has been deleted`})
    } else { 
        res.status(401).json({ Message : "Course not Found"})
    }
})

module.exports = router