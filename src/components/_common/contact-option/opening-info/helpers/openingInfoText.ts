import dayjs from 'dayjs';
import {
    OpeningHours,
    OpeningHoursOpen,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { Language, translator } from 'translations';
import { formatDate, norwayTz } from 'utils/datetime';
import {
    getOpeningHoursForDateTime,
    openingHourDateFormat,
    openingHourTimeFormat,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const MAX_FUTURE_DAYS_TO_CHECK = 7;

const getNextOpenOpeningHour = (
    openingHours: OpeningHours[]
): OpeningHoursOpen => {
    const tomorrow = dayjs().add(1, 'day');

    for (let i = 0; i < MAX_FUTURE_DAYS_TO_CHECK; i++) {
        const found = getOpeningHoursForDateTime(
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
    { date, from }: OpeningHoursOpen,
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
    allOpeningHours,
    currentOpeningHours,
    language,
}: {
    allOpeningHours: OpeningHours[];
    currentOpeningHours: OpeningHours;
    language: Language;
}) => {
    const translations = translator('contactPoint', language)('shared');

    const { status } = currentOpeningHours;

    switch (status) {
        case 'OPEN': {
            return translations['openNow'];
        }
        case 'OPEN_LATER': {
            return buildFutureOpenString(currentOpeningHours, language);
        }
        case 'CLOSED': {
            const nextOpeningHour = getNextOpenOpeningHour(allOpeningHours);

            if (!nextOpeningHour) {
                return translations['closedNow'];
            }

            return buildFutureOpenString(nextOpeningHour, language);
        }
    }
};
