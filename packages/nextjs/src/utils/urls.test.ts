import {
    adminOrigin,
    appOriginProd,
    isAppUrl,
    stripXpPathPrefix,
    xpContentPathPrefix,
    xpDraftPathPrefix,
} from 'utils/urls';

describe('isAppUrl', () => {
    test.each(['', '/nb', '/nn', '/en'])(
        'Should not use SPA navigation for feedback pages with language prefix "%s"',
        (languagePrefix) => {
            const url = `${appOriginProd}/person/kontakt-oss${languagePrefix}/tilbakemeldinger/feil-og-mangler`;

            expect(isAppUrl(url)).toBe(false);
        }
    );

    test('Should preserve SPA navigation for other contact pages', () => {
        expect(isAppUrl(`${appOriginProd}/person/kontakt-oss/nn`)).toBe(true);
    });
});

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
