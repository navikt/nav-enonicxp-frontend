import { v4 as uuid } from 'uuid';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { fetchWithTimeout, objectToQueryString } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';
import { RedisCache } from '@/shared/redis_local';
import { ContentProps } from 'types/content-props/_content-common';
import { makeErrorProps } from 'utils/make-error-props';
import { stripXpPathPrefix, xpServiceUrl } from 'utils/urls';
import { MediaProps } from 'types/media';
import { logPageLoadError } from 'utils/errors';
import { stripLineBreaks } from 'utils/string';

export type XpResponseProps = ContentProps | MediaProps;

// This message is returned from the sitecontent-service if the requested content
// was not found. Used to distinquish between content not found and the service
// itself not being found (ie if something is wrong with the nav.no app)
const NOT_FOUND_MSG_PREFIX = 'Site path not found';

const FETCH_TIMEOUT_MS = 60000;

const getXpCacheKey =
    process.env.NODE_ENV !== 'development'
        ? () => ({
              // @ts-ignore - Adding cacheKey to global namespace
              cacheKey: global.cacheKey,
          })
        : () => ({});

const redisCache = await new RedisCache().init(process.env.BUILD_ID, '');

const fetchConfig = {
    headers: {
        secret: process.env.SERVICE_SECRET,
        'Cache-Control': 'no-store, no-cache',
    },
};

type FetchSiteContentArgs = {
    idOrPath: string;
    time?: string;
    isDraft?: boolean;
    isPreview?: boolean;
    locale?: string;
    isArchived?: boolean;
};

const fetchSiteContent = async (props: FetchSiteContentArgs) => {
    const { isArchived, time } = props;
    if (isArchived) {
        return fetchSiteContentArchive(props);
    }

    if (time) {
        return fetchSiteContentVersion(props);
    }

    return fetchSiteContentStandard(props);
};

const fetchSiteContentStandard = async ({
    idOrPath,
    isDraft = false,
    isPreview = false,
    locale,
}: FetchSiteContentArgs) => {
    const params = objectToQueryString({
        id: idOrPath,
        ...(isDraft && { branch: 'draft' }),
        ...(!isDraft && getXpCacheKey()), // We don't want to use backend-cache for draft content requests
        ...(isPreview && { preview: true }),
        ...(locale && { locale }),
    });

    const url = `${xpServiceUrl}/sitecontent${params}`;
    logger.info(`Fetching content from ${url}`);

    return fetchWithTimeout(url, FETCH_TIMEOUT_MS, fetchConfig).catch((error) => {
        logger.info(`Sitecontent fetch error for ${url}`, { error });
        return null;
    });
};

const fetchSiteContentVersion = async ({
    idOrPath,
    time,
    isDraft = false,
    locale,
}: FetchSiteContentArgs) => {
    const params = objectToQueryString({
        id: idOrPath,
        ...(isDraft && { branch: 'draft' }),
        ...(locale && { locale }),
        time,
    });

    const url = `${xpServiceUrl}/sitecontentVersions${params}`;

    logger.info(`Fetching version history content from ${url}`);

    return fetchWithTimeout(url, FETCH_TIMEOUT_MS, fetchConfig).catch((error) => {
        logger.info(`Sitecontent version fetch error for ${url}`, { error });
        return null;
    });
};

const fetchSiteContentArchive = async ({ idOrPath, locale, time }: FetchSiteContentArgs) => {
    const params = objectToQueryString({
        id: idOrPath,
        ...(locale && { locale }),
        ...(time && { time }),
    });

    const url = `${xpServiceUrl}/sitecontentArchive${params}`;
    logger.info(`Fetching archived content from ${url}`);

    return fetchWithTimeout(url, FETCH_TIMEOUT_MS, fetchConfig).catch((error) => {
        logger.info(`Sitecontent archive fetch error for ${url}`, { error });
        return null;
    });
};

