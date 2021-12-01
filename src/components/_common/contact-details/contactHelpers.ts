import {
    RegularOpeningHour,
    SpecialOpeningHour,
} from 'types/component-props/parts/contact-option';
import { getStartOfWeek, getDayNameFromNumber } from 'utils/datetime';

export const mergeOpeningHours = (
    regularOpeningHours: RegularOpeningHour[],
    specialOpeningHours: SpecialOpeningHour[]
) => {
    const totalDaysToCheck = 7 + specialOpeningHours.length;
    const today = getStartOfWeek().getTime();
    const openingHours = [];

    for (let day = 0; day < totalDaysToCheck; day++) {
        const dayToCheck = new Date(today + 86400000 * day);
        const dayToCheckISO = dayToCheck.toISOString().split('T')[0];
        const nameOfDay = getDayNameFromNumber(dayToCheck.getDay());

        // Special opening hours take precidence, so check these first.
        const specialOpeningHour = specialOpeningHours.find(
            (hour) => hour.date === dayToCheckISO
        );

        if (specialOpeningHour) {
            openingHours.push({ ...specialOpeningHour, day: nameOfDay });
            continue;
        }

        // No special hours were found for this particular date, so
        // look at regular opening hours
        const regularOpeningHour = regularOpeningHours.find(
            (hour) => hour.day === nameOfDay
        );

        openingHours.push({
            ...regularOpeningHour,
            date: dayToCheckISO,
            day: nameOfDay,
        });
    }

    return openingHours;
};

export const normalizeWeeklyOpeningHours = (allOpeningHours) => {
    return allOpeningHours.slice(0, 7);
};

export const parsePhoneNumber = (
    phoneNumber: string,
    language: string = 'no'
) => {
    // First normalize number for reliable result when inserting spaces later.
    let parsedNumber = phoneNumber.replace(' ', '');
    if (language === 'no') {
        parsedNumber = parsedNumber.replace('+47', '');
    }

    return parsedNumber.match(/.{1,2}/g).join(' ');
};
