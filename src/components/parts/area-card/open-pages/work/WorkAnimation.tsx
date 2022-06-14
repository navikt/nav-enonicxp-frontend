import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import briefcase from './gfx/briefcase.svg';
import shapes from './gfx/shapes.svg';

import style from './WorkAnimation.module.scss';

export const WorkAnimation = () => {
    return (
        <>
            <StaticImage imageData={shapes} className={style.shapes} alt="" />
            <div className={style.letterPartOrange} />
            <div className={style.letterPartBlue} />
            <div className={style.mask} />
            <StaticImage
                imageData={briefcase}
                className={style.briefcase}
                alt=""
            />
        </>
    );
};
