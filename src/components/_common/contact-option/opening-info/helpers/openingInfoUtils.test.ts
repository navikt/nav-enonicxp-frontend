import { getOpeningState } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import { OpeningHour } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';

describe('Opening info utils', () => {
    const openingHourOpen: OpeningHour = {
        status: 'OPEN',
        from: '09:00',
        to: '15:00',
        dayName: 'monday',
        date: '2023-01-02',
    };

    const openingHourClosed: OpeningHour = {
        ...openingHourOpen,
        status: 'CLOSED',
    };

    beforeEach(() => {
        jest.useRealTimers();
    });

    test('Should be open at the opening minute', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T09:00'));

        expect(getOpeningState(openingHourOpen)).toBe(true);
    });

    test('Should be open the minute before closing', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T14:59'));

        expect(getOpeningState(openingHourOpen)).toBe(true);
    });

    test('Should be closed at the closing minute', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T15:00'));

        expect(getOpeningState(openingHourOpen)).toBe(false);
    });

    test('Should be closed before opening', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T08:59'));

        expect(getOpeningState(openingHourOpen)).toBe(false);
    });

    test('Should be closed after closing', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T15:01'));

        expect(getOpeningState(openingHourOpen)).toBe(false);
    });

    test('Should be closed if closed status is set', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-01T09:01'));

        expect(getOpeningState(openingHourClosed)).toBe(false);
    });
});
