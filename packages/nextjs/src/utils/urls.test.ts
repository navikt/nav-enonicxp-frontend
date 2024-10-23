import { adminOrigin, stripXpPathPrefix, xpContentPathPrefix, xpDraftPathPrefix } from 'utils/urls';

describe('stripXpPathPrefix', () => {
    test('Should strip content path prefix', () => {
        const desiredUrl = '/foo/bar';

        const url = stripXpPathPrefix(`${xpContentPathPrefix}${desiredUrl}`);
        expect(url).toEqual(desiredUrl);
    });

    test('Should strip admin preview path prefixes', () => {
        const desiredUrl = '/foo/bar';

        const url = stripXpPathPrefix(`${adminOrigin}${xpDraftPathPrefix}${desiredUrl}`);
        expect(url).toEqual(desiredUrl);
    });

    test('Should not affect links without xpContentPathPrefix', () => {
        const desiredUrl = '/foo/bar';

        const url = stripXpPathPrefix(desiredUrl);
        expect(url).toEqual(desiredUrl);
    });

    test('Should not affect links not starting with xpContentPathPrefix', () => {
        const desiredUrl = `/foo${xpContentPathPrefix}/bar`;

        const url = stripXpPathPrefix(desiredUrl);
        expect(url).toEqual(desiredUrl);
    });
});
