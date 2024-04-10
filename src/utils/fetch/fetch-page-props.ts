import {
    getMediaUrl,
    getRelativePathIfInternal,
    routerQueryToXpPathOrId,
    sanitizeLegacyUrl,
    stripXpPathPrefix,
} from 'utils/urls';
import { isMediaContent } from 'types/media';
import { errorHandler, isNotFound } from 'utils/errors';
import { ContentType } from 'types/content-props/_content-common';
import {
    getTargetIfRedirect,
    isPermanentRedirect,
    isRedirectType,
    redirectPageProps,
} from 'utils/redirects';
import { errorMessageURIError, makeErrorProps } from 'utils/make-error-props';
import { logger } from 'srcCommon/logger';
import { fetchPage } from './fetch-content';

type FetchPagePropsArgs = {
    routerQuery?: string | string[];
    isDraft?: boolean;
    isPreview?: boolean;
    noRedirect?: boolean;
    timeRequested?: string;
    locale?: string;
    isArchived?: boolean;
};

const isValidIdOrPath = (idOrPath: string) => {
    try {
        return !!decodeURI(idOrPath);
    } catch (e) {
        logger.error(`Invalid id or path - ${idOrPath}`);
        return false;
    }
};

const notFoundProps = {
    props: {},
    notFound: true,
};

export const fetchPageProps = async ({
    routerQuery,
    isDraft = false,
    isPreview = false,
    noRedirect = false,
    timeRequested,
    locale,
    isArchived,
}: FetchPagePropsArgs) => {
    const idOrPath = routerQueryToXpPathOrId(routerQuery || '');

    if (!isValidIdOrPath(idOrPath)) {
        return errorHandler(makeErrorProps(stripXpPathPrefix(idOrPath), errorMessageURIError, 400));
    }

    const content = await fetchPage({
        idOrPath,
        timeRequested,
        isDraft,
        isPreview,
        locale,
        isArchived,
    });

    // Media content should redirect to the mediaUrl generated by XP (temporary redirect)
    if (isMediaContent(content)) {
        const mediaUrl = getMediaUrl(content.mediaUrl, isDraft);
        if (!mediaUrl) {
            return notFoundProps;
        }

        return redirectPageProps(mediaUrl, true);
    }

    if (isNotFound(content, isDraft)) {
        const sanitizedPath = sanitizeLegacyUrl(idOrPath);

        if (sanitizedPath !== idOrPath) {
            return redirectPageProps(stripXpPathPrefix(sanitizedPath), false);
        }

        return notFoundProps;
    }

    if (content.type === ContentType.Error) {
        return errorHandler(content);
    }

    if (!noRedirect) {
        const redirectTarget = getTargetIfRedirect(content);

        if (redirectTarget) {
            return redirectPageProps(
                getRelativePathIfInternal(redirectTarget, isDraft),
                isPermanentRedirect(content)
            );
        }

        // If a content type which should always be a redirect did not have a
        // valid target we just return 404
        if (isRedirectType(content)) {
            return notFoundProps;
        }
    }

    return {
        props: { content },
    };
};
