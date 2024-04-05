import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import shapes from './gfx/shapes.svg';
import letterS from 'components/_common/area-card/graphics/open-pages/social-counselling/gfx/letterS.svg';
import document from './gfx/document.svg';

import style from './CasesAnimation.module.scss';

export const CasesAnimation = () => {
    return (
        <>
            <StaticImage imageData={shapes} className={style.shapes} alt="" />
            <StaticImage imageData={letterS} className={style.letterS} alt="" />
            <div className={style.mask} />
            <StaticImage imageData={document} className={style.document} alt="" />
        </>
    );
};
