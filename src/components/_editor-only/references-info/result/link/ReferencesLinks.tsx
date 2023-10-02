import React from 'react';
import { adminOrigin, editorPathPrefix } from 'utils/urls';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { EditorLinkWrapper } from 'components/_editor-only/editor-link-wrapper/EditorLinkWrapper';
import { ReferenceItem } from 'components/_editor-only/references-info/types';
import { Heading } from '@navikt/ds-react';
import { translator } from 'translations';

import style from 'components/_editor-only/references-info/result/link/ReferencesLinks.module.scss';

type Props = {
    references: ReferenceItem[];
    headerText: string;
    contentLayer: string;
};

export const ReferencesLinks = ({
    references,
    headerText,
    contentLayer,
}: Props) => {
    const languageNames = translator('localeNames', 'no');

    return (
        <>
            <Heading level={'3'} size={'small'} className={style.header}>
                {headerText}
            </Heading>
            {references.map((reference) => {
                const { id, name, path, editorPath, layer } = reference;

                const href =
                    editorPath || `${adminOrigin}${editorPathPrefix}/${id}`;

                return (
                    <div className={style.link} key={id}>
                        {layer !== contentLayer ? (
                            <strong>{`[Layer: ${languageNames(
                                layer
                            )}] `}</strong>
                        ) : (
                            ''
                        )}
                        {`${name}: `}
                        <EditorLinkWrapper>
                            <LenkeInline href={href} target={'_blank'}>
                                {path}
                            </LenkeInline>
                        </EditorLinkWrapper>
                    </div>
                );
            })}
        </>
    );
};
