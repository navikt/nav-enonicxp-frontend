import React from 'react';
import { classNames } from '../../../utils/classnames';
import { StaticImage } from '../image/StaticImage';

import style from './FancyChevron.module.scss';

import chevron from './chevron_icon.svg';

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
                <StaticImage
                    imageData={chevron}
                    alt={''}
                    className={style.chevron}
                />
            </div>
        </div>
    );
};
