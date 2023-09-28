import React, { useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { EditorLinkWrapper } from 'components/_editor-only/editor-link-wrapper/EditorLinkWrapper';
import { Button } from 'components/_common/button/Button';
import { CustomSelectorUsageLink } from 'components/_editor-only/custom-selector-usage-link/CustomSelectorUsageLink';
import { FragmentUsage } from 'components/pages/fragment-page/fragment-usage-check/FragmentUsageCheck';
import { removeDuplicates } from 'utils/arrays';

import style from './FragmentUsageDisplay.module.scss';

const getNumUniqueUsages = ({ macroUsage, componentUsage }: FragmentUsage) => {
    return removeDuplicates(
        [...macroUsage, ...componentUsage],
        (a, b) => a.id === b.id
    ).length;
};

type Props = {
    usages: FragmentUsage;
};

export const FragmentUsageDisplay = ({ usages }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const { componentUsage, macroUsage } = usages;

    const numUniqueUsages = getNumUniqueUsages(usages);

    return (
        <>
            <div className={style.header}>
                {numUniqueUsages > 0 ? (
                    <>
                        <Heading level={'3'} size={'medium'}>
                            {`Fragmentet er i bruk på ${numUniqueUsages} publisert${
                                numUniqueUsages === 1 ? '' : 'e'
                            } side${numUniqueUsages === 1 ? '' : 'r'}`}
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
                <div>
                    {componentUsage.length > 0 && (
                        <>
                            <Heading
                                level={'3'}
                                size={'small'}
                                className={style.usageHeader}
                            >
                                {'I bruk som komponent:'}
                            </Heading>
                            {componentUsage.map((content, index) => (
                                <CustomSelectorUsageLink
                                    {...content}
                                    key={index}
                                />
                            ))}
                        </>
                    )}
                    {macroUsage.length > 0 && (
                        <>
                            <Heading
                                level={'3'}
                                size={'small'}
                                className={style.usageHeader}
                            >
                                {'I bruk som macro:'}
                            </Heading>
                            {macroUsage.map((content, index) => (
                                <CustomSelectorUsageLink
                                    {...content}
                                    key={index}
                                />
                            ))}
                        </>
                    )}
                </div>
            )}
        </>
    );
};
