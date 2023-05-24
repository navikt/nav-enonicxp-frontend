const defaultTimeout = 15000;

export const fetchWithTimeout = <ResponseType = any>(
    url: string,
    timeoutMs = defaultTimeout,
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
    timeout = defaultTimeout,
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
        .catch((e) => {
            if (retries > 0) {
                console.log(`Failed to fetch from ${url}, retrying`);
                return fetchJson(url, timeout, config, retries - 1);
            }

            console.error(`Failed to fetch json from ${url} - ${e}`);
            return null;
        });
