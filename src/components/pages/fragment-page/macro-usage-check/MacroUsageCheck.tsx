import React, { useEffect, useState } from 'react';
import './MacroUsageCheck.less';
import { fetchWithTimeout } from '../../../../utils/fetch-utils';
import { xpServiceUrl } from '../../../../utils/urls';
import { Undertittel } from 'nav-frontend-typografi';
import { Button } from '../../../_common/button/Button';
import { BEM } from '../../../../utils/classnames';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';

const bem = BEM('fragment-macro-usage');

const serviceUrl = `${xpServiceUrl}/htmlFragmentSelector/macroUsage`;
const editorPathPrefix =
    '/admin/tool/com.enonic.app.contentstudio/main#/default/edit/';

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
        throw new Error('Teknisk feil: kunne ikke hente macro-bruk (kode 1)');
    });

type Props = {
    id: string;
};

export const MacroUsageCheck = ({ id }: Props) => {
    const [macroUsage, setMacroUsage] = useState<PageData[]>([]);
    const [message, setMessage] = useState(
        'Laster makro-bruk for dette fragmentet...'
    );
    const [showUsage, setShowUsage] = useState(false);

    useEffect(() => {
        fetchMacroUsage(id)
            .then((res) => {
                if (!Array.isArray(res.usage)) {
                    throw new Error(
                        'Teknisk feil: kunne ikke hente macro-bruk (kode 2)'
                    );
                }

                const { length } = res.usage;
                if (length > 0) {
                    setMessage(
                        `Fragmentet brukes i makro${
                            length > 1 ? 'er' : ''
                        } på ${length} sider`
                    );
                } else {
                    setMessage('Fragmentet er ikke i bruk i macroer');
                }
                setMacroUsage(res.usage);
            })
            .catch((e) => {
                console.error(`Failed to load macro usage for fragment ${id}`);
                setMessage(e);
            });
    }, [id]);

    return (
        macroUsage.length > 0 && (
            <div className={bem()}>
                <div className={bem('header')}>
                    <Undertittel>{message}</Undertittel>
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
                            const editorUrl = `${editorPathPrefix}${usage.id}`;
                            return (
                                <div className={bem('page-usage')}>
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
