import React, { useEffect } from 'react';
import { FilterMenuProps } from '../../../../types/component-props/parts/filter-menu';
import { Systemtittel } from 'nav-frontend-typografi';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Expandable } from '../../../_common/expandable/Expandable';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { ProductPageLayout } from '@navikt/ds-react';
import { BEM } from '../../../../utils/classnames';
import './FiltersMenu.less';

import { useFilterState } from '../../../../store/hooks/useFilteredContent';

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
    } = useFilterState();

    useEffect(() => setAvailableFilters(categories), [
        categories,
        setAvailableFilters,
    ]);

    if (!config?.categories) {
        return <div>{'Tom filter-meny'}</div>;
    }

    const onToggleFilterHandler = (id: string) => {
        toggleFilter(id);
    };

    return (
        <ProductPageLayout.Panel
            title={title}
            highlight
            className={bem('wrapper')}
        >
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
                            <Checkbox
                                onChange={(event) =>
                                    onToggleFilterHandler(event.target.value)
                                }
                                checked={selectedFilters.includes(filter.id)}
                                value={filter.id}
                                label={filter.filterName}
                                key={filterIndex}
                            />
                        ))}
                    </CheckboxGruppe>
                ))}
            </Expandable>
        </ProductPageLayout.Panel>
    );
};
