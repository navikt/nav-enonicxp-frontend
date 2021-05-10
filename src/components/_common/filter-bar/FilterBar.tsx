import { FilterCheckbox } from 'components/parts/_dynamic/filters-menu/FilterCheckbox';
import { Element } from 'nav-frontend-typografi';
import { useFilterState } from 'store/hooks/useFilteredContent';
import { SectionWithHeaderProps } from 'types/component-props/layouts/section-with-header';
import { BEM, classNames } from '../../../utils/classnames';

import './FilterBar.less';

const bem = BEM('filter-bar');

type FilterBarProps = {
    layoutProps?: SectionWithHeaderProps;
};

export const FilterBar = ({ layoutProps }: FilterBarProps) => {
    const { components } = layoutProps.regions.content;
    const {
        selectedFilters,
        availableFilters,
        toggleFilter,
        clearFilters,
    } = useFilterState();

    // Create a flat array of all ids that any
    // underlying part that has filter ids attached.
    // We don't care about duplicate ids in the final array at the moment.
    const filterIds = components.reduce((acc, component) => {
        if (component.config.filters) {
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
            return category.filters.filter((filter) =>
                filterIds.includes(filter.id)
            );
        })
        .flat();

    const selectedFilterCount = filterIds.filter((filterId) =>
        selectedFilters.includes(filterId)
    ).length;

    const isShowingAllSituations =
        selectedFilterCount === 0 || selectedFilterCount === filterIds.length;

    return (
        <div className={bem('wrapper')}>
            <Element tag="h3" className="overskrift">
                Viser informasjon for:
            </Element>
            <FilterCheckbox
                isSelected={isShowingAllSituations}
                onToggleFilterHandler={() => clearFilters(filterIds)}
                filter={{ id: '0', filterName: 'Vis alle situasjoner' }}
            />
            <div className={bem('container')}>
                {filtersToDisplay.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id);
                    return (
                        <FilterCheckbox
                            key={filter.id}
                            isSelected={isSelected}
                            onToggleFilterHandler={() =>
                                toggleFilter(filter.id)
                            }
                            filter={filter}
                        />
                    );
                })}
            </div>
        </div>
    );
};
