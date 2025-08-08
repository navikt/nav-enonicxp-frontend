import React, { useEffect } from 'react';
import { BodyLong, CheckboxGroup } from '@navikt/ds-react';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { translator } from 'translations';
import { useFilterState } from 'store/hooks/useFilteredContent';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { FilterExplanation } from 'components/_common/filter-bar/FilterExplanation';
import { Filter } from 'types/store/filtreringsmeny';
import { Heading } from 'components/_common/headers/Heading';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { ExpandableMixin } from 'types/component-props/_mixins';
import { checkIfFilterFirstInPage } from './helpers';
import { FilterCheckbox } from './FilterCheckbox';

import style from './Filtreringsmeny.module.scss';

export type FiltreringsmenyFilter = {
    filterName: string;
    id: string;
};

export type FiltreringsmenyCategory = {
    categoryName: string;
    filters: FiltreringsmenyFilter[];
};

export type PartConfigFiltreringsmeny = {
    title?: string;
    description: string;
    categories: FiltreringsmenyCategory[];
} & ExpandableMixin;

export const FiltreringsmenyPart = ({
    config,
    path,
}: PartComponentProps<PartType.Filtreringsmeny>) => {
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const { language, editorView, page } = contentProps;
    const { categories, description, expandableTitle, title } = config;
    const { clearFiltersForPage, selectedFilters, setAvailableFilters, toggleFilter } =
        useFilterState();
    const isFirstFilterInPage = checkIfFilterFirstInPage({ path, page });

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
    const onToggleFilterHandler = (filter: Filter, category: FiltreringsmenyCategory) => {
        logAnalyticsEvent(AnalyticsEvents.FILTER, {
            kategori: category.categoryName,
            filternavn: filter.filterName,
            opprinnelse: 'filtermeny',
            komponent: 'FiltreringsmenyPart',
            målgruppe: context,
            innholdstype: innholdsTypeMap[contentProps.type],
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
        <section className={style.filtreringsmeny} aria-describedby="filters-menu-description">
            {title && (
                <Heading level="2" size="large">
                    {title}
                </Heading>
            )}
            <BodyLong className={style.introduction} id="filters-menu-description">
                {description || ''}
            </BodyLong>
            <ExpandableComponentWrapper
                {...config}
                expandableTitle={expandableTitle || defaultExpandableTitle}
                analyticsOriginTag="filter"
            >
                {categories.map((category) => {
                    return (
                        <CheckboxGroup
                            legend={category.categoryName}
                            key={category.categoryName}
                            className={style.category}
                        >
                            {category.filters.map((filter) => (
                                <FilterCheckbox
                                    onToggleFilterHandler={() => {
                                        onToggleFilterHandler(filter, category);
                                    }}
                                    filter={filter}
                                    isSelected={selectedFilters.includes(filter.id)}
                                    key={filter.id}
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
