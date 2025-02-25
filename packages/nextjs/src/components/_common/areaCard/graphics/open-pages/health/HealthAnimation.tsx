import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import pill from './gfx/pill.svg';
import stethoscope from './gfx/stethoscope.svg';

import style from './HealthAnimation.module.scss';

export const HealthAnimation = () => {
    return (
        <>
            <StaticImage imageData={pill} className={style.pill} />
            <div className={style.letterPartOrange} />
            <div className={style.letterPartBlue} />
            <div className={style.mask} />
            <StaticImage imageData={stethoscope} className={style.stethoscope} />
        </>
    );
};
