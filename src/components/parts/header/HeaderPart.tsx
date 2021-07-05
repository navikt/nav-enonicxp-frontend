import React from 'react';
import { HeaderProps } from '../../../types/component-props/parts/header';
import { Header } from '../../_common/headers/Header';
import { headingToLevel, headingToSize } from '../../../types/typo-style';
import './HeaderPart.less';

const defaultTag = 'h3';

export const HeaderPart = ({ config }: HeaderProps) => {
    if (!config) {
        return null;
    }

    const { title, titleTag, anchorId, justify } = config;

    if (!title) {
        return null;
    }

    const _tag = titleTag || defaultTag;
    const level = headingToLevel[_tag];

    const size = headingToSize[_tag];

    return (
        <Header
            level={level}
            size={size}
            anchorId={anchorId}
            justify={justify}
            hideCopyButton={true}
            className={'header-part'}
        >
            {title}
        </Header>
    );
};
