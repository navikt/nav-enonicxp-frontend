import { OpeningHour } from 'types/component-props/parts/contact-option';
import { getDayNameFromNumber } from 'utils/datetime';
import { getCurrentISODate } from 'utils/datetime';
import dayjs from 'dayjs';

/** Special opening hours take precidence over regular opening hours,
 * so merge the two in order to create a correct list of opening
 * hours for this current week.
 */
export const mergeOpeningHours = (
    regularOpeningHours: OpeningHour[] = [],
    specialOpeningHours: OpeningHour[] = []
): OpeningHour[] => {
    const totalDaysToCheck = 7 + specialOpeningHours.length;
    const today = Date.now();
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

        // If no opening hours for this particular regular day was added
        // consider the day CLOSED (ie. Saturday or Sunday)
        const status = regularOpeningHour
            ? regularOpeningHour.status
            : 'CLOSED';

        openingHours.push({
            ...regularOpeningHour,
            status,
            date: dayToCheckISO,
            dayName,
        });
    }

    return openingHours;
};

export const findTodaysOpeningHour = (openingHours: OpeningHour[]) => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];

    const todaysOpeningHour = openingHours.find(
        (hour) => hour.date === todayISO
    );

    return todaysOpeningHour;
};

export const getThisWeeksOpeningHours = (allOpeningHours) => {
    return allOpeningHours.slice(0, 7);
};

export const parsePhoneNumber = (
    phoneNumber: string,
    language: string = 'no'
) => {
    // First normalize number for reliable result when inserting spaces later.
    let parsedNumber = phoneNumber
        .replace(/^\+47|\s/, '')
        .match(/.{1,2}/g)
        .join(' ');

    return language === 'no' ? parsedNumber : `+47 ${parsedNumber}`;
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

export const getIsClosedForToday = (openingHour: OpeningHour) => {
    if (!getDates(openingHour)) {
        return true;
    }
    const { closesEpoch, norwayEpoch, endOfToday } = getDates(openingHour);

    const isClosed =
        (closesEpoch < norwayEpoch && closesEpoch < endOfToday) ||
        openingHour.status === 'CLOSED';

    return isClosed;
};

export const getIsCurrentlyClosed = (openingHour: OpeningHour) => {
    if (!getDates(openingHour)) {
        return true;
    }
    const { closesEpoch, opensEpoch, norwayEpoch, endOfToday } =
        getDates(openingHour);

    const isCurrentlyClosed =
        norwayEpoch < opensEpoch ||
        norwayEpoch > closesEpoch ||
        openingHour.status === 'CLOSED';

    return isCurrentlyClosed;
};

export const getDates = (openingHours: OpeningHour) => {
    if (!openingHours) {
        return null;
    }

    const currentISODate = getCurrentISODate();
    const norwayEpoch = dayjs(new Date()).tz('Europe/Oslo').valueOf();

    const startOfToday = new Date(`${currentISODate}T00:00:00+01:00`).getTime();
    const endOfToday = new Date(`${currentISODate}T23:59:59+01:00`).getTime();

    const { from, to } = openingHours;
    const opensEpoch = new Date(`${currentISODate}T${from}+01:00`).getTime();
    const closesEpoch = new Date(`${currentISODate}T${to}+01:00`).getTime();

    return {
        startOfToday,
        endOfToday,
        opensEpoch,
        closesEpoch,
        norwayEpoch,
    };
};
