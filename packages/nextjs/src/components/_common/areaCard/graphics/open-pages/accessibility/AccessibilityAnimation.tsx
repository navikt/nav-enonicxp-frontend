import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import arrow from './gfx/arrow.svg';
import dog from './gfx/dog.svg';

import style from './AccessibilityAnimation.module.scss';

export const AccessibilityAnimation = () => {
    return (
        <>
            <StaticImage imageData={arrow} className={style.arrow} />
            <div className={style.letterPartOrange} />
            <div className={style.letterPartBlue} />
            <div className={style.mask} />
            <StaticImage imageData={dog} className={style.dog} />
        </>
    );
};
