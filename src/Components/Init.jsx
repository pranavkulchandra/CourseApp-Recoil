import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useEffect } from "react";
import axios from "axios";

function Init(){ 

    const setUser = useSetRecoilState(userState);

    useEffect(() => {
        const fetchuser = async () => { 
            try { 
                const resp = await axios.get("http://localhost:3000/admin/me", { 
                    headers : { 
                        "Authorization" : "Bearer "+ localStorage.getItem("token")
                    }
                })
                const username = resp.data.username
                if (username) { 
                    setUser({
                        userEmail : username,
                        usLoading: false 
                    })
                } else { 
                    setUser({ 
                        userEmail: null, 
                        isLoading: false
                    })
                }
            } catch (e) { 
                console.log(e)
                setUser({
                    userEmail: null, 
                    isLoading: false
                })
            }
        }
        fetchuser()
    } , [])

    return <></>
}

export default Init;