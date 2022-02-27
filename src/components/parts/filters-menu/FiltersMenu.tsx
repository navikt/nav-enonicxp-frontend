import React, { useEffect } from 'react';
import { BodyLong, CheckboxGroup } from '@navikt/ds-react';

import { logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { useFilterState } from '../../../store/hooks/useFilteredContent';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { FilterMenuProps } from '../../../types/component-props/parts/filter-menu';
import { ExpandableComponent } from '../../_common/expandable/ExpandableComponent';
import { FilterExplanation } from '../../_common/filter-bar/FilterExplanation';
import { FilterCheckbox } from './FilterCheckbox';
import { BEM } from '../../../utils/classnames';
import { Filter } from 'types/store/filter-menu';
import { Header } from 'components/_common/headers/Header';

const bem = BEM('filters-menu');

export const FiltersMenu = ({ config }: FilterMenuProps) => {
    const { categories, description, expandableTitle, title } = config;

    const {
        clearFiltersForPage,
        selectedFilters,
        setAvailableFilters,
        toggleFilter,
    } = useFilterState();

    const { language } = usePageConfig();

    useEffect(() => {
        setAvailableFilters(categories);
    }, [categories, setAvailableFilters]);

    useEffect(() => {
        return () => {
            clearFiltersForPage();
        };
        /* eslint-disable-next-line */
    }, []);

    const getLabel = translator('filteredContent', language);

    const onToggleFilterHandler = (filter: Filter, category) => {
        logAmplitudeEvent('filtervalg', {
            kategori: category.categoryName,
            filternavn: filter.filterName,
            opprinnelse: 'filtermeny',
        });
        toggleFilter(filter.id);
    };

    // Will only show if editor didn't add any actual filters in the FiltersMenu part.
    if (!config?.categories) {
        return <div>{'Det mangler filtre i denne listen.'}</div>;
    }

    const defaultExpandableTitle = getLabel('customizeContent');

    return (
        <section className={bem('wrapper')} aria-describedby="description">
            {title && (
                <Header level="2" size="large" justify="left">
                    {title}
                </Header>
            )}
            <BodyLong className={bem('introduction')} id="description">
                {description || ''}
            </BodyLong>
            <ExpandableComponent
                {...config}
                expandableTitle={expandableTitle || defaultExpandableTitle}
                analyticsOriginTag="filter"
            >
                {categories.map((category, categoryIndex) => {
                    return (
                        <CheckboxGroup
                            legend={category.categoryName}
                            key={categoryIndex}
                            className={bem('category')}
                        >
                            {category.filters.map((filter, filterIndex) => (
                                <FilterCheckbox
                                    onToggleFilterHandler={() => {
                                        onToggleFilterHandler(filter, category);
                                    }}
                                    filter={filter}
                                    isSelected={selectedFilters.includes(
                                        filter.id
                                    )}
                                    key={filterIndex}
                                />
                            ))}
                            <FilterExplanation
                                selectedFilters={selectedFilters}
                                availableFilters={category.filters.map(
                                    (filter) => filter.id
                                )}
                            />
                        </CheckboxGroup>
                    );
                })}
            </ExpandableComponent>
        </section>
    );
};
