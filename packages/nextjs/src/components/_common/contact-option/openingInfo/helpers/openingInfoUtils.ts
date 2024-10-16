import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { daysNameArray, norwayTz } from 'utils/datetime';
import { OpeningHours } from 'components/_common/contact-option/openingInfo/helpers/openingInfoTypes';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

export const openingHourTimeFormat = 'HH:mm';
export const openingHourDateFormat = 'YYYY-MM-DD';

export const getOpeningHoursForDateTime = (
    openingHours: OpeningHours[],
    dateTime: Dayjs
): OpeningHours =>
    openingHours.find((openingHour) => dateTime.isSame(openingHour.date, 'day')) || {
        status: 'CLOSED',
        dayName: daysNameArray[dateTime.day()],
        date: dateTime.format(openingHourDateFormat),
    };

export const getCurrentOpeningHours = (openingHours: OpeningHours[]): OpeningHours => {
    const now = dayjs();
    const openingHour = getOpeningHoursForDateTime(openingHours, now);

    if (openingHour.status === 'CLOSED') {
        return openingHour;
    }

    const { from, to } = openingHour;

    const closes = dayjs(to, openingHourTimeFormat).tz(norwayTz, true);
    if (now.isSameOrAfter(closes)) {
        return {
            ...openingHour,
            status: 'CLOSED',
        };
    }

    const opens = dayjs(from, openingHourTimeFormat).tz(norwayTz, true);
    if (now.isBefore(opens)) {
        return { ...openingHour, status: 'OPEN_LATER' };
    }

    return { ...openingHour, status: 'OPEN' };
};
