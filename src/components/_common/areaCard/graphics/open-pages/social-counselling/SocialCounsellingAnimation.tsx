import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import compass from './gfx/compass.svg';
import letterS from './gfx/letterS.svg';
import heart from './gfx/heart.svg';
import hand from './gfx/hand.svg';

import style from './SocialCounsellingAnimation.module.scss';

export const SocialCounsellingAnimation = () => {
    return (
        <>
            <StaticImage imageData={compass} className={style.compass} />
            <StaticImage imageData={letterS} className={style.letterS} />
            <div className={style.mask} />
            <StaticImage imageData={heart} className={style.heart} />
            <StaticImage imageData={hand} className={style.hand} />
        </>
    );
};
