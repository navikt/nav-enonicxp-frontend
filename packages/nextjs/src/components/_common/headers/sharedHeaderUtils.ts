import { ProductDataMixin, getAudience } from 'types/component-props/_mixins';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Language, translator } from 'translations';
import { getTranslatedTaxonomies, joinWithConjunction } from 'utils/string';

export type GetContentTaglineProps = Pick<ContentProps, 'language' | 'type'> & {
    data: Pick<ProductDataMixin, 'taxonomy' | 'audience' | 'customCategory'>;
};

export const getContentTagline = (content: GetContentTaglineProps, currentLanguage?: Language) => {
    const { data } = content;
    const { taxonomy = [], customCategory, audience } = data;

    const language = currentLanguage ?? content.language;
    const selectedAudience = audience && getAudience(audience);
    const guideTaglines = translator('guides', language);
    const situationTaglines = translator('situations', language);

    if (content.type === ContentType.GuidePage) {
        return { tagline: (selectedAudience && guideTaglines(selectedAudience)) ?? '', language };
    }

    if (content.type === ContentType.SituationPage) {
        return {
            tagline: (selectedAudience && situationTaglines(selectedAudience)) ?? '',
            language,
        };
    }

    if ((taxonomy && taxonomy.length > 0) || customCategory) {
        const taxonomyStrings = getTranslatedTaxonomies(taxonomy, language);

        if (customCategory && taxonomyStrings.length === 0) {
            taxonomyStrings.push(customCategory);
        }

        return { tagline: joinWithConjunction(taxonomyStrings, language), language };
    }

    return { tagline: '', language };
};
