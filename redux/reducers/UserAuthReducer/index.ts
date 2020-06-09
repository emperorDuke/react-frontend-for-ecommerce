import { auth, AuthActionType } from "../../actionCreators/UserAuthActions";
import { getCookie } from "../../../cookie";



type UserAuthStateType = {
    isLoggedIn: boolean;
    token: string | null;
}


const initState: UserAuthStateType = {
    isLoggedIn: false,
    token: null
}


export default function userAuthReducer (state = initState, action:AuthActionType) {
    switch (action.type) {
        case auth.AUTHENTICATE:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload
            };
        case auth.DEAUTHENTICATE:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }
        case auth.RESTORE_AUTH_STATE:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}