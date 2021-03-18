import {
    Address,
    AudienceReception,
    OpeningHoursProps,
} from '../../../types/content-props/office-information-props';

export const formatAddress = (address: Address, withZip: boolean) => {
    if (!address) {
        return '';
    }
    let formatedAddress: string;
    if (address.type === 'postboksadresse') {
        const postboksanlegg = address.postboksanlegg
            ? ` ${address.postboksanlegg}`
            : '';
        formatedAddress = `Postboks ${address.postboksnummer}${postboksanlegg}`;
    } else {
        const husnummer = address.husnummer ? ` ${address.husnummer}` : '';
        const husbokstav = address.husbokstav ? `${address.husbokstav}` : '';
        formatedAddress = `${address.gatenavn}${husnummer}${husbokstav}`;
    }
    if (withZip) {
        let poststed = address ? address.poststed || '' : '';
        poststed = poststed.toUpperCase();
        formatedAddress += `, ${address.postnummer} ${poststed}`;
    }
    return formatedAddress;
};

export const parsePhoneNumber = (phoneNumber: string, mod: number = null) => {
    const modular = mod || 2;
    if (phoneNumber) {
        return phoneNumber
            .replace(/ /g, '')
            .split('')
            .reduce((t, e, i) => t + e + (i % modular === 1 ? ' ' : ''), '')
            .trim();
    }
    return '';
};

/** Takes each opening our and builds into proper object as recommended by Google. */
export const buildOpeningHoursSpecification = (
    openingHour: OpeningHoursProps
): {
    '@type': string;
    dayOfWeek?: string;
    opens?: string;
    closes?: string;
    description?: string;
} => {
    const hasOpeningHours = !!(openingHour.fra && openingHour.til);

    const dayOfWeekLibrary = {
        Mandag: 'Monday',
        Tirsdag: 'Tuesday',
        Onsdag: 'Wednesday',
        Torsdag: 'Thursday',
        Fredag: 'Friday',
    };

    let part = {};

    if (hasOpeningHours) {
        part = {
            opens: openingHour.fra,
            closes: openingHour.til,
            description: openingHour.kommentar,
        };
    }

    if (openingHour.kommentar) {
        part = {
            description: openingHour.kommentar,
        };
    }

    // Google says to set both opens and closed to '00:00' in order
    // to signify that the office is closed the entire day.
    if (openingHour.stengt === 'true') {
        part = {
            opens: '00:00',
            closed: '00:00',
        };
    }

    return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayOfWeekLibrary[openingHour.dag],
        ...part,
    };
};

/** Reception (publikumsmottak) can come in as an array, object or even undefined.
 * Make sure to normalize all cases into an array.
 */
export const normalizeReceptionAsArray = (
    publikumsmottak: AudienceReception[] | AudienceReception
): AudienceReception[] => {
    if (!publikumsmottak) {
        return [];
    }
    return Array.isArray(publikumsmottak) ? publikumsmottak : [publikumsmottak];
};
