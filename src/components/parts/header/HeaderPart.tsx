import React from 'react';
import { HeaderProps } from 'types/component-props/parts/header';
import { Header } from '../../_common/headers/Header';
import { headingToLevel, headingToSize, typoToSize } from 'types/typo-style';

import style from './HeaderPart.module.scss';

export const HeaderPart = ({ config }: HeaderProps) => {
    if (!config) {
        return null;
    }

    const { title, titleTag, anchorId } = config;

    if (!title) {
        return null;
    }

    const _tag = titleTag || 'h3';
    const level = headingToLevel[_tag];

    const size = headingToSize[_tag];

    return (
        <Header
            level={level}
            size={size}
            anchorId={anchorId}
            justify="left"
            hideCopyButton={true}
            className={style.headerPart}
        >
            {title}
        </Header>
    );
};
