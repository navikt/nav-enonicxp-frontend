import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeldekortInfo } from '../../utils/fetch/fetch-meldekort-info';

export type AuthStateType = 'loggedIn' | 'loggedOut' | 'waiting';

export type AuthState = {
    authState: AuthStateType;
    name?: string;
    meldekortInfo?: MeldekortInfo;
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
            action: PayloadAction<AuthState['meldekortInfo']>
        ) => {
            if (action.payload) {
                state.meldekortInfo = action.payload;
            }
        },
    },
});

export const {
    setAuthState: setAuthStateAction,
    setMeldekortInfo: setMeldekortInfoAction,
} = authStateSlice.actions;

export default authStateSlice.reducer;
