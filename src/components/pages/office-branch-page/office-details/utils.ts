import {
    Address,
    AudienceReception,
    OpeningHours as OpeningHoursProps,
} from 'types/content-props/office-details-props';
import { LegacyOfficeAddress as LegacyAddress } from 'types/content-props/office-information-props';

export const officeDetailsFormatAddress = (
    address?: Address | LegacyAddress,
    withZip?: boolean
) => {
    if (!address) {
        return '';
    }
    let formatedAddress: string;
    if (address.type === 'postboksadresse') {
        const postboksanlegg = address.postboksanlegg ? ` ${address.postboksanlegg}` : '';
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

export const officeDetailsFormatPhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) {
        return '';
    }

    return phoneNumber
        .replace(/ /g, '')
        .split('')
        .reduce((acc, digit, index) => acc + digit + (index % 2 === 1 ? ' ' : ''), '')
        .trim();
};

const dagArr: OpeningHoursProps['dag'][] = [
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
] as const;

type OpeningHoursBuckets = {
    regular: OpeningHoursProps[];
    exceptions: OpeningHoursProps[];
};

type FormattedAudienceReception = {
    address: string;
    openingHours: OpeningHoursProps[];
    openingHoursExceptions: OpeningHoursProps[];
    adkomstbeskrivelse?: string;
    place?: string;
};

export const officeDetailsFormatAudienceReception = (
    audienceReception: AudienceReception
): FormattedAudienceReception => {
    const aapningstider = audienceReception.aapningstider?.reduce<OpeningHoursBuckets>(
        (acc, elem) => {
            if (elem.dato) {
                acc.exceptions.push(elem);
            } else {
                acc.regular.push(elem);
            }
            return acc;
        },
        {
            regular: [],
            exceptions: [],
        }
    );

    const openingHours = aapningstider?.regular || [];
    openingHours?.sort((a, b) => dagArr.indexOf(a.dag) - dagArr.indexOf(b.dag));

    return {
        address: officeDetailsFormatAddress(audienceReception.besoeksadresse, true),
        place: audienceReception.stedsbeskrivelse || audienceReception.besoeksadresse?.poststed,
        openingHoursExceptions: aapningstider?.exceptions || [],
        openingHours,
        adkomstbeskrivelse: audienceReception.adkomstbeskrivelse,
    };
};

type OpeningHoursWithDato = Omit<OpeningHoursProps, 'dato'> &
    Required<Pick<OpeningHoursProps, 'dato'>>;

export const officeDetailsGetFutureOpeningExceptions = (
    openingHoursExceptions: OpeningHoursProps[]
) => {
    const todaysDate = new Date().toISOString().slice(0, 10);

    return openingHoursExceptions
        .filter(
            (openingHours): openingHours is OpeningHoursWithDato =>
                !!(openingHours.dato && openingHours.dato >= todaysDate)
        )
        .sort((a, b) => {
            const dateA = new Date(a.dato).getTime();
            const dateB = new Date(b.dato).getTime();
            return dateA - dateB;
        });
};
