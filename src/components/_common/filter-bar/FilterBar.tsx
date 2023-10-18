import { Heading } from '@navikt/ds-react';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { useFilterState } from 'store/hooks/useFilteredContent';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { FilterCheckbox } from 'components/parts/filters-menu/FilterCheckbox';
import { SectionWithHeaderProps } from 'types/component-props/layouts/section-with-header';
import { FilterExplanation } from './FilterExplanation';

import style from './FilterBar.module.scss';
import { useEffect, useRef } from 'react';
import { useScrollPosition } from 'store/hooks/useStickyScroll';

type FilterBarProps = {
    layoutProps: SectionWithHeaderProps;
};

export const FilterBar = ({ layoutProps }: FilterBarProps) => {
    const filterBarRef = useRef(null);
    const { content, intro } = layoutProps.regions;
    const components = [
        ...(content ? content.components : []),
        ...(intro ? intro.components : []),
    ];
    const { language } = usePageConfig();
    const getLabel = translator('filteredContent', language);

    const { selectedFilters, availableFilters, toggleFilter } =
        useFilterState();

    const { saveScrollPosition, scrollBackToElement } = useScrollPosition(
        filterBarRef?.current
    );

    // Create a flat array of all ids that any
    // underlying part that has filter ids attached.
    // We don't care about duplicate ids in the final array at the moment.
    const filterIds = components.reduce((acc, component) => {
        if (component.config?.filters) {
            return [...acc, ...component.config.filters];
        }

        return acc;
    }, []);

    // None of the parts are attached to filters, so don't show the FilterBar.
    if (filterIds.length === 0) {
        return null;
    }

    // As the previous array is a string[], we need to create a list of the
    // actual filter objects to be able to display filterName later on.
    const filtersToDisplay = availableFilters
        .map((category) => {
            return category.filters
                .filter((filter) => filterIds.includes(filter.id))
                .map((filter) => ({
                    ...filter,
                    categoryName: category.categoryName, // Needed when reporting category back to Amplitude
                }));
        })
        .flat();

    return (
        <div className={style.wrapper}>
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
                                logAmplitudeEvent(AnalyticsEvents.FILTER, {
                                    kategori: filter.categoryName,
                                    filternavn: filter.filterName,
                                    opprinnelse: 'innholdtekst',
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
        </div>
    );
};
