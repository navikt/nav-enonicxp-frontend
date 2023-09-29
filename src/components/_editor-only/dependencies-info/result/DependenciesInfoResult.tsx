import React, { useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { EditorLinkWrapper } from 'components/_editor-only/editor-link-wrapper/EditorLinkWrapper';
import { Button } from 'components/_common/button/Button';
import { DependenciesLinks } from 'components/_editor-only/dependencies-info/result/link/DependenciesLinks';
import { removeDuplicates } from 'utils/arrays';
import {
    DependenciesData,
    DependenciesInfoSupportedContentType,
} from 'components/_editor-only/dependencies-info/types';
import { ContentType } from 'types/content-props/_content-common';

import style from './DependenciesInfoResult.module.scss';

const contentName: Record<DependenciesInfoSupportedContentType, string> = {
    [ContentType.ProductDetails]: 'Produktdetaljene',
    [ContentType.Video]: 'Videoen',
    [ContentType.Fragment]: 'Fragmentet',
};

const getNumUniqueRefs = (refsData: DependenciesData) => {
    return removeDuplicates(
        Object.values(refsData).flat(),
        (a, b) => a.id === b.id
    ).length;
};

type Props = {
    dependencies: DependenciesData;
    type: DependenciesInfoSupportedContentType;
};

export const DependenciesInfoResult = ({ dependencies, type }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const { general, macros, components } = dependencies;

    const numUniqueRefs = getNumUniqueRefs(dependencies);

    return (
        <>
            <div className={style.header}>
                {numUniqueRefs > 0 ? (
                    <>
                        <Heading level={'3'} size={'medium'}>
                            {`${
                                contentName[type]
                            } er i bruk på ${numUniqueRefs} publisert${
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
                        {`Fragmentet er ikke i bruk på publiserte sider`}
                    </Heading>
                )}
            </div>
            {isOpen && (
                <>
                    {general?.length > 0 && (
                        <DependenciesLinks
                            headerText={'I bruk på følgende sider:'}
                            dependenciesData={general}
                        />
                    )}
                    {components?.length > 0 && (
                        <DependenciesLinks
                            headerText={'I bruk som komponent:'}
                            dependenciesData={components}
                        />
                    )}
                    {macros?.length > 0 && (
                        <DependenciesLinks
                            headerText={'I bruk som macro:'}
                            dependenciesData={macros}
                        />
                    )}
                </>
            )}
        </>
    );
};
