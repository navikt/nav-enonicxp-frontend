import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meldekortstatus } from '../../utils/fetch/fetch-meldekort-status';

export type AuthStateType = 'loggedIn' | 'loggedOut' | 'waiting';

export type AuthState = {
    authState: AuthStateType;
    name?: string;
    meldekortStatus?: Meldekortstatus;
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
        setMeldekortInfo: (
            state,
            action: PayloadAction<AuthState['meldekortStatus']>
        ) => {
            if (action.payload) {
                state.meldekortStatus = action.payload;
            }
        },
    },
});

export const {
    setAuthState: setAuthStateAction,
    setMeldekortInfo: setMeldekortInfoAction,
} = authStateSlice.actions;

export default authStateSlice.reducer;
