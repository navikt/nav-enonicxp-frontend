import React from 'react';
import { adminOrigin, editorPathPrefix } from 'utils/urls';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { EditorLinkWrapper } from 'components/_editor-only/editor-link-wrapper/EditorLinkWrapper';
import { ReferenceItem } from 'components/_editor-only/references-info/types';
import { Heading } from '@navikt/ds-react';

import style from 'components/_editor-only/references-info/result/link/ReferencesLinks.module.scss';

type Props = {
    references: ReferenceItem[];
    headerText: string;
};

export const ReferencesLinks = ({ references, headerText }: Props) => {
    return (
        <>
            <Heading level={'3'} size={'small'} className={style.header}>
                {headerText}
            </Heading>
            {references.map((reference) => {
                const { id, name, path, editorPath } = reference;

                return (
                    <div className={style.link} key={id}>
                        {`${name}: `}
                        <EditorLinkWrapper>
                            <LenkeInline
                                href={
                                    editorPath ||
                                    `${adminOrigin}${editorPathPrefix}/${id}`
                                }
                                target={'_blank'}
                            >
                                {path}
                            </LenkeInline>
                        </EditorLinkWrapper>
                    </div>
                );
            })}
        </>
    );
};
