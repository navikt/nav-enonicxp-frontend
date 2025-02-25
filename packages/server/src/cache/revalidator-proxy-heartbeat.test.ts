import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

const revalidatorProxyOrigin = 'revalidator-proxy';

describe('Revalidator proxy heartbeat', () => {
    enableFetchMocks();
    jest.useFakeTimers();

    process.env.REVALIDATOR_PROXY_ORIGIN = revalidatorProxyOrigin;
    process.env.ENV = 'localhost';

    test('Should call revalidator proxy', async () => {
        const { initRevalidatorProxyHeartbeat } = await import('./revalidator-proxy-heartbeat');

        fetchMock.mockResponse('Hello!');

        initRevalidatorProxyHeartbeat();

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0]).toMatch(new RegExp(`^${revalidatorProxyOrigin}`));
    });
});
