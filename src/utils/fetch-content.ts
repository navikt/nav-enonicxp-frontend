import { ContentProps } from '../types/content-props/_content-common';
import { makeErrorProps } from './make-error-props';
import { xpServiceUrl } from './urls';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { MediaProps } from '../types/media';
import { v4 as uuid } from 'uuid';
import { logPageLoadError } from './errors';

export type XpResponseProps = ContentProps | MediaProps;

// The message returned from the sitecontent-service if the requested content
// was not found. Used to distinquish between content not found and the service
// itself not being found (ie if something is wrong with the nav.no app)
const contentNotFoundMessage = 'Site path not found';

const fetchSiteContent = async (
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
    console.log(`Fetching content from ${url}`);

    const res = await fetchWithTimeout(url, 15000, config);
    const isJson = res.headers
        .get('content-type')
        ?.includes?.('application/json');

    if (res.ok && isJson) {
        return res.json();
    }

    const errorId = uuid();

    if (!isJson) {
        logPageLoadError(
            errorId,
            `Fetch error: ${res.status} - Failed to fetch content from ${idOrPath} - did not receive a JSON response`
        );
        return makeErrorProps(idOrPath, undefined, 500, errorId);
    }

    const errorJson = await res.json();

    if (res.status === 404) {
        // If we get an unexpected 404-error from the sitecontent-service (meaning the service itself
        // was not found), treat the error as a server error in order to prevent cache-invalidation
        if (errorJson.message !== contentNotFoundMessage) {
            logPageLoadError(
                errorId,
                `Fetch error: ${res.status} - Failed to fetch content from ${idOrPath} - invalid 404-response from sitecontent service: ${errorJson.message}`
            );
            return makeErrorProps(idOrPath, undefined, 500, errorId);
        }

        // Regular 404 should not be logged as errors
        console.log(`Content not found ${idOrPath}`);
        return makeErrorProps(idOrPath, undefined, res.status, errorId);
    }

    logPageLoadError(
        errorId,
        `Fetch error: ${
            res.status
        } - Failed to fetch content from ${idOrPath}: ${
            errorJson.message || res.statusText
        }`
    );
    return makeErrorProps(idOrPath, undefined, res.status, errorId);
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
        return makeErrorProps(idOrPath, undefined, 500, errorId);
    }

    return {
        ...content,
        isDraft,
        ...(timeRequested && { timeRequested: timeRequested }),
        serverEnv: process.env.ENV,
    };
};
