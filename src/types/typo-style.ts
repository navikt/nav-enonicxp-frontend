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

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

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

export const headingToTypoStyle: {
    [key in HeadingTag]: TypoStyle;
} = {
    h1: TypoStyle.Sidetittel,
    h2: TypoStyle.Innholdstittel,
    h3: TypoStyle.Systemtittel,
    h4: TypoStyle.Undertittel,
    h5: TypoStyle.Undertittel,
    h6: TypoStyle.Element,
};
