import {
    ContentProps,
    ContentType,
} from '../../../../types/content-props/_content-common';
import {
    Audience,
    getAudience,
    getSubAudience,
    ProductDataMixin,
} from '../../../../types/component-props/_mixins';
import { translator } from '../../../../translations';
import {
    getTranslatedTaxonomies,
    joinWithConjunction,
} from '../../../../utils/string';

import style from './ThemedPageHeader.module.scss';

export type ContentPropsForThemedPageHeader = ContentProps & {
    data: Pick<
        ProductDataMixin,
        'title' | 'illustration' | 'taxonomy' | 'audience' | 'customCategory'
    >;
};

const contentTypeToClassName: { [key in ContentType]?: string } = {
    [ContentType.SituationPage]: style.situation,
    [ContentType.ProductPage]: style.product,
    [ContentType.GuidePage]: style.guide,
    [ContentType.ThemedArticlePage]: style.themedpage,
    [ContentType.ToolsPage]: style.tool,
    [ContentType.FormIntermediateStepPage]: style.intermediateStep,
    [ContentType.Overview]: style.overview,
    [ContentType.GenericPage]: style.generic,
};

export const themedPageHeaderGetTypeClassName = (contentType: ContentType) => {
    return contentTypeToClassName[contentType];
};

export const themedPageHeaderGetSubtitle = ({
    type,
    language,
    data,
}: ContentPropsForThemedPageHeader) => {
    const { taxonomy, audience, customCategory } = data;

    const currentAudience = getAudience(audience);
    const subAudience = getSubAudience(audience);

    if (
        currentAudience === Audience.PROVIDER &&
        subAudience &&
        subAudience.length > 0
    ) {
        const getStringParts = translator('stringParts', language);
        const getSubAudienceLabel = translator('providerAudience', language);
        const subAudienceLabels = subAudience.map((audience) =>
            getSubAudienceLabel(audience).toLowerCase()
        );
        return `${getStringParts('for')} ${joinWithConjunction(
            subAudienceLabels,
            language
        )}`;
    }

    if (type === ContentType.SituationPage) {
        const getTaxonomyLabel = translator('situations', language);
        return getTaxonomyLabel(currentAudience || 'person');
    }

    if (type === ContentType.GuidePage) {
        const getTaxonomyLabel = translator('guides', language);
        return getTaxonomyLabel(currentAudience || 'person');
    }

    if (type === ContentType.Overview) {
        const getTaxonomyLabel = translator('overview', language);
        return getTaxonomyLabel('any');
    }

    if (
        type === ContentType.ThemedArticlePage ||
        type === ContentType.FormIntermediateStepPage
    ) {
        const taxonomyArray = getTranslatedTaxonomies(taxonomy, language);
        const allCategories = customCategory
            ? [...taxonomyArray, customCategory]
            : taxonomyArray;

        return joinWithConjunction(allCategories, language);
    }

    if (
        type === ContentType.ProductPage &&
        (currentAudience === Audience.EMPLOYER ||
            currentAudience === Audience.PROVIDER) // Will catch unlikely events where no sub audience for provider was set
    ) {
        const getTaxonomyLabel = translator('products', language);
        return getTaxonomyLabel(currentAudience);
    }

    const taxonomyArray = getTranslatedTaxonomies(taxonomy, language);
    return joinWithConjunction(taxonomyArray, language);
};
