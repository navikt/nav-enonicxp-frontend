import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import './Chip.less';

const bem = BEM('chip');

type ChipProps = {
    ariaLabel: string;
    children: React.ReactChild;
    onClick: () => void;
    role: string;
    selected: boolean;
};

export const Chip = ({
    ariaLabel,
    children,
    onClick,
    role,
    selected,
}: ChipProps) => {
    return (
        <button
            aria-selected={selected}
            aria-label={ariaLabel}
            className={classNames(
                bem('button'),
                selected && bem('button', 'checked')
            )}
            onClick={onClick}
            role={role}
            type="button"
        >
            {children}
        </button>
    );
};
