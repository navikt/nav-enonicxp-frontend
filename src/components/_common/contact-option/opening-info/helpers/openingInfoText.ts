import dayjs from 'dayjs';
import {
    OpeningHour,
    OpeningHourOpen,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { Language, translator } from 'translations';
import { formatDate } from 'utils/datetime';
import {
    getCurrentOpeningHour,
    getOpeningHourForDateTime,
    getOpeningState,
    openingHourTimeFormat,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';

const maxCheck = 7;

const getNextOpenOpeningHour = (
    openingHours: OpeningHour[]
): OpeningHourOpen => {
    const tomorrow = dayjs().add(1, 'day');

    for (let i = 0; i < maxCheck; i++) {
        const found = getOpeningHourForDateTime(
            openingHours,
            tomorrow.add(i, 'day')
        );
        console.log(`Found: ${JSON.stringify(found)}`);

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

const buildOpeningLaterTodayString = (
    { from }: OpeningHourOpen,
    language: Language
) => {
    const relatives = translator('dateTime', language)('relatives');
    const sharedTranslations = translator('contactPoint', language)('shared');

    const closedNowTemplate = sharedTranslations['closedNow'];
    const opensTemplate = sharedTranslations['opensAt'];
    const todayTemplate = relatives['today'];

    return `${closedNowTemplate} • ${opensTemplate
        .replace('{$1}', todayTemplate)
        .replace('{$2}', shortenTime(from))
        .toLowerCase()}`;
};

const buildFutureOpenString = (
    openingHour: OpeningHourOpen,
    language: Language
) => {
    const { date, from } = openingHour;

    const daysToNextOpeningHour = dayjs().diff(date, 'day');

    const relatives = translator('dateTime', language)('relatives');
    const sharedTranslations = translator('contactPoint', language)('shared');

    const opensTemplate = sharedTranslations['opensAt'];
    const todayTemplate = relatives['today'];
    const tomorrowTemplate = relatives['tomorrow'];

    if (daysToNextOpeningHour > 1) {
        return `${opensTemplate
            .replace('{$1}', formatDate({ datetime: date, language }))
            .replace('{$2}', date)}`;
    }

    const openingTemplate =
        daysToNextOpeningHour === 0 ? todayTemplate : tomorrowTemplate;

    const openNext = opensTemplate
        .replace('{$1}', openingTemplate)
        .replace('{$2}', shortenTime(from))
        .toLowerCase();

    return `${sharedTranslations['closedNow']} • ${openNext}`;
};

export const getOpenInformationText = (
    openingHours: OpeningHour[],
    language: Language
) => {
    const translations = translator('contactPoint', language)('shared');

    const todaysOpeningHour = getCurrentOpeningHour(openingHours);

    const openingState = getOpeningState(todaysOpeningHour);

    switch (openingState) {
        case 'openNow': {
            return translations['openNow'];
        }
        case 'openLater': {
            return buildOpeningLaterTodayString(
                todaysOpeningHour as OpeningHourOpen,
                language
            );
        }
        case 'closed': {
            const nextOpeningHour = getNextOpenOpeningHour(openingHours);

            if (!nextOpeningHour) {
                return translations['closedNow'];
            }

            return buildFutureOpenString(nextOpeningHour, language);
        }
    }
};
