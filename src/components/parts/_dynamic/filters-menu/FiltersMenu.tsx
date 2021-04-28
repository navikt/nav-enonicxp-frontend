import React from 'react';
import { FilterMenuProps } from '../../../../types/component-props/parts/filter-menu';
import { Systemtittel } from 'nav-frontend-typografi';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Expandable } from '../../../_common/expandable/Expandable';
import { BEM } from '../../../../utils/classnames';
import './FiltersMenu.less';

const defaultTitle = 'Tilpass innhold';

const bem = BEM('filters-menu');

export const FiltersMenu = ({ config }: FilterMenuProps) => {
    if (!config?.categories) {
        return <div>{'Tom filter-meny'}</div>;
    }

    const { categories, title, expandable, expandableTitle } = config;

    const toggleFilter = (id: string) => {
        console.log(id);
        // TODO: toggle filters in global state
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
                                toggleFilter(event.target.value)
                            }
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
