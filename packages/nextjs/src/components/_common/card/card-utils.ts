import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';
import { PictogramsProps } from 'types/content-props/pictograms';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
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
    taglineLanguage?: string;
    illustration?: PictogramsProps;
    language?: string;
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
    targetContent:
        | Pick<CardTargetProps, 'data' | 'type' | '_path' | 'displayName' | 'language'>
        | undefined,
    currentContent: ContentProps,
    ingressOverride?: string
): CardProps | null => {
    if (!targetContent?.data) {
        return null;
    }

    const { language } = currentContent;

    const { data, type, _path, displayName } = targetContent;
    const { title, ingress, illustration, externalProductUrl } = data;

    const cardType = cardTypeMap[type];
    const cardUrl = externalProductUrl || _path;
    const cardTitle = title || displayName;

    const link = {
        url: cardUrl,
        text: cardTitle,
    };

    const { tagline, language: taglineLanguage } = getContentTagline(targetContent, language);
    const description = ingressOverride || ingress;

    return {
        type: cardType,
        link,
        description,
        illustration,
        tagline,
        taglineLanguage,
        language: targetContent.language,
    };
};
