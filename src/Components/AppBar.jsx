import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { isUserEmail } from "../store/selectors/useEmail";
import { userState } from "../store/atoms/user";



function AppBar(){ 

    
    const userLoading = useRecoilValue(isUserLoading) 
    const userEmail = useRecoilValue(isUserEmail)

    const setUser = useSetRecoilState(userState);
    

    // if(userLoading) { 
    //     return <CircularProgress thickness={200}/>
    // }
    
  
  if ( userEmail ) { 
    console.log(userLoading, "userloading details")
    return <SignOutCOmponent />
  } else { 
    return <SigninComponent />
  }


}


function SignOutCOmponent  () { 

    const setuser = useSetRecoilState(userState)
    const navigate = useNavigate()

    return <div style={{display:"flex", justifyContent: "space-between"}}>
        <div>
            <Typography >Coursera</Typography>
            </div>
        <div>
            <Button variant="contained" size="large" style={{ marginRight:10}} onClick={() => {navigate("/addcourse")}}>Add Course</Button>
            <Button variant="contained" size="large" style={{ marginRight:10}} onClick={() => {navigate("/courses")}}>Courses</Button>
            <Button variant="contained" size="large" onClick={() =>  {
                localStorage.removeItem("token")
                setuser({userEmail:null, isLoading:true})
                navigate("/signin")
            }}>Sign Out</Button>
        </div>
    </div>


}

function SigninComponent() { 

    const navigate = useNavigate()

    return <div style={{display: "flex", justifyContent:"space-between"}}>
        <div>
            <Typography variant="h5" style={{cursor:"pointer"}} onClick={() => { navigate("/landing")}} >Coursera</Typography>
        </div>
        <div>
            <Button style={{ marginRight:10}} variant="contained" size="large" onClick={()=> { 
                navigate("/signup")
            }}>SignUp</Button>
            <Button variant="contained" size="large" onClick={() => { 
                navigate("/signin")
            }}>SignIn</Button>
        </div>
</div>
}

export default AppBar;