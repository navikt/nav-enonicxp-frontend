import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { stripXpPathPrefix } from './urls';

const getTargetPath = (contentData: ContentProps) => {
    switch (contentData?.__typename) {
        case ContentType.SituationPage:
        case ContentType.ProductPage:
        case ContentType.ToolsPage:
        case ContentType.GuidePage:
        case ContentType.ThemedArticlePage:
            return !contentData.isDraft
                ? contentData.data?.externalProductUrl
                : null;
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return contentData.data?.target?._path;
        case ContentType.ExternalLink:
        case ContentType.Url:
            return contentData.data?.url;
        case ContentType.MainArticleChapter:
            // If the main article chapter content is anything other than a main article
            // we want to redirect to the actual content page. This is provided as a way
            // to gradually migrate individual pages from the chapter structure
            return contentData.data.article.__typename !==
                ContentType.MainArticle
                ? contentData.data.article._path
                : null;
        default:
            return null;
    }
};

export const getTargetIfRedirect = (contentData: ContentProps) => {
    const targetPath = getTargetPath(contentData);
    return targetPath ? stripXpPathPrefix(targetPath) : null;
};

// Used for redirect from a next.js data fetch function
export const redirectPageProps = (
    destination: string,
    isPermanent: boolean
) => ({
    props: {},
    redirect: {
        // Decode then (re)encode to ensure the destination is not double-encoded
        destination: encodeURI(decodeURI(destination).trim()),
        // False if not defined
        permanent: isPermanent || false,
    },
});
