import React from 'react';
import { Heading } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { EditorLinkWrapper } from 'components/_editor-only/editorLinkWrapper/EditorLinkWrapper';
import { ReferenceItem } from 'components/_editor-only/references-info/types';
import { translator } from 'translations';
import { adminOrigin } from 'utils/urls';
import { usePageContentProps } from 'store/pageContext';

import style from './ReferencesLinks.module.scss';

type Props = {
    references: ReferenceItem[];
    headerText: string;
    contentLayer?: string;
};

export const ReferencesLinks = ({ references, headerText, contentLayer }: Props) => {
    const { editorView } = usePageContentProps();

    const languageNames = translator('localeNames', 'no');

    return (
        <>
            <Heading level={'3'} size={'small'} className={style.header}>
                {headerText}
            </Heading>
            {references.map((reference) => {
                const { id, name, path, editorPath, layer } = reference;

                const layersIndicatorText =
                    layer !== contentLayer ? `[Layer: ${languageNames(layer)}] ` : null;

                const href = `${adminOrigin}${editorPath}`;

                return (
                    <div className={style.link} key={id}>
                        {layersIndicatorText && <strong>{layersIndicatorText}</strong>}
                        {`${name}: `}
                        <EditorLinkWrapper>
                            <LenkeInline
                                href={href}
                                target={'_blank'}
                                onClick={
                                    // Need some special handling to allow target _blank from
                                    // the inline preview iframe
                                    editorView === 'inline'
                                        ? (e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              window.open(href, '_blank');
                                          }
                                        : undefined
                                }
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
