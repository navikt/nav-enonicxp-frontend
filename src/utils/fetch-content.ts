import { ContentProps } from '../types/content-props/_content-common';
import { makeErrorProps } from './make-error-props';
import { xpServiceUrl } from './urls';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { MediaProps } from '../types/media';

export type XpResponseProps = ContentProps | MediaProps;

const fetchSiteContent = (
    idOrPath: string,
    isDraft = false,
    secret: string,
    time?: string,
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
            const errorMsg = `Failed to fetch content from ${idOrPath}: ${res.statusText}`;
            console.error(`${res.status} - ${errorMsg}`);
            return makeErrorProps(idOrPath, errorMsg, res.status);
        })
        .catch(console.error);
};

export const fetchPage = async (
    idOrPath: string,
    isDraft = false,
    secret: string,
    timeRequested?: string,
): Promise<XpResponseProps> => {
    const content = await fetchSiteContent(
        idOrPath,
        isDraft,
        secret,
        timeRequested,
    );

    return content?.__typename
        ? {
            ...content,
            isDraft,
            ...(timeRequested && { timeRequested: timeRequested }),
            serverEnv: process.env.ENV,
        }
        : makeErrorProps(idOrPath, `Ukjent feil`, 500);
};
