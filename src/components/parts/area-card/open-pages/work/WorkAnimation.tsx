import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import briefcase from './gfx/briefcase.svg';

import style from './WorkAnimation.module.scss';

export const WorkAnimation = () => {
    return (
        <>
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
