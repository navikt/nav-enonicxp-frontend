import { ChangeEvent, useId } from 'react';
import { Filter } from 'types/store/filter-menu';
import { classNames } from 'utils/classnames';
import { StaticImage } from 'components/_common/image/StaticImage';

import checkboxIcon from './checkbox.svg';
import checkedIcon from './checked.svg';
import style from './FilterCheckbox.module.scss';

type FilterCheckboxProps = {
    isSelected: boolean;
    filter: Filter;
    onToggleFilterHandler: (e?: ChangeEvent) => void;
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
                onChange={(e) => onToggleFilterHandler(e)}
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
                {!isSelected && <StaticImage imageData={checkboxIcon} alt="" />}
                {isSelected && (
                    <StaticImage
                        imageData={checkedIcon}
                        alt=""
                        className={style.selected}
                    />
                )}
                {filter.filterName}
            </label>
        </div>
    );
};
