export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type Level = '1' | '2' | '3' | '4' | '5' | '6';
export type Size = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

export const headingToLevel: Record<HeadingTag, Level> = {
    h1: '1',
    h2: '2',
    h3: '3',
    h4: '4',
    h5: '5',
    h6: '6',
};

export const headingToSize: Record<HeadingTag, Size> = {
    h1: 'xlarge',
    h2: 'large',
    h3: 'medium',
    h4: 'small',
    h5: 'xsmall',
    h6: 'xsmall', // The new design system only allows for 5 levels.
};

// Used if no size is set, so we need to check level and determine
// the size from there.
export const levelToSize: Record<Level, Size> = {
    1: 'xlarge',
    2: 'large',
    3: 'medium',
    4: 'small',
    5: 'xsmall',
    6: 'xsmall',
};

export const isHeadingTag = (tag?: string): tag is HeadingTag =>
    !!headingToLevel[tag as HeadingTag];
