import React, { useEffect } from 'react';
import { BodyLong, CheckboxGroup } from '@navikt/ds-react';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { translator } from 'translations';
import { useFilterState } from 'store/hooks/useFilteredContent';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { FilterExplanation } from 'components/_common/filter-bar/FilterExplanation';
import { FilterCheckbox } from './FilterCheckbox';
import { Filter } from 'types/store/filter-menu';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { checkIfFilterFirstInPage } from './helpers';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { ExpandableMixin } from 'types/component-props/_mixins';

import style from './FiltersMenu.module.scss';

export type FilterMenuFilter = {
    filterName: string;
    id: string;
};

export type FilterMenuCategory = {
    categoryName: string;
    filters: FilterMenuFilter[];
};

export type PartConfigFilterMenu = {
    title?: string;
    description: string;
    categories: FilterMenuCategory[];
} & ExpandableMixin;

export const FiltersMenuPart = ({ config, path }: PartComponentProps<PartType.FiltersMenu>) => {
    const { language, editorView, page } = usePageContentProps();
    const { categories, description, expandableTitle, title } = config;

    const { clearFiltersForPage, selectedFilters, setAvailableFilters, toggleFilter } =
        useFilterState();

    const isFirstFilterInPage = checkIfFilterFirstInPage({
        path,
        page,
    });

    useEffect(() => {
        // Multiple FilterMenus in same page will break.
        // So only setAvailableFilters (adding filters to Redux store)
        // if this filter is the first one.
        if (isFirstFilterInPage) {
            setAvailableFilters(categories);
        }
    }, [categories, setAvailableFilters, isFirstFilterInPage]);

    useEffect(() => {
        if (isFirstFilterInPage) {
            return;
        }
        return () => {
            clearFiltersForPage();
        };
        /* eslint-disable-next-line */
    }, []);

    const getLabel = translator('filteredContent', language);

    const onToggleFilterHandler = (filter: Filter, category: FilterMenuCategory) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            kategori: category.categoryName,
            filternavn: filter.filterName,
            opprinnelse: 'filtermeny',
        });
        toggleFilter(filter.id);
    };

    if (!isFirstFilterInPage) {
        return (
            <EditorHelp
                type="error"
                text="Du har lagt til flere filtreringsbokser (Hva er situasjonen din?). Du kan bare ha én filtreringsboks per side. Legg heller inn flere filtreringsvalg i den ene boksen. Fjern denne feilmeldingen ved å høyreklikke og velge fjern."
            />
        );
    }

    if (!editorView && !isFirstFilterInPage) {
        return null;
    }

    // Will only show if editor didn't add any actual filters in the FiltersMenu part.
    if (!config?.categories) {
        return (
            <EditorHelp
                type="error"
                text="Det er ikke lagt til noen filtere i denne filtermenyen!"
            />
        );
    }

    const defaultExpandableTitle = getLabel('customizeContent');

    return (
        <section className={style.filtersMenu} aria-describedby="description">
            {title && (
                <Header level="2" size="large" justify="left">
                    {title}
                </Header>
            )}
            <BodyLong className={style.introduction} id="description">
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
                            className={style.category}
                        >
                            {category.filters.map((filter, filterIndex) => (
                                <FilterCheckbox
                                    onToggleFilterHandler={() => {
                                        onToggleFilterHandler(filter, category);
                                    }}
                                    filter={filter}
                                    isSelected={selectedFilters.includes(filter.id)}
                                    key={filterIndex}
                                />
                            ))}
                            <FilterExplanation
                                selectedFilters={selectedFilters}
                                availableFilters={category.filters.map((filter) => filter.id)}
                            />
                        </CheckboxGroup>
                    );
                })}
            </ExpandableComponentWrapper>
        </section>
    );
};
