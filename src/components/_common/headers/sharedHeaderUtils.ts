import { ProductDataMixin, getAudience } from 'types/component-props/_mixins';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Language, translator } from 'translations';
import { getTranslatedTaxonomies, joinWithConjunction } from 'utils/string';

export type PagePropsForPageHeader = ContentProps & {
    data: Pick<
        ProductDataMixin,
        'title' | 'illustration' | 'taxonomy' | 'audience' | 'customCategory'
    >;
}; // TODO fjern denne?

type Props = Pick<ContentProps, 'language' | 'type'> & {
    data: Pick<ProductDataMixin, 'taxonomy' | 'audience' | 'customCategory'>;
};

export const getContentTagline = (content: Props, currentLanguage?: Language) => {
    const { data } = content;
    const { taxonomy = [], customCategory, audience } = data;

    const language = currentLanguage ?? content.language;
    const selectedAudience = audience && getAudience(audience);
    const guideTaglines = translator('guides', language);
    const situationTaglines = translator('situations', language);

    if (content.type === ContentType.GuidePage) {
        return (selectedAudience && guideTaglines(selectedAudience)) ?? '';
    }

    if (content.type === ContentType.SituationPage) {
        return (selectedAudience && situationTaglines(selectedAudience)) ?? '';
    }

    if (taxonomy.length > 0 || customCategory) {
        const taxonomyStrings = getTranslatedTaxonomies(taxonomy, language);
        if (customCategory) {
            taxonomyStrings.push(customCategory);
        }

        return joinWithConjunction(taxonomyStrings, language);
    }

    // Catch all if no other taglines could be determined
    const productAudienceTranslations = translator('products', language);
    return selectedAudience ? productAudienceTranslations(selectedAudience) : '';
};
