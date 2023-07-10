import React from 'react';
import { HeaderProps } from 'types/component-props/parts/header';
import { Header } from '../../_common/headers/Header';
import { headingToLevel, headingToSize, typoToSize } from 'types/typo-style';

import style from './HeaderPart.module.scss';

export const HeaderPart = ({ config }: HeaderProps) => {
    if (!config) {
        return null;
    }

    const { title, typo, titleTag, anchorId, justify } = config;

    if (!title) {
        return null;
    }

    const _tag = titleTag || 'h3';
    const level = headingToLevel[_tag];

    const sizeFromTypo =
        typo?._selected === 'custom' ? typoToSize[typo.custom.typo] : null;
    const size = sizeFromTypo || headingToSize[_tag];

    return (
        <Header
            level={level}
            size={size}
            anchorId={anchorId}
            justify={justify}
            hideCopyButton={true}
            className={style.headerPart}
        >
            {title}
        </Header>
    );
};
