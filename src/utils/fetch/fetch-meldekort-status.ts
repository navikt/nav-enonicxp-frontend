import { fetchJson } from './fetch-utils';
import { setMeldekortStatusAction } from '../../store/slices/authState';
import { store } from '../../store/store';

export type MeldekortStatusResponse = {
    meldekort: number;
    etterregistrerteMeldekort: number;
    antallGjenstaaendeFeriedager: number;
    nesteMeldekort: null | string;
    nesteInnsendingAvMeldekort: null | string;
};

const meldekortStatusMock: MeldekortStatusResponse = {
    meldekort: 0,
    etterregistrerteMeldekort: 1,
    antallGjenstaaendeFeriedager: 0,
    nesteMeldekort: null,
    nesteInnsendingAvMeldekort: '2022-07-23',
};

const meldekortStatusUrl = process.env.NAVNO_API_URL
    ? `${process.env.NAVNO_API_URL}/meldekortstatus`
    : null;

export const fetchAndSetMeldekortStatus = () => {
    if (process.env.ENV === 'localhost') {
        store.dispatch(setMeldekortStatusAction(meldekortStatusMock));
        return;
    }

    if (!meldekortStatusUrl) {
        return;
    }

    return fetchJson<MeldekortStatusResponse>(meldekortStatusUrl, 5000, {
        credentials: 'include',
    }).then((response) => {
        if (!response) {
            console.error('Failed to fetch meldekort status');
            return null;
        }

        store.dispatch(setMeldekortStatusAction(response));

        return response;
    });
};
