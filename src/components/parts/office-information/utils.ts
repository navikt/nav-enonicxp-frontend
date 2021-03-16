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
            .reduce((t, e, i) => t + e + (i % modular === 1 ? ' ' : ''), '');
    }
    return null;
};

/** Takes special cases or comments into account when building opening hour for a specific day as a single string. */
export const buildOpeningHourAsString = (
    openingHour: OpeningHoursProps
): string => {
    const { dag } = openingHour;
    if (openingHour.stengt === 'true') {
        return `${dag}: Stengt`;
    }

    if (openingHour.kommentar) {
        return `${dag}: ${openingHour.kommentar}`;
    }

    return `${dag}: ${openingHour.fra}-${openingHour.til}`;
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
