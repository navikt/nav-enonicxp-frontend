import React from 'react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { resetOverviewFiltersAction } from 'store/slices/overviewFilters';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { BodyLong, BodyShort } from '@navikt/ds-react';
import { Close } from '@navikt/ds-icons';

import style from './OverviewFiltersSummary.module.scss';

type Props = {
    numMatches: number;
    numTotal: number;
};

export const OverviewFiltersSummary = ({ numMatches, numTotal }: Props) => {
    const { language } = usePageConfig();

    const { hasDefaultFilters, dispatch } = useOverviewFiltersState();

    const getTranslationString = translator('overview', language);

    return (
        <>
            <div className={style.summary}>
                <BodyShort>
                    {getTranslationString('numHits')
                        .replace('$1', numMatches.toString())
                        .replace('$2', numTotal.toString())}
                </BodyShort>
                {!hasDefaultFilters && (
                    <LenkeBase
                        href={'#'}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(resetOverviewFiltersAction());
                        }}
                        className={style.reset}
                    >
                        <Close />
                        {getTranslationString('resetFilters')}
                    </LenkeBase>
                )}
            </div>
            {numMatches === 0 && (
                <BodyLong className={style.nohits}>
                    {'Ingen treff med denne kombinasjonen av filtere.'}
                </BodyLong>
            )}
        </>
    );
};
