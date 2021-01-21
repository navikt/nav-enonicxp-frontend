import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { isContentTypeImplemented } from '../components/ContentMapper';
import { ErrorProps } from '../types/content-props/error-props';

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

export const makeErrorProps = (
    idOrPath = '/',
    errorMessage = 'Ukjent feil',
    errorCode = 500
): ErrorProps => ({
    __typename: ContentType.Error,
    _path: idOrPath,
    _id: idOrPath,
    displayName: idOrPath,
    createdTime: Date.now().toString(),
    modifiedTime: Date.now().toString(),
    language: 'no',
    data: {
        errorMessage: errorMessage,
        errorCode: errorCode,
    },
    breadcrumbs: [{ title: errorMessage, url: '/', handleInApp: true }],
});
