export const fetchWithTimeout = (url: string, timeout: number): Promise<any> =>
    Promise.race([
        fetch(url),
        new Promise((res) =>
            setTimeout(
                () =>
                    res({
                        ok: false,
                        status: 408,
                        statusText: 'Request Timeout',
                    }),
                timeout
            )
        ),
    ]);

export const objectToQueryString = (params: object) =>
    params
        ? Object.entries(params).reduce(
              (acc, [k, v], i) =>
                  `${acc}${i ? '&' : '?'}${k}=${encodeURIComponent(
                      JSON.stringify(v)
                  )}`,
              ''
          )
        : '';
