import { OpeningHour } from 'types/component-props/parts/contact-option';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

const timeFormat = 'HH:mm';

export const openingHourIsOpen = (openingHour: OpeningHour) => {
    const { status, from, to } = openingHour;

    if (status === 'CLOSED') {
        return false;
    }

    const now = dayjs();
    const opens = dayjs(from, timeFormat).tz('Europe/Oslo', true);
    const closes = dayjs(to, timeFormat).tz('Europe/Oslo', true);

    return now.isBetween(opens, closes, 'minute', '[)');
};
