import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { stripXpPathPrefix } from './urls';

export const getTargetIfRedirect = (contentData: ContentProps) => {
    switch (contentData?.__typename) {
        case ContentType.SituationPage:
        case ContentType.ProductPage:
        case ContentType.ToolsPage:
        case ContentType.GuidePage:
        case ContentType.ThemedArticlePage:
            // Redirect to the externalProductUrl if it is defined
            return (
                !contentData.isDraft &&
                stripXpPathPrefix(contentData.data?.externalProductUrl)
            );
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return contentData.data?.target?._path;
        case ContentType.ExternalLink:
        case ContentType.Url:
            return stripXpPathPrefix(contentData.data?.url);
        case ContentType.MainArticleChapter:
            // If the main article chapter content is anything other than a main article
            // we want to redirect to the actual content page. This is provided as a way
            // to gradually migrate individual pages from the chapter structure
            return (
                contentData.data.article.__typename !==
                    ContentType.MainArticle &&
                stripXpPathPrefix(contentData.data.article._path)
            );
        default:
            return null;
    }
};
