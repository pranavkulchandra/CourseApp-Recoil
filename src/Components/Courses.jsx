import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function Courses () { 

    const [ courses, setCourses] = useState([])

    useEffect(() => {
        
            const callCourses = async () => { 
                try { 
                const resp = await axios.get("http://localhost:3000/admin/courses/", { 
                    headers : { 
                        "Authorization" : "Bearer " + localStorage.getItem("token"),
                        "Content-Type" : "Application/json"
                    }
                })
                setCourses(resp.data.courses)
            } catch (e) { 
                console.log(e)
            }
        } 
        callCourses()
    } , [])

    return <div style={{display:"flex", justifyContent: "center"}}>{
        courses.map((course) => { 
            return <CoursesCard course={course} />
        })
    }       
    </div>
}


function CoursesCard({course}) { 
    const navigate = useNavigate()

    return  <Card style={{width: 400, padding: 10}}>
            <Typography textAlign={"center"} variant="h5" >{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1" >{course.description}</Typography>
            <div style={{display:"flex", justifyContent:"center"}}>
            <img style={{width:300}}  src={course.imageLink}></img>
            </div>
            <Typography variant="h2" textAlign={"center"} >{course.price}</Typography>
            <div style={{display:"flex", justifyContent:"center"}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id)
            }}>Edit Course</Button>
            </div>
        </Card>
   



}

export default Courses; 