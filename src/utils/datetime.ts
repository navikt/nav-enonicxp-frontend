import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ContentProps } from 'types/content-props/_content-common';

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const norwayTz = 'Europe/Oslo';

// JS starts week on a Sunday
export const daysNameArray = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];
export const dayNameToIndex = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

interface FormatDateProps {
    datetime: string;
    language?: string;
    short?: boolean;
    year?: boolean;
}

export const formatDate = ({
    datetime,
    language = 'nb',
    short = false,
    year = false,
}: FormatDateProps) => {
    const currentLocale = language === 'en' ? 'en-gb' : 'nb';

    let format: string;

    if (short && year) {
        format = 'D. MMMM YYYY';
    } else if (short) {
        format = 'D. MMMM';
    } else {
        format = 'L';
    }

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

export const getPublishedDateTime = (
    content: Pick<ContentProps, 'publish' | 'createdTime'>
) => content.publish?.from || content.publish?.first || content.createdTime;

export const isDateTimeInRange = (start?: string, end?: string) => {
    const now = dayjs();

    return (!start || now.isAfter(start)) && (!end || now.isBefore(end));
};
