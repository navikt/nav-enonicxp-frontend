import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeldekortStatusResponse } from 'utils/fetch/fetch-meldekort-status';

export type AuthStateType = 'loggedIn' | 'loggedOut' | 'waiting';

export type MeldekortStatus = MeldekortStatusResponse & {
    isMeldekortBruker: boolean;
};

export type AuthState = {
    authState: AuthStateType;
    name?: string;
    meldekortStatus?: MeldekortStatus;
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
                state.authState = 'loggedIn';
                state.name = action.payload.name;
            }
        },
        setMeldekortInfo: (state, action: PayloadAction<MeldekortStatusResponse>) => {
            if (action.payload) {
                state.meldekortStatus = {
                    ...action.payload,
                    isMeldekortBruker: !!action.payload.nesteInnsendingAvMeldekort,
                };
            }
        },
    },
});

export const { setAuthState: setAuthStateAction, setMeldekortInfo: setMeldekortStatusAction } =
    authStateSlice.actions;

export default authStateSlice.reducer;
