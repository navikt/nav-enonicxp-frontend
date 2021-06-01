import React, { useEffect } from 'react';
import { FilterMenuProps } from '../../../../types/component-props/parts/filter-menu';
import { Systemtittel } from 'nav-frontend-typografi';
import { CheckboxGruppe } from 'nav-frontend-skjema';
import { Undertekst } from 'nav-frontend-typografi';
import { Expandable } from '../../../_common/expandable/Expandable';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { FilterCheckbox } from './FilterCheckbox';
import { BEM } from '../../../../utils/classnames';
import { Filter } from 'types/store/filter-menu';
import './FiltersMenu.less';
import { Information } from '@navikt/ds-icons';
import { useFilterState } from '../../../../store/hooks/useFilteredContent';
import { Header } from 'components/_common/header/Header';

import { logAmplitudeEvent } from 'utils/amplitude';

const defaultTitle = 'Tilpass innhold';

const bem = BEM('filters-menu');

export const FiltersMenu = ({ config }: FilterMenuProps) => {
    const {
        categories,
        description,
        expandable,
        expandableTitle,
        title,
    } = config;

    const {
        clearFiltersForPage,
        selectedFilters,
        setAvailableFilters,
        toggleFilter,
    } = useFilterState();

    useEffect(() => {
        setAvailableFilters(categories);
    }, [categories, setAvailableFilters]);

    useEffect(() => {
        return () => {
            clearFiltersForPage();
        };
        /* eslint-disable-next-line */
    }, []);

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
        return <div>{'Det mangler filtere i denne listen.'}</div>;
    }

    const filterExplanation =
        selectedFilters.length === 0
            ? 'Ingen filtere er valgt, så alt innhold vises.'
            : 'Vi har fjernet innhold som ikke er relevant i din situasjon.';

    return (
        <div className={bem('wrapper')}>
            <Header tag="h2" justify="left">
                {title}
            </Header>
            <Tekstomrade className={bem('introduction')}>
                {description || ''}
            </Tekstomrade>
            <Expandable
                {...config}
                expandableTitle={expandableTitle || defaultTitle}
            >
                {!expandable && (
                    <Systemtittel tag={'h3'} className={bem('title')}>
                        {title || defaultTitle}
                    </Systemtittel>
                )}
                {categories.map((category, categoryIndex) => {
                    return (
                        <CheckboxGruppe
                            legend={category.categoryName}
                            key={categoryIndex}
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
                        </CheckboxGruppe>
                    );
                })}
                <Undertekst className={bem('explanation')}>
                    <Information
                        color="#0067c5"
                        style={{ marginRight: '4px' }}
                    />{' '}
                    {filterExplanation}
                </Undertekst>
            </Expandable>
        </div>
    );
};
