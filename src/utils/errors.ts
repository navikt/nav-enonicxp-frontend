import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { isContentTypeImplemented } from '../components/ContentMapper';
import { error1337ReloadProps } from '../components/pages/error-page/errorcode-content/Error1337ReloadOnDevBuildError';

const isEmptyMainArticleChapter = (content: ContentProps) =>
    content.__typename === ContentType.MainArticleChapter &&
    !content.data?.article;

export const isNotFound = (content: ContentProps) => {
    return (
        (content.__typename === ContentType.Error &&
            content.data.errorCode === 404) ||
        !isContentTypeImplemented(content) ||
        isEmptyMainArticleChapter(content)
    );
};

// These status codes may indicate that the requested page has been intentionally
// made unavailable.  We want to perform cache revalidation in these cases.
const revalidateOnErrorCode = {
    401: true, // unauthorized
    403: true, // forbidden
    404: true, // not found
};

const appError = (content: ContentProps) => ({
    content,
});

const errorHandlerProd = (content: ContentProps) => {
    if (!revalidateOnErrorCode[content.data.errorCode]) {
        throw appError(content);
    }

    return { props: { content } };
};

const errorHandlerDev = (content: ContentProps) => {
    if (!revalidateOnErrorCode[content.data.errorCode]) {
        // Do not throw errors at build-time in dev-environments
        if (process.env.NEXT_PHASE === 'phase-production-build') {
            return {
                props: {
                    content: error1337ReloadProps(content._path),
                },
            };
        }

        throw appError(content);
    }

    return { props: { content } };
};

export const errorHandler =
    process.env.APP_ORIGIN === 'https://www.nav.no'
        ? errorHandlerProd
        : errorHandlerDev;
