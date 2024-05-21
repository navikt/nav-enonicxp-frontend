import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';

import shapes from './gfx/shapes.svg';
import letterU from './gfx/letterU.svg';
import wallet from './gfx/wallet.svg';

import style from './PaymentsAnimation.module.scss';

export const PaymentsAnimation = () => {
    return (
        <>
            <StaticImage imageData={shapes} className={style.shapes} />
            <StaticImage imageData={letterU} className={style.letterU} />
            <div className={style.mask} />
            <StaticImage imageData={wallet} className={style.wallet} />
        </>
    );
};
