import { ContentProps } from '../types/content-props/_content-common';
import { makeErrorProps } from './make-error-props';
import { xpServiceUrl } from './urls';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { MediaProps } from '../types/media';
import { v4 as uuid } from 'uuid';
import { logPageLoadError } from './errors';

export type XpResponseProps = ContentProps | MediaProps;

const fetchSiteContent = (
    idOrPath: string,
    isDraft = false,
    secret: string,
    time?: string
): Promise<XpResponseProps> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        id: idOrPath,
        ...(time && { time }),
    });
    const url = `${xpServiceUrl}/sitecontent${params}`;
    const config = { headers: { secret } };
    console.log('Fetching content from ', url);

    return fetchWithTimeout(url, 15000, config)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const errorId = uuid();
            const errorMsg = `Failed to fetch content from ${idOrPath}: ${res.statusText}`;
            logPageLoadError(
                errorId,
                `Fetch error: ${res.status} - ${errorMsg}`
            );
            return makeErrorProps(idOrPath, errorMsg, res.status, errorId);
        })
        .catch(console.error);
};

export const fetchPage = async (
    idOrPath: string,
    isDraft = false,
    secret: string,
    timeRequested?: string
): Promise<XpResponseProps> => {
    const content = await fetchSiteContent(
        idOrPath,
        isDraft,
        secret,
        timeRequested
    );

    if (!content?.__typename) {
        const errorId = uuid();
        logPageLoadError(
            errorId,
            `Fetch error: Unknown error for ${idOrPath} - no valid content received`
        );
        return makeErrorProps(idOrPath, `Ukjent feil`, 500, errorId);
    }

    return {
        ...content,
        isDraft,
        ...(timeRequested && { timeRequested: timeRequested }),
        serverEnv: process.env.ENV,
    };
};
