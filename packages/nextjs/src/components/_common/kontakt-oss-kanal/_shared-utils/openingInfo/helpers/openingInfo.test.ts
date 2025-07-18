import { translator } from 'translations';
import {
    OpeningHourRegularRaw,
    OpeningHourSpecialRaw,
} from 'components/parts/kontakt-oss-kanal/KontaktOssKanalPart';
import { processOpeningHours } from './processOpeningHours';
import { getCurrentOpeningHours } from './openingInfoUtils';
import { getOpeningInfoText } from './openingInfoText';

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
    const openingHours = processOpeningHours(regularOpeningHours, specialOpeningHours);

    return getCurrentOpeningHours(openingHours);
};

const getInfoText = () => {
    const allOpeningInfo = processOpeningHours(regularOpeningHours, specialOpeningHours);

    const currentOpeningInfo = getCurrentOpeningHours(allOpeningInfo);

    return getOpeningInfoText({
        allOpeningHours: allOpeningInfo,
        currentOpeningHours: currentOpeningInfo,
        language: 'no',
    });
};

afterEach(() => {
    jest.useRealTimers();
});

describe('Regular opening hours', () => {
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

describe('Opening information text', () => {
    test('Should show open text when open', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-12T09:00'));

        const text = getInfoText();

        const expectedText = translator('contactPoint', 'no')('shared')['openNow'];

        expect(text).toBe(expectedText);
    });

    test('Should include closed text when closed for today', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-12T15:00'));

        const text = getInfoText();

        const expectedText = translator('contactPoint', 'no')('shared')['closedNow'];

        expect(text).toContain(expectedText);
    });

    test('Should include opening tomorrow texts when opening tomorrow', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-18T08:00'));

        const text = getInfoText();

        const expectedText1 = translator('contactPoint', 'no')('shared')['closedNow'];
        const expectedText2 = translator('dateTime', 'no')('relatives')['tomorrow'];

        expect(text).toContain(expectedText1);
        expect(text).toContain(expectedText2);
    });

    test('Should include opening at datetime text when opening several days in the future', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-04-14T08:00'));

        const text = getInfoText();

        const expectedText1 = translator('contactPoint', 'no')('shared')['closedNow'];
        const expectedText2 = translator('contactPoint', 'no')('shared')
            ['opensAt'].replace('{$date}', '(.*)')
            .replace('{$time}', '(.*)');

        const expectedTextPattern = new RegExp(`${expectedText1}(.*)${expectedText2}`, 'i');

        expect(text).toMatch(expectedTextPattern);
    });
});
