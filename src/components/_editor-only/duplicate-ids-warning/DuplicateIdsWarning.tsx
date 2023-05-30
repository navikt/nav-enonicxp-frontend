import React, { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { removeDuplicates } from 'utils/arrays';
import { BodyLong } from '@navikt/ds-react';
import { Header } from '../../_common/headers/Header';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';

import style from './DuplicateIdsWarning.module.scss';

export const DuplicateIdsWarning = () => {
    const [elementsWithDupeIds, setElementsWithDupeIds] = useState<
        HTMLElement[]
    >([]);

    const idPrefix = useId();

    const uniqueDupeIds = removeDuplicates(
        elementsWithDupeIds,
        (a, b) => a.id === b.id
    ).map((element) => element.id);

    const getLinkId = (index: number) => `${idPrefix}-${index}`;

    useEffect(() => {
        // Delay the check slightly to avoid certain false positives.
        // Typically mobile/desktop exclusive elements which may have duplicate
        // ids in the server html, which are pruned with client-side javascript
        setTimeout(() => {
            const elementsWithDuplicateIds = [
                ...document.querySelectorAll<HTMLElement>('#maincontent [id]'),
            ].filter(
                (element1, index1, array) =>
                    // Don't include svg elements in this warning, as this is
                    // something our editors generelly don't deal with
                    !element1.closest('svg') &&
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
                <div className={style.bigWarning}>
                    <Header level={'2'}>{`Obs! Denne siden har ${
                        uniqueDupeIds.length
                    } id${
                        uniqueDupeIds.length > 1 ? "'er" : ''
                    } med duplikate forekomster:`}</Header>
                    <ul>
                        {uniqueDupeIds.map((id) => (
                            <li key={id}>
                                <code>{id}</code>
                                {elementsWithDupeIds.reduce<React.ReactNode[]>(
                                    (acc, element, index) => {
                                        if (element.id === id) {
                                            acc.push(
                                                <LenkeInline
                                                    href={`#${getLinkId(
                                                        index
                                                    )}`}
                                                >
                                                    {`[${acc.length + 1}]`}
                                                </LenkeInline>
                                            );
                                        }

                                        return acc;
                                    },
                                    []
                                )}
                            </li>
                        ))}
                    </ul>
                    <BodyLong>
                        {
                            "Hver id må være unik på siden, bl.a. for at anker-lenker skal fungere konsistent. Duplikate id'er må fjernes eller erstattes med unike id'er"
                        }
                    </BodyLong>
                </div>
            )}
            {elementsWithDupeIds.map((element, index) => {
                const linkId = getLinkId(index);

                return createPortal(
                    <>
                        <span id={linkId} />
                        <EditorHelp
                            text={`Elementet ovenfor har en duplikat id: "${element.id}"`}
                            type={'error'}
                        />
                    </>,
                    element,
                    linkId
                );
            })}
        </>
    );
};
