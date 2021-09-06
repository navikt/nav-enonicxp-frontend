import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type LoginState = {
    isLoggedIn?: boolean;
};

const initialState: LoginState = {
    isLoggedIn: undefined,
};

export const loginStateSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginState: (state, action: PayloadAction<LoginState>) => {
            if (action.payload) {
                state.isLoggedIn = action.payload.isLoggedIn;
            }
        },
    },
});

export const { setLoginState: setLoginStateAction } = loginStateSlice.actions;

export const loginStateSelector = (state: RootState) => {
    return state.loginState;
};

export default loginStateSlice.reducer;
