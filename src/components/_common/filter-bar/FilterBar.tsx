import { Element } from 'nav-frontend-typografi';
import { useFilterState } from 'store/hooks/useFilteredContent';
import { Chip } from '../chip/Chip';
import './FilterBar.less';

type FilterBarProps = {
    layoutProps?: any;
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

    const listOfFilters = components.reduce((acc, component) => {
        if (component.config.filters) {
            return [...acc, ...component.config.filters];
        }

        return acc;
    }, []);

    if (listOfFilters.length === 0) {
        return null;
    }

    const filtersToDisplay = availableFilters
        .map((category) => {
            return category.filters.filter((filter) =>
                listOfFilters.includes(filter.id)
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
