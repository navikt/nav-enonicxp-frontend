import React from 'react';
import { BEM } from '../../../utils/bem';
import './ProgressBars.less';

const bem = BEM('progress-bars');

type Props = {
    currentIndex: number;
    length: number;
};

const Bar = (fill: number) => {
    return (
        <span className={bem('bar-outer')}>
            <span
                className={bem('bar-inner')}
                style={{ width: `${fill * 100}%` }}
            />
        </span>
    );
};

export const ProgressBars = ({ currentIndex, length }: Props) => {
    return <div className={bem()}>{'test'}</div>;
};
