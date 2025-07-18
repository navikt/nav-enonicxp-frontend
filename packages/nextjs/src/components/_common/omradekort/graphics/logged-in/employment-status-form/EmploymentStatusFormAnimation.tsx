import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import shapes from './gfx/shapes.svg';
import letter from './gfx/letter.svg';

import style from './EmploymentStatusFormAnimation.module.scss';

export const EmploymentStatusFormAnimation = () => {
    return (
        <>
            <StaticImage imageData={shapes} className={style.shapes} />
            <div className={style.letterPartBlue} />
            <div className={style.letterPartOrange} />
            <div className={style.letterPartBlueTwo} />
            <div className={style.mask} />
            <StaticImage imageData={letter} className={style.letter} />
        </>
    );
};
