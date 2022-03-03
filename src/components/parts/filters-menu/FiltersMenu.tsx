import React, { useEffect } from 'react';
import { BodyLong, CheckboxGroup } from '@navikt/ds-react';

import { logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { useFilterState } from '../../../store/hooks/useFilteredContent';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { FilterMenuProps } from '../../../types/component-props/parts/filter-menu';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilterExplanation } from '../../_common/filter-bar/FilterExplanation';
import { FilterCheckbox } from './FilterCheckbox';
import { BEM } from '../../../utils/classnames';
import { Filter } from 'types/store/filter-menu';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from 'components/_common/editor-utils/editor-help/EditorHelp';

const bem = BEM('filters-menu');

export const FiltersMenu = ({ isFilterDuplicate, config }: FilterMenuProps) => {
    const { categories, description, expandableTitle, title } = config;

    const {
        clearFiltersForPage,
        selectedFilters,
        setAvailableFilters,
        toggleFilter,
    } = useFilterState();

    const { language, pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    useEffect(() => {
        // Don't add available filters (to redux store) if this
        // FiltersMenu is marked as duplicate
        if (!isFilterDuplicate) {
            setAvailableFilters(categories);
        }
    }, [categories, setAvailableFilters, isFilterDuplicate]);

    useEffect(() => {
        if (isFilterDuplicate) {
            return;
        }
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

    if (editorView && isFilterDuplicate) {
        return (
            <EditorHelp
                type="error"
                text="Det ser ut til at du har lagt inn flere Filtreringsmeny-parts! Malene støtter kun én Filtreringsmeny pr side. Legg istedet inn filter-valgene du trenger i Filtreringsmenyen ovenfor. For å fjerne dette området - markerer og sletter du."
            />
        );
    }

    if (!editorView && isFilterDuplicate) {
        return null;
    }

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
            <ExpandableComponentWrapper
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
            </ExpandableComponentWrapper>
        </section>
    );
};
