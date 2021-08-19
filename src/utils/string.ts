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
