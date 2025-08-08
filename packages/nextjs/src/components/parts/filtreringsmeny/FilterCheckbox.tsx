import { useId } from 'react';
import { Filter } from 'types/store/filtreringsmeny';
import { classNames } from 'utils/classnames';
import { StaticImage } from 'components/_common/image/StaticImage';

import checkboxIcon from './checkbox.svg';
import checkedIcon from './checked.svg';
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
        <div className={classNames(style.filterCheckbox, isSelected && style.selected)}>
            <input
                type="checkbox"
                onChange={onToggleFilterHandler}
                checked={isSelected}
                value={filter.id}
                id={id}
                className={style.checkbox}
            />
            <label htmlFor={id} className={classNames(style.label, isSelected && style.selected)}>
                {isSelected ? (
                    <StaticImage imageData={checkedIcon} className={style.selected} />
                ) : (
                    <StaticImage imageData={checkboxIcon} />
                )}
                {filter.filterName}
            </label>
        </div>
    );
};
