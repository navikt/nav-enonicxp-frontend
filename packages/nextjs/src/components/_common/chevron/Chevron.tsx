import React from 'react';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from '@navikt/aksel-icons';

type Props = {
    direction?: 'Up' | 'Right' | 'Down' | 'Left';
    className?: string;
};
const ChevronIcon = {
    Up: ChevronUpIcon,
    Right: ChevronRightIcon,
    Down: ChevronDownIcon,
    Left: ChevronLeftIcon,
};

export const Chevron = ({ direction = 'Right', className }: Props) => {
    const Icon = ChevronIcon[direction];
    return <Icon className={className} aria-hidden />;
};
