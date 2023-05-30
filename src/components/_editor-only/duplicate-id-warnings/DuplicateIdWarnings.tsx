import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const DuplicateIdWarnings = () => {
    const [elements, setElements] = useState<HTMLElement[]>([]);

    useEffect(() => {
        // Delay the check slightly to avoid certain false positives.
        // Typically mobile/desktop exclusive elements which may have duplicate
        // ids in the server html, which are pruned with client-side javascript
        setTimeout(() => {
            const elementsWithDuplicateIds = [
                ...document.querySelectorAll<HTMLElement>('#maincontent [id]'),
            ].filter((element1, index1, array) =>
                array.some(
                    (element2, index2) =>
                        element1.id === element2.id && index1 !== index2
                )
            );

            setElements(elementsWithDuplicateIds);
        }, 1000);
    }, []);

    return (
        <>
            {elements.map((element) => {
                return createPortal(
                    <EditorHelp
                        text={`Obs! Elementet ovenfor har en duplikat id: "${element.id}" - id'er må være unike på siden for at anker-lenker skal fungere konsistent!`}
                        type={'error'}
                    />,
                    element
                );
            })}
        </>
    );
};
