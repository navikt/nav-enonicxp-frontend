import { Filter } from 'types/store/filter-menu';
import { classNames } from '../../../utils/classnames';
import { useId } from 'react';

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
    const id = useId();

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
                id={filter.id}
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
