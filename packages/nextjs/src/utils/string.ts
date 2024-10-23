import { Language, translator } from 'translations';
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
