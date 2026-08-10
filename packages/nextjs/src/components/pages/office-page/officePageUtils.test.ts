import { shouldUseOfficeEditorialPage } from './officePageUtils';

describe('shouldUseOfficeEditorialPage', () => {
    test.each([
        ['LOKAL', false, true],
        ['ALS', false, true],
        ['OKONOMI', false, true],
        ['OPPFUTLAND', false, true],
        ['KONTROLL', false, true],
        ['REDAKSJONELT', true, true],
        ['REDAKSJONELT', false, false],
        ['HMS', false, false],
    ] as const)('returns %s for %s with unit opt-in %s', (officeType, optIn, expected) => {
        expect(shouldUseOfficeEditorialPage(officeType, optIn)).toBe(expected);
    });
});
