import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { isContentTypeImplemented } from '../components/ContentMapper';
import { stripLineBreaks } from './string';
import { stripXpPathPrefix } from './urls';
import { redirectPageProps } from './redirects';

export const logPageLoadError = (errorId: string, message: string) =>
    console.error(`[Page load error] ${errorId} - ${stripLineBreaks(message)}`);

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
    404: true, // not found
};

const skipFailoverOnErrorCode = {
    400: true, // bad request
    404: true, // not found
};

const appError = (content: ContentProps) => ({
    content,
});

export const errorHandler = async (content: ContentProps) => {
    const { errorCode } = content.data;

    console.log(`Error code: ${errorCode}`);

    if (revalidateOnErrorCode[errorCode]) {
        return { props: { content } };
    }

    if (
        process.env.IS_FAILOVER === 'true' ||
        skipFailoverOnErrorCode[errorCode]
    ) {
        throw appError(content);
    }

    const path = content.data.customPath || stripXpPathPrefix(content._path);

    console.log(path);

    return redirectPageProps(`${path}?failover=true`, false);
};
