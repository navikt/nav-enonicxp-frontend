import React from 'react';
import { BodyLong, Button, Heading } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import { useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';

import style from './OverviewFiltersSummary.module.scss';

type Props = {
    numMatches: number;
    numTotal: number;
    showResetChips: boolean;
};

export const OverviewFiltersSummary = ({ numMatches, numTotal, showResetChips }: Props) => {
    const { language } = usePageContentProps();
    const { hasDefaultFilters } = useOverviewFilters();
    const overviewTranslations = translator('overview', language);

    return (
        <>
            <div className={style.summary}>
                <Heading level={'2'} size={'xsmall'} role="status">
                    {overviewTranslations('numHits')
                        .replace('$1', numMatches.toString())
                        .replace('$2', numTotal.toString())}
                </Heading>
                {showResetChips && !hasDefaultFilters && (
                    <Button size={'small'} variant={'secondary'} icon={<XMarkIcon />}>
                        {overviewTranslations('resetFilters')}
                    </Button>
                )}
            </div>
            {numMatches === 0 && (
                <BodyLong className={style.nohits}>{overviewTranslations('noHits')}</BodyLong>
            )}
        </>
    );
};
