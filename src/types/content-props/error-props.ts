import { ContentType, ContentProps } from './_content-common';

export type ErrorData = {
    errorMessage?: string;
    errorCode?: number;
};

export interface ErrorProps extends ContentProps {
    __typename: ContentType.Error;
    data: ErrorData;
}

export const makeErrorProps = (
    idOrPath,
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
