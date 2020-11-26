import {
    Ingress,
    Innholdstittel,
    Sidetittel,
    Systemtittel,
    Undertittel,
    Element,
    Feilmelding,
    Normaltekst,
    EtikettLiten,
    Undertekst,
} from 'nav-frontend-typografi';

export enum TypoStyle {
    Sidetittel = 'sidetittel',
    Innholdstittel = 'innholdstittel',
    Systemtittel = 'systemtittel',
    Undertittel = 'undertittel',
    Ingress = 'ingress',
    Element = 'element',
    Feilmelding = 'feilmelding',
    Normaltekst = 'normaltekst',
    EtikettLiten = 'etikettliten',
    Undertekst = 'undertekst',
}

export const typoToComponent: {
    [key in TypoStyle];
} = {
    [TypoStyle.Sidetittel]: Sidetittel,
    [TypoStyle.Innholdstittel]: Innholdstittel,
    [TypoStyle.Systemtittel]: Systemtittel,
    [TypoStyle.Undertittel]: Undertittel,
    [TypoStyle.Ingress]: Ingress,
    [TypoStyle.Element]: Element,
    [TypoStyle.Feilmelding]: Feilmelding,
    [TypoStyle.Normaltekst]: Normaltekst,
    [TypoStyle.EtikettLiten]: EtikettLiten,
    [TypoStyle.Undertekst]: Undertekst,
};
