import { processOpeningInfo } from 'components/_common/contact-option/opening-info/helpers/processOpeningInfo';
import {
    OpeningHourRegularRaw,
    OpeningHourSpecialRaw,
} from 'types/component-props/parts/contact-option';
import { getCurrentOpeningInfo } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';

const regularOpeningHours: OpeningHourRegularRaw[] = [
    {
        dayName: 'monday',
        from: '09:00',
        to: '15:00',
        status: 'OPEN',
    },
    {
        dayName: 'tuesday',
        from: '09:00',
        to: '15:00',
        status: 'OPEN',
    },
    {
        dayName: 'wednesday',
        from: '09:00',
        to: '15:00',
        status: 'OPEN',
    },
    {
        dayName: 'thursday',
        from: '09:00',
        to: '15:00',
        status: 'OPEN',
    },
    {
        dayName: 'friday',
        from: '09:00',
        to: '15:00',
        status: 'OPEN',
    },
    {
        dayName: 'saturday',
        status: 'CLOSED',
    },
    {
        dayName: 'sunday',
        status: 'CLOSED',
    },
];

const specialOpeningHours: OpeningHourSpecialRaw[] = [
    {
        date: '2022-04-13', // wednesday
        from: '09:00',
        to: '12:00',
        status: 'OPEN',
    },
    {
        date: '2022-04-14', // thursday
        status: 'CLOSED',
    },
    {
        date: '2022-04-15', // friday
        status: 'CLOSED',
    },
    {
        date: '2022-04-18', // monday
        status: 'CLOSED',
    },
];

const getOpeningInfo = () => {
    const openingHours = processOpeningInfo(
        regularOpeningHours,
        specialOpeningHours
    );

    return getCurrentOpeningInfo(openingHours);
};

beforeEach(() => {
    jest.useRealTimers();
});

describe('Regular opening hours', () => {
    beforeEach(() => {
        jest.useRealTimers();
    });

    test('Should be open at a regular opening minute', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-12T09:00'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('OPEN');
    });

    test('Should be open the minute before regular closing', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-12T14:59'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('OPEN');
    });

    test('Should be closed at a regular closing minute', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-12T15:00'));
        const openingInfo = getOpeningInfo();
        expect(openingInfo.status).toBe('CLOSED');
    });

    test('Should be open later before regular opening', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-12T08:59'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('OPEN_LATER');
    });

    test('Should be closed after regular closing', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-12T15:01'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('CLOSED');
    });

    test('Should be closed if regular closed status is set', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-15T12:00'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('CLOSED');
    });
});

describe('Special opening hours', () => {
    test('Should be open at a special opening minute', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-13T09:00'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('OPEN');
    });

    test('Should be open the minute before special closing', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-13T11:59'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('OPEN');
    });

    test('Should be closed at a special closing minute', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-13T12:00'));
        const openingInfo = getOpeningInfo();
        expect(openingInfo.status).toBe('CLOSED');
    });

    test('Should be open later before special opening', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-13T08:59'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('OPEN_LATER');
    });

    test('Should be closed after special closing', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-13T12:01'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('CLOSED');
    });

    test('Should be closed if special closed status is set', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-14T12:00'));
        const openingInfo = getOpeningInfo();

        expect(openingInfo.status).toBe('CLOSED');
    });
});
