import { ContentType } from 'types/content-props/_content-common';
import { ErrorProps } from 'types/content-props/error-props';

const ERROR_MSG_DEFAULT = 'Ukjent feil';

export const ERROR_MSG_URI_ERROR = 'URIError';
export const ERROR_MSG_URI_ERROR_PUBLIC = 'Ugyldig adresseformat';

const errorMessageByCode: Record<number, string> = {
    400: 'Ugyldig forespørsel',
    401: 'Ingen tilgang',
    403: 'Ingen tilgang',
    404: 'Fant ikke siden',
    405: 'Ugyldig forespørsel',
    408: 'Tidsavbrudd',
};

const errorMessageByMessage = (message?: string) => {
    if (message?.startsWith(ERROR_MSG_URI_ERROR)) {
        return ERROR_MSG_URI_ERROR_PUBLIC;
    }

    return null;
};

export const makeErrorProps = (
    idOrPath = '/',
    errorMessage: string,
    errorCode: number,
    errorId?: string
): ErrorProps => {
    const publicMessage =
        errorMessageByMessage(errorMessage) ||
        errorMessageByCode[errorCode] ||
        ERROR_MSG_DEFAULT;
    const title = `Feil: ${publicMessage}`;
    const time = Date.now().toString();

    return {
        type: ContentType.Error,
        _path: idOrPath,
        _id: idOrPath,
        displayName: title,
        createdTime: time,
        modifiedTime: time,
        language: 'no',
        data: {
            errorMessage: publicMessage,
            errorMessageInternal: errorMessage,
            errorCode: errorCode,
            errorId: errorId,
        },
        breadcrumbs: [{ title: title, url: '/' }],
        serverEnv: process.env.ENV,
    };
};

export const make404Props = (idOrPath = '') =>
    makeErrorProps(idOrPath, 'Fant ikke siden', 404);
