import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(localizedFormat);
dayjs.extend(utc);

// JS starts week on a Sunday.
export const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

export const formatDate = (
    datetime: string,
    language: string = 'nb',
    short = false
) => {
    const currentLocale = language === 'en' ? 'en-gb' : 'nb';

    const format = short ? 'D. MMMM' : 'L';

    return datetime
        ? dayjs(datetime).locale(currentLocale).format(format)
        : datetime;
};

export const formatDateTime = (
    datetime: string,
    locale: string = 'nb',
    short = false
) => {
    return datetime
        ? dayjs(datetime)
              .locale(locale)
              .format(short ? 'lll' : 'LLL')
        : datetime;
};

export const getCurrentDateAndTime = () =>
    new Date().toISOString().split(/[TZ.]/);

export const getCurrentISODate = (): string => {
    return getCurrentDateAndTime()[0];
};

export const getUtcTimeFromLocal = (datetime: string) => {
    return dayjs(datetime).utc().format();
};

export const getDayNumberFromName = (dayToFind: string): number | null => {
    return days.findIndex((day) => day === dayToFind) || null;
};

export const getDayNameFromNumber = (number: number) => {
    return days[number];
};

export const dateDiff = (date1: string, date2: string): number => {
    try {
        const diffInMs = new Date(date1).getTime() - new Date(date2).getTime();
        const diffInDays = Math.floor(diffInMs / 86400000);
        return diffInDays;
    } catch (error) {
        throw new Error(error);
    }
};

export const getStartOfWeek = () => {
    const currentDate = new Date(getCurrentISODate());
    var day = currentDate.getDay(),
        diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(currentDate.setDate(diff));
};
