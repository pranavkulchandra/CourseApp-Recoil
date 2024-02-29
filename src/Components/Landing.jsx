import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isUserEmail } from "../store/selectors/useEmail"
import { isUserLoading } from "../store/selectors/isUserLoading"
import { Button, Grid, Typography } from "@mui/material"

export const Landing =() => { 
    const navigate = useNavigate()
    const userEmail = useRecoilValue(isUserEmail)
    const userLoading = useRecoilValue(isUserLoading)

    return <div>
        <Grid container style={{padding: "5vw"}}>
            <Grid item xs={12} md={12} lg={6} >
                <div style={{marginTop:100}}>
                    <Typography variant="h2">Coursera Admin</Typography>
                    <Typography variant="h5">Place to Learn Code &lt; &gt;</Typography>
                    {!userEmail && !userLoading && <div style={{ display:"flex", marginTop:20}}>
                            <div>
                                <Button style={{marginRight:10}} variant="contained" size="large" onClick={() => {navigate("/signup")}}>SignUp</Button>
                            </div>
                            <div>
                                <Button variant="contained" size="large" onClick={() => { navigate("signin")}}>SignIn</Button>
                            </div>
                         </div>}
                </div>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <img src="/teaching.jpeg" width={"100%"}></img>
            </Grid>
        </Grid>
    </div>


}

