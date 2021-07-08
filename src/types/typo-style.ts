export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type Level = 1 | 2 | 3 | 4 | 5;
export type Size = '2xl' | 'xl' | 'l' | 'm' | 's';

export enum HeaderTypoStyle {
    Sidetittel = 'sidetittel',
    Innholdstittel = 'innholdstittel',
    Systemtittel = 'systemtittel',
    Undertittel = 'undertittel',
    Element = 'element',
}

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

export const headingToLevel: {
    [key in HeadingTag]: Level;
} = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 5, // The new design system only allows for 5 levels.
};

export const headingToSize: {
    [key in HeadingTag]: Size;
} = {
    h1: '2xl',
    h2: 'xl',
    h3: 'l',
    h4: 'm',
    h5: 's',
    h6: 's',
};

export const typoToSize: {
    [key in HeaderTypoStyle]: Size;
} = {
    [HeaderTypoStyle.Sidetittel]: '2xl',
    [HeaderTypoStyle.Innholdstittel]: 'xl',
    [HeaderTypoStyle.Systemtittel]: 'l',
    [HeaderTypoStyle.Undertittel]: 'm',
    [HeaderTypoStyle.Element]: 's',
};
