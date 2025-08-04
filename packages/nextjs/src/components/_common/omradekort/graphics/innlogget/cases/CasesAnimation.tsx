import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';
import letterS from 'components/_common/omradekort/graphics/open-pages/social-counselling/gfx/letterS.svg';
import shapes from './gfx/shapes.svg';
import document from './gfx/document.svg';

import style from './CasesAnimation.module.scss';

export const CasesAnimation = () => {
    return (
        <>
            <StaticImage imageData={shapes} className={style.shapes} />
            <StaticImage imageData={letterS} className={style.letterS} />
            <div className={style.mask} />
            <StaticImage imageData={document} className={style.document} />
        </>
    );
};
