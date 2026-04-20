import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

const revalidatorProxyOrigin = 'revalidator-proxy';

const mockLoggerError = jest.fn();

jest.mock('@/shared/logger', () => ({
    logger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: mockLoggerError,
    },
}));

describe('Revalidator proxy heartbeat', () => {
    enableFetchMocks();
    jest.useFakeTimers();

    process.env.REVALIDATOR_PROXY_ORIGIN = revalidatorProxyOrigin;
    process.env.ENV = 'localhost';

    beforeEach(() => {
        jest.clearAllTimers();
        jest.resetModules();
        fetchMock.resetMocks();
        mockLoggerError.mockClear();
    });

    test('Should call revalidator proxy', async () => {
        const { initRevalidatorProxyHeartbeat } = await import('./revalidator-proxy-heartbeat');

        fetchMock.mockResponse('Hello!');

        initRevalidatorProxyHeartbeat();

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0]).toMatch(new RegExp(`^${revalidatorProxyOrigin}`));
    });

    test('Should not log error before 10 consecutive failures', async () => {
        const { initRevalidatorProxyHeartbeat } = await import('./revalidator-proxy-heartbeat');

        fetchMock.mockReject(new Error('Connection refused'));

        initRevalidatorProxyHeartbeat();

        for (let i = 1; i < 9; i++) {
            await jest.advanceTimersByTimeAsync(5000);
        }

        expect(mockLoggerError).not.toHaveBeenCalledWith(
            expect.stringContaining('consecutive times'),
            expect.anything()
        );
    });

    test('Should log error after 10 consecutive failures', async () => {
        const { initRevalidatorProxyHeartbeat } = await import('./revalidator-proxy-heartbeat');

        fetchMock.mockReject(new Error('Connection refused'));

        initRevalidatorProxyHeartbeat();

        for (let i = 0; i < 10; i++) {
            await jest.advanceTimersByTimeAsync(5000);
        }

        expect(mockLoggerError).toHaveBeenCalledWith(
            expect.stringContaining('Heartbeat failed'),
            expect.objectContaining({ error: expect.any(Error) })
        );
    });

    test('Should reset failure count on successful response', async () => {
        const { initRevalidatorProxyHeartbeat } = await import('./revalidator-proxy-heartbeat');

        fetchMock.mockReject(new Error('Connection refused'));

        initRevalidatorProxyHeartbeat();

        for (let i = 1; i < 9; i++) {
            await jest.advanceTimersByTimeAsync(5000);
        }

        fetchMock.mockResponse('Hello!');
        await jest.advanceTimersByTimeAsync(5000);

        fetchMock.mockReject(new Error('Connection refused'));
        for (let i = 0; i < 9; i++) {
            await jest.advanceTimersByTimeAsync(5000);
        }

        expect(mockLoggerError).not.toHaveBeenCalledWith(
            expect.stringContaining('consecutive times'),
            expect.anything()
        );
    });
});
