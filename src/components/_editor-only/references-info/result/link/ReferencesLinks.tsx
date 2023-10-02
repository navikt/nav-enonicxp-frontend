import React from 'react';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { EditorLinkWrapper } from 'components/_editor-only/editor-link-wrapper/EditorLinkWrapper';
import { ReferenceItem } from 'components/_editor-only/references-info/types';
import { Heading } from '@navikt/ds-react';
import { translator } from 'translations';

import style from './ReferencesLinks.module.scss';
import { adminOrigin } from 'utils/urls';

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

                const layersIndicatorText =
                    layer !== contentLayer
                        ? `[Layer: ${languageNames(layer)}] `
                        : null;

                return (
                    <div className={style.link} key={id}>
                        {layersIndicatorText && (
                            <strong>{layersIndicatorText}</strong>
                        )}
                        {`${name}: `}
                        <EditorLinkWrapper>
                            <LenkeInline
                                href={`${adminOrigin}${editorPath}`}
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
