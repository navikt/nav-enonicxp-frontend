import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const DuplicateIdWarnings = () => {
    const [elements, setElements] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const elementsWithDuplicateIds = [
            ...document.querySelectorAll<HTMLElement>('#maincontent [id]'),
        ].filter((element1, index1, array) =>
            array.some(
                (element2, index2) =>
                    element1.id === element2.id && index1 !== index2
            )
        );

        setElements(elementsWithDuplicateIds);
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
