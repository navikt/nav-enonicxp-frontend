import React, { useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { EditorLinkWrapper } from 'components/_editor-only/editorLinkWrapper/EditorLinkWrapper';
import { Button } from 'components/_common/button/Button';
import { ReferencesLinks } from 'components/_editor-only/references-info/result/link/ReferencesLinks';
import { removeDuplicates } from 'utils/arrays';
import { ReferencesDataByType } from 'components/_editor-only/references-info/types';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

import style from './ReferencesInfoResult.module.scss';

const contentTypeNameMap: { [key in ContentType]?: string } = {
    [ContentType.ProductDetails]: 'Produktdetaljene',
    [ContentType.Video]: 'Videoen',
    [ContentType.Fragment]: 'Fragmentet',
} as const;

const getNumUniqueRefs = (refsData: ReferencesDataByType) => {
    return removeDuplicates(
        Object.values(refsData).flat(),
        (a, b) => a.id === b.id && a.layer === b.layer
    ).length;
};

type Props = {
    references: ReferencesDataByType;
    content: ContentProps;
};

export const ReferencesInfoResult = ({ references, content }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const { type, contentLayer } = content;
    const { general, macros, components } = references;

    const numUniqueRefs = getNumUniqueRefs(references);

    const contentTypeName = contentTypeNameMap[type] || 'Innholdet';

    return (
        <>
            <div className={style.header}>
                {numUniqueRefs > 0 ? (
                    <>
                        <Heading level={'3'} size={'medium'}>
                            {`${contentTypeName} er i bruk på ${numUniqueRefs} publisert${
                                numUniqueRefs === 1 ? '' : 'e'
                            } side${numUniqueRefs === 1 ? '' : 'r'}`}
                        </Heading>
                        <EditorLinkWrapper>
                            <Button
                                variant={'tertiary'}
                                size={'small'}
                                className={style.button}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? 'Skjul' : 'Vis'}
                            </Button>
                        </EditorLinkWrapper>
                    </>
                ) : (
                    <Heading level={'3'} size={'small'}>
                        {`${contentTypeName} er ikke i bruk på publiserte sider`}
                    </Heading>
                )}
            </div>
            {isOpen && (
                <>
                    {general && general.length > 0 && (
                        <ReferencesLinks
                            headerText={'I bruk på følgende sider:'}
                            references={general}
                            contentLayer={contentLayer}
                        />
                    )}
                    {components && components.length > 0 && (
                        <ReferencesLinks
                            headerText={'I bruk som komponent:'}
                            references={components}
                            contentLayer={contentLayer}
                        />
                    )}
                    {macros && macros.length > 0 && (
                        <ReferencesLinks
                            headerText={'I bruk som macro:'}
                            references={macros}
                            contentLayer={contentLayer}
                        />
                    )}
                </>
            )}
        </>
    );
};
