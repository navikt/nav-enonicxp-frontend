import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { isContentTypeImplemented } from '../components/ContentMapper';
import { stripLineBreaks } from './string';
import { ErrorProps } from '../types/content-props/error-props';

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

const appError = (content: ContentProps) => ({
    content,
});

export const errorHandler = (content: ErrorProps) => {
    const { errorCode } = content.data;

    if (revalidateOnErrorCode[errorCode]) {
        return { props: { content } };
    }

    throw appError(content);
};
