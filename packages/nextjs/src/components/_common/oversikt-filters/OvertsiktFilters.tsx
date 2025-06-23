import { useEffect } from 'react';
import { Heading } from '@navikt/ds-react';
import { OversiktAreaFilter } from 'components/_common/oversikt-filters/oversikt-areafilter/OversiktAreaFilter';
import { OversiktTextFilter } from 'components/_common/oversikt-filters/text-filter/OversiktTextFilter';
import { OversiktFilterableItem, useOversiktFilters } from 'store/hooks/useOversiktFilters';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';

import style from './OversiktFilters.module.scss';

type Props = {
    filterableItems: OversiktFilterableItem[];
    showTextInputFilter: boolean;
    showAreaFilter: boolean;
};

export const OversiktFilters = (props: Props) => {
    const { filterableItems, showTextInputFilter, showAreaFilter } = props;
    const { resetFilters } = useOversiktFilters();
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
    const searchLabel = translator('oversikt', language)('filterOrSearch');

    return (
        <div className={style.filters}>
            <Heading className="sr-only" level={'2'} size={'xsmall'}>
                {searchLabel}
            </Heading>
            {showAreaFilter && <OversiktAreaFilter items={filterableItems} />}
            {showTextInputFilter && <OversiktTextFilter hideLabel={false} />}
        </div>
    );
};
