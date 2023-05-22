import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextField } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { setTextFilterAction } from 'store/slices/overviewFilters';

import style from './OverviewTextFilter.module.scss';

export const OverviewTextFilter = () => {
    const { language } = usePageConfig();
    const { dispatch } = useOverviewFiltersState();
    const [textInput, setTextInput] = useState('');

    const label = translator('overview', language)('search');

    const searchEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTextInput(value);

        debounce(
            () => {
                dispatch(setTextFilterAction({ text: value }));
                logAmplitudeEvent(AnalyticsEvents.FILTER, {
                    tekst: value,
                    opprinnelse: 'oversiktsside fritekst',
                });
            },
            250,
            { maxWait: 1000 }
        )();
    };

    useEffect(() => {
        const resetHandler = () => setTextInput('');
        window.addEventListener('OverviewFiltersReset', resetHandler);
        return () =>
            window.removeEventListener('OverviewFiltersReset', resetHandler);
    }, []);

    return (
        <div className={style.overviewSearch}>
            <TextField
                label={label}
                onChange={searchEventHandler}
                value={textInput}
            />
        </div>
    );
};
