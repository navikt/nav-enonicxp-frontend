import { Filter } from 'types/store/filter-menu';
import { classNames } from '../../../utils/classnames';
import { v4 as uuid } from 'uuid';

import style from './FilterCheckbox.module.scss';

type FilterCheckboxProps = {
    isSelected: boolean;
    filter: Filter;
    onToggleFilterHandler: () => void;
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
                style.filterCheckbox,
                isSelected && style.selected
            )}
        >
            <input
                type="checkbox"
                onChange={onToggleFilterHandler}
                checked={isSelected}
                value={filter.id}
                id={id}
                className={style.checkbox}
            />
            <label
                htmlFor={id}
                className={classNames(
                    style.label,
                    isSelected && style.selected
                )}
            >
                {filter.filterName}
            </label>
        </div>
    );
};
