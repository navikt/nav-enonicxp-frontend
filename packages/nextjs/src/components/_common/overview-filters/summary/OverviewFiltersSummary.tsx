import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';

import style from './OverviewFiltersSummary.module.scss';

type Props = {
    numMatches: number;
    numTotal: number;
};

export const OverviewFiltersSummary = ({ numMatches, numTotal }: Props) => {
    const { language } = usePageContentProps();
    const overviewTranslations = translator('overview', language);

    return (
        <>
            <div className={style.summary}>
                <Heading level={'2'} size={'xsmall'} role="status">
                    {overviewTranslations('numHits')
                        .replace('$1', numMatches.toString())
                        .replace('$2', numTotal.toString())}
                </Heading>
            </div>
            {numMatches === 0 && (
                <BodyLong className={style.nohits}>{overviewTranslations('noHits')}</BodyLong>
            )}
        </>
    );
};
