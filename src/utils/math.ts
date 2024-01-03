import { Language } from 'translations';

export const formatNumber = ({
    num,
    minDecimals = 0,
    maxDecimals = 0,
    language = 'no',
}: {
    num: number;
    minDecimals?: number;
    maxDecimals?: number;
    language?: Language;
}) => {
    // Not all browsers process the "nn" locale correctly. Formatting is identical
    // to "no", so we just use that
    return num.toLocaleString(language === 'nn' ? 'no' : language, {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: maxDecimals,
    });
};

export const isStringOnlyNumber = (numberAsString: string) => {
    if (!numberAsString || typeof numberAsString !== 'string') {
        return numberAsString !== 'number';
    }

    const parsed = parseFloat(numberAsString);
    return !isNaN(parsed);
};
