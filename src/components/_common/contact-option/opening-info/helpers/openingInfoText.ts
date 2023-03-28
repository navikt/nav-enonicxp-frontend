import dayjs from 'dayjs';
import {
    OpeningInfoProps,
    OpeningInfoOpenProps,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoTypes';
import { Language, translator } from 'translations';
import { formatDate } from 'utils/datetime';
import {
    getOpeningInfoForDateTime,
    openingHourTimeFormat,
} from 'components/_common/contact-option/opening-info/helpers/openingInfoUtils';

const maxCheck = 7;

const getNextOpenOpeningHour = (
    openingHours: OpeningInfoProps[]
): OpeningInfoOpenProps => {
    const tomorrow = dayjs().add(1, 'day');

    for (let i = 0; i < maxCheck; i++) {
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

const buildOpeningLaterTodayString = (
    { from }: OpeningInfoOpenProps,
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
    openingHour: OpeningInfoOpenProps,
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

export const getOpenInformationText = ({
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
            return buildOpeningLaterTodayString(currentOpeningInfo, language);
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
