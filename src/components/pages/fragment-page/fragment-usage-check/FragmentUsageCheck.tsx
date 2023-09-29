import React, { useEffect, useState } from 'react';
import { fetchJson } from 'utils/fetch/fetch-utils';
import { xpDraftPathPrefix, xpServicePath } from 'utils/urls';
import { BodyLong, BodyShort, Heading, Loader } from '@navikt/ds-react';
import { CustomSelectorUsageData } from '../../../_editor-only/custom-selector-usage-link/CustomSelectorUsageLink';
import { FragmentUsageDisplay } from 'components/pages/fragment-page/fragment-usage-check/fragment-usage-display/FragmentUsageDisplay';
import { AlertBox } from 'components/_common/alert-box/AlertBox';

import style from './FragmentUsageCheck.module.scss';

const serviceUrl = `${xpDraftPathPrefix}${xpServicePath}/htmlFragmentSelector/fragmentUsage`;

export type FragmentUsage = {
    macroUsage: CustomSelectorUsageData[];
    componentUsage: CustomSelectorUsageData[];
};

const fetchFragmentUsage = (
    id: string,
    locale: string
): Promise<FragmentUsage> =>
    fetchJson(`${serviceUrl}?fragmentId=${id}&locale=${locale}`, 5000);

type Props = {
    id: string;
    locale: string;
};

export const FragmentUsageCheck = ({ id, locale }: Props) => {
    const [usages, setUsages] = useState<FragmentUsage | null>(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchFragmentUsage(id, locale).then((usageResponse) => {
            if (!usageResponse) {
                setIsError(true);
                return;
            }

            setUsages(usageResponse);
            setIsError(false);
        });
    }, [id, locale]);

    return (
        <div className={style.fragmentUsage}>
            {isError ? (
                <AlertBox variant={'error'} inline={true}>
                    <Heading level={'3'} size={'small'}>
                        {
                            'Obs: lasting av fragment-referanser feilet! Dette fragmentet kan være i bruk.'
                        }
                    </Heading>
                    <BodyLong>
                        {'Forsøk å laste inn editoren på nytt.'}
                    </BodyLong>
                </AlertBox>
            ) : usages ? (
                <FragmentUsageDisplay usages={usages} />
            ) : (
                <div className={style.loader}>
                    <Loader size={'xlarge'} />
                    <BodyShort>{'Laster fragment-referanser...'}</BodyShort>
                </div>
            )}
        </div>
    );
};
