import React from 'react';
import { HeaderProps } from '../../../../types/component-props/parts/header';
import { Header } from '../../../_common/headers/Header';
import { headingToTypoStyle } from '../../../../types/typo-style';
import './HeaderPart.less';

const defaultTag = 'h3';

export const HeaderPart = ({ config }: HeaderProps) => {
    if (!config) {
        return null;
    }

    const { title, typo, titleTag, anchorId, justify } = config;

    if (!title) {
        return null;
    }

    const _tag = titleTag || defaultTag;

    const typoStyle =
        typo?._selected === 'custom'
            ? typo.custom.typo
            : headingToTypoStyle[_tag];

    return (
        <Header
            tag={_tag}
            typoStyle={typoStyle}
            id={anchorId}
            justify={justify}
            hideCopyButton={true}
            className={'header-part'}
        >
            {title}
        </Header>
    );
};
