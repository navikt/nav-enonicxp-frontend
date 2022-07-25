import { Language } from 'translations';

export const formatNumber = (
    num: number,
    maxPlaces: number = 0,
    language: Language = 'no'
) => {
    const decimalsOOM = 10 ** maxPlaces;
    const rounded = Math.floor(num * decimalsOOM + 0.5) / decimalsOOM;
    // Not all browsers process the "nn" locale correctly. Formatting is identical
    // to "no", so we just use that
    return rounded.toLocaleString(language === 'nn' ? 'no' : language);
};

export const isStringOnlyNumber = (numberAsString: string) => {
    if (!numberAsString || typeof numberAsString !== 'string') {
        return numberAsString !== 'number';
    }

    const parsed = parseFloat(numberAsString);
    return !isNaN(parsed);
};
