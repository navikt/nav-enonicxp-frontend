import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import './ProgressBars.less';

const bem = BEM('progress-bars');

type Props = {
    currentIndex: number;
    length: number;
    className?: string;
};

export const ProgressBars = ({ currentIndex, length, className }: Props) => {
    return (
        <div className={classNames(bem(), className)} aria-hidden={true}>
            {[...Array(length)].map((_, index) => (
                <span
                    className={classNames(
                        bem('bar'),
                        currentIndex === index && bem('bar', 'current')
                    )}
                    key={index}
                />
            ))}
        </div>
    );
};
