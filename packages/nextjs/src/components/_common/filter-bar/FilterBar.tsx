import React, { useEffect, useRef, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { translator } from 'translations';
import { useFilterState } from 'store/hooks/useFilteredContent';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { FilterCheckbox } from 'components/parts/filters-menu/FilterCheckbox';
import { SectionWithHeaderProps } from 'types/component-props/layouts/section-with-header';
import { useScrollPosition } from 'utils/useStickyScroll';
import {
    FilterMenuCategory,
    FilterMenuFilter,
} from 'components/parts/filters-menu/FiltersMenuPart';
import { FilterExplanation } from './FilterExplanation';

import style from './FilterBar.module.scss';

type FilterWithCategory = FilterMenuFilter & Pick<FilterMenuCategory, 'categoryName'>;

type Props = {
    layoutProps: SectionWithHeaderProps;
};

/** @deprecated */
export const FilterBar = ({ layoutProps }: Props) => {
    const filterBarRef = useRef(null);
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const getLabel = translator('filteredContent', contentProps.language);
    const { selectedFilters, availableFilters, toggleFilter } = useFilterState();
    const { saveScrollPosition, scrollBackToElement } = useScrollPosition(filterBarRef.current);
    const [filtersToDisplay, setFiltersToDisplay] = useState<FilterWithCategory[]>([]);

    useEffect(() => {
        const { content, intro } = layoutProps.regions;
        const components = [
            ...(content ? content.components : []),
            ...(intro ? intro.components : []),
        ];

        // Create a flat array of all ids that any
        // underlying part that has filter ids attached.
        // We don't care about duplicate ids in the final array at the moment.
        const filterIds = components.reduce<string[]>((acc, component) => {
            if (component.config?.filters) {
                acc.push(...component.config.filters);
            }

            return acc;
        }, []);

        // As the previous array is a string[], we need to create a list of the
        // actual filter objects to be able to display filterName later on.
        const _filtersToDisplay = availableFilters
            .map((category) => {
                return category.filters
                    .filter((filter) => filterIds.includes(filter.id))
                    .map((filter) => ({
                        ...filter,
                        categoryName: category.categoryName, // Needed when reporting category back to Amplitude
                    }));
            })
            .flat();

        setFiltersToDisplay(_filtersToDisplay);
    }, [availableFilters, layoutProps]);

    // None of the parts are attached to filters, so don't show the FilterBar.
    if (filtersToDisplay.length === 0) {
        return null;
    }

    return (
        <section className={style.wrapper}>
            <Heading level="3" size="small" className={style.header}>
                {getLabel('showingInformationFor')}
            </Heading>
            <div className={style.container} ref={filterBarRef}>
                {filtersToDisplay.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id);
                    return (
                        <FilterCheckbox
                            key={filter.id}
                            isSelected={isSelected}
                            onToggleFilterHandler={() => {
                                logAnalyticsEvent(AnalyticsEvents.FILTER, {
                                    kategori: filter.categoryName,
                                    filternavn: filter.filterName,
                                    opprinnelse: 'innholdtekst',
                                    komponent: 'FilterBar',
                                    målgruppe: context,
                                    innholdstype: innholdsTypeMap[contentProps.type],
                                });
                                saveScrollPosition();
                                toggleFilter(filter.id);
                                setTimeout(() => scrollBackToElement(), 0);
                            }}
                            filter={filter}
                        />
                    );
                })}
            </div>
            <FilterExplanation
                selectedFilters={selectedFilters}
                availableFilters={filtersToDisplay.map((filter) => filter.id)}
            />
        </section>
    );
};
