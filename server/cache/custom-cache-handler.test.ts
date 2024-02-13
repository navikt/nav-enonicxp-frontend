import mockFs from 'mock-fs';

describe('Custom cache handler for ISR page cache', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        mockFs.restore();
    });
});
