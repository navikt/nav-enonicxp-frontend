import { OpeningInfoProps } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import dayjs, { Dayjs } from 'dayjs';
import { dayNameToIndex, daysNameArray } from 'utils/datetime';
import { openingHourTimeFormat } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
    OpeningHourRaw,
    OpeningHourRegularRaw,
    OpeningHourSpecialRaw,
} from 'types/component-props/parts/contact-option';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

const dateFormat = 'YYYY-MM-DD';
const norwayTz = 'Europe/Oslo';

const getOpeningInfo = ({
    openingHour,
    day,
}: {
    openingHour?: OpeningHourRaw;
    day: Dayjs;
}): OpeningInfoProps => {
    const commonProps = {
        dayName: daysNameArray[day.day()],
        date: day.format(dateFormat),
    };

    if (!openingHour || openingHour.status === 'CLOSED') {
        return {
            ...commonProps,
            status: 'CLOSED',
        };
    }

    const { from, to } = openingHour;

    const closes = dayjs(to, openingHourTimeFormat).tz(norwayTz, true);
    if (day.isSameOrAfter(closes)) {
        return {
            ...commonProps,
            status: 'CLOSED',
        };
    }

    const opens = dayjs(from, openingHourTimeFormat).tz(norwayTz, true);
    if (day.isBefore(opens)) {
        return { ...commonProps, status: 'OPEN_LATER', from, to };
    }

    return { ...commonProps, status: 'OPEN', from, to };
};

const getSpecialOpeningHour = (
    specialOpeningHours: OpeningHourSpecialRaw[],
    day: Dayjs
) =>
    specialOpeningHours.find((openingHour) =>
        day.isSame(openingHour.date, 'day')
    );

const getRegularOpeningHour = (
    regularOpeningHours: OpeningHourRegularRaw[],
    day: Dayjs
) =>
    regularOpeningHours.find(
        (openingHour) => day.day() === dayNameToIndex[openingHour.dayName]
    );

export const processOpeningInfo = (
    regularOpeningHours: OpeningHourRegularRaw[] = [],
    specialOpeningHours: OpeningHourSpecialRaw[] = []
): OpeningInfoProps[] => {
    const totalDaysToCheck = 7 + specialOpeningHours.length;

    const now = dayjs();

    const openingHours: OpeningInfoProps[] = [];

    for (let i = 0; i < totalDaysToCheck; i++) {
        const dayToCheck = now.add(i, 'day');

        const openingHour =
            getSpecialOpeningHour(specialOpeningHours, dayToCheck) ||
            getRegularOpeningHour(regularOpeningHours, dayToCheck);

        openingHours.push(getOpeningInfo({ openingHour, day: dayToCheck }));
    }

    return openingHours;
};
