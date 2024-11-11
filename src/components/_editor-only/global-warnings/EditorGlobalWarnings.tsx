import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Alert } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { DuplicateIdsWarning } from 'components/_editor-only/warnings/duplicate-ids-warning/DuplicateIdsWarning';
import { KortIdWarning } from 'components/_editor-only/warnings/kort-id-warning/KortIdWarning';
import { removeDuplicates } from 'utils/arrays';

const EDITOR_GLOBAL_WARNINGS_CONTAINER_ID = 'global-warnings';

export const RenderToEditorGlobalWarnings = ({ children }: { children: React.ReactNode }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    if (isFirstRender) {
        return null;
    }

    const element = document.getElementById(EDITOR_GLOBAL_WARNINGS_CONTAINER_ID);
    if (!element) {
        return null;
    }

    return createPortal(children, element);
};

export const EditorGlobalWarnings = ({ content }: { content: ContentProps }) => {
    const malgruppeErArbeidsgiver = content.data?.audience?._selected === 'employer';
    const path = content.data?.customPath;
    const pathIncludesArbeidsgiver = path?.includes('/arbeidsgiver');
    const feilKortUrl = malgruppeErArbeidsgiver && !pathIncludesArbeidsgiver;

    const [elementsWithDupeIds, setElementsWithDupeIds] = useState<HTMLElement[]>([]);
    const uniqueDupeIds = removeDuplicates(elementsWithDupeIds, (a, b) => a.id === b.id).map(
        (element) => element.id
    );

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
                        (element2, index2) => element1.id === element2.id && index1 !== index2
                    )
            );

            setElementsWithDupeIds(elementsWithDuplicateIds);
        }, 1000);
    }, []);

    const harFeil = uniqueDupeIds.length > 0 || feilKortUrl;

    return (
        <>
            {harFeil && (
                <Alert variant="warning">
                    Det er problemer med denne siden som må rettes:
                    <ul>
                        {feilKortUrl && <KortIdWarning />}
                        {uniqueDupeIds.length > 0 && (
                            <DuplicateIdsWarning
                                uniqueDupeIds={uniqueDupeIds}
                                elementsWithDupeIds={elementsWithDupeIds}
                            />
                        )}
                    </ul>
                </Alert>
            )}
        </>
    );
};
