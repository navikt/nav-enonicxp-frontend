import { Address, LegacyOfficeAddress } from './types';
import dayjs from 'dayjs';

export const formatAddress = (
    address?: Address | LegacyOfficeAddress,
    withZip?: boolean
) => {
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

interface FormatDateProps {
    datetime: string;
    language?: string;
    short?: boolean;
    year?: boolean;
}

export const formatDate = ({
    datetime,
    language = 'nb',
    short = false,
    year = false,
}: FormatDateProps) => {
    const currentLocale = language === 'en' ? 'en-gb' : 'nb';

    let format: string;

    if (short && year) {
        format = 'D. MMMM YYYY';
    } else if (short) {
        format = 'D. MMMM';
    } else {
        format = 'L';
    }

    return datetime
        ? dayjs(datetime).locale(currentLocale).format(format)
        : datetime;
};
