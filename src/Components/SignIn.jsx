import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn(){ 
    const [username, setUsername ]= useState("");

    const [ password , setPassword ] = useState("");

    const setUser = useSetRecoilState(userState)

    const navigate = useNavigate()

    return <div style={{ display:"flex" , justifyContent:"center" , marginTop:200}}>
            <Card style={{boxShadow:25,  width:400}}>
                <Typography variant="h5" textAlign={"center"}>Wolcome Back to CourseRa</Typography>
                <TextField fullWidth={true} style={{marginBottom: 10}}  label="Email" onChange={(e) => setUsername(e.target.value)}></TextField>
                <TextField fullWidth={true} style={{marginBottom: 10}} label="Password" onChange={(e) => setPassword(e.target.value)}></TextField>
                <div style={{ display:"flex", justifyContent: "center"}}>
                <Button variant="contained" size="large" onClick={async() => { 
                
                const reply = await axios.post("http://localhost:3000/admin/login", { 
                        username : username, 
                        password : password
                    }, { 
                        headers : { 
                            "Content-Type" : "application/json"
                        }
                    })
                    let token = reply.data.token
                    localStorage.setItem("token", token)
                    setUser({
                        userEmail : username, 
                        isLoading: false
                    })
                    navigate("/courses")
                }} >SignIn</Button>
                </div>
            </Card>
    </div>

}

export default SignIn;