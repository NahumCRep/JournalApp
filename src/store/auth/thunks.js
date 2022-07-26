import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, logout, login } from "./authSlice"

export const checkAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await signInWithGoogle()
        if( !result.ok ) return dispatch( logout(result.errorMessage) )

        dispatch( login(result) )
    }
}

export const startRegisterUserWithEmailPassword = ({displayName, email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const {ok, uid, photoURL, errorMessage} = await registerWithEmailPassword({displayName, email, password})
        
        if( !ok ) return dispatch(logout(errorMessage))

        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const {ok, uid, displayName, photoURL, errorMessage} = await loginWithEmailPassword({email, password})
        
        if (!ok) return dispatch(logout(errorMessage))

        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase()
        dispatch(logout())
    }
}