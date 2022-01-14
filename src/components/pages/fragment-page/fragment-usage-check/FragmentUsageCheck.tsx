import React, { useEffect, useState } from 'react';
import { fetchWithTimeout } from '../../../../utils/fetch-utils';
import { xpDraftPathPrefix, xpServicePath } from '../../../../utils/urls';
import { Heading } from '@navikt/ds-react';
import { Button } from '../../../_common/button/Button';
import { BEM } from '../../../../utils/classnames';
import { EditorLinkWrapper } from '../../../_common/editor-utils/editor-link-wrapper/EditorLinkWrapper';
import { FragmentUsageLink } from './FragmentUsageLink';

const bem = BEM('fragment-usage');

const serviceUrl = `${xpDraftPathPrefix}${xpServicePath}/htmlFragmentSelector/fragmentUsage`;

export type FragmentUsageData = {
    name: string;
    path: string;
    id: string;
};

type FragmentUsage = {
    macroUsage: FragmentUsageData[];
    componentUsage: FragmentUsageData[];
};

const fetchMacroUsage = (id: string): Promise<FragmentUsage> =>
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
        fetchMacroUsage(id)
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
        <div className={bem()}>
            <div className={bem('header')}>
                {numUniqueUsages > 0 ? (
                    <>
                        <Heading level="3" size="medium">
                            {`Fragmentet er i bruk på ${numUniqueUsages} publisert${
                                numUniqueUsages === 1 ? '' : 'e'
                            } side${numUniqueUsages === 1 ? '' : 'r'}`}
                        </Heading>
                        <EditorLinkWrapper>
                            <Button
                                variant={'flat'}
                                size={'small'}
                                className={bem('button')}
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
                                className={bem('usage-header')}
                            >
                                {'I bruk som komponent:'}
                            </Heading>
                            {componentUsage.map((content, index) => (
                                <FragmentUsageLink {...content} key={index} />
                            ))}
                        </>
                    )}
                    {macroUsage.length > 0 && (
                        <>
                            <Heading
                                level="3"
                                size="small"
                                className={bem('usage-header')}
                            >
                                {'I bruk som macro:'}
                            </Heading>
                            {macroUsage.map((content, index) => (
                                <FragmentUsageLink {...content} key={index} />
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
