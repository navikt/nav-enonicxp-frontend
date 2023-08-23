import React from 'react';
import {
    resetOverviewFiltersAction,
    setAreaFilterAction,
    setTaxonomyFilterAction,
} from 'store/slices/overviewFilters';
import { useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { BodyLong, Heading, Chips } from '@navikt/ds-react';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';

import style from './OverviewFiltersSummary.module.scss';

type Props = {
    numMatches: number;
    numTotal: number;
    showResetChips: boolean;
};

export const OverviewFiltersSummary = ({
    numMatches,
    numTotal,
    showResetChips,
}: Props) => {
    const { language } = usePageConfig();

    const { hasDefaultFilters, dispatch, areaFilter, taxonomyFilter } =
        useOverviewFilters();

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
                            <Chips.Removable
                                onClick={() =>
                                    dispatch(
                                        setAreaFilterAction({
                                            area: Area.ALL,
                                        })
                                    )
                                }
                            >
                                {areaTranslations(areaFilter)}
                            </Chips.Removable>
                        )}
                        {taxonomyFilter !== ProductTaxonomy.ALL && (
                            <Chips.Removable
                                onClick={() =>
                                    dispatch(
                                        setTaxonomyFilterAction({
                                            taxonomy: ProductTaxonomy.ALL,
                                        })
                                    )
                                }
                            >
                                {taxonomyTranslations(taxonomyFilter)}
                            </Chips.Removable>
                        )}
                        <Chips.Removable
                            onClick={() => {
                                dispatch(resetOverviewFiltersAction());
                            }}
                        >
                            {overviewTranslations('resetFilters')}
                        </Chips.Removable>
                    </Chips>
                )}
            </div>
            {numMatches === 0 && (
                <BodyLong className={style.nohits}>
                    {overviewTranslations('noHits')}
                </BodyLong>
            )}
        </>
    );
};
