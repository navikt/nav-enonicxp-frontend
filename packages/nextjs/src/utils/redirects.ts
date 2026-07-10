import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { stripXpPathPrefix } from './urls';
import { getInternalLinkUrl } from './links-from-content';

const redirectTypes: { [type in ContentType]?: boolean } = {
    [ContentType.InternalLink]: true,
    [ContentType.ExternalLink]: true,
    [ContentType.Url]: true,
};

type ContentWithExternalProductUrl = ContentProps & {
    data: Pick<ProductDataMixin, 'externalProductUrl' | 'externalContentRedirect'>;
};

const getExternalRedirectUrl = (content: ContentWithExternalProductUrl): string | null => {
    if (content.isDraft || content.isPagePreview) {
        return null;
    }

    const externalProductUrl =
        content.data.externalProductUrl || content.data.externalContentRedirect?._path;

    return externalProductUrl ?? null;
};

const getTargetPath = (content: ContentProps) => {
    const externalRedirectUrl = getExternalRedirectUrl(content as ContentWithExternalProductUrl);

    if (externalRedirectUrl) {
        return externalRedirectUrl;
    }

    switch (content.type) {
        case ContentType.InternalLink:
            return getInternalLinkUrl(content.data);
        case ContentType.ExternalLink:
        case ContentType.Url:
            return content.data?.url;
        case ContentType.Kapittel: {
            // If the main article chapter content is anything other than a main article
            // we want to redirect to the actual content page. This is provided as a way
            // to gradually migrate individual pages from the chapter structure
            const { article } = content.data;
            return article?.type !== ContentType.Artikkel ? article?._path : null;
        }
        default:
            return null;
    }
};

export const isRedirectType = (content: ContentProps) => redirectTypes[content.type];

export const getTargetIfRedirect = (contentData: ContentProps) => {
    const targetPath = getTargetPath(contentData);
    return targetPath ? stripXpPathPrefix(targetPath) : null;
};

// Used for redirect from a next.js data fetch function
export const redirectPageProps = (destination: string, isPermanent: boolean) => ({
    props: {},
    redirect: {
        // Decode then (re)encode to ensure the destination is not double-encoded
        destination: encodeURI(decodeURI(destination).trim()),
        // False if not defined
        permanent: isPermanent || false,
    },
});

export const isPermanentRedirect = (content: ContentProps) => {
    if (content.type === ContentType.InternalLink || content.type === ContentType.ExternalLink) {
        return !!content.data.permanentRedirect;
    }

    return false;
};
