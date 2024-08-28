import React, { useCallback, useEffect, useId, useState } from 'react';
import { Search } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { windowScrollTo } from 'utils/scroll-to';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import {
    OVERVIEW_FILTERS_TEXT_INPUT_EVENT,
    OverviewFiltersTextInputEventDetail,
} from 'store/slices/overviewFilters';
import style from './OverviewTextFilter.module.scss';

type Props = {
    hideLabel?: boolean;
};

const analyticsRedaction = (value: string) =>
    isNaN(Number(value))
        ? `tekst (${value.length})`
        : `nummer (${Math.round(Math.log10(Number(value))) + 1})`;

export const OverviewTextFilter = ({ hideLabel }: Props) => {
    const { setTextFilter } = useOverviewFilters();
    const { language } = usePageContentProps();
    const inputId = useId();

    const [textInput, setTextInput] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatchInput = useCallback(
        debounce((value: string) => {
            setTextFilter(value);
            window.dispatchEvent(
                new CustomEvent<OverviewFiltersTextInputEventDetail>(
                    OVERVIEW_FILTERS_TEXT_INPUT_EVENT,
                    {
                        detail: { value, id: inputId },
                    }
                )
            );
            logAmplitudeEvent(AnalyticsEvents.FILTER, {
                kategori: 'fritekst',
                filternavn: analyticsRedaction(value),
                komponent: 'OverviewTextFilter',
            });
        }, 500),
        [setTextFilter]
    );

    const handleUserInput = (inputValue: string) => {
        setTextInput(inputValue);
        dispatchInput(inputValue);
    };

    useEffect(() => {
        const handleInputFromEvent = (e: CustomEvent<OverviewFiltersTextInputEventDetail>) => {
            const { value, id: senderId } = e.detail;
            if (senderId !== inputId) {
                setTextInput(value);
            }
        };

        window.addEventListener(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, handleInputFromEvent);
        return () => {
            window.removeEventListener(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, handleInputFromEvent);
        };
    }, [inputId]);

    return (
        <form
            id={inputId}
            className={style.overviewSearch}
            onSubmit={(e) => {
                e.preventDefault();

                const targetElement = document.getElementById(inputId);
                if (!targetElement) {
                    return;
                }

                targetElement.focus();

                // Delay the scroll action slightly as a hacky solution for devices
                // with onscreen keyboard input.
                // (Closing the onscreen keyboard interrupts scrolling)
                setTimeout(() => {
                    const top = targetElement.getBoundingClientRect().top + window.scrollY;
                    windowScrollTo(top - 16);
                }, 100);
            }}
            tabIndex={-1}
        >
            <Search
                onChange={handleUserInput}
                value={textInput}
                label={translator('overview', language)('search')}
                hideLabel={hideLabel}
                variant={'secondary'}
                autoComplete={'off'}
            />
        </form>
    );
};
