import { OfficeAddress } from 'types/content-props/office-details-props';
import { LegacyOfficeAddress } from 'types/content-props/office-information-props';

export const officeDetailsFormatAddress = (
    address?: OfficeAddress | LegacyOfficeAddress,
    withZip?: boolean
) => {
    if (!address) {
        return '';
    }

    let formattedAddress: string;
    if ('postboksnummer' in address && address.postboksnummer) {
        const postboksanlegg = address.postboksanlegg ? ` ${address.postboksanlegg}` : '';
        formattedAddress = `Postboks ${address.postboksnummer}${postboksanlegg}`;
    } else {
        const gatenavn = 'gatenavn' in address ? address.gatenavn : undefined;
        const husnummer = 'husnummer' in address ? address.husnummer : undefined;
        const husbokstav = 'husbokstav' in address ? address.husbokstav : undefined;
        const husnummerOgBokstav = [husnummer, husbokstav].filter(Boolean).join('');

        formattedAddress = [gatenavn, husnummerOgBokstav].filter(Boolean).join(' ');
    }

    if (withZip) {
        const postalInformation = [address.postnummer, address.poststed?.toUpperCase()]
            .filter(Boolean)
            .join(' ');

        return [formattedAddress, postalInformation].filter(Boolean).join(', ');
    }

    return formattedAddress;
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
