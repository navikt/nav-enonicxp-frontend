import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { isContentTypeImplemented } from 'components/ContentMapper';
import { stripLineBreaks } from './string';
import { ErrorProps } from 'types/content-props/error-props';

export const logPageLoadError = (errorId: string, message: string) =>
    console.error(`[Page load error] ${errorId} - ${stripLineBreaks(message)}`);

const isEmptyMainArticleChapter = (content: ContentProps) =>
    content.type === ContentType.MainArticleChapter && !content.data?.article;

const isPreviewOnly = new Set<ContentType>([
    ContentType.ContactInformationPage,
    ContentType.FormDetails,
    ContentType.Fragment,
    ContentType.GlobalNumberValuesSet,
    ContentType.GlobalCaseTimeSet,
    ContentType.PayoutDates,
    ContentType.ProductDetails,
    ContentType.TemplatePage,
    ContentType.PublishingCalendarEntry,
]);

export const isNotFound = (content: ContentProps, isDraft: boolean) => {
    if (content.type === ContentType.Error && content.data.errorCode === 404) {
        return true;
    }

    if (isDraft) {
        return false;
    }

    return (
        isPreviewOnly.has(content.type) ||
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
