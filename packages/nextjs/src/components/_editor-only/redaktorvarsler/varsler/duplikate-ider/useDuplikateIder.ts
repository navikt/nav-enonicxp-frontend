import { useEffect, useState } from 'react';
import { removeDuplicates } from 'utils/arrays';

const erElementISvg = (element: HTMLElement): boolean => {
    return Boolean(element.closest('svg'));
};

const harDuplikateIder = (element1: HTMLElement, index1: number, array: HTMLElement[]): boolean => {
    return array.some((element2, index2) => element1.id === element2.id && index1 !== index2);
};

const finnElementerMedDuplikateIder = () => {
    const elementsWithIds = [...document.querySelectorAll<HTMLElement>('#maincontent [id]')];

    return elementsWithIds.filter((element, index) => {
        if (erElementISvg(element)) return false;
        return harDuplikateIder(element, index, elementsWithIds);
    });
};

export const useDuplikateIder = () => {
    const [elementerMedDuplikateIder, setElementerMedDuplikateIder] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setElementerMedDuplikateIder(finnElementerMedDuplikateIder());
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const unikeDuplikatIder = removeDuplicates(
        elementerMedDuplikateIder,
        (a, b) => a.id === b.id
    ).map((element) => element.id);

    return { unikeDuplikatIder, elementerMedDuplikateIder };
};
