import React, { useEffect, useState } from 'react';
import { fetchWithTimeout } from '../../../../utils/fetch-utils';
import { editorPathPrefix, xpServiceUrl } from '../../../../utils/urls';
import { Title } from '@navikt/ds-react';
import { Button } from '../../../_common/button/Button';
import { BEM } from '../../../../utils/classnames';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import './FragmentUsageCheck.less';

const bem = BEM('fragment-usage');

const serviceUrl = `${xpServiceUrl}/htmlFragmentSelector/fragmentUsage`;

type ContentData = {
    name: string;
    path: string;
    id: string;
};

type FragmentUsage = {
    macroUsage: ContentData[];
    componentUsage: ContentData[];
};

const fetchMacroUsage = (id: string): Promise<FragmentUsage> =>
    fetchWithTimeout(`${serviceUrl}?fragmentId=${id}`, 5000).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Could not fetch fragment usage');
    });

type Props = {
    id: string;
};

export const FragmentUsageCheck = ({ id }: Props) => {
    const [usages, setUsages] = useState<FragmentUsage>({
        componentUsage: [],
        macroUsage: [],
    });
    const [showUsage, setShowUsage] = useState(false);

    const numUniqueUsages = [
        ...usages.macroUsage,
        ...usages.componentUsage,
    ].filter(
        (content, index, array) => array.indexOf(content) === index
    ).length;

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

    return (
        usages && (
            <div className={bem()}>
                <div className={bem('header')}>
                    <Title level={3} size="m">
                        {`Fragmentet er i bruk på ${numUniqueUsages} side${
                            numUniqueUsages === 1 ? '' : 'r'
                        }`}
                    </Title>
                    <Button
                        type={'flat'}
                        mini={true}
                        kompakt={true}
                        className={bem('button')}
                        onClick={() => setShowUsage(!showUsage)}
                    >
                        {showUsage ? 'Skjul' : 'Vis'}
                    </Button>
                </div>
                {showUsage && (
                    <div>
                        <Title
                            level={3}
                            size={'s'}
                            className={bem('usage-header')}
                        >
                            {'I bruk som komponent:'}
                        </Title>
                        {usages.componentUsage.map((content) => {
                            const editorUrl = `${editorPathPrefix}/${content.id}`;
                            return (
                                <div
                                    className={bem('page-usage')}
                                    key={content.id}
                                >
                                    {`${content.name} - `}
                                    <LenkeInline href={editorUrl}>
                                        {content.path}
                                    </LenkeInline>
                                </div>
                            );
                        })}
                        <Title
                            level={3}
                            size={'s'}
                            className={bem('usage-header')}
                        >
                            {'I bruk som macro:'}
                        </Title>
                        {usages.macroUsage.map((content) => {
                            const editorUrl = `${editorPathPrefix}/${content.id}`;
                            return (
                                <div
                                    className={bem('page-usage')}
                                    key={content.id}
                                >
                                    {`${content.name} - `}
                                    <LenkeInline href={editorUrl}>
                                        {content.path}
                                    </LenkeInline>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        )
    );
};
