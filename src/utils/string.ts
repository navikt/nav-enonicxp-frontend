import { Language, translator } from 'translations';
import { Taxonomy } from 'types/taxonomies';

export const joinWithConjunction = (
    joinableArray: string[],
    language: Language
): string => {
    if (!Array.isArray(joinableArray)) {
        return '';
    }
    const getConjunction = translator('stringParts', language);
    const conjunction = getConjunction('conjunction');

    return joinableArray.join(', ').replace(/, ([^,]*)$/, ` ${conjunction} $1`);
};

export const buildTaxonomyString = (
    taxonomies: Taxonomy[],
    language: Language
): string => {
    if (!Array.isArray(taxonomies)) {
        return '';
    }
    const getTaxonomyLabel = translator('productTaxonomies', language);
    const taxonomyLabels = taxonomies.map((taxonomy) => {
        return getTaxonomyLabel(taxonomy) || '';
    });

    return joinWithConjunction(taxonomyLabels, language);
};

export const numberToFormattedValue = (
    value: number,
    options: { useThousandSeparator: boolean }
) => {
    const { useThousandSeparator } = options;

    if (typeof value !== 'number') {
        return '';
    }

    if (useThousandSeparator) {
        return value.toLocaleString('no');
    }

    return value;
};

export const insertHTMLBreaks = (value: string) => {
    return value.replace('\n', '<br>');
};

export const stripLineBreaks = (str: string) => str.replace(/\r?\n|\r/g, ' ');
