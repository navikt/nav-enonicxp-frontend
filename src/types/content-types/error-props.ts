import { ContentType, GlobalSchema } from './_schema';

export interface ErrorProps extends GlobalSchema {
    __typename: ContentType.Error;
    data: {
        error?: string;
    };
}

export const makeErrorProps = (
    idOrPath: string,
    error: string
): ErrorProps => ({
    __typename: ContentType.Error,
    _path: idOrPath,
    _id: idOrPath,
    displayName: idOrPath,
    createdTime: Date.now().toString(),
    modifiedTime: Date.now().toString(),
    data: {
        error: error,
    },
});
