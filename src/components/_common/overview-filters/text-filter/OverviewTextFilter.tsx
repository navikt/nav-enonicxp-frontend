import React, { ChangeEvent, useEffect, useId, useState } from 'react';
import { TextField } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { setTextFilterAction } from 'store/slices/overviewFilters';
import * as Sentry from '@sentry/react';

import style from './OverviewTextFilter.module.scss';

export const OVERVIEW_FILTERS_TEXT_INPUT_EVENT = 'OverviewFiltersTextInput';

type Props = {
    hideLabel?: boolean;
};

export const OverviewTextFilter = ({ hideLabel }: Props) => {
    const { dispatch } = useOverviewFiltersState();
    const [textInput, setTextInput] = useState('');

    const id = useId();

    const { language } = usePageConfig();

    const label = translator('overview', language)('search');

    const searchEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setTextInput(value);

        // Event to keep mobile and desktop views in sync
        window.dispatchEvent(
            new CustomEvent(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, {
                detail: { value, id },
            })
        );

        debounce(() => {
            dispatch(setTextFilterAction({ text: value }));
        }, 125)();

        debounce(() => {
            Sentry.captureMessage(
                `Oversiktsside fritekst input: "${value}"`,
                'info'
            );

            logAmplitudeEvent(AnalyticsEvents.FILTER, {
                opprinnelse: 'oversiktsside fritekst',
            });
        }, 500)();
    };

    useEffect(() => {
        const inputHandler = (evt: CustomEvent) => {
            const { value, id: senderId } = evt.detail;
            if (senderId !== id) {
                setTextInput(value);
            }
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
    }, [id]);

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
