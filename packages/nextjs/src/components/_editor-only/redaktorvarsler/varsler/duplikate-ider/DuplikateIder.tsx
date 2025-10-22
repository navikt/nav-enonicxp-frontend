import React, { useEffect, useState } from 'react';
import { removeDuplicates } from 'utils/arrays';
import { DuplikateIderVarsel } from './DuplikateIderVarsel';

const erElementISvg = (element: HTMLElement): boolean => {
    return Boolean(element.closest('svg'));
};

const erElementIFragment = (element: HTMLElement): boolean => {
    let currentElement: HTMLElement | null = element;
    while (currentElement) {
        if (currentElement.getAttribute('data-portal-component-type') === 'fragment') {
            return true;
        }
        currentElement = currentElement.parentElement;
    }
    return false;
};

const harDuplikateIder = (element1: HTMLElement, index1: number, array: HTMLElement[]): boolean => {
    return array.some((element2, index2) => element1.id === element2.id && index1 !== index2);
};

const finnElementerMedDuplikateIder = () => {
    const elementsWithIds = [...document.querySelectorAll<HTMLElement>('#maincontent [id]')];

    return elementsWithIds.filter((element, index) => {
        // Ikke inkluder svg-elementer i denne advarselen, da dette er noe redaktørene vanligvis ikke håndterer.
        // Fragmenter er også eksludert fordi det kan forekomme to fragmenter på samme side.
        if (erElementISvg(element) || erElementIFragment(element)) {
            return false;
        }

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

    // Delay the check slightly to avoid certain false positives.
    // Typically mobile/desktop exclusive elements which may have duplicate
    // ids in the server html, which are pruned with client-side javascript
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
