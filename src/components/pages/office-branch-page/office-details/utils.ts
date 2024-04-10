import { Address } from '@navikt/nav-office-reception-info';
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
