import { Checkbox } from 'nav-frontend-skjema';
import { Filter } from 'types/store/filter-menu';
import { BEM, classNames } from '../../../../utils/classnames';
import './FilterCheckbox.less';

const bem = BEM('filter-checkbox');

type FilterCheckboxProps = {
    isSelected: boolean;
    filter: Filter;
    onToggleFilterHandler: (filterId: string) => void;
};

export const FilterCheckbox = ({
    isSelected,
    filter,
    onToggleFilterHandler,
}: FilterCheckboxProps) => {
    return (
        <div
            className={classNames(
                bem('wrapper'),
                isSelected && bem('wrapper', 'selected')
            )}
        >
            <Checkbox
                onChange={(event) => onToggleFilterHandler(event.target.value)}
                checked={isSelected}
                value={filter.id}
                label={filter.filterName}
            />
        </div>
    );
};
