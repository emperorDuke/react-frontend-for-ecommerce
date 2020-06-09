import { authenticate, deAuthenticate } from "..";


export enum auth {
    AUTHENTICATE = 'AUTHENTICATE',
    DEAUTHENTICATE = 'DEAUTHENTICATE',
    RESTORE_AUTH_STATE = 'RESTORE_AUTH_STATE'
}


export type AuthActionType = ReturnType<typeof authenticate> & ReturnType<typeof deAuthenticate>;