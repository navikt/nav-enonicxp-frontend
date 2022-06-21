import { ReactNode } from 'react';
import { classNames } from 'utils/classnames';
import style from './Chip.module.scss';

type ChipProps = {
    children: ReactNode;
    selected?: boolean;
};

export const Chip = ({ children, selected }: ChipProps) => {
    return (
        <div className={classNames(style.chip, selected && style.selected)}>
            {children}
        </div>
    );
};
