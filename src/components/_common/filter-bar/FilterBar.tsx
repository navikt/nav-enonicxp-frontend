import { Element } from 'nav-frontend-typografi';
import { useFilterState } from 'store/hooks/useFilteredContent';
import { SectionWithHeaderProps } from 'types/component-props/layouts/section-with-header';
import { Chip } from '../chip/Chip';
import './FilterBar.less';

type FilterBarProps = {
    layoutProps?: SectionWithHeaderProps;
};

export const FilterBar = ({ layoutProps }: FilterBarProps) => {
    const { components } = layoutProps.regions.content;
    const {
        selectedFilters,
        availableFilters,
        toggleFilter,
    } = useFilterState();

    const onFilterClick = (filterId: string) => {
        toggleFilter(filterId);
    };

    // Create a flat array of all ids that any
    // underlying part that has filter ids attached.
    // We don't care about duplicate ids in the final array at the moment.
    const filterIds = components.reduce((acc, component) => {
        if (component.config.filters) {
            return [...acc, ...component.config.filters];
        }

        return acc;
    }, []);

    // None of the parts are using any filters, so don't show the FilterBar.
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

    return (
        <div className="filterBar">
            <Element tag="h3" className="overskrift">
                Viser informasjon for:
            </Element>
            {filtersToDisplay.map((filter) => {
                const isSelected = selectedFilters.includes(filter.id);
                return (
                    <Chip
                        ariaLabel={
                            isSelected
                                ? `Skjul ${filter.filterName}`
                                : `Vis  ${filter.filterName}`
                        }
                        role="option"
                        key={filter.id}
                        selected={isSelected}
                        onClick={() => onFilterClick(filter.id)}
                    >
                        {filter.filterName}
                    </Chip>
                );
            })}
        </div>
    );
};
