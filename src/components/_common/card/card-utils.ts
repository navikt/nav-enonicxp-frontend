import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { ContentType } from 'types/content-props/_content-common';
import { Audience, getAudience } from 'types/component-props/_mixins';

import {
    ProductPageProps,
    SituationPageProps,
    ToolsPageProps,
} from 'types/content-props/dynamic-page-props';
import { Language, translator } from 'translations';
import { getTranslatedTaxonomies, joinWithConjunction } from 'utils/string';

type CardTargetProps = ProductPageProps | SituationPageProps | ToolsPageProps;

export type CardProps = {
    type: CardType;
    link: LinkProps;
    description?: string;
    category: string;
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

const getCardCategory = (
    content: CardTargetProps,
    language: Language
): string[] => {
    const { data } = content;
    const { taxonomy = [], customCategory, audience } = data;
    const selectedAudience = audience && getAudience(audience);

    if (taxonomy.length > 0 || customCategory) {
        const taxonomyStrings = getTranslatedTaxonomies(taxonomy, language);
        if (customCategory) {
            taxonomyStrings.push(customCategory);
        }

        return taxonomyStrings;
    }

    const productAudienceTranslations = translator('products', language);

    if (selectedAudience === Audience.EMPLOYER) {
        return [productAudienceTranslations('employer')];
    }

    if (selectedAudience === Audience.PROVIDER) {
        return [productAudienceTranslations('provider')];
    }

    return [];
};

export const getCardProps = (
    content: CardTargetProps | undefined,
    language: Language,
    ingressOverride?: string
): CardProps | null => {
    if (!content) {
        return null;
    }

    const { data, type, _path, displayName } = content;
    if (!data) {
        return null;
    }
    const { title, ingress, illustration, externalProductUrl } = data;

    const cardType = cardTypeMap[type];
    const cardUrl = externalProductUrl || _path;
    const cardTitle = title || displayName;

    const link = {
        url: cardUrl,
        text: cardTitle,
    };

    const categories = getCardCategory(content, language);
    const categoryString = joinWithConjunction(categories, language);
    const description = ingressOverride || ingress;

    return {
        type: cardType,
        link,
        description,
        category: categoryString,
        illustration,
    };
};
