import { ContentProps } from '../types/content-props/_content-common';
import { makeErrorProps } from './make-error-props';
import { xpServiceUrl } from './urls';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { MediaProps } from '../types/media';
import { v4 as uuid } from 'uuid';
import { logPageLoadError } from './errors';
import { stripLineBreaks } from './string';

export type XpResponseProps = ContentProps | MediaProps;

// This message is returned from the sitecontent-service if the requested content
// was not found. Used to distinquish between content not found and the service
// itself not being found (ie if something is wrong with the nav.no app)
const contentNotFoundMessage = 'Site path not found';

const fetchTimeoutMs = 60000;

const fetchSiteContent = async (
    idOrPath: string,
    isDraft = false,
    time?: string
): Promise<XpResponseProps> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        id: idOrPath,
        ...(time && { time }),
        ...(!isDraft && { cacheKey: global.cacheKey }),
    });
    const url = `${xpServiceUrl}/sitecontent${params}`;
    const config = {
        headers: {
            secret: process.env.SERVICE_SECRET,
            'Cache-Control': 'no-store, no-cache',
        },
    };
    console.log(`Fetching content from ${url}`);

    const res = await fetchWithTimeout(url, fetchTimeoutMs, config).catch(
        (e) => {
            console.log(`Sitecontent fetch error: ${e}`);
            return null;
        }
    );

    const errorId = uuid();

    if (!res) {
        return makeErrorProps(idOrPath, undefined, 500, errorId);
    }

    const isJson = res.headers
        ?.get('content-type')
        ?.includes?.('application/json');

    if (res.ok && isJson) {
        return res.json();
    }

    if (res.ok) {
        logPageLoadError(
            errorId,
            `Fetch error: Received an ok-response for ${idOrPath}, but did not receive JSON content`
        );
        return makeErrorProps(idOrPath, undefined, 500, errorId);
    }

    const errorMsg = isJson
        ? (await res.json()).message || res.statusText
        : res.statusText;

    if (res.status === 404) {
        // If we get an unexpected 404-error from the sitecontent-service (meaning the service itself
        // was not found), treat the error as a server error in order to prevent cache-invalidation
        if (errorMsg !== contentNotFoundMessage) {
            logPageLoadError(
                errorId,
                `Fetch error: ${res.status} - Failed to fetch content from ${idOrPath} - unexpected 404-response from sitecontent service: ${errorMsg}`
            );
            return makeErrorProps(idOrPath, undefined, 503, errorId);
        }

        // Regular 404 should not be logged as errors
        console.log(`Content not found ${stripLineBreaks(idOrPath)}`);
        return makeErrorProps(idOrPath, undefined, 404, errorId);
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
    timeRequested?: string
): Promise<XpResponseProps> => {
    const content = await fetchSiteContent(idOrPath, isDraft, timeRequested);

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
