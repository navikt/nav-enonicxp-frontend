export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type Level = '1' | '2' | '3' | '4' | '5' | '6';
export type Size =
    | '2xlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall';

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
    h1: '1',
    h2: '2',
    h3: '3',
    h4: '4',
    h5: '5',
    h6: '6', // The new design system only allows for 5 levels.
};

export const headingToSize: {
    [key in HeadingTag]: Size;
} = {
    h1: '2xlarge',
    h2: 'xlarge',
    h3: 'large',
    h4: 'medium',
    h5: 'small',
    h6: 'xsmall',
};

// Used if no size is set, so we need to check level and determine
// the size from there.
export const levelToSize: {
    [key in Level]: Size;
} = {
    1: '2xlarge',
    2: 'xlarge',
    3: 'large',
    4: 'medium',
    5: 'small',
    6: 'xsmall',
};

export const typoToSize: {
    [key in HeaderTypoStyle]: Size;
} = {
    [HeaderTypoStyle.Sidetittel]: '2xlarge',
    [HeaderTypoStyle.Innholdstittel]: 'xlarge',
    [HeaderTypoStyle.Systemtittel]: 'large',
    [HeaderTypoStyle.Undertittel]: 'medium',
    [HeaderTypoStyle.Element]: 'small',
};
