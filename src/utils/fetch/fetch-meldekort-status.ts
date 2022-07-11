import { fetchJson } from './fetch-utils';
import { setMeldekortInfoAction } from '../../store/slices/authState';
import { store } from '../../store/store';

export type Meldekortstatus = {
    meldekort: number;
    etterregistrerteMeldekort: number;
    antallGjenstaaendeFeriedager: number;
    nesteMeldekort: null | unknown;
    nesteInnsendingAvMeldekort: null | unknown;
};

const meldekortStatusUrl = process.env.NAVNO_API_URL
    ? `${process.env.NAVNO_API_URL}/meldekortstatus`
    : null;

export const fetchAndSetMeldekortStatus = () => {
    if (!meldekortStatusUrl) {
        return;
    }

    return fetchJson<Meldekortstatus>(meldekortStatusUrl, 5000, {
        credentials: 'include',
    }).then((response) => {
        if (!response) {
            console.error('Failed to fetch meldekortinfo');
            return;
        }

        store.dispatch(setMeldekortInfoAction(response));
    });
};
