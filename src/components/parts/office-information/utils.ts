import { Address } from '../../../types/content-props/office-information-props';

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
