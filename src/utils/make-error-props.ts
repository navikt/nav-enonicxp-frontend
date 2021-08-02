import { ContentType } from '../types/content-props/_content-common';
import { ErrorProps } from '../types/content-props/error-props';

const errorMessageDefault = 'Ukjent feil';

const errorMessageByCode = {
    400: 'Ugyldig forespørsel',
    401: 'Ingen tilgang',
    403: 'Ingen tilgang',
    404: 'Fant ikke siden',
    408: 'Tidsavbrudd',
};

export const makeErrorProps = (
    idOrPath = '/',
    errorMessage?: string,
    errorCode = 500,
    errorId?: string
): ErrorProps => {
    const msg =
        errorMessage || errorMessageByCode[errorCode] || errorMessageDefault;
    const title = `Feil: ${msg}`;
    const time = Date.now().toString();

    return {
        __typename: ContentType.Error,
        _path: idOrPath,
        _id: idOrPath,
        displayName: title,
        createdTime: time,
        modifiedTime: time,
        language: 'no',
        data: {
            feedback: false,
            errorMessage: msg,
            errorCode: errorCode,
            errorId: errorId,
        },
        breadcrumbs: [{ title: title, url: '/' }],
        serverEnv: process.env.ENV,
    };
};

export const make404Props = (idOrPath = '') =>
    makeErrorProps(idOrPath, 'Fant ikke siden', 404);
