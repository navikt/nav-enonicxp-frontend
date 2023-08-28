import React, { useCallback, useEffect, useId, useState } from 'react';
import { Search } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { windowScrollTo } from 'utils/scroll-to';

import style from './OverviewTextFilter.module.scss';

export const OVERVIEW_FILTERS_TEXT_INPUT_EVENT = 'OverviewFiltersTextInput';

type Props = {
    hideLabel?: boolean;
};

export const OverviewTextFilter = ({ hideLabel }: Props) => {
    const { setTextFilter } = useOverviewFilters();
    const { language } = usePageConfig();
    const inputId = useId();

    const [textInput, setTextInput] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatchInput = useCallback(
        debounce((value: string) => {
            setTextFilter(value);
            window.dispatchEvent(
                new CustomEvent(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, {
                    detail: { value, id: inputId },
                })
            );
        }, 500),
        [setTextFilter]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logInputToFaro = useCallback(
        debounce((value: string) => {
            if (value.length < 3) {
                return;
            }

            console.info(`Oversiktsside fritekst input: "${value}"`);
        }, 3000),
        []
    );

    const handleUserInput = (inputValue: string) => {
        setTextInput(inputValue);
        dispatchInput(inputValue);
        logInputToFaro(inputValue);
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

                const targetElement = document.getElementById(inputId);
                targetElement.focus();

                // Delay the scroll action slightly as a hacky solution for devices
                // with onscreen keyboard input.
                // (Closing the onscreen keyboard interrupts scrolling)
                setTimeout(() => {
                    const top =
                        targetElement.getBoundingClientRect().top +
                        window.scrollY;
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
            />
        </form>
    );
};
