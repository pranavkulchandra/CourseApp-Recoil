import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse() { 

    const [title , setTitle ]= useState("")
    const [ description, setDescription ] = useState("");
    const [ imageLink , setImageLink ] = useState("")
    const [ price, setPrice ] = useState(0)

    const navigate = useNavigate()

    return <div style={{ display:"flex", justifyContent:"center"}}>
        <Card style={{width:600,marginTop:200, padding:10}}>
            <Typography  variant="h5">Add Course Below</Typography>
            <TextField variant="outlined" fullWidth={true} label="Title" onChange={(e) => setTitle(e.target.value)} style={{marginBottom:10}} ></TextField>
            <TextField variant="outlined" fullWidth={true} label="Description" onChange={(e) => setDescription(e.target.value)} style={{marginBottom:10}} ></TextField>
            <TextField variant="outlined" fullWidth={true}  label="Image Link" onChange={(e) => setImageLink(e.target.value)} style={{marginBottom:10}} ></TextField>
            <TextField variant="outlined" fullWidth={true}  label="Price" onChange={(e) => setPrice(e.target.value)} style={{marginBottom:10}} ></TextField>
            <Button variant="contained" size="lage" onClick={async() => { 
                try { 
                const resp = axios.post("http://localhost:3000/admin/courses/", { 
                    title : title,
                    description: description, 
                    imageLink: imageLink, 
                    price : price 
                }, { 
                    headers: { 
                        "Authorization" : "Bearer " + localStorage.getItem("token"), 
                        "Content-Type" : "Application/json" 
                    }
                })
                alert(`${title} added`)
                navigate("/courses")
                }catch (e) { 
                    console.log(e)
                }
            }}>Add Course</Button>
        </Card>
    </div>

}

export default AddCourse;