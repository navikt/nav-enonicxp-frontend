import React, { useEffect, useState } from 'react';
import { removeDuplicates } from 'utils/arrays';
import { DuplikateIderVarsel } from './DuplikateIderVarsel';

const erElementISvg = (element: HTMLElement): boolean => {
    return Boolean(element.closest('svg'));
};

const harDuplikateIder = (element1: HTMLElement, index1: number, array: HTMLElement[]): boolean => {
    return array.some((element2, index2) => element1.id === element2.id && index1 !== index2);
};

const finnElementerMedDuplikateIder = () => {
    const elementsWithIds = [...document.querySelectorAll<HTMLElement>('#maincontent [id]')];

    return elementsWithIds.filter((element, index) => {
        // Ikke inkluder svg-elementer i denne advarselen, da dette er noe redaktørene vanligvis ikke håndterer.
        if (erElementISvg(element)) return false;

        return harDuplikateIder(element, index, elementsWithIds);
    });
};

type Props = {
    className?: string;
};

export const DuplikateIder = ({ className }: Props) => {
    const [elementerMedDuplikateIder, setElementerMedDuplikateIder] = useState<HTMLElement[]>([]);

    const unikeDuplikatIder = removeDuplicates(
        elementerMedDuplikateIder,
        (a, b) => a.id === b.id
    ).map((element) => element.id);

    useEffect(() => {
        const timer = setTimeout(() => {
            setElementerMedDuplikateIder(finnElementerMedDuplikateIder());
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (unikeDuplikatIder.length === 0) return null;

    return (
        <DuplikateIderVarsel
            unikeDuplikatIder={unikeDuplikatIder}
            elementerMedDuplikateIder={elementerMedDuplikateIder}
            className={className}
        />
    );
};
