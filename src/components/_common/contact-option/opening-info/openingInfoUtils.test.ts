import { OpeningHour } from 'types/component-props/parts/contact-option';
import { openingHourIsOpen } from 'components/_common/contact-option/opening-info/openingInfoUtils';

describe('Opening info utils', () => {
    const openingHour: OpeningHour = {
        status: 'open',
        from: '09:00',
        to: '15:00',
    };

    beforeEach(() => {
        jest.useRealTimers();
    });

    test('Should be open at the opening minute', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T09:00'));

        expect(openingHourIsOpen(openingHour)).toBe(true);
    });

    test('Should be open the minute before closing', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T14:59'));

        expect(openingHourIsOpen(openingHour)).toBe(true);
    });

    test('Should be closed at the closing minute', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T15:00'));

        expect(openingHourIsOpen(openingHour)).toBe(false);
    });

    test('Should be closed before opening', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T08:59'));

        expect(openingHourIsOpen(openingHour)).toBe(false);
    });

    test('Should be closed after closing', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T15:01'));

        expect(openingHourIsOpen(openingHour)).toBe(false);
    });

    test('Should be closed if closed status is set', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T09:01'));

        const closedOpeningHour: OpeningHour = {
            ...openingHour,
            status: 'closed',
        };

        expect(openingHourIsOpen(closedOpeningHour)).toBe(false);
    });
});
