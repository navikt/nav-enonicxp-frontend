import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import shapes from './gfx/shapes.svg';
import piggyBank from './gfx/piggyBank.svg';
import letterPartBlue from './gfx/letterPartBlue.svg';

import style from './PensionAnimation.module.scss';

export const PensionAnimation = () => {
    return (
        <>
            <StaticImage imageData={shapes} className={style.shapes} />
            <StaticImage imageData={letterPartBlue} className={style.letterPartBlue} />
            <div className={style.mask} />
            <StaticImage imageData={piggyBank} className={style.piggyBank} />
            <div className={style.coin} />
        </>
    );
};
