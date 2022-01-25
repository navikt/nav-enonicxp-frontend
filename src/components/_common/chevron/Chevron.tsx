import React from 'react';
import { Next } from '@navikt/ds-icons';
import { BEM, classNames } from '../../../utils/classnames';

const bem = BEM('chevron');

type Props = {
    direction?: 'up' | 'right' | 'down' | 'left';
    className?: string;
};

export const Chevron = ({ direction = 'right', className }: Props) => {
    return (
        <Next
            className={classNames(bem(), bem(undefined, direction), className)}
        />
    );
};
