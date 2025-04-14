import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ContentProps } from 'types/content-props/_content-common';
import { translator } from 'translations';

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export type DayName = (typeof daysNameArray)[number];

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
] as const;

export const dayNameToIndex: Record<DayName, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
} as const;

type FormatDateProps = {
    datetime: string;
    language?: string;
    short?: boolean;
    year?: boolean;
};

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

    return datetime ? dayjs(datetime).locale(currentLocale).format(format) : datetime;
};

export const formatDateTime = (datetime: string, locale: string = 'nb', short = false) => {
    return datetime
        ? dayjs(datetime)
              .locale(locale)
              .format(short ? 'lll' : 'LLL')
        : datetime;
};

export const getCurrentDateAndTime = () => new Date().toISOString().split(/[TZ.]/);

export const getCurrentISODate = (): string => {
    return getCurrentDateAndTime()[0];
};

export const getUtcTimeFromLocal = (datetime: string) => {
    return dayjs(datetime).utc().format();
};

export const getPublishedDateTime = (content: Pick<ContentProps, 'publish' | 'createdTime'>) =>
    content.publish?.from ?? content.publish?.first ?? content.createdTime;

export const isCurrentTimeInRange = (start?: string, end?: string) => {
    const now = dayjs();

    return (!start || now.isAfter(start)) && (!end || now.isBefore(end));
};

const buildDateString = ({
    label,
    date,
    language,
    short = true,
    year = true,
}: {
    label: string;
    date: string;
    language: string;
    short?: boolean;
    year?: boolean;
}) => {
    if (!date) {
        return '';
    }
    return `${label} ${formatDate({
        datetime: date,
        language,
        short,
        year,
    })}`;
};

export type GetPublishedAndModifiedStringProps = {
    content: Pick<ContentProps, 'publish' | 'modifiedTime' | 'createdTime' | 'language'>;
    config?: { short: boolean; year: boolean };
};

export const getPublishedAndModifiedString = (props: GetPublishedAndModifiedStringProps) => {
    const { modifiedTime, language } = props.content;
    const publishedTime = getPublishedDateTime(props.content);
    const getDatesLabel = translator('dates', language);

    const wasModifiedAfterPublish = new Date(modifiedTime) > new Date(publishedTime);

    const publishedString = buildDateString({
        label: getDatesLabel('published'),
        date: publishedTime,
        language,
        short: props.config?.short,
        year: props.config?.year,
    });

    const modifiedString = buildDateString({
        label: getDatesLabel('lastChanged'),
        date: modifiedTime,
        language,
        short: props.config?.short,
        year: props.config?.year,
    });

    return wasModifiedAfterPublish ? `${publishedString} | ${modifiedString}` : publishedString;
};
