import {
    getMediaUrl,
    getRelativePathIfInternal,
    routerQueryToXpPathOrId,
    sanitizeLegacyUrl,
    stripXpPathPrefix,
} from './urls';
import { fetchPage } from './fetch-content';
import { isMediaContent } from '../types/media';
import { errorHandler, isNotFound } from './errors';
import { ContentType } from '../types/content-props/_content-common';
import { getTargetIfRedirect, redirectPageProps } from './redirects';

type FetchPageProps = {
    routerQuery: string | string[];
    isDraft?: boolean;
    noRedirect?: boolean;
    versionTimestamp?: string;
};

export const fetchPageProps = async ({
    routerQuery,
    isDraft = false,
    noRedirect = false,
    versionTimestamp,
}: FetchPageProps) => {
    const xpPath = routerQueryToXpPathOrId(routerQuery || '');
    const content = await fetchPage(xpPath, isDraft, versionTimestamp);

    // Media content should redirect to the mediaUrl generated by XP (temporary redirect)
    if (isMediaContent(content)) {
        return redirectPageProps(getMediaUrl(content.mediaUrl, isDraft), true);
    }

    if (isNotFound(content)) {
        const sanitizedPath = sanitizeLegacyUrl(xpPath);

        if (sanitizedPath !== xpPath) {
            return redirectPageProps(stripXpPathPrefix(sanitizedPath), false);
        }

        return {
            props: {},
            notFound: true,
        };
    }

    if (content.__typename === ContentType.Error) {
        return errorHandler(content);
    }

    if (!noRedirect) {
        const redirectTarget = getTargetIfRedirect(content);
        if (redirectTarget) {
            return redirectPageProps(
                getRelativePathIfInternal(redirectTarget, isDraft),
                content.data?.permanentRedirect
            );
        }
    }

    return {
        props: { content },
    };
};
