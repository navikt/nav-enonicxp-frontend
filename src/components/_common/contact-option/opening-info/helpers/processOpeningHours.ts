import {
    OpeningHour,
    OpeningHourRegular,
    OpeningHourSpecial,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import dayjs from 'dayjs';
import { dayNameToIndex, daysNameArray } from 'utils/datetime';

const dateFormat = 'YYYY-MM-DD';

export const processOpeningHours = (
    regularOpeningHours: OpeningHourRegular[] = [],
    specialOpeningHours: OpeningHourSpecial[] = []
): OpeningHour[] => {
    const totalDaysToCheck = 7 + specialOpeningHours.length;

    const now = dayjs();

    const openingHours: OpeningHour[] = [];

    for (let i = 0; i < totalDaysToCheck; i++) {
        const day = now.add(i, 'day');
        const dayName = daysNameArray[day.day()];
        const date = day.format(dateFormat);

        // Special opening hours take precedence
        const specialOpeningHour = specialOpeningHours.find((openingHour) =>
            day.isSame(openingHour.date, 'day')
        );

        if (specialOpeningHour) {
            openingHours.push({
                ...specialOpeningHour,
                dayName,
                date,
            });
            continue;
        }

        const regularOpeningHour = regularOpeningHours.find(
            (openingHour) => day.day() === dayNameToIndex[openingHour.dayName]
        );

        if (!regularOpeningHour || regularOpeningHour.status === 'CLOSED') {
            openingHours.push({
                status: 'CLOSED',
                date,
                dayName,
            });
            continue;
        }

        // If no opening hours for this particular regular day was added
        // consider the day CLOSED (ie. Saturday or Sunday)
        openingHours.push({
            ...regularOpeningHour,
            date,
            dayName,
        });
    }

    return openingHours;
};
