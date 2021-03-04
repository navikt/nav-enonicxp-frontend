import { ContentProps } from '../types/content-props/_content-common';
import { makeErrorProps } from './make-error-props';
import { xpServiceUrl } from './paths';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { MediaProps } from '../types/media';

export type XpResponseProps = ContentProps | MediaProps;

const fetchSiteContent = (
    idOrPath: string,
    isDraft = false,
    secret: string
): Promise<XpResponseProps> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        id: idOrPath,
    });
    const url = `${xpServiceUrl}/sitecontent${params}`;
    const config = { headers: { secret } };
    console.log('Fetching content from ', url);

    return fetchWithTimeout(url, 5000, config)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch content from ${idOrPath}: ${res.statusText}`;
            return makeErrorProps(idOrPath, error, res.status);
        })
        .catch(console.error);
};

export const fetchPage = async (
    idOrPath: string,
    isDraft = false,
    secret: string
): Promise<XpResponseProps> => {
    const content = await fetchSiteContent(idOrPath, isDraft, secret);

    return content?.__typename
        ? { ...content, editMode: isDraft }
        : makeErrorProps(idOrPath, `Ukjent feil`, 500);
};
