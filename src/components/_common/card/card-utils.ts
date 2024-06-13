import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Audience, getAudience } from 'types/component-props/_mixins';
import {
    GuidePageProps,
    ProductPageProps,
    SituationPageProps,
    ThemedArticlePageProps,
    ToolsPageProps,
} from 'types/content-props/dynamic-page-props';
import { Language, translator } from 'translations';
import { getTranslatedTaxonomies, joinWithConjunction } from 'utils/string';

export type CardTargetProps =
    | ProductPageProps
    | SituationPageProps
    | ToolsPageProps
    | GuidePageProps
    | ThemedArticlePageProps;

export type CardProps = {
    type: CardType;
    link: LinkProps;
    description?: string;
    tagline?: string;
    illustration?: AnimatedIconsProps;
    preferStaticIllustration?: boolean;
};

export const cardTypeMap = {
    [ContentType.ProductPage]: CardType.Product,
    [ContentType.SituationPage]: CardType.Situation,
    [ContentType.ToolsPage]: CardType.Tool,
    [ContentType.ThemedArticlePage]: CardType.ThemedArticle,
    [ContentType.GuidePage]: CardType.Guide,
    [ContentType.Overview]: CardType.Overview,
    [ContentType.GenericPage]: CardType.Generic,
};

const getCardTagline = (content: CardTargetProps, language: Language): string => {
    const { data } = content;
    const { taxonomy = [], customCategory, audience } = data;
    const selectedAudience = audience && getAudience(audience);
    const guideTaglines = translator('guides', language);
    const situationTaglines = translator('situations', language);

    if (content.type === ContentType.GuidePage) {
        return (selectedAudience && guideTaglines(selectedAudience)) || '';
    }

    if (content.type === ContentType.SituationPage) {
        return (selectedAudience && situationTaglines(selectedAudience)) || '';
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

export const getCardProps = (
    targetContent: CardTargetProps | undefined,
    content: ContentProps,
    ingressOverride?: string
): CardProps | null => {
    if (!targetContent?.data) {
        return null;
    }

    const { language } = content;

    const { data, type, _path, displayName } = targetContent;
    const { title, ingress, illustration, externalProductUrl } = data;

    const audience = content.data?.audience;

    const cardType = cardTypeMap[type];
    const cardUrl = externalProductUrl || _path;
    const cardTitle = title || displayName;

    const link = {
        url: cardUrl,
        text: cardTitle,
    };

    const tagline = getCardTagline(targetContent, language);
    const description = ingressOverride || ingress;
    const preferStaticIllustration = audience?._selected === Audience.EMPLOYER;

    return {
        type: cardType,
        link,
        description,
        illustration,
        tagline,
        preferStaticIllustration,
    };
};
