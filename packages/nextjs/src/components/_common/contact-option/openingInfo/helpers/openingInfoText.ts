import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
    OpeningHours,
    OpeningHoursOpen,
} from 'components/_common/contact-option/openingInfo/helpers/openingInfoTypes';
import { Language, translator } from 'translations';
import { norwayTz } from 'utils/datetime';
import {
    getOpeningHoursForDateTime,
    openingHourDateFormat,
    openingHourTimeFormat,
} from 'components/_common/contact-option/openingInfo/helpers/openingInfoUtils';

dayjs.extend(utc);
dayjs.extend(timezone);

const MAX_FUTURE_DAYS_TO_CHECK = 7;

const getNextOpenOpeningHour = (openingHours: OpeningHours[]): OpeningHoursOpen | null => {
    const tomorrow = dayjs().add(1, 'day');

    for (let i = 0; i < MAX_FUTURE_DAYS_TO_CHECK; i++) {
        const found = getOpeningHoursForDateTime(openingHours, tomorrow.add(i, 'day'));

        if (found?.status !== 'CLOSED') {
            return found;
        }
    }

    return null;
};

const formatTime = (time: string, isEnglish: boolean = false) => {
    const hours = isEnglish ? 'ha' : 'H';
    const hoursAndMinutes = isEnglish ? 'h:mma' : 'H:mm';
    const format = time.endsWith('00') ? hours : hoursAndMinutes;
    return dayjs(time, openingHourTimeFormat).format(format);
};

const getDayOfWeek = (dayJs: Dayjs, language: Language) => {
    const weekDayNames = translator('dateTime', language)('weekDayNames');
    // Dayjs uses sunday as first day of the week
    const dayIndex = (dayJs.day() + 6) % 7;
    const dayOfWeek = Object.values(weekDayNames)[dayIndex];
    return language === 'en' ? dayOfWeek : dayOfWeek.toLowerCase();
};

const buildFutureOpenString = ({ date, from }: OpeningHoursOpen, language: Language) => {
    const relatives = translator('dateTime', language)('relatives');
    const sharedTranslations = translator('contactPoint', language)('shared');

    const opensTemplate = sharedTranslations['opensAt'].toLowerCase();
    const tomorrowTemplate = relatives['tomorrow'].toLowerCase();

    const openTime = formatTime(from, language === 'en');

    const opens = dayjs(date, openingHourDateFormat).tz(norwayTz, true);
    const openingDay = opens.startOf('day');

    const startOfCurrentDay = dayjs().startOf('day').tz(norwayTz);
    const daysUntilOpeningDay = openingDay.diff(startOfCurrentDay, 'day');

    if (daysUntilOpeningDay > 1) {
        return `${sharedTranslations['closedNow']}, ${opensTemplate
            .replace('{$date}', getDayOfWeek(opens, language))
            .replace('{$time}', openTime)}`;
    }

    const openingTemplate = daysUntilOpeningDay === 0 ? '' : tomorrowTemplate;

    const openNext = opensTemplate
        .replace('{$date}', openingTemplate)
        .replace('{$time}', openTime)
        .replace(/ +(?= )/g, ''); // remove double spaces

    return `${sharedTranslations['closedNow']}, ${openNext}`;
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
