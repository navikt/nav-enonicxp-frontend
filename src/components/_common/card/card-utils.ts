import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Audience } from 'types/component-props/_mixins';
import { getContentTagline } from 'components/_common/headers/sharedHeaderUtils';
import {
    GuidePageProps,
    ProductPageProps,
    SituationPageProps,
    ThemedArticlePageProps,
    ToolsPageProps,
} from 'types/content-props/dynamic-page-props';

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

export const getCardProps = (
    targetContent: CardTargetProps | undefined,
    currentContent: ContentProps,
    ingressOverride?: string
): CardProps | null => {
    if (!targetContent?.data) {
        return null;
    }

    const { language } = currentContent;

    const { data, type, _path, displayName } = targetContent;
    const { title, ingress, illustration, externalProductUrl } = data;

    const audience = currentContent.data?.audience;

    const cardType = cardTypeMap[type];
    const cardUrl = externalProductUrl || _path;
    const cardTitle = title || displayName;

    const link = {
        url: cardUrl,
        text: cardTitle,
    };

    const tagline = getContentTagline(targetContent, language);
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
