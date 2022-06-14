import React, { useEffect, useState } from 'react';
import { fetchWithTimeout } from '../../../../utils/fetch/fetch-utils';
import { xpDraftPathPrefix, xpServicePath } from '../../../../utils/urls';
import { Heading } from '@navikt/ds-react';
import { Button } from '../../../_common/button/Button';
import { EditorLinkWrapper } from '../../../_editor-only/editor-link-wrapper/EditorLinkWrapper';

import style from './FragmentUsageCheck.module.scss';
import {
    CustomSelectorUsageData,
    CustomSelectorUsageLink,
} from '../../../_editor-only/custom-selector-usage-link/CustomSelectorUsageLink';

const serviceUrl = `${xpDraftPathPrefix}${xpServicePath}/htmlFragmentSelector/fragmentUsage`;

type FragmentUsage = {
    macroUsage: CustomSelectorUsageData[];
    componentUsage: CustomSelectorUsageData[];
};

const fetchFragmentUsage = (id: string): Promise<FragmentUsage> =>
    fetchWithTimeout(`${serviceUrl}?fragmentId=${id}`, 5000).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Could not fetch fragment usage');
    });

const getNumUniqueUsages = ({ macroUsage, componentUsage }: FragmentUsage) => {
    return [...macroUsage, ...componentUsage].filter((item1, index1, array) => {
        const index2 = array.findIndex((item2) => item2.id === item1.id);
        return index1 === index2;
    }).length;
};

type Props = {
    id: string;
};

export const FragmentUsageCheck = ({ id }: Props) => {
    const [usages, setUsages] = useState<FragmentUsage | null>(null);
    const [showUsage, setShowUsage] = useState(false);

    useEffect(() => {
        fetchFragmentUsage(id)
            .then((usageResponse) => {
                if (
                    !usageResponse.macroUsage ||
                    !usageResponse.componentUsage
                ) {
                    throw new Error('Invalid fragment usage fetch response');
                }
                setUsages(usageResponse);
            })
            .catch((e) => {
                console.error(
                    `Failed to load macro usage for fragment ${id} - ${e}`
                );
            });
    }, [id]);

    if (!usages) {
        return null;
    }

    const { componentUsage, macroUsage } = usages;
    const numUniqueUsages = getNumUniqueUsages(usages);

    return (
        <div className={style.fragmentUsage}>
            <div className={style.header}>
                {numUniqueUsages > 0 ? (
                    <>
                        <Heading level="3" size="medium">
                            {`Fragmentet er i bruk på ${numUniqueUsages} publisert${
                                numUniqueUsages === 1 ? '' : 'e'
                            } side${numUniqueUsages === 1 ? '' : 'r'}`}
                        </Heading>
                        <EditorLinkWrapper>
                            <Button
                                variant={'tertiary'}
                                size={'small'}
                                className={style.button}
                                onClick={() => setShowUsage(!showUsage)}
                            >
                                {showUsage ? 'Skjul' : 'Vis'}
                            </Button>
                        </EditorLinkWrapper>
                    </>
                ) : (
                    <Heading level="3" size="small">
                        {`Fragmentet er ikke i bruk på publiserte sider`}
                    </Heading>
                )}
            </div>
            {showUsage && (
                <div>
                    {componentUsage.length > 0 && (
                        <>
                            <Heading
                                level="3"
                                size="small"
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
                                level="3"
                                size="small"
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
        </div>
    );
};
