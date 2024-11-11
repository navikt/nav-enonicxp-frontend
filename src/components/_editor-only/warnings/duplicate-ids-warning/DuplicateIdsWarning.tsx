import React, { useId } from 'react';
import { createPortal } from 'react-dom';
import { BodyLong } from '@navikt/ds-react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { EditorLinkWrapper } from 'components/_editor-only/editor-link-wrapper/EditorLinkWrapper';

import style from './DuplicateIdsWarning.module.scss';

interface Props {
    uniqueDupeIds: string[];
    elementsWithDupeIds: HTMLElement[];
}

export const DuplicateIdsWarning = ({ uniqueDupeIds, elementsWithDupeIds }: Props) => {
    const linkIdPrefix = useId();

    const getLinkId = (index: number) => `${linkIdPrefix}-${index}`;

    return (
        <>
            <li>
                <BodyLong>
                    {`Hver id må være unik på siden, bl.a. for at anker-lenker skal fungere
                        konsistent. Følgende duplikate id'er må fjernes eller erstattes med unike id'er.`}
                </BodyLong>
                <ul>
                    {uniqueDupeIds.map((id) => (
                        <li key={id}>
                            <code>{`#${id}`}</code>
                            {elementsWithDupeIds.reduce<React.ReactNode[]>(
                                (acc, element, index) => {
                                    if (element.id === id) {
                                        acc.push(
                                            <EditorLinkWrapper>
                                                <LenkeInline
                                                    href={`#${getLinkId(index)}`}
                                                    className={style.lenkeInline}
                                                >
                                                    {`[${acc.length + 1}. duplikat]`}
                                                </LenkeInline>
                                            </EditorLinkWrapper>
                                        );
                                    }

                                    return acc;
                                },
                                []
                            )}
                        </li>
                    ))}
                </ul>
            </li>
            {elementsWithDupeIds.map((element, index) => {
                const linkId = getLinkId(index);
                element.style.overflow = 'visible';

                return createPortal(
                    <span className={style.warning} id={linkId}>
                        <EditorHelp
                            text={`Elementet nedenfor har en duplikat id: "${element.id}"`}
                            type={'error'}
                        />
                    </span>,
                    element,
                    linkId
                );
            })}
        </>
    );
};
