import { logger } from './logger';

const TIMEOUT_DEFAULT = 15000;
const RETRY_COUNT = 2;
const INITIAL_BACKOFF_MS = 200;

const RETRYABLE_ERROR_CODES = new Set([
    'ECONNRESET',
    'ETIMEDOUT',
    'ECONNREFUSED',
    'EPIPE',
    'UND_ERR_SOCKET',
]);

const isRetryableError = (error: unknown): boolean => {
    if (!error || typeof error !== 'object') {
        return false;
    }

    const code =
        (error as { code?: string }).code || (error as { cause?: { code?: string } }).cause?.code;

    if (!code) {
        return false;
    }

    return RETRYABLE_ERROR_CODES.has(code);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithTimeoutSingleAttempt = <ResponseType = any>(
    url: string,
    timeoutMs: number,
    config?: Record<string, any>
): Promise<ResponseType> =>
    Promise.race<any>([
        fetch(url, config),
        new Promise((res) =>
            setTimeout(
                () =>
                    res({
                        ok: false,
                        status: 408,
                        statusText: 'Request Timeout',
                    }),
                timeoutMs
            )
        ),
    ]);

export const fetchWithTimeout = async <ResponseType = any>(
    url: string,
    timeoutMs = TIMEOUT_DEFAULT,
    config?: Record<string, any>
): Promise<ResponseType> => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= RETRY_COUNT; attempt++) {
        try {
            return await fetchWithTimeoutSingleAttempt<ResponseType>(url, timeoutMs, config);
        } catch (error) {
            lastError = error;

            if (!isRetryableError(error) || attempt === RETRY_COUNT) {
                throw error;
            }

            const backoffMs = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
            const errorCode =
                (error as { code?: string }).code ||
                (error as { cause?: { code?: string } }).cause?.code ||
                (error as { message?: string }).message;

            logger.info(
                `Fetch error for ${url} (attempt ${attempt + 1}/${RETRY_COUNT + 1}, error: ${errorCode}). Retrying in ${backoffMs}ms...`
            );

            await delay(backoffMs);
        }
    }

    throw lastError;
};

export const objectToQueryString = (params: object) =>
    params
        ? Object.entries(params).reduce(
              (acc, [k, v], i) =>
                  v !== undefined
                      ? `${acc}${i ? '&' : '?'}${k}=${encodeURIComponent(
                            typeof v === 'object' ? JSON.stringify(v) : v
                        )}`
                      : acc,
              ''
          )
        : '';

export const fetchJson = <ResponseType = any>(
    url: string,
    timeout = TIMEOUT_DEFAULT,
    config?: Record<string, any>,
    retries = 0
): Promise<ResponseType | null> =>
    fetchWithTimeout(url, timeout, config)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(`${res.status} - ${res.statusText}`);
        })
        .catch((error) => {
            if (retries > 0) {
                logger.info(`Failed to fetch from ${url}, retrying`);
                return fetchJson(url, timeout, config, retries - 1);
            }

            logger.error(`Failed to fetch json on ${url}`, { error });
            return null;
        });
