import React from 'react';
import { Header } from '../../_common/headers/Header';
import { headingToLevel, headingToSize } from 'types/typo-style';
import {
    PartComponentProps,
    PartType,
} from '../../../types/component-props/parts';

import style from './HeaderPart.module.scss';

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
