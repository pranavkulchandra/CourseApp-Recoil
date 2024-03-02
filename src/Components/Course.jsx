import { useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { courseState } from "../store/atoms/course"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import { courseImage, coursePrice, courseTitle, isCourseLoading } from "../store/selectors/course"

export const Course = () => { 

    const {courseId } = useParams()
    const courseLoading = useRecoilValue(isCourseLoading)
    const setCourse = useSetRecoilState(courseState)

    const fetchCourse = async()  => { 
        try { 
            const resp = await axios.get("http://localhost:3000/admin/course/" + courseId, { 
                headers : { 
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            const course = resp.data.course
            setCourse({isLoading:null, course:course})
            console.log(course, "Hi From Course")
        } catch (e) { 
            console.log(e)
            setCourse({isLoading:false, course:null})
        }
    }

    useEffect(() => { 
        fetchCourse()
    }, [courseId])

    if(courseLoading) { 
        return <div>
            Loading...
        </div>
    }

   return <div>
     <GrayTopper /> 
         <Grid container >
                <Grid item lg={8} xs={12} md={12}>
                    <UpdateCourseCard />
                </Grid>
                 <Grid item lg={4} xs={12} md={12} >
                    <CourseCard />
                </Grid>
            </Grid>
   </div>
            
   
}

function GrayTopper() { 
    const title = useRecoilValue(courseTitle); 

    return <div style={{height: 250, background:"#212121", top:0, width:"100vw", zIndex:0, marginBottom:-250}}>
        <div style={{height:250, display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <div>
            <Typography style={{color:"white", fontWeight:600}} textAlign={"center"} variant="h3">{title}</Typography>
            </div>
        </div>
    </div>
}

function UpdateCourseCard () { 
    const [ courseDetails , setCourse ] = useRecoilState(courseState)

    const courseLoading = useRecoilValue(isCourseLoading)

    const [ title, setTitle] = useState(courseDetails.course.title);
    const [ description, setDescription] = useState(courseDetails.course.description)
    const [ imageLink, setImageLink] = useState(courseDetails.course.imageLink)
    const [  price , setPrice] = useState(courseDetails.course.price)

    if(courseLoading) { 
        return  <div>
            Loading....
        </div>
    }

    return <div style={{display:"flex", justifyContent:"center", zIndex:1}}>
    <Card style={{width:600, marginTop:200}}>
        <TextField variant="outlined" label="Title" fullWidth={true} value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
        <TextField variant="outlined" label="Description" fullWidth={true} value={description} onChange={(e) => setDescription(e.target.value)}></TextField>
        <TextField variant="outlined" label="ImageLink" fullWidth={true} value={imageLink} onChange={(e) => setImageLink(e.target.value)}></TextField>
        <TextField variant="outlined" label="Price" fullWidth={true} value={price} onChange={(e) => setPrice(e.target.value)}></TextField>
        <div style={{display:"flex", justifyContent:"center"}}>
        <Button variant="contained" size="large" onClick={async() => { 
            const resp = axios.put("http://localhost:3000/admin/course/" + courseDetails.course._id, { 
                title: title, 
                description : description, 
                imageLink: imageLink, 
                price: price
            }, { 
                headers : { 
                    "Content-Type" : "Application/json", 
                    "Authorization" : "Bearer " + localStorage.getItem("token") 
                }
            });
            let updatedCourse = { 
                _id : courseDetails.course._id, 
                title: title, 
                description: description, 
                imageLink: imageLink, 
                price : price
            }
            setCourse({ isLoading:false, course: updatedCourse})
        }}>Update Course</Button>
        </div>
    </Card>

</div>

}

function CourseCard (){ 

    return  <div style={{display:"flex", justifyContent:"center", zIndex:1}}>
    <Card style={{width:400, height:450, marginTop:50}}>
        <div style={{display:"flex", justifyContent:"center"}}>
        <TitleCard />
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
        <ImageCard />
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
        <PriceCard />
        </div>

    </Card>
    </div>
    
}


 

function ImageCard () { 

    const image = useRecoilValue(courseImage)

    return <img src={image} style={{width:400}}></img> 
}

function TitleCard () { 
    const title = useRecoilValue(courseTitle); 

    return <Typography variant="h3" >{title}</Typography>
}

function PriceCard () { 
    const price = useRecoilValue(coursePrice)

    return  <Typography variant="h3">$ {price}</Typography>


}

