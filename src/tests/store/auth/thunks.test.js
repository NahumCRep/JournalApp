import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { checkingCredentials, login, logout } from "../../../store/auth/authSlice";
import { checkAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout, startRegisterUserWithEmailPassword } from "../../../store/auth/thunks"
import { clearNotesLogout } from "../../../store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../firebase/providers');

describe('Tests of auth thunks', () => { 
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('should execute checkAuthentication', async () => { 
        await checkAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith({"payload": undefined, "type": "auth/checkingCredentials"});
    })

    test('should call checkAuthentication and login when dispatch startSingInWithGoogle', async () => { 
        const loginData = {ok: true, ...demoUser};
        
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login(loginData) );
    })

    test('should call checkAuthentication and logut with errorMessage when dispatch startSingInWithGoogle when fail', async () => { 
        const loginData = {ok: false, errorMessage: "Google error ocurred"};

        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout(loginData.errorMessage) );
    })

    test('should call checkAuthentication and login in startLoginWithEmailPassword', async () => { 
        const loginData = {ok: true, ...demoUser};
        const formData = {email: 'demouser@gmail.com', password: '1234567'};

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login({...demoUser}) );
    })

    test('should call checkAuthentication and logout in startLoginWithEmailPassword when fail', async () => { 
        const loginData = {ok: false, errorMessage: 'Login error ocurred'};
        const formData = {email: 'demouser@gmail.com', password: '1234567'};

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout(loginData.errorMessage) );
    })

    test('should call checkAuthentication and login in startRegisterUserWithEmailPassword', async () => {
        const loginData = { ok: true, ...demoUser};
        const formData = {displayName: demoUser.displayName, email: demoUser.email, password: '1234567'};

        await registerWithEmailPassword.mockResolvedValue(loginData);
        await startRegisterUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login({...demoUser}) );
    })

    test('should call checkAuthentication and logout in startRegisterUserWithEmailPassword when fail', async () => {
        const loginData = { ok: false, errorMessage: 'Register error ocurred'};
        const formData = {displayName: demoUser.displayName, email: demoUser.email, password: '1234567'};

        await registerWithEmailPassword.mockResolvedValue(loginData);
        await startRegisterUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout(loginData.errorMessage) );
    })

    test('should logout from firebase', async () => {
      
       await startLogout()(dispatch);

       expect(logoutFirebase).toHaveBeenCalled();
       expect(dispatch).toHaveBeenCalledWith( clearNotesLogout() );
       expect(dispatch).toHaveBeenCalledWith( logout() );
    })
})