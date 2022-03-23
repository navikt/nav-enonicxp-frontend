import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { isContentTypeImplemented } from '../components/ContentMapper';
import { error1337ReloadProps } from '../components/pages/error-page/errorcode-content/ErrorContent1337';
import { stripLineBreaks } from './string';

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

export const errorHandler = (content: ContentProps) => {
    if (!revalidateOnErrorCode[content.data.errorCode]) {
        throw appError(content);
    }

    return { props: { content } };
};
