import { fetchJson } from './fetch-utils';
import { store } from '../../store/store';
import { setMeldekortInfoAction } from '../../store/slices/authState';

const envUrls: { [key in typeof process.env.ENV]: string } = {
    prod: 'https://person.nav.no/dittnav-api/meldekortinfo',
    dev: 'https://person.dev.nav.no/dittnav-api/meldekortinfo',
    localhost: 'http://localhost:1337', // TODO: add a local mock
};

const url = envUrls[process.env.ENV];

export type MeldekortInfo = {
    nyeMeldekort: {
        antallNyeMeldekort: number;
        nesteMeldekort: unknown;
        nesteInnsendingAvMeldekort: unknown;
    };
    resterendeFeriedager: number;
    etterregistrerteMeldekort: number;
    meldekortbruker: boolean;
};

export const fetchAndSetMeldekortInfo = () => {
    fetchJson<MeldekortInfo>(url, 5000, {
        credentials: 'include',
    }).then((meldekortInfo) => {
        if (!meldekortInfo) {
            return;
        }

        store.dispatch(setMeldekortInfoAction(meldekortInfo));
    });
};
