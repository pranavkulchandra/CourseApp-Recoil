import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";


function Signup(){ 

    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")

    const navigate=useNavigate()

    const setUser = useSetRecoilState(userState)
    


    return <div style={{paddingTop:200, display:"flex", justifyContent:"center"}}>
        
        <Card style={{ width: 400, padding:10}}>
            <Typography textAlign={"center"} variant="h5">Welcome to Coursera!!</Typography>
            <TextField variant="outlined" onChange={(e) => setEmail(e.target.value)} fullWidth={true} style={{ marginBottom:10}} label="Email"/>
            <TextField variant="outlined" onChange={(e) => setPassword(e.target.value)} style={{marginBottom:10}} fullWidth={true} label="Password"/>
            <Button variant="contained" size="large" onClick={ async () => { 
                const resp = await axios.post("http://localhost:3000/admin/signup/", { 
                    username : email, 
                    password : password,
                }, { 
                    headers : { 
                        "Content-Type" : "application/json",
                    }
                })
                let token = resp.data.token
                localStorage.setItem("token", token)
                setUser({userEmail:email, isLoading:false})
                navigate("/courses")
            }}>SignUp</Button>
        </Card>
    </div>
}

export default Signup;