import { ContentProps } from '../types/content-props/_content-common';
import { makeErrorProps } from './make-error-props';
import { xpServiceUrl } from './urls';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { MediaProps } from '../types/media';
import { v4 as uuid } from 'uuid';
import { logPageLoadError } from './errors';

export type XpResponseProps = ContentProps | MediaProps;

// This message is returned from the sitecontent-service if the requested content
// was not found. Used to distinquish between content not found and the service
// itself not being found (ie if something is wrong with the nav.no app)
const contentNotFoundMessage = 'Site path not found';

const fetchTimeoutMs = 15000;

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

    const res = await fetchWithTimeout(url, fetchTimeoutMs, config);
    const isJson = res.headers
        ?.get('content-type')
        ?.includes?.('application/json');

    const errorId = uuid();

    if (res.ok) {
        if (isJson) {
            return res.json();
        }

        logPageLoadError(
            errorId,
            `Fetch error: Received an ok-response for ${idOrPath}, but did not receive JSON content`
        );
        return makeErrorProps(idOrPath, undefined, 500, errorId);
    }

    const errorMsg = isJson
        ? (await res.json().message) || res.statusText
        : res.statusText;

    if (res.status === 404) {
        // If we get an unexpected 404-error from the sitecontent-service (meaning the service itself
        // was not found), treat the error as a server error in order to prevent cache-invalidation
        if (errorMsg !== contentNotFoundMessage) {
            logPageLoadError(
                errorId,
                `Fetch error: ${res.status} - Failed to fetch content from ${idOrPath} - invalid 404-response from sitecontent service: ${errorMsg}`
            );
            return makeErrorProps(idOrPath, undefined, 500, errorId);
        }

        // Regular 404 should not be logged as errors
        console.log(`Content not found ${idOrPath}`);
        return makeErrorProps(idOrPath, undefined, res.status, errorId);
    }

    logPageLoadError(
        errorId,
        `Fetch error: ${res.status} - Failed to fetch content from ${idOrPath}: ${errorMsg}`
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
