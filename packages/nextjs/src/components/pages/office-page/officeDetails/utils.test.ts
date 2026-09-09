import { officeDetailsFormatAddress, officeDetailsFormatPhoneNumber } from './utils';

describe('officeDetailsFormatAddress', () => {
    test('returns an empty string when the address is missing', () => {
        expect(officeDetailsFormatAddress()).toBe('');
    });

    test.each([
        {
            description: 'without postal information',
            withZip: false,
            expected: 'Karl Johans gate 1A',
        },
        {
            description: 'with postal information',
            withZip: true,
            expected: 'Karl Johans gate 1A, 0154 OSLO',
        },
    ])('formats a street address $description', ({ withZip, expected }) => {
        expect(
            officeDetailsFormatAddress(
                {
                    type: 'stedsadresse',
                    gatenavn: 'Karl Johans gate',
                    husnummer: '1',
                    husbokstav: 'A',
                    postnummer: '0154',
                    poststed: 'Oslo',
                },
                withZip
            )
        ).toBe(expected);
    });

    test('formats a postbox when the postbox number is present', () => {
        expect(
            officeDetailsFormatAddress(
                {
                    type: '' as 'postboksadresse',
                    postboksnummer: '123',
                    postboksanlegg: 'Sentrum',
                    postnummer: '0101',
                    poststed: 'Oslo',
                },
                true
            )
        ).toBe('Postboks 123 Sentrum, 0101 OSLO');
    });

    test('formats a postbox without a postbox facility', () => {
        expect(
            officeDetailsFormatAddress(
                {
                    type: 'postboksadresse',
                    postboksnummer: '123',
                    postnummer: '0101',
                    poststed: 'Oslo',
                },
                true
            )
        ).toBe('Postboks 123, 0101 OSLO');
    });

    test.each([
        {
            address: {
                type: 'stedsadresse' as const,
                postnummer: '0154',
                poststed: 'Oslo',
            },
            expected: '0154 OSLO',
        },
        {
            address: {
                type: 'postboksadresse' as const,
                postnummer: '0101',
                poststed: 'Oslo',
            },
            expected: '0101 OSLO',
        },
        {
            address: {
                type: 'stedsadresse' as const,
                gatenavn: 'Karl Johans gate',
            },
            expected: 'Karl Johans gate',
        },
        {
            address: {
                type: 'stedsadresse' as const,
            },
            expected: '',
        },
    ])('does not print undefined for incomplete addresses', ({ address, expected }) => {
        expect(officeDetailsFormatAddress(address, true)).toBe(expected);
    });
});

describe('officeDetailsFormatPhoneNumber', () => {
    test.each([
        { phoneNumber: undefined, expected: '' },
        { phoneNumber: '', expected: '' },
        { phoneNumber: '12345678', expected: '12 34 56 78' },
        { phoneNumber: '12 34 56 78', expected: '12 34 56 78' },
        { phoneNumber: '123', expected: '12 3' },
    ])('formats "$phoneNumber" as "$expected"', ({ phoneNumber, expected }) => {
        expect(officeDetailsFormatPhoneNumber(phoneNumber)).toBe(expected);
    });
});
