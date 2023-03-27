import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { OpeningHour } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

const norwayTz = 'Europe/Oslo';

export const openingHourTimeFormat = 'HH:mm';

export const getOpeningHourForDateTime = (
    openingHours: OpeningHour[],
    dateTime: Dayjs
) =>
    openingHours.find((openingHour) =>
        dateTime.isSame(dayjs(openingHour.date), 'date')
    );

export const getOpeningState = (
    openingHour: OpeningHour | null
): 'openNow' | 'openLater' | 'closed' => {
    if (!openingHour) {
        return 'closed';
    }

    const { status } = openingHour;
    if (status === 'CLOSED') {
        return 'closed';
    }

    const { from, to } = openingHour;

    const now = dayjs();
    const opens = dayjs(from, openingHourTimeFormat).tz(norwayTz, true);

    if (now.isBefore(opens)) {
        return 'openLater';
    }

    const closes = dayjs(to, openingHourTimeFormat).tz(norwayTz, true);

    if (now.isAfter(closes)) {
        return 'closed';
    }

    return 'openNow';
};

export const getCurrentOpeningHour = (openingHours: OpeningHour[]) => {
    const now = dayjs();
    const openingHour = getOpeningHourForDateTime(openingHours, now);

    return openingHour;
};
