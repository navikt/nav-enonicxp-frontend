import React from 'react';
import { FilterMenuProps } from '../../../../types/component-props/parts/filter-menu';
import { Systemtittel } from 'nav-frontend-typografi';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Expandable } from '../../../_common/expandable/Expandable';
import { BEM } from '../../../../utils/classnames';
import './FiltersMenu.less';

import { useFilterState } from '../../../../store/hooks/useFilterState';

const defaultTitle = 'Tilpass innhold';

const bem = BEM('filters-menu');

export const FiltersMenu = ({ config }: FilterMenuProps) => {
    const dummyId = '1234';
    const { contentFilters, toggleFilter } = useFilterState(dummyId);

    console.log(contentFilters);

    if (!config?.categories) {
        return <div>{'Tom filter-meny'}</div>;
    }

    const { categories, title, expandable, expandableTitle } = config;

    const onToggleFilterHandler = (id: string) => {
        toggleFilter({ pageId: dummyId, filterId: id });
    };

    return (
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
                        <Checkbox
                            onChange={(event) =>
                                onToggleFilterHandler(event.target.value)
                            }
                            checked={contentFilters.includes(filter.id)}
                            value={filter.id}
                            label={filter.filterName}
                            key={filterIndex}
                        />
                    ))}
                </CheckboxGruppe>
            ))}
        </Expandable>
    );
};
