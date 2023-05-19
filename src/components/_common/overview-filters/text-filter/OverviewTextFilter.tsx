import React, { ChangeEvent } from 'react';
import { TextField } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { setTextFilterAction } from 'store/slices/overviewFilters';

import style from './OverviewTextFilter.module.scss';

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

export const OverviewTextFilter = () => {
    const { language } = usePageConfig();
    const { textFilter, dispatch } = useOverviewFiltersState();

    const label = translator('overview', language)('search');

    const searchEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        dispatch(setTextFilterAction({ text: value }));
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
