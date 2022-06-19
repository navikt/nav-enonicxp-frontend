import { fetchJson } from './fetch-utils';
import { store } from '../../store/store';
import { setMeldekortInfoAction } from '../../store/slices/authState';

const meldekortinfoUrl = 'https://person.dev.nav.no/dittnav-api/meldekortinfo';

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
    fetchJson<MeldekortInfo>(meldekortinfoUrl, 5000, {
        credentials: 'include',
    }).then((meldekortInfo) => {
        if (!meldekortInfo) {
            return;
        }

        store.dispatch(setMeldekortInfoAction(meldekortInfo));
    });
};
