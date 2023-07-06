import { LegacyOfficeOpeningHoursProps } from 'types/content-props/office-information-props';

const dayOfWeek = {
    Mandag: 'Monday',
    Tirsdag: 'Tuesday',
    Onsdag: 'Wednesday',
    Torsdag: 'Thursday',
    Fredag: 'Friday',
};

/** Takes each opening our and builds into proper object as recommended by Google. */
export const buildOpeningHoursSpecification = (
    openingHour: LegacyOfficeOpeningHoursProps
): {
    '@type': string;
    dayOfWeek?: string;
    opens?: string;
    closes?: string;
    description?: string;
} => {
    return {
        '@type': 'OpeningHoursSpecification',
        ...(openingHour.dag && {
            dayOfWeek: dayOfWeek[openingHour.dag],
        }),
        // Google says to set both opens and closed to '00:00' in order
        // to signify that the office is closed the entire day.
        ...(openingHour.stengt === 'true'
            ? {
                  opens: '00:00',
                  closes: '00:00',
              }
            : openingHour.fra &&
              openingHour.til && {
                  opens: openingHour.fra,
                  closes: openingHour.til,
              }),
        ...(openingHour.kommentar && { description: openingHour.kommentar }),
    };
};
