import React from 'react';
import {
    resetOverviewFiltersAction,
    setAreaFilterAction,
    setTaxonomyFilterAction,
} from 'store/slices/overviewFilters';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { BodyLong, BodyShort, Chips } from '@navikt/ds-react';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';

import style from './OverviewFiltersSummary.module.scss';

type Props = {
    numMatches: number;
    numTotal: number;
};

export const OverviewFiltersSummary = ({ numMatches, numTotal }: Props) => {
    const { language } = usePageConfig();

    const { hasDefaultFilters, dispatch, areaFilter, taxonomyFilter } =
        useOverviewFiltersState();

    const overviewTranslations = translator('overview', language);
    const taxonomyTranslations = translator('taxonomies', language);
    const areaTranslations = translator('areas', language);

    return (
        <>
            <div className={style.summary}>
                <BodyShort>
                    {overviewTranslations('numHits')
                        .replace('$1', numMatches.toString())
                        .replace('$2', numTotal.toString())}
                </BodyShort>
                {!hasDefaultFilters && (
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
                            className={style.reset}
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
