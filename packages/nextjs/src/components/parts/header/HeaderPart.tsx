import React from 'react';
import { Heading } from 'components/_common/headers/Heading';
import { HeadingTag, headingToLevel, headingToSize } from 'types/typo-style';
import { PartComponentProps, PartType } from 'types/component-props/parts';

import style from './HeaderPart.module.scss';

export type PartConfigHeader = {
    title: string;
    anchorId: string;
    titleTag: HeadingTag;
};

export const HeaderPart = ({ config }: PartComponentProps<PartType.Header>) => {
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
        <Heading level={level} size={size} anchorId={anchorId} className={style.headerPart}>
            {title}
        </Heading>
    );
};
