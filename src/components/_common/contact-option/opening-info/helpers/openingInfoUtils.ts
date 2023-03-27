import dayjs, { Dayjs } from 'dayjs';
import { OpeningInfoProps } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';

export const openingHourTimeFormat = 'HH:mm';

export const getOpeningInfoForDateTime = (
    openingHours: OpeningInfoProps[],
    dateTime: Dayjs
) =>
    openingHours.find((openingHour) =>
        dateTime.isSame(dayjs(openingHour.date), 'date')
    );

export const getCurrentOpeningInfo = (openingHours: OpeningInfoProps[]) => {
    const now = dayjs();
    const openingHour = getOpeningInfoForDateTime(openingHours, now);

    return openingHour;
};
