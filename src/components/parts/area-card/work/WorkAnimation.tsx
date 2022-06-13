import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import compass from './gfx/compass.svg';
import letterS from './gfx/letterS.svg';
import heart from './gfx/heart.svg';
import hand from './gfx/hand.svg';

import style from './WorkAnimation.module.scss';

export const WorkAnimation = () => {
    return (
        <>
            <StaticImage imageData={compass} className={style.compass} alt="" />
            <StaticImage imageData={letterS} className={style.letterS} alt="" />
            <div className={style.mask} />
            <StaticImage imageData={heart} className={style.heart} alt="" />
            <StaticImage imageData={hand} className={style.hand} alt="" />
        </>
    );
};
