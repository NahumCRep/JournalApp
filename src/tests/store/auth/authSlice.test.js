import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('Tests of authSlice', () => {

    test('should return initial state and the name should be "auth"', () => {
        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
        // expect(authSlice.getInitialState()).toEqual(initialState)
    })

    test('should authenticate', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual(authenticatedState)
    })

    test('should logout', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual(notAuthenticatedState)
    })

    test('should have errorMessage on logout', () => {
        const errorMessage = "Credentials incorrect"
        const state = authSlice.reducer(authenticatedState, logout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    })

    test('should set the status to checking', () => {      
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking')
    })
})