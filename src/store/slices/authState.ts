import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type AuthStateType = 'loggedIn' | 'loggedOut' | 'waiting';

export type AuthState = {
    authState: AuthStateType;
    name?: string;
};

const initialState: AuthState = {
    authState: 'waiting',
};

export const authStateSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            if (action.payload) {
                state.authState = action.payload.authState;
                state.name = action.payload.name;
            }
        },
    },
});

export const { setAuthState: setAuthStateAction } = authStateSlice.actions;

export const authStateSelector = (state: RootState) => {
    return state.authState;
};

export default authStateSlice.reducer;
