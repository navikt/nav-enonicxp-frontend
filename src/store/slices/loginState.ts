import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type AuthState = 'loggedIn' | 'loggedOut' | 'waiting';

export type LoginState = {
    authState: AuthState;
};

const initialState: LoginState = {
    authState: 'waiting',
};

export const loginStateSlice = createSlice({
    name: 'loginState',
    initialState,
    reducers: {
        setLoginState: (state, action: PayloadAction<LoginState>) => {
            if (action.payload) {
                state.authState = action.payload.authState;
            }
        },
    },
});

export const { setLoginState: setLoginStateAction } = loginStateSlice.actions;

export const loginStateSelector = (state: RootState) => {
    return state.loginState;
};

export default loginStateSlice.reducer;
