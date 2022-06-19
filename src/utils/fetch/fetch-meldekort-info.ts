import { fetchJson } from './fetch-utils';

const meldekortinfoUrl = 'https://person.dev.nav.no/dittnav-api/meldekortinfo';

export type MeldekortInfoResponse = {
    nyeMeldekort: {
        antallNyeMeldekort: number;
        nesteMeldekort: unknown;
        nesteInnsendingAvMeldekort: unknown;
    };
    resterendeFeriedager: number;
    etterregistrerteMeldekort: number;
    meldekortbruker: boolean;
};

export const fetchMeldekortInfo = () =>
    fetchJson<MeldekortInfoResponse>(meldekortinfoUrl, 5000, {
        credentials: 'include',
    });
