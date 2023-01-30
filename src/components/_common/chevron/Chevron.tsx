import React from 'react';
import { Next } from '@navikt/ds-icons';
import { classNames } from '../../../utils/classnames';

// eslint does not understand bracket notation
// eslint-disable-next-line css-modules/no-unused-class
import style from './Chevron.module.scss';

type Props = {
    direction?: 'up' | 'right' | 'down' | 'left';
    className?: string;
};

export const Chevron = ({ direction = 'right', className }: Props) => {
    return (
        <Next
            className={classNames(
                'chevron',
                direction && style[direction],
                className
            )}
            aria-hidden="true"
        />
    );
};
