import {
    Ingress,
    Innholdstittel,
    Sidetittel,
    Systemtittel,
    Undertittel,
    Element,
    Feilmelding,
    Normaltekst,
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
    [TypoStyle.Undertekst]: Undertekst,
};
