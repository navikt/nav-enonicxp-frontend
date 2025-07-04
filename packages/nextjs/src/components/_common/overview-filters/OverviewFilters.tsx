import { useEffect } from 'react';
import { Heading } from '@navikt/ds-react';
import { OverviewAreaFilter } from 'components/_common/overview-filters/area-filter/OverviewAreaFilter';
import { OverviewTextFilter } from 'components/_common/overview-filters/text-filter/OverviewTextFilter';
import { OverviewFilterableItem, useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';

import style from './OverviewFilters.module.scss';

type Props = {
    filterableItems: OverviewFilterableItem[];
    showTextInputFilter: boolean;
    showAreaFilter: boolean;
};

export const OverviewFilters = (props: Props) => {
    const { filterableItems, showTextInputFilter, showAreaFilter } = props;
    const { resetFilters } = useOverviewFilters();
    const { language } = usePageContentProps();

    useEffect(() => {
        // Reset filters when the component dismounts
        return () => {
            resetFilters();
        };
    }, [resetFilters]);

    if (!showAreaFilter && !showTextInputFilter) {
        return null;
    }
    const searchLabel = translator('overview', language)('filterOrSearch');

    return (
        <div className={style.filters}>
            <Heading className="sr-only" level={'2'} size={'xsmall'}>
                {searchLabel}
            </Heading>
            {showAreaFilter && <OverviewAreaFilter items={filterableItems} />}
            {showTextInputFilter && <OverviewTextFilter hideLabel={false} />}
        </div>
    );
};
