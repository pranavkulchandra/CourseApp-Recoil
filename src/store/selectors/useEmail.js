import { selector } from "recoil";
import { userState } from "../atoms/user"


export const isUserEmail = selector({ 
    key : "isUserEmail", 
    get: ({get}) => { 
        const state = get(userState);
        return state.userEmail;
    }
})


    