import React from 'react';
import { classNames } from 'utils/classnames';
import { StaticImage } from 'components/_common/image/StaticImage';

import chevron from './chevron_icon.svg';
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
            style={scale ? ({ '--scale': scale } as React.CSSProperties) : undefined}
            aria-hidden={true}
        >
            <div className={classNames(style.outer, color === 'blue' && style.blue)}>
                <div className={classNames(style.line1, style.colorLine)} />
                <div className={style.line2} />
                <div className={style.line3} />
                <div className={style.line5} />
                <div className={classNames(style.line6, style.colorLine)} />
                <div className={style.circle} />
                <StaticImage imageData={chevron} className={style.chevron} />
            </div>
        </div>
    );
};
