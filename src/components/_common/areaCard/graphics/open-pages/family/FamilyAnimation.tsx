import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import house from './gfx/house.svg';
import stroller from './gfx/stroller.svg';

import style from './FamilyAnimation.module.scss';

export const FamilyAnimation = () => {
    return (
        <>
            <StaticImage imageData={house} className={style.house} />
            <div className={style.letterPartOrange} />
            <div className={style.letterPartBlue} />
            <div className={style.mask} />
            <StaticImage imageData={stroller} className={style.stroller} />
        </>
    );
};
