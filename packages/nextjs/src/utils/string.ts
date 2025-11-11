import { Language, translator } from 'translations';
import { AudienceOptions } from 'types/component-props/_mixins';
import { Taxonomy } from 'types/taxonomies';

export const joinWithConjunction = (joinableArray: string[], language: Language): string => {
    if (!Array.isArray(joinableArray)) {
        return '';
    }
    const getConjunction = translator('stringParts', language);
    const conjunction = getConjunction('conjunction');

    return joinableArray.join(', ').replace(/, ([^,]*)$/, ` ${conjunction} $1`);
};

export const getConjunction = ({
    index,
    length,
    language,
}: {
    index: number;
    length: number;
    language: Language;
}) => {
    const getStringPart = translator('stringParts', language);
    if (index === length - 1) {
        return '.';
    }

    if (length > 2 && index < length - 2) {
        return ', ';
    }

    if (index === length - 2) {
        return ` ${getStringPart('conjunction')} `;
    }
};

export const getTranslatedAudience = (
    audience: AudienceOptions['_selected'],
    language: Language
): string => {
    const getAudienceLabel = translator('audience', language);
    return getAudienceLabel(audience) || '';
};

export const getTranslatedTaxonomy = (taxonomy: Taxonomy, language: Language): string => {
    const getTaxonomyLabel = translator('taxonomies', language);
    return getTaxonomyLabel(taxonomy) || '';
};

export const getTranslatedTaxonomies = (taxonomies: Taxonomy[], language: Language): string[] => {
    if (!Array.isArray(taxonomies)) {
        return [];
    }
    const getTaxonomyLabel = translator('taxonomies', language);

    return taxonomies.map(getTaxonomyLabel).filter(Boolean);
};

export const numberToFormattedValue = (
    value: unknown,
    options: { useThousandSeparator: boolean }
) => {
    if (typeof value !== 'number') {
        return '';
    }

    if (options.useThousandSeparator) {
        return value.toLocaleString('no');
    }

    return value;
};

export const insertHTMLBreaks = (value: string) => {
    return value.replace('\n', '<br>');
};

export const stripLineBreaks = (str: string) =>
    str.replace(
        /\r?\n|\r/g,
        (value) =>
            ({
                '\n': '\\n',
                '\r': '\\r',
                '\r\n': '\\r\\n',
            })[value] || ''
    );

export const capitalize = (str: string) =>
    str
        .split(' ')
        .map((letter) => {
            return `${letter
                .toLowerCase()
                .replace(/(^|[\s-])\S/g, (letter) => letter.toUpperCase())}`;
        })
        .join(' ');

export const shortenText = (text: string, maxLength: number, maxOverflowLength: number = 0) => {
    if (!!text && text.length > maxLength + maxOverflowLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

export const trimIfString = (value: unknown) => typeof value === 'string' && value.trim();

// Common transliterations you likely care about in NO + neighbours
const SPECIALS: Record<string, string> = {
    æ: 'ae',
    ø: 'o',
    å: 'a',
    ß: 'ss',
    œ: 'oe',
    ñ: 'n',
    ç: 'c',
    ð: 'd',
    þ: 'th',
    ł: 'l',
};

export const normalizeToAscii = (input: string): string => {
    if (!input) return '';

    // Quick slice + trim + lowercase. Slicing to avoid catastrophic backtracking on very long strings
    // if this function should be used on user controlled input in the future.
    let s = input.slice(0, 1000).trim().toLowerCase();

    // Map special latin chars (nordic and others)
    s = s.replace(/[\u0080-\u024F]/g, (ch) => SPECIALS[ch] ?? ch);

    // Strip diacritics (NFKD is a bit more aggressive than NFD)
    s = s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

    // Keep [a-z0-9], replace any special non-alphanumeric chars (ie !, ?, etc) with hyphen
    // Finally, collapse consecutive hyphens into a single one. Do this in two passes to avoid use of
    // regex backtracking, which causes SonarCloud to yell.
    s = s.replace(/[^a-z0-9]+/g, '-');
    s = s.replace(/^-+/, '').replace(/-+$/, '');

    // If emoji-only strings or everything ended up being stripped, return empty string
    return s || '';
};
