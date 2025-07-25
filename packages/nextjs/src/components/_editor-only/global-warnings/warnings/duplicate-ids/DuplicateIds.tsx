import React, { useEffect, useState } from 'react';
import { removeDuplicates } from 'utils/arrays';
import { DuplicateIdsWarning } from './DuplicateIdsWarning';

const isElementInSvg = (element: HTMLElement): boolean => {
    return Boolean(element.closest('svg'));
};

const hasDuplicateId = (element1: HTMLElement, index1: number, array: HTMLElement[]): boolean => {
    return array.some((element2, index2) => element1.id === element2.id && index1 !== index2);
};

const findElementsWithDuplicateIds = (): HTMLElement[] => {
    const elementsWithIds = [...document.querySelectorAll<HTMLElement>('#maincontent [id]')];

    return elementsWithIds.filter((element, index) => {
        // Don't include svg elements in this warning, as this is
        // something our editors generelly don't deal with
        if (isElementInSvg(element)) {
            return false;
        }

        return hasDuplicateId(element, index, elementsWithIds);
    });
};

export const DuplicateIds = () => {
    const [elementsWithDupeIds, setElementsWithDupeIds] = useState<HTMLElement[]>([]);
    const uniqueDupeIds = removeDuplicates(elementsWithDupeIds, (a, b) => a.id === b.id).map(
        (element) => element.id
    );

    useEffect(() => {
        // Delay the check slightly to avoid certain false positives.
        // Typically mobile/desktop exclusive elements which may have duplicate
        // ids in the server html, which are pruned with client-side javascript
        setTimeout(() => {
            const elementsWithDuplicateIds = findElementsWithDuplicateIds();
            setElementsWithDupeIds(elementsWithDuplicateIds);
        }, 1000);
    }, []);

    return uniqueDupeIds.length > 0 ? (
        <DuplicateIdsWarning
            uniqueDupeIds={uniqueDupeIds}
            elementsWithDupeIds={elementsWithDupeIds}
        />
    ) : null;
};
