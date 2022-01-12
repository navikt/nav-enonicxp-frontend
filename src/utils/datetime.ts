import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(localizedFormat);
dayjs.extend(utc);

export const formatDate = (
    datetime: string,
    language: string = 'nb',
    month: boolean = false) => {
    const currentLocale = language === 'en' ? 'en-gb' : 'nb';
    return datetime
        ? dayjs(datetime).locale(currentLocale).format( month ? 'LL': 'L')
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

export const getUtcTimeFromLocal = (datetime: string) => {
    return dayjs(datetime).utc().format();
};
