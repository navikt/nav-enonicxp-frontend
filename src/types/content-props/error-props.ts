import { ContentType, GlobalContentProps } from './_content-common';

export interface ErrorProps extends GlobalContentProps {
    __typename: ContentType.Error;
    errorMessage?: string;
    errorCode?: number;
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
    errorMessage: errorMessage,
    errorCode: errorCode,
    language: 'no',
});
