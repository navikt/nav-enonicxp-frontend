import React, { useEffect, useId, useState } from 'react';
import { Search } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { setTextFilterAction } from 'store/slices/overviewFilters';
import * as Sentry from '@sentry/react';
import { smoothScrollToTarget } from 'utils/scroll-to';

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

    const searchEventHandler = (value: string) => {
        setTextInput(value);

        debounce(
            () => {
                dispatch(setTextFilterAction({ text: value }));
                window.dispatchEvent(
                    new CustomEvent(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, {
                        detail: { value, id },
                    })
                );
            },
            500,
            { maxWait: 2000 }
        )();

        debounce(() => {
            Sentry.captureMessage(
                `Oversiktsside fritekst input: "${value}"`,
                'info'
            );
        }, 1000)();
    };

    useEffect(() => {
        const inputHandler = (e: CustomEvent) => {
            const { value, id: senderId } = e.detail;
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
        <form
            id={id}
            className={style.overviewSearch}
            onSubmit={(e) => {
                e.preventDefault();
                smoothScrollToTarget(id, 16);
                (document.activeElement as HTMLElement)?.blur();
            }}
        >
            <Search
                onChange={searchEventHandler}
                value={textInput}
                label={label}
                hideLabel={hideLabel}
                variant={'simple'}
            />
        </form>
    );
};
