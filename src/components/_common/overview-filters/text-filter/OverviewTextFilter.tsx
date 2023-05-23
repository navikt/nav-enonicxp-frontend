import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextField } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { setTextFilterAction } from 'store/slices/overviewFilters';

import style from './OverviewTextFilter.module.scss';

export const OVERVIEW_FILTERS_TEXT_INPUT_EVENT = 'OverviewFiltersTextInput';

type Props = {
    hideLabel?: boolean;
};

export const OverviewTextFilter = ({ hideLabel }: Props) => {
    const { dispatch } = useOverviewFiltersState();
    const [textInput, setTextInput] = useState('');

    const { language } = usePageConfig();

    const label = translator('overview', language)('search');

    const searchEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        // Set the input value via events to keep mobile and desktop views in sync
        window.dispatchEvent(
            new CustomEvent(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, {
                detail: value,
            })
        );

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
        const inputHandler = (evt: CustomEvent) => {
            setTextInput(evt.detail);
        };

        window.addEventListener(
            OVERVIEW_FILTERS_TEXT_INPUT_EVENT,
            inputHandler
        );
        return () => {
            window.removeEventListener(
                OVERVIEW_FILTERS_TEXT_INPUT_EVENT,
                inputHandler
            );
        };
    }, []);

    return (
        <div className={style.overviewSearch}>
            <TextField
                onChange={searchEventHandler}
                value={textInput}
                label={label}
                hideLabel={hideLabel}
            />
        </div>
    );
};
