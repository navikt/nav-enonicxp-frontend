import React, { useEffect } from 'react';
import { FilterMenuProps } from '../../../../types/component-props/parts/filter-menu';
import { Systemtittel } from 'nav-frontend-typografi';
import { CheckboxGruppe } from 'nav-frontend-skjema';
import { Expandable } from '../../../_common/expandable/Expandable';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { FilterCheckbox } from './FilterCheckbox';
import { BEM } from '../../../../utils/classnames';
import './FiltersMenu.less';

import { useFilterState } from '../../../../store/hooks/useFilteredContent';
import { Header } from 'components/_common/header/Header';

const defaultTitle = 'Tilpass innhold';

const bem = BEM('filters-menu');

export const FiltersMenu = ({ config }: FilterMenuProps) => {
    const {
        categories,
        title,
        description,
        expandable,
        expandableTitle,
    } = config;

    const {
        selectedFilters,
        toggleFilter,
        setAvailableFilters,
        clearFiltersForPage,
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

    if (!config?.categories) {
        return <div>{'Tom filter-meny'}</div>;
    }

    const onToggleFilterHandler = (id: string) => {
        toggleFilter(id);
    };

    return (
        <div className={bem('wrapper')}>
            <Header tag="h2" justify="left">
                {title}
            </Header>
            <Tekstomrade>{description}</Tekstomrade>
            <Expandable
                {...config}
                expandableTitle={expandableTitle || defaultTitle}
            >
                {!expandable && (
                    <Systemtittel tag={'h3'} className={bem('title')}>
                        {title || defaultTitle}
                    </Systemtittel>
                )}
                {categories.map((category, indexCategory) => (
                    <CheckboxGruppe
                        legend={category.categoryName}
                        key={indexCategory}
                    >
                        {category.filters.map((filter, filterIndex) => (
                            <FilterCheckbox
                                onToggleFilterHandler={(filterId) =>
                                    onToggleFilterHandler(filterId)
                                }
                                filter={filter}
                                isSelected={selectedFilters.includes(filter.id)}
                                key={filterIndex}
                            />
                        ))}
                    </CheckboxGruppe>
                ))}
            </Expandable>
        </div>
    );
};
