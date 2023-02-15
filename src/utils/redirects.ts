import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { stripXpPathPrefix } from './urls';
import { getInternalLinkUrl } from './links-from-content';
import { ProductDataMixin } from 'types/component-props/_mixins';

const redirectTypes: { [type in ContentType]?: boolean } = {
    [ContentType.InternalLink]: true,
    [ContentType.ExternalLink]: true,
    [ContentType.Url]: true,
};

type ContentWithExternalProductUrl = ContentProps & {
    data: Pick<ProductDataMixin, 'externalProductUrl'>;
};

const hasExternalProductUrl = (
    content: ContentProps
): content is ContentWithExternalProductUrl => {
    return !!(content as ContentWithExternalProductUrl).data
        ?.externalProductUrl;
};

const getTargetPath = (contentData: ContentProps) => {
    if (hasExternalProductUrl(contentData)) {
        return !contentData.isDraft
            ? contentData.data?.externalProductUrl
            : null;
    }

    switch (contentData?.__typename) {
        case ContentType.InternalLink:
            return getInternalLinkUrl(contentData.data);
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

export const isRedirectType = (content: ContentProps) =>
    redirectTypes[content.__typename];

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

export const isPermanentRedirect = (content: ContentProps) => {
    if (
        content.__typename === ContentType.InternalLink ||
        content.__typename === ContentType.ExternalLink
    ) {
        return content.data.permanentRedirect;
    }

    return false;
};
