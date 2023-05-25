import React, { useEffect, useId, useState } from 'react';
import { Search } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
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
    const { language } = usePageConfig();
    const inputId = useId();

    const [textInput, setTextInput] = useState('');

    const dispatchInput = debounce((value: string) => {
        dispatch(setTextFilterAction({ text: value }));
        window.dispatchEvent(
            new CustomEvent(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, {
                detail: { value, id: inputId },
            })
        );
    }, 500);

    const logInputToSentry = debounce((value: string) => {
        Sentry.captureMessage(
            `Oversiktsside fritekst input: "${value}"`,
            'info'
        );
    }, 3000);

    const handleUserInput = (inputValue: string) => {
        setTextInput(inputValue);
        dispatchInput(inputValue);
        logInputToSentry(inputValue);
    };

    useEffect(() => {
        const handleInputFromEvent = (e: CustomEvent) => {
            const { value, id: senderId } = e.detail;
            if (senderId !== inputId) {
                setTextInput(value);
            }
        };

        window.addEventListener(
            OVERVIEW_FILTERS_TEXT_INPUT_EVENT,
            handleInputFromEvent
        );
        return () => {
            window.removeEventListener(
                OVERVIEW_FILTERS_TEXT_INPUT_EVENT,
                handleInputFromEvent
            );
        };
    }, [inputId]);

    return (
        <form
            id={inputId}
            className={style.overviewSearch}
            onSubmit={(e) => {
                e.preventDefault();
                smoothScrollToTarget(inputId, 16);
            }}
            tabIndex={-1}
        >
            <Search
                onChange={handleUserInput}
                value={textInput}
                label={translator('overview', language)('search')}
                hideLabel={hideLabel}
                variant={'simple'}
            />
        </form>
    );
};
