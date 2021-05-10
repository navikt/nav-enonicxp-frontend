import { Filter } from 'types/store/filter-menu';
import { BEM, classNames } from '../../../../utils/classnames';
import './FilterCheckbox.less';
import { v4 as uuid } from 'uuid';

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
    const id = uuid();

    return (
        <div
            className={classNames(
                bem('wrapper'),
                isSelected && bem('wrapper', 'selected')
            )}
        >
            <input
                type="checkbox"
                onChange={(event) => onToggleFilterHandler(event.target.value)}
                checked={isSelected}
                value={filter.id}
                id={id}
                className={bem('checkbox')}
            />
            <label
                htmlFor={id}
                className={classNames(
                    bem('label'),
                    isSelected && bem('label', 'selected')
                )}
            >
                {filter.filterName}
            </label>
        </div>
    );
};
