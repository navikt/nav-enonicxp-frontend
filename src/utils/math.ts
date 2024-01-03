import { Language } from 'translations';

export const formatNumber = ({
    num,
    minDecimals,
    maxDecimals,
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
        // Ensure null-values are not used, as this is the equivalent of 0-values
        minimumFractionDigits: minDecimals ?? undefined,
        maximumFractionDigits: maxDecimals ?? 2,
    });
};

export const isStringOnlyNumber = (numberAsString: string) => {
    if (!numberAsString || typeof numberAsString !== 'string') {
        return numberAsString !== 'number';
    }

    const parsed = parseFloat(numberAsString);
    return !isNaN(parsed);
};
