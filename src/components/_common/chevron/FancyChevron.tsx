import React from 'react';
import { classNames } from '../../../utils/classnames';

import style from './FancyChevron.module.scss';

type Props = {
    color: 'white' | 'blue';
    scale?: number;
    className?: string;
};

export const FancyChevron = ({ color, scale, className }: Props) => {
    return (
        <div
            className={classNames(className, style.scaleWrapper)}
            style={
                scale
                    ? ({ '--scale': scale } as React.CSSProperties)
                    : undefined
            }
            aria-hidden={true}
        >
            <div
                className={classNames(
                    style.outer,
                    color === 'blue' && style.blue
                )}
            >
                <div className={classNames(style.line1, style.colorLine)} />
                <div className={style.line2} />
                <div className={style.line3} />
                <div className={style.line5} />
                <div className={classNames(style.line6, style.colorLine)} />
                <div className={style.circle} />
                <div className={style.chevronOuter}>
                    <div className={style.chevron}>
                        <div className={style.top} />
                        <div className={style.topInner} />
                        <div className={style.bottom} />
                        <div className={style.bottomInner} />
                    </div>
                </div>
            </div>
        </div>
    );
};
