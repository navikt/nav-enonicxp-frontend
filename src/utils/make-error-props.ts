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
    displayName: errorMessage,
    createdTime: Date.now().toString(),
    modifiedTime: Date.now().toString(),
    language: 'no',
    data: {
        feedback: false,
        errorMessage: errorMessage,
        errorCode: errorCode,
    },
    breadcrumbs: [{ title: errorMessage, url: '/' }],
    serverEnv: process.env.ENV,
});

export const make404Props = (idOrPath = '') =>
    makeErrorProps(idOrPath, 'Fant ikke siden', 404);
