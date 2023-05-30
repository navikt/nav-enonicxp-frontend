import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { removeDuplicates } from '../../../utils/arrays';
import { BodyLong } from '@navikt/ds-react';
import { Header } from '../../_common/headers/Header';

export const DuplicateIdWarnings = () => {
    const [elementsWithDupeIds, setElementsWithDupeIds] = useState<
        HTMLElement[]
    >([]);

    const uniqueDupeIds = removeDuplicates(
        elementsWithDupeIds,
        (a, b) => a.id === b.id
    ).map((element) => element.id);

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

            setElementsWithDupeIds(elementsWithDuplicateIds);
        }, 1000);
    }, []);

    return (
        <>
            {uniqueDupeIds.length > 0 && (
                <div>
                    <Header
                        level={'2'}
                    >{`Obs! Denne siden har ${uniqueDupeIds.length} id'er med duplikate forekomster:`}</Header>
                    <ul>
                        {uniqueDupeIds.map((id) => (
                            <li key={id}>{id}</li>
                        ))}
                    </ul>
                    <BodyLong>
                        {
                            'Hver id må være unike på siden, bl.a. for at anker-lenker skal fungere konsistent.'
                        }
                    </BodyLong>
                </div>
            )}
            {elementsWithDupeIds.map((element, index) => {
                return createPortal(
                    <EditorHelp
                        text={`Elementet ovenfor har en duplikat id: "${element.id}"`}
                        type={'error'}
                    />,
                    element,
                    `${element.id}-${index}`
                );
            })}
        </>
    );
};
