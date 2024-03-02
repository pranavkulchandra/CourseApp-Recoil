import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";

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
    } , [courses])

    return <div style={{display:"flex", justifyContent: "center", flexWrap:"wrap"}}>{
        courses.map((course) => { 
            return <CoursesCard course={course} />
        })
    }       
    </div>
}


export function CoursesCard({course}) { 
    const navigate = useNavigate()
    const setCourses = useSetRecoilState(courseState)

    return  <Card style={{width: 400, padding: 10, boxShadow:55, margin:10}}>
            <Typography textAlign={"center"} variant="h5" >{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1" >{course.description}</Typography>
            <div style={{display:"flex", justifyContent:"center"}}>
            <img style={{width:300}}  src={course.imageLink}></img>
            </div>
            <Typography variant="h2" textAlign={"center"} >{course.price}</Typography>
            <div style={{display:"flex", justifyContent:"center"}}>
            <Button variant="contained" style={{marginRight:10}} size="large" onClick={() => {
                navigate("/course/" + course._id)
            }}>Edit Course</Button>
            <Button variant="contained" onClick={async()=> { 
                try{ 
                 alert(`Are you sure you would like to delete ${course.title} course ? `)   
                const resp = await axios.delete("http://localhost:3000/admin/course/" + course._id, {
                    headers : { 
                        "Authorization" : "Bearer " + localStorage.getItem("token")
                    }
                })
                const courses = resp.data.courses;
                const updatedCourses = courses.filter((c) => c._id !== course._id)
                setCourses({isLoading:false, course: updatedCourses })
            } catch (e) { 
                console.log(e)
            }
            }}>Delete Course</Button>
            </div>
        </Card>
   



}

export default Courses; 