import { OfficeAddress } from 'types/content-props/office-details-props';
import { LegacyOfficeAddress } from 'types/content-props/office-information-props';

export const officeDetailsFormatAddress = (
    address?: OfficeAddress | LegacyOfficeAddress,
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
        const gatenavn = 'gatenavn' in address ? address.gatenavn : '';
        const husnummer =
            'husnummer' in address && address.husnummer ? ` ${address.husnummer}` : '';
        const husbokstav =
            'husbokstav' in address && address.husbokstav ? `${address.husbokstav}` : '';
        formatedAddress = `${gatenavn}${husnummer}${husbokstav}`;
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
