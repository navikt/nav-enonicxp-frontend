import React, { useEffect, useState } from 'react';
import { fetchWithTimeout } from '../../../../utils/fetch-utils';
import { editorPathPrefix, xpServiceUrl } from '../../../../utils/urls';
import { Title } from '@navikt/ds-react';
import { Button } from '../../../_common/button/Button';
import { BEM } from '../../../../utils/classnames';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import './MacroUsageCheck.less';

const bem = BEM('fragment-macro-usage');

const serviceUrl = `${xpServiceUrl}/htmlFragmentSelector/macroUsage`;

type PageData = {
    name: string;
    path: string;
    id: string;
};

type ServiceResponse = {
    usage: PageData[];
};

const fetchMacroUsage = (id: string): Promise<ServiceResponse> =>
    fetchWithTimeout(`${serviceUrl}?fragmentId=${id}`, 5000).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Could not fetch html-fragment macro usage');
    });

type Props = {
    id: string;
};

export const MacroUsageCheck = ({ id }: Props) => {
    const [macroUsage, setMacroUsage] = useState<PageData[]>([]);
    const [message, setMessage] = useState('');
    const [showUsage, setShowUsage] = useState(false);

    useEffect(() => {
        fetchMacroUsage(id)
            .then((res) => {
                if (!Array.isArray(res.usage)) {
                    throw new Error(
                        'Invalid html-fragment macro usage fetch response'
                    );
                }

                const { length } = res.usage;

                setMessage(
                    `Fragmentet brukes i makroer på ${length} side${
                        length === 1 ? '' : 'r'
                    }`
                );

                setMacroUsage(res.usage);
            })
            .catch((e) => {
                console.error(
                    `Failed to load macro usage for fragment ${id} - ${e}`
                );
            });
    }, [id]);

    return (
        macroUsage.length > 0 && (
            <div className={bem()}>
                <div className={bem('header')}>
                    <Title level={3} size="s">
                        {message}
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
                        {macroUsage.map((usage) => {
                            const editorUrl = `${editorPathPrefix}/${usage.id}`;
                            return (
                                <div
                                    className={bem('page-usage')}
                                    key={usage.id}
                                >
                                    {`${usage.name} - `}
                                    <LenkeInline href={editorUrl}>
                                        {usage.path}
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
