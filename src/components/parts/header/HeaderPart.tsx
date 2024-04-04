import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { HeadingTag, headingToLevel, headingToSize } from 'types/typo-style';
import { PartComponent, PartType } from 'types/component-props/parts';
import { HeaderCommonConfig } from 'types/component-props/_mixins';

import style from './HeaderPart.module.scss';

export type PartConfigHeader = {
    title: string;
    anchorId: string;
    titleTag: HeadingTag;
} & HeaderCommonConfig;

export const HeaderPart: PartComponent<PartType.Header> = ({ config }) => {
    if (!config) {
        return null;
    }

    const { title, titleTag, anchorId } = config;

    if (!title) {
        return null;
    }

    const tag = titleTag || 'h3';
    const level = headingToLevel[tag];
    const size = headingToSize[tag];

    return (
        <Header
            level={level}
            size={size}
            anchorId={anchorId}
            justify={'left'}
            hideCopyButton={true}
            className={style.headerPart}
        >
            {title}
        </Header>
    );
};
