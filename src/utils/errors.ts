import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { isContentTypeImplemented } from 'components/ContentMapper';
import { stripLineBreaks } from './string';
import { ErrorProps } from 'types/content-props/error-props';

export const logPageLoadError = (errorId: string, message: string) =>
    console.error(`[Page load error] ${errorId} - ${stripLineBreaks(message)}`);

const isPreviewOnly: ReadonlySet<ContentType> = new Set([
    ContentType.ContactInformationPage,
    ContentType.Fragment,
    ContentType.GlobalNumberValuesSet,
    ContentType.GlobalCaseTimeSet,
    ContentType.PayoutDates,
    ContentType.TemplatePage,
    ContentType.PublishingCalendarEntry,
    ContentType.PageMeta,
]);

const isValidContent = (content: ContentProps) => {
    switch (content.type) {
        case ContentType.MainArticleChapter: {
            return content.data?.article?.type === ContentType.MainArticle;
        }
        case ContentType.LargeTable: {
            return !!content.data?.text;
        }
        default: {
            return true;
        }
    }
};

export const isNotFound = (content: ContentProps, isDraft: boolean) => {
    if (content.type === ContentType.Error && content.data.errorCode === 404) {
        return true;
    }

    if (isDraft) {
        return false;
    }

    return (
        !isContentTypeImplemented(content) ||
        !isValidContent(content) ||
        isPreviewOnly.has(content.type)
    );
};

const appError = (content: ContentProps) => ({
    content,
});

export const errorHandler = (content: ErrorProps) => {
    const { errorCode } = content.data;

    if (errorCode === 404) {
        return { props: { content } };
    }

    // For other errors than 404 we throw an error, which prevents cache
    // invalidation
    throw appError(content);
};
