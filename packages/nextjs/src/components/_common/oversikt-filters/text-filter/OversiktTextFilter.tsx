import React, { useCallback, useEffect, useId, useState } from 'react';
import { Search } from '@navikt/ds-react';
import debounce from 'lodash.debounce';
import { translator } from 'translations';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { useOversiktFilters } from 'store/hooks/useOversiktFilters';
import { windowScrollTo } from 'utils/scroll-to';
import {
    OVERSIKT_FILTERS_TEXT_INPUT_EVENT,
    OversiktFiltersTextInputEventDetail,
} from 'store/slices/oversiktFilters';

import style from './OversiktTextFilter.module.scss';

type Props = {
    hideLabel?: boolean;
};

const analyticsRedaction = (value: string) =>
    isNaN(Number(value))
        ? `tekst (${value.length})`
        : `nummer (${Math.round(Math.log10(Number(value))) + 1})`;

export const OversiktTextFilter = ({ hideLabel }: Props) => {
    const { setTextFilter } = useOversiktFilters();
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const label = translator('oversikt', contentProps.language)('search');
    const inputId = useId();
    const [textInput, setTextInput] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dispatchInput = useCallback(
        debounce((value: string) => {
            setTextFilter(value);
            window.dispatchEvent(
                new CustomEvent<OversiktFiltersTextInputEventDetail>(
                    OVERSIKT_FILTERS_TEXT_INPUT_EVENT,
                    {
                        detail: { value, id: inputId },
                    }
                )
            );
            logAnalyticsEvent(AnalyticsEvents.FILTER, {
                kategori: 'fritekst',
                filternavn: analyticsRedaction(value),
                komponent: 'OverviewTextFilter',
                målgruppe: context,
                innholdstype: innholdsTypeMap[contentProps.type],
            });
        }, 500),
        [setTextFilter]
    );

    const handleUserInput = (inputValue: string) => {
        setTextInput(inputValue);
        dispatchInput(inputValue);
    };

    useEffect(() => {
        const handleInputFromEvent = (e: CustomEvent<OversiktFiltersTextInputEventDetail>) => {
            const { value, id: senderId } = e.detail;
            if (senderId !== inputId) {
                setTextInput(value);
            }
        };
        window.addEventListener(OVERSIKT_FILTERS_TEXT_INPUT_EVENT, handleInputFromEvent);
        return () => {
            window.removeEventListener(OVERSIKT_FILTERS_TEXT_INPUT_EVENT, handleInputFromEvent);
        };
    }, [inputId]);

    return (
        <form
            id={inputId}
            className={style.oversiktSearch}
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
                label={label}
                hideLabel={hideLabel}
                variant={'secondary'}
                autoComplete={'off'}
            />
        </form>
    );
};
