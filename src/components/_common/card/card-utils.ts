import { CardType } from '../../../types/card';
import { LinkProps } from '../../../types/link-props';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';
import { ContentType } from '../../../types/content-props/_content-common';
import {
    ProductPageProps,
    SituationPageProps,
    ToolsPageProps,
} from '../../../types/content-props/dynamic-page-props';
import { Language, translator } from '../../../translations';

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
};

export const getCardProps = (
    content: CardTargetProps,
    language: Language,
    ingressOverride?: string
): CardProps | null => {
    const { data, __typename } = content;

    if (!data) {
        return null;
    }

    const { title, ingress, illustration, taxonomy, externalProductUrl } = data;

    const cardType = cardTypeMap[__typename];
    const cardUrl = externalProductUrl || content._path;
    const cardTitle = title || content.displayName;

    const link = {
        url: cardUrl,
        text: cardTitle,
        label: taxonomy,
    };

    const getCategoryLabel = translator('productTaxonomies', language);
    const category = getCategoryLabel(taxonomy);
    const description = ingressOverride || ingress;

    return {
        type: cardType,
        link,
        description,
        category,
        illustration,
    };
};
