import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';
import letterS from 'components/_common/omradekort/graphics/open-pages/social-counselling/gfx/letterS.svg';
import shapes from './gfx/shapes.svg';
import person from './gfx/person.svg';

import style from './MinSideAnimation.module.scss';

export const MinSideAnimation = () => {
    return (
        <>
            <StaticImage imageData={shapes} className={style.shapes} />
            <StaticImage imageData={letterS} className={style.letterS} />
            <div className={style.mask} />
            <StaticImage imageData={person} className={style.document} />
        </>
    );
};
