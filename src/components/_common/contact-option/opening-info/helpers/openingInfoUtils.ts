import dayjs, { Dayjs } from 'dayjs';
import { OpeningInfoProps } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { norwayTz } from 'utils/datetime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

export const openingHourTimeFormat = 'HH:mm';
export const openingHourDateFormat = 'YYYY-MM-DD';

const getOpeningInfo = ({
    openingHour,
    day,
}: {
    openingHour: OpeningInfoProps;
    day: Dayjs;
}): OpeningInfoProps => {
    if (openingHour.status === 'CLOSED') {
        return openingHour;
    }

    const { from, to } = openingHour;

    const closes = dayjs(to, openingHourTimeFormat).tz(norwayTz, true);
    if (day.isSameOrAfter(closes)) {
        return {
            ...openingHour,
            status: 'CLOSED',
        };
    }

    const opens = dayjs(from, openingHourTimeFormat).tz(norwayTz, true);
    if (day.isBefore(opens)) {
        return { ...openingHour, status: 'OPEN_LATER' };
    }

    return { ...openingHour, status: 'OPEN' };
};

export const getOpeningInfoForDateTime = (
    openingHours: OpeningInfoProps[],
    dateTime: Dayjs
) =>
    openingHours.find((openingHour) =>
        dateTime.isSame(openingHour.date, 'day')
    );

export const getCurrentOpeningInfo = (openingHours: OpeningInfoProps[]) => {
    const now = dayjs();
    const openingHour = getOpeningInfoForDateTime(openingHours, now);

    return getOpeningInfo({ openingHour, day: now });
};
