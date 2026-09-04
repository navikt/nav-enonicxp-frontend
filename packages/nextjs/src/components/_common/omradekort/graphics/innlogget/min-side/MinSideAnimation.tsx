import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';
import clipboard from './gfx/clipboard.svg';
import person from './gfx/person.svg';

import style from './MinSideAnimation.module.scss';

export const MinSideAnimation = () => {
    return (
        <>
            <StaticImage imageData={clipboard} className={style.shapes} />
            <div className={style.letterPartBlue} />
            <div className={style.letterPartOrange} />
            <div className={style.letterPartBlueTwo} />
            <div className={style.mask} />
            <StaticImage imageData={person} className={style.person} />
        </>
    );
};
