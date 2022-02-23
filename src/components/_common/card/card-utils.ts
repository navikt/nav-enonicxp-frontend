import { CardType } from '../../../types/card';
import { LinkProps } from '../../../types/link-props';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';
import { ContentType } from '../../../types/content-props/_content-common';
import {
    ProductPageProps,
    SituationPageProps,
    ToolsPageProps,
} from '../../../types/content-props/dynamic-page-props';
import { Language } from '../../../translations';
import { getTranslatedTaxonomies, joinWithConjunction } from 'utils/string';

type CardTargetProps = ProductPageProps | SituationPageProps | ToolsPageProps;

type CardProps = {
    type: CardType;
    link: LinkProps;
    description: string;
    category: string;
    illustration?: AnimatedIconsProps;
};

const cardTypeMap = {
    [ContentType.ProductPage]: CardType.Product,
    [ContentType.SituationPage]: CardType.Situation,
    [ContentType.ToolsPage]: CardType.Tool,
    [ContentType.ThemedArticlePage]: CardType.ThemedArticle,
};

export const getCardProps = (
    content: CardTargetProps,
    language: Language,
    ingressOverride?: string
): CardProps | null => {
    if (!content?.data) {
        return null;
    }

    const { data, __typename, _path, displayName } = content;
    const {
        title,
        ingress,
        illustration,
        taxonomy,
        externalProductUrl,
        customCategory,
    } = data;

    const cardType = cardTypeMap[__typename];
    const cardUrl = externalProductUrl || _path;
    const cardTitle = title || displayName;

    const link = {
        url: cardUrl,
        text: cardTitle,
    };

    const categories = [
        ...getTranslatedTaxonomies(taxonomy, language),
        customCategory,
    ].filter((category) => !!category);

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
