import React, { useEffect, useState } from 'react';
import './MacroUsageCheck.less';
import { fetchWithTimeout } from '../../../../utils/fetch-utils';
import { xpServiceUrl } from '../../../../utils/urls';
import { Undertittel } from 'nav-frontend-typografi';

const serviceUrl = `${xpServiceUrl}/htmlFragmentSelector/macroUsage`;

type ServiceResponse = {
    usage: {
        name: string;
        path: string;
        id: string;
    }[];
};

type Props = {
    id: string;
};

export const MacroUsageCheck = ({ id }: Props) => {
    const [macroUsage, setMacroUsage] = useState([]);
    const [message, setMessage] = useState(
        'Laster makro-bruk for dette fragmentet...'
    );

    const fetchMacroUsage = (id: string) =>
        fetchWithTimeout(`${serviceUrl}?fragmentId=${id}`, 5000)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(
                    'Teknisk feil: kunne ikke hente macro-bruk (kode 1)'
                );
            })
            .then((res: ServiceResponse) => {
                if (!Array.isArray(res.usage)) {
                    throw new Error(
                        'Teknisk feil: kunne ikke hente macro-bruk (kode 2)'
                    );
                }

                const { length } = res.usage;
                if (length > 0) {
                    setMessage(
                        `Fragmentet brukes i ${length} makro${
                            length > 1 ? 'er' : ''
                        }`
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

    useEffect(() => {
        fetchMacroUsage(id);
    }, [id]);

    return (
        <div className={'fragment-macro-usage'}>
            <Undertittel>{message}</Undertittel>
            {macroUsage.length > 0 && (
                <div>{macroUsage.map((usage) => usage.name)}</div>
            )}
        </div>
    );
};
