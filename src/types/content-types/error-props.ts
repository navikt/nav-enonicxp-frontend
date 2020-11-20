import { ContentType, GlobalContentSchema } from './_schema';

export interface ErrorProps extends GlobalContentSchema {
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
