import React, { ChangeEvent } from 'react';
import { TextField } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { useOverviewFilters } from 'components/_common/overview-filters/filter-context/useOverviewFilters';

import style from './OverviewSearch.module.scss';

const analytics = debounce(
    (value: string) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            tekst: value,
            opprinnelse: 'oversiktsside fritekst',
        });
    },
    250,
    { maxWait: 1000 }
);

type OverviewSearchProps = {
    label: string;
};

export const OverviewSearch = ({ label }: OverviewSearchProps) => {
    const { setTextFilter, textFilter } = useOverviewFilters();

    const searchEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTextFilter(value);
        analytics(value);
    };

    return (
        <div className={style.overviewSearch}>
            <TextField
                label={label}
                value={textFilter}
                onChange={searchEventHandler}
            />
        </div>
    );
};
