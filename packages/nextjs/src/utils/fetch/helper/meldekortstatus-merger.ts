import { MeldekortStatusResponse } from 'utils/fetch/fetch-meldekort-status';

type SlaSammenMeldekortParams = {
    meldekortFraArena: MeldekortStatusResponse | null;
    meldekortFraDp: MeldekortStatusResponse | null;
};

export const slaSammenMeldekort = ({
    meldekortFraArena,
    meldekortFraDp,
}: SlaSammenMeldekortParams): MeldekortStatusResponse => {
    const antallGjenstaaendeFeriedagerArena = meldekortFraArena?.antallGjenstaaendeFeriedager ?? 0;
    const antallGjenstaaendeFeriedagerDp = meldekortFraDp?.antallGjenstaaendeFeriedager ?? 0;

    const etterregistrerteMeldekortArena = meldekortFraArena?.etterregistrerteMeldekort ?? 0;
    const etterregistrerteMeldekortDp = meldekortFraDp?.etterregistrerteMeldekort ?? 0;

    const meldekortArena = meldekortFraArena?.meldekort ?? 0;
    const meldekortDp = meldekortFraDp?.meldekort ?? 0;

    const nesteInnsendingAvMeldekort = finnNesteInnsendingAvMeldekort(
        meldekortFraArena,
        meldekortFraDp
    );

    const nesteMeldekort = finnNesteMeldekort(meldekortFraArena, meldekortFraDp);

    return {
        antallGjenstaaendeFeriedager:
            antallGjenstaaendeFeriedagerArena + antallGjenstaaendeFeriedagerDp,
        etterregistrerteMeldekort: etterregistrerteMeldekortArena + etterregistrerteMeldekortDp,
        meldekort: meldekortArena + meldekortDp,
        nesteInnsendingAvMeldekort: nesteInnsendingAvMeldekort,
        nesteMeldekort: nesteMeldekort,
    } as MeldekortStatusResponse;
};

const finnNesteInnsendingAvMeldekort = (
    meldekortFraArena: MeldekortStatusResponse | null,
    meldekortFraDp: MeldekortStatusResponse | null
) => {
    const nesteInnsendingAvMeldekortArena = meldekortFraArena?.nesteInnsendingAvMeldekort ?? null;
    const nesteInnsendingAvMeldekortDp = meldekortFraDp?.nesteInnsendingAvMeldekort ?? null;

    if (nesteInnsendingAvMeldekortArena === null && nesteInnsendingAvMeldekortDp === null) {
        return null;
    } else if (nesteInnsendingAvMeldekortArena === null) {
        return nesteInnsendingAvMeldekortDp;
    } else if (nesteInnsendingAvMeldekortDp === null) {
        return nesteInnsendingAvMeldekortArena;
    } else if (nesteInnsendingAvMeldekortArena < nesteInnsendingAvMeldekortDp) {
        return nesteInnsendingAvMeldekortArena;
    }

    return nesteInnsendingAvMeldekortDp;
};

const finnNesteMeldekort = (
    meldekortFraArena: MeldekortStatusResponse | null,
    meldekortFraDp: MeldekortStatusResponse | null
) => {
    const nesteMeldekortArena = meldekortFraArena?.nesteMeldekort ?? null;
    const nesteMeldekortDp = meldekortFraDp?.nesteMeldekort ?? null;

    if (nesteMeldekortArena === null && nesteMeldekortDp === null) {
        return null;
    } else if (nesteMeldekortArena === null) {
        return nesteMeldekortDp;
    } else if (nesteMeldekortDp === null) {
        return nesteMeldekortArena;
    } else if (nesteMeldekortArena.kanSendesFra < nesteMeldekortDp.kanSendesFra) {
        return nesteMeldekortArena;
    } else {
        return nesteMeldekortDp;
    }
};
