import React from 'react';
import { adminOrigin, editorPathPrefix } from 'utils/urls';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { EditorLinkWrapper } from 'components/_editor-only/editor-link-wrapper/EditorLinkWrapper';
import { DependencyData } from 'components/_editor-only/dependencies-info/types';
import { Heading } from '@navikt/ds-react';

import style from 'components/_editor-only/dependencies-info/result/link/DependenciesLinks.module.scss';

type Props = {
    dependenciesData: DependencyData[];
    headerText: string;
};

export const DependenciesLinks = ({ dependenciesData, headerText }: Props) => {
    return (
        <>
            <Heading level={'3'} size={'small'} className={style.header}>
                {headerText}
            </Heading>
            {dependenciesData.map((dependency) => {
                const { id, name, path, editorPath } = dependency;

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
