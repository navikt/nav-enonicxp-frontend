import { fetchJson } from './fetch-utils';
import { setAuthStateAction } from '../../store/slices/authState';
import { store } from '../../store/store';

type FetchMeldekortstatustatusResponse = {
    meldekort: number;
    etterregistrerteMeldekort: number;
    antallGjenstaaendeFeriedager: number;
    nesteMeldekort: null | unknown;
    nesteInnsendingAvMeldekort: null | unknown;
};

export const fetchAndSetMeldekortStatus = () =>
    fetchJson<FetchMeldekortstatustatusResponse>(
        process.env.INNLOGGINGSSTATUS_URL,
        5000,
        {
            credentials: 'include',
        }
    ).then((res) => {
        if (!res) {
            console.error('Failed to fetch innloggingsstatus');
            store.dispatch(setAuthStateAction({ authState: 'loggedOut' }));
            return null;
        }

        // store.dispatch(
        //     setAuthStateAction(
        //         res.authenticated
        //             ? {
        //                   authState: 'loggedIn',
        //                   name: res.name,
        //               }
        //             : { authState: 'loggedOut' }
        //     )
        // );

        return res;
    });
