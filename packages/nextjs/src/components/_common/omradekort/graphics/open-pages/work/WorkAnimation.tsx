import React from 'react';
import { StaticImage } from 'components/_common/image/StaticImage';
import { classNames } from 'utils/classnames';

import briefcase from './gfx/briefcase.svg';
import shapes from './gfx/shapes.svg';

import style from './WorkAnimation.module.scss';

export const WorkAnimation = () => {
    return (
        <>
            <StaticImage imageData={shapes} className={classNames(style.shapes)} />
            <div className={classNames(style.letterPartOrange)} />
            <div className={classNames(style.letterPartBlue)} />
            <div className={classNames(style.mask)} />
            <StaticImage imageData={briefcase} className={classNames(style.briefcase)} />
        </>
    );
};
