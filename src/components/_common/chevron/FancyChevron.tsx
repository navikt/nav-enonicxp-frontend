import React from 'react';
import { classNames } from '../../../utils/classnames';

import style from './FancyChevron.module.scss';

type Props = {
    color: 'white' | 'blue';
    className?: string;
};

export const FancyChevron = ({ color, className }: Props) => {
    return (
        <div
            className={classNames(
                style.outer,
                color === 'blue' && style.blue,
                className
            )}
            aria-hidden={true}
        >
            <div className={classNames(style.line1, style.colorLine)} />
            <div className={classNames(style.line2)} />
            <div className={classNames(style.line3)} />
            <div className={classNames(style.line5)} />
            <div className={classNames(style.line6, style.colorLine)} />
            <div className={classNames(style.circle)} />
            <div className={style.chevronOuter}>
                <div className={style.chevron}>
                    <div className={style.top} />
                    <div className={style.topInner} />
                    <div className={style.bottom} />
                    <div className={style.bottomInner} />
                </div>
            </div>
        </div>
    );
};
