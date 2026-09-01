import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

const mockLoggerError = jest.fn();

jest.mock('@/shared/logger', () => ({
    logger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: mockLoggerError,
    },
}));

describe('getRevalidatorProxyToken', () => {
    enableFetchMocks();

    beforeEach(() => {
        jest.resetModules();
        fetchMock.resetMocks();
        mockLoggerError.mockClear();
        process.env.NAIS_TOKEN_ENDPOINT = 'http://token-endpoint/api/v1/token';
        process.env.NAIS_CLUSTER_NAME = 'dev-gcp';
        process.env.REVALIDATOR_PROXY_ORIGIN = 'http://nav-enonicxp-frontend-revalidator-proxy';
    });

    test('Should return access token on a successful response', async () => {
        const { getRevalidatorProxyToken } = await import('@/shared/azure-token');

        fetchMock.mockResponseOnce(
            JSON.stringify({ access_token: 'some-token', expires_in: 3599, token_type: 'Bearer' })
        );

        const token = await getRevalidatorProxyToken();

        expect(token).toEqual('some-token');
        expect(fetchMock.mock.calls[0][0]).toEqual(process.env.NAIS_TOKEN_ENDPOINT);
        expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string)).toEqual({
            identity_provider: 'entra_id',
            target: 'api://dev-gcp.navno.nav-enonicxp-frontend-revalidator-proxy/.default',
        });
    });

    test('Should log an error and return null if NAIS_TOKEN_ENDPOINT is not set', async () => {
        process.env.NAIS_TOKEN_ENDPOINT = '';

        const { getRevalidatorProxyToken } = await import('@/shared/azure-token');

        const token = await getRevalidatorProxyToken();

        expect(token).toBeNull();
        expect(fetchMock).not.toHaveBeenCalled();
        expect(mockLoggerError).toHaveBeenCalledWith(
            expect.stringContaining('NAIS_TOKEN_ENDPOINT is not set')
        );
    });

    test('Should log an error and return null on a non-ok response', async () => {
        const { getRevalidatorProxyToken } = await import('@/shared/azure-token');

        fetchMock.mockResponseOnce('Unauthorized', { status: 401 });

        const token = await getRevalidatorProxyToken();

        expect(token).toBeNull();
        expect(mockLoggerError).toHaveBeenCalledWith(
            expect.stringContaining('Failed to fetch Entra ID token')
        );
    });

    test('Should log an error and return null if the request throws', async () => {
        const { getRevalidatorProxyToken } = await import('@/shared/azure-token');

        fetchMock.mockRejectOnce(new Error('Connection refused'));

        const token = await getRevalidatorProxyToken();

        expect(token).toBeNull();
        expect(mockLoggerError).toHaveBeenCalledWith(
            expect.stringContaining('Error while fetching Entra ID token'),
            expect.objectContaining({ error: expect.any(Error) })
        );
    });
});
