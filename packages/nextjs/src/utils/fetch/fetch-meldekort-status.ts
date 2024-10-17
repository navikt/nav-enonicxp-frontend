import { setMeldekortStatusAction } from 'store/slices/authState';
import { store } from 'store/store';
import { fetchJson } from '@/common/fetch-utils';
import { logger } from '@/common/logger';

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

const meldekortStatusUrl = `${process.env.NAVNO_API_URL}/meldekortstatus`;

export const fetchAndSetMeldekortStatus = () => {
    if (process.env.ENV === 'localhost') {
        store.dispatch(setMeldekortStatusAction(meldekortStatusMock));
        return;
    }

    return fetchJson<MeldekortStatusResponse>(meldekortStatusUrl, 5000, {
        credentials: 'include',
    }).then((response) => {
        if (!response) {
            logger.error('Failed to fetch meldekort status');
            return null;
        }

        store.dispatch(setMeldekortStatusAction(response));

        return response;
    });
};
