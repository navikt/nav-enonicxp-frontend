import React from 'react';
import { BodyLong, Chips, Heading } from '@navikt/ds-react';
import { useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';

import style from './OverviewFiltersSummary.module.scss';

type Props = {
    numMatches: number;
    numTotal: number;
    showResetChips: boolean;
};

export const OverviewFiltersSummary = ({ numMatches, numTotal, showResetChips }: Props) => {
    const { language } = usePageContentProps();

    const {
        hasDefaultFilters,
        areaFilter,
        taxonomyFilter,
        setAreaFilter,
        setTaxonomyFilter,
        resetFilters,
    } = useOverviewFilters();

    const overviewTranslations = translator('overview', language);
    const taxonomyTranslations = translator('taxonomies', language);
    const areaTranslations = translator('areas', language);

    return (
        <>
            <div className={style.summary}>
                <Heading level={'2'} size={'xsmall'} role="status">
                    {overviewTranslations('numHits')
                        .replace('$1', numMatches.toString())
                        .replace('$2', numTotal.toString())}
                </Heading>
                {showResetChips && !hasDefaultFilters && (
                    <Chips className={style.chips}>
                        {areaFilter !== Area.ALL && (
                            <Chips.Removable onClick={() => setAreaFilter(Area.ALL)}>
                                {areaTranslations(areaFilter)}
                            </Chips.Removable>
                        )}
                        {taxonomyFilter !== ProductTaxonomy.ALL && (
                            <Chips.Removable onClick={() => setTaxonomyFilter(ProductTaxonomy.ALL)}>
                                {taxonomyTranslations(taxonomyFilter)}
                            </Chips.Removable>
                        )}
                        <Chips.Removable
                            onClick={() => {
                                resetFilters();
                            }}
                        >
                            {overviewTranslations('resetFilters')}
                        </Chips.Removable>
                    </Chips>
                )}
            </div>
            {numMatches === 0 && (
                <BodyLong className={style.nohits}>{overviewTranslations('noHits')}</BodyLong>
            )}
        </>
    );
};
