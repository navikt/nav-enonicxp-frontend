import { Language } from 'translations';

export const formatNumber = (
    num: number,
    maxPlaces: number = 0,
    language: Language = 'no'
) => {
    const decimalsOOM = 10 ** maxPlaces;
    const rounded = Math.floor(num * decimalsOOM + 0.5) / decimalsOOM;
    return rounded.toLocaleString(language);
};

export const isStringOnlyNumber = (numberAsString: string) => {
    if (!numberAsString || typeof numberAsString !== 'string') {
        return numberAsString !== 'number';
    }

    const parsed = parseFloat(numberAsString);
    return !isNaN(parsed);
};
