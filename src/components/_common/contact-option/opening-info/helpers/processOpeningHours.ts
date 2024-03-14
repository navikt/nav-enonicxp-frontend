import { OpeningHours } from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import dayjs, { Dayjs } from 'dayjs';
import { dayNameToIndex, daysNameArray } from 'utils/datetime';
import { openingHourDateFormat } from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
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

const transformOpeningHour = ({
    openingHour,
    day,
}: {
    openingHour?: OpeningHourRaw;
    day: Dayjs;
}): OpeningHours => {
    const commonProps = {
        dayName: daysNameArray[day.day()],
        date: day.format(openingHourDateFormat),
    };

    if (!openingHour || openingHour.status === 'CLOSED') {
        return {
            ...commonProps,
            status: 'CLOSED',
        };
    }

    const { from, to } = openingHour;

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

export const processOpeningHours = (
    regularOpeningHours: OpeningHourRegularRaw[] = [],
    specialOpeningHours: OpeningHourSpecialRaw[] = []
): OpeningHours[] => {
    const totalDaysToCheck = 7 + specialOpeningHours.length;

    const now = dayjs();

    const openingHours: OpeningHours[] = [];

    for (let i = 0; i < totalDaysToCheck; i++) {
        const dayToCheck = now.add(i, 'day');

        const openingHour =
            getSpecialOpeningHour(specialOpeningHours, dayToCheck) ||
            getRegularOpeningHour(regularOpeningHours, dayToCheck);

        openingHours.push(
            transformOpeningHour({ openingHour, day: dayToCheck })
        );
    }

    return openingHours;
};
