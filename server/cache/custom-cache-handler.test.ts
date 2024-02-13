import mockFs from 'mock-fs';

describe.skip('Custom cache handler for ISR page cache', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        mockFs.restore();
    });

    test('Placeholder test', () => {
        expect(true);
    });
});
