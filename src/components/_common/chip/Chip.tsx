import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import './chip.less';

const bem = BEM('chip');

type ChipProps = {
    children: React.ReactChild;
    selected: boolean;
    role: string;
    ariaLabel: string;
    onClick: () => void;
};

export const Chip = ({
    children,
    selected,
    onClick,
    role,
    ariaLabel,
}: ChipProps) => {
    return (
        <button
            role={role}
            type="button"
            aria-selected={selected}
            aria-label={ariaLabel}
            className={classNames(
                bem('button'),
                selected ? bem('button', 'added') : bem('button', 'addable')
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
