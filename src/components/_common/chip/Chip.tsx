import { ReactNode } from 'react';
import { classNames } from 'utils/classnames';
import style from './Chip.module.scss';

type ChipProps = {
    children: ReactNode;
    selected?: boolean;
    className?: string;
};

export const Chip = ({ children, selected, className }: ChipProps) => {
    return (
        <div
            className={classNames(
                style.chip,
                selected && style.selected,
                className
            )}
        >
            {children}
        </div>
    );
};
