import { ContentType, GlobalSchema } from './_schema';

export interface ErrorProps extends GlobalSchema {
    __typename: ContentType.Error;
    data: {
        errorMessage: string;
        errorCode?: number;
    };
}

export const makeErrorProps = (
    idOrPath: string,
    errorMessage: string,
    errorCode?: number
): ErrorProps => ({
    __typename: ContentType.Error,
    _path: idOrPath,
    _id: idOrPath,
    displayName: idOrPath,
    createdTime: Date.now().toString(),
    modifiedTime: Date.now().toString(),
    data: {
        errorMessage: errorMessage,
        errorCode: errorCode,
    },
});