// For pages generated at build-time, any errors thrown will abort the build process.
// Retry a few times, and just throw a generic server error if anything fails.
const fetchAndHandleErrorsBuildtime = async (
    props: FetchSiteContentArgs & { retries?: number }
): Promise<ContentProps> => {
    const { idOrPath, retries = 5 } = props;

    return fetchSiteContentStandard({ idOrPath }).then((res) => {
        if (res?.ok) {
            return res.json();
        }

        if (retries > 0) {
            return fetchAndHandleErrorsBuildtime({
                idOrPath,
                retries: retries - 1,
            });
        }

        return makeErrorProps(
            idOrPath,
            `Build-time fetch error: ${res.status} - ${res.statusText}`
        );
    });
};

const isCachableRequest = ({ isDraft, isArchived, time, isPreview }: FetchSiteContentArgs) =>
    !(isDraft || isArchived || time || isPreview);

const fetchAndHandleErrorsRuntime = async (
    props: FetchSiteContentArgs
): Promise<XpResponseProps> => {
    const isCachable = isCachableRequest(props);
    const { idOrPath } = props;

    if (isCachable) {
        const cachedResponse = await redisCache.getResponse(stripXpPathPrefix(idOrPath));
        if (cachedResponse) {
            logger.info(`Response cache hit ${idOrPath}`);
            return cachedResponse;
        }
    }

    const res = await fetchSiteContent(props);

    const errorId = uuid();

    if (!res) {
        return makeErrorProps(idOrPath, undefined, 500, errorId);
    }

    const isJson = res.headers?.get('content-type')?.includes?.('application/json');

    if (res.ok && isJson) {
        const json = await res.json();
        if (isCachable) {
            redisCache.setResponse(stripXpPathPrefix(idOrPath), json);
        }
        return json;
    }

    if (res.ok) {
        logPageLoadError(
            errorId,
            `Fetch error: Received an ok-response for ${idOrPath}, but did not receive JSON content`
        );
        return makeErrorProps(idOrPath, undefined, 500, errorId);
    }

    const errorMsg = isJson ? (await res.json()).message || res.statusText : res.statusText;

    if (res.status === 404) {
        // If we get an unexpected 404-error from the sitecontent-service (meaning the service itself
        // was not found), treat the error as a server error in order to prevent cache-invalidation
        if (!errorMsg.startsWith(NOT_FOUND_MSG_PREFIX)) {
            logPageLoadError(
                errorId,
                `Fetch error: ${res.status} - Failed to fetch content from ${idOrPath} - unexpected 404-response from sitecontent service: ${errorMsg}`
            );
            return makeErrorProps(idOrPath, errorMsg, 503, errorId);
        }

        // Regular 404 should not be logged as errors
        logger.info(`Content not found ${stripLineBreaks(idOrPath)}`);
        return makeErrorProps(idOrPath, undefined, 404, errorId);
    }

    logPageLoadError(
        errorId,
        `Fetch error: ${res.status} - Failed to fetch content from ${idOrPath}: ${errorMsg}`
    );
    return makeErrorProps(idOrPath, errorMsg, res.status, errorId);
};

const fetchAndHandleErrors =
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
        ? fetchAndHandleErrorsBuildtime
        : fetchAndHandleErrorsRuntime;

type FetchPageArgs = {
    idOrPath: string;
    isDraft?: boolean;
    timeRequested?: string;
    isPreview?: boolean;
    locale?: string;
    isArchived?: boolean;
};

export const fetchPage = async ({
    idOrPath,
    timeRequested,
    isDraft = false,
    isPreview = false,
    locale,
    isArchived,
}: FetchPageArgs): Promise<XpResponseProps> => {
    const content = await fetchAndHandleErrors({
        idOrPath,
        isDraft,
        isPreview,
        time: timeRequested,
        locale,
        isArchived,
    });

    if (!content?.type) {
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
        serverEnv: process.env.ENV,
        isPagePreview: isPreview,
        ...(timeRequested && { timeRequested: timeRequested }),
    };
};
