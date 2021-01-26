import { ContentType } from '../types/content-props/_content-common';
import { ErrorProps } from '../types/content-props/error-props';

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
});
