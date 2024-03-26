import { LegacyOfficeOpeningHoursProps } from 'types/content-props/office-information-props';
import { OpeningHours as OpeningHoursProps } from 'types/content-props/office-details-props';
import { formatDate } from 'utils/datetime';
import { Language, translator } from 'translations';
import { Translations } from 'translations/default';

type LegacyDayNames = NonNullable<LegacyOfficeOpeningHoursProps['dag']>;
type TranslationDayNameKeys = keyof Translations['dateTime']['weekDayNames'];

const dayNameKey: Record<LegacyDayNames, TranslationDayNameKeys> = {
    Mandag: 'mon',
    Tirsdag: 'tue',
    Onsdag: 'wed',
    Torsdag: 'thu',
    Fredag: 'fri',
} as const;

export const buildDayLabel = (
    opening: OpeningHoursProps,
    language: Language
): string => {
    const weekdayNames = translator('dateTime', language)('weekDayNames');

    const { dato, dag } = opening;

    // If includes dato, show this rather than day (for special opening hours)
    if (dato) {
        return formatDate({
            datetime: dato,
            language,
            short: true,
            year: true,
        });
    }

    return dag ? weekdayNames[dayNameKey[dag]] : ''; // Fallback to empty string to avoid showing "undefined"
};
