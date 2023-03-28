import dayjs from 'dayjs';
import {
    OpeningInfoProps,
    OpeningInfoOpenProps,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { Language, translator } from 'translations';
import { formatDate, norwayTz } from 'utils/datetime';
import {
    getOpeningInfoForDateTime,
    openingHourDateFormat,
    openingHourTimeFormat,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const MAX_FUTURE_DAYS_TO_CHECK = 7;

const getNextOpenOpeningHour = (
    openingHours: OpeningInfoProps[]
): OpeningInfoOpenProps => {
    const tomorrow = dayjs().add(1, 'day');

    for (let i = 0; i < MAX_FUTURE_DAYS_TO_CHECK; i++) {
        const found = getOpeningInfoForDateTime(
            openingHours,
            tomorrow.add(i, 'day')
        );

        if (found?.status !== 'CLOSED') {
            return found;
        }
    }

    return null;
};

const shortenTime = (time: string) => {
    const format = time.endsWith('00') ? 'H' : 'H:mm';
    return dayjs(time, openingHourTimeFormat).format(format);
};

const buildFutureOpenString = (
    { date, from }: OpeningInfoOpenProps,
    language: Language
) => {
    const relatives = translator('dateTime', language)('relatives');
    const sharedTranslations = translator('contactPoint', language)('shared');

    const opensTemplate = sharedTranslations['opensAt'];
    const todayTemplate = relatives['today'];
    const tomorrowTemplate = relatives['tomorrow'];

    const openTime = shortenTime(from);

    const opens = dayjs(date, openingHourDateFormat).tz(norwayTz, true);
    const openingDay = opens.startOf('day');

    const startOfCurrentDay = dayjs().startOf('day').tz('America/Toronto');

    const daysToOpeningDay = openingDay.diff(startOfCurrentDay, 'day');

    if (daysToOpeningDay > 1) {
        return `${sharedTranslations['closedNow']} • ${opensTemplate
            .replace('{$date}', formatDate({ datetime: date, language }))
            .replace('{$time}', openTime)
            .toLowerCase()}`;
    }

    const openingTemplate =
        daysToOpeningDay === 0 ? todayTemplate : tomorrowTemplate;

    const openNext = opensTemplate
        .replace('{$date}', openingTemplate)
        .replace('{$time}', openTime)
        .toLowerCase();

    return `${sharedTranslations['closedNow']} • ${openNext}`;
};

export const getOpeningInfoText = ({
    allOpeningInfo,
    currentOpeningInfo,
    language,
}: {
    allOpeningInfo: OpeningInfoProps[];
    currentOpeningInfo: OpeningInfoProps;
    language: Language;
}) => {
    const translations = translator('contactPoint', language)('shared');

    const { status } = currentOpeningInfo;

    switch (status) {
        case 'OPEN': {
            return translations['openNow'];
        }
        case 'OPEN_LATER': {
            return buildFutureOpenString(currentOpeningInfo, language);
        }
        case 'CLOSED': {
            const nextOpeningHour = getNextOpenOpeningHour(allOpeningInfo);

            if (!nextOpeningHour) {
                return translations['closedNow'];
            }

            return buildFutureOpenString(nextOpeningHour, language);
        }
    }
};
