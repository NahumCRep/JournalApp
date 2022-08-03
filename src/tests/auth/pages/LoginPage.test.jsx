import { fireEvent, render, screen } from "@testing-library/react"
import { LoginPage } from "../../../auth/pages/LoginPage"
import { MemoryRouter } from "react-router"

import { Provider } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../../store/auth/authSlice"
import { startGoogleSignIn } from '../../../store/auth/thunks'
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password})
    }
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Tests of <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks())

    test('should render correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter> 
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1)
    })

    test('google button should call startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter> 
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect( mockStartGoogleSignIn ).toHaveBeenCalled()
    })

    test('subtmi should call startLoginWithEmailPassword', () => {
        const email = 'nahum@gmail.com';
        const password = '1234567';

        render(
            <Provider store={store}>
                <MemoryRouter> 
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', {name: 'Correo'});
        fireEvent.change(emailField, {target: {name:'email', value: email}});
        
        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, {target: {name:'password', value: password}});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({email, password})
    })
})