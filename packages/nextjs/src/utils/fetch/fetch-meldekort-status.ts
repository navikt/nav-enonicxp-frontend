import { fetchJson } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';
import { setMeldekortStatusAction } from 'store/slices/authState';
import { store } from 'store/store';

export type MeldekortStatusResponse = {
    meldekort: number;
    etterregistrerteMeldekort: number;
    antallGjenstaaendeFeriedager: number;
    nesteMeldekort?: null | string;
    nesteInnsendingAvMeldekort?: null | string;
};

const meldekortStatusMock: MeldekortStatusResponse = {
    meldekort: 0,
    etterregistrerteMeldekort: 1,
    antallGjenstaaendeFeriedager: 0,
    nesteMeldekort: null,
    nesteInnsendingAvMeldekort: '2022-07-23',
};

const meldekortApiStatusUrl = `${process.env.MELDEKORT_API_URL}/meldekortstatus`;
const dpMeldekortStatusUrl = `${process.env.DP_MELDEKORT_URL}`;

const arbitrateMeldekortResponse = (
    response1: MeldekortStatusResponse | null,
    response2: MeldekortStatusResponse | null
): MeldekortStatusResponse => {
    if (response1?.nesteInnsendingAvMeldekort) {
        return response1;
    }

    if (response2?.nesteInnsendingAvMeldekort) {
        return response2;
    }

    return {
        meldekort: 0,
        etterregistrerteMeldekort: 0,
        antallGjenstaaendeFeriedager: 0,
    };
};

export const fetchAndSetMeldekortStatus = async () => {
    if (process.env.ENV === 'localhost') {
        store.dispatch(setMeldekortStatusAction(meldekortStatusMock));
        return;
    }

    try {
        const [meldekortApiResponse, dpMeldekortResponse] = await Promise.all([
            fetchJson<MeldekortStatusResponse>(meldekortApiStatusUrl, 5000, {
                credentials: 'include',
            }),
            fetchJson<MeldekortStatusResponse>(dpMeldekortStatusUrl, 5000, {
                credentials: 'include',
            }),
        ]);

        if (!meldekortApiResponse && !dpMeldekortResponse) {
            logger.error('Failed to fetch meldekort status from both endpoints');
            return null;
        }

        const response = arbitrateMeldekortResponse(meldekortApiResponse, dpMeldekortResponse);

        if (response) {
            store.dispatch(setMeldekortStatusAction(response));
        }

        return response;
    } catch (error: any) {
        logger.error('Error fetching meldekort status:', error);
        return null;
    }
};
