import dayjs, { locale } from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
export const formatDate = (datetime: string, language: string = 'nb') => {
    const currentLocale = language === 'en' ? 'en-gb' : 'nb'
    return datetime ? dayjs(datetime).locale(currentLocale).format('L') : datetime;
};

export const formatDateTime = (datetime: string, locale: string = 'nb') => {
    return datetime ? dayjs(datetime).locale(locale).format('LLL') : datetime;
};

