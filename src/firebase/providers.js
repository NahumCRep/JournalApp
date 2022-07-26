import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        const {displayName, photoURL, email, uid} = result.user

        return {
            ok: true,
            displayName,
            photoURL,
            email,
            uid
        }
        // const user = result.user
        // console.log({user})
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        // console.log(credentials)    
    } catch (error) {
        const errorMessage = error.message
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerWithEmailPassword = async ({displayName, email, password}) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL} = result.user

        await updateProfile(FirebaseAuth.currentUser, {displayName})

        return {
            ok: true,
            displayName,
            photoURL,
            email,
            uid
        }

    } catch (error) {
        const errorMessage = error.message
        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginWithEmailPassword = async ({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, displayName, photoURL} = resp.user
        return {
            ok: true,
            uid,
            displayName,
            photoURL
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}