import { logger } from '@/shared/logger';
import { setMeldekortStatusAction } from 'store/slices/authState';
import { store } from 'store/store';

export type NesteMeldekort = {
    fra: string;
    kanSendesFra: string;
    til: string;
    uke: string;
};

export type MeldekortStatusResponse = {
    meldekort: number;
    etterregistrerteMeldekort: number;
    antallGjenstaaendeFeriedager: number;
    nesteMeldekort?: NesteMeldekort | null;
    nesteInnsendingAvMeldekort?: string | null;
};

const meldekortStatusMock: MeldekortStatusResponse = {
    meldekort: 0,
    etterregistrerteMeldekort: 1,
    antallGjenstaaendeFeriedager: 0,
    nesteMeldekort: null,
    nesteInnsendingAvMeldekort: '2022-07-23',
};

export const fetchAndSetMeldekortStatus = async () => {
    if (process.env.ENV === 'localhost') {
        store.dispatch(setMeldekortStatusAction(meldekortStatusMock));
        // return;
    }

    try {
        const response = await fetch('/api/meldekortstatus', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response?.ok) {
            logger.error(
                `Failed to fetch meldekort status: ${response.status} ${response.statusText}`
            );
            return null;
        }

        const data = (await response.json()) as MeldekortStatusResponse;

        if (data) {
            store.dispatch(setMeldekortStatusAction(data));
        }

        return data;
    } catch (error: any) {
        logger.error('Error fetching meldekort status:', error);
        return null;
    }
};
