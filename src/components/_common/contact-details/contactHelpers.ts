import {
    RegularOpeningHour,
    SpecialOpeningHour,
} from 'types/component-props/parts/contact-option';
import { getStartOfWeek, getDayNameFromNumber } from 'utils/datetime';

/** Special opening hours take precidence over regular opening hours,
 * so merge the two in order to create a correct list of opening
 * hours for this current week.
 */
export const mergeOpeningHours = (
    regularOpeningHours: RegularOpeningHour[] = [],
    specialOpeningHours: SpecialOpeningHour[] = []
) => {
    const totalDaysToCheck = 7 + specialOpeningHours.length;
    const today = getStartOfWeek().getTime();
    const openingHours = [];

    for (let day = 0; day < totalDaysToCheck; day++) {
        const dayToCheck = new Date(today + 86400000 * day);
        const dayToCheckISO = dayToCheck.toISOString().split('T')[0];
        const dayName = getDayNameFromNumber(dayToCheck.getDay());

        // Special opening hours take precidence, so check these first.
        const specialOpeningHour = specialOpeningHours.find(
            (hour) => hour.date === dayToCheckISO
        );

        if (specialOpeningHour) {
            openingHours.push({ ...specialOpeningHour, dayName });
            continue;
        }

        // No special hours were found for this particular date, so
        // look at regular opening hours
        const regularOpeningHour = regularOpeningHours.find(
            (hour) => hour.dayName === dayName
        );

        openingHours.push({
            ...regularOpeningHour,
            date: dayToCheckISO,
            dayName,
        });
    }

    return openingHours;
};

export const getThisWeeksOpeningHours = (allOpeningHours) => {
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

export const shouldShowSpecialHours = (specialOpeningHours) => {
    if (!specialOpeningHours) {
        return false;
    }
    const validFrom = new Date(specialOpeningHours.validFrom);
    const validTo = new Date(specialOpeningHours.validTo);
    const timeNow = new Date();

    return validFrom < timeNow && validTo > timeNow;
};
