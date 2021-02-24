import React from 'react';
import { HeaderProps } from '../../../../types/component-props/parts/header';
import { Header } from '../../../_common/header/Header';
import { headingToTypoStyle } from '../../../../types/typo-style';
import './HeaderPart.less';

export const HeaderPart = ({ config }: HeaderProps) => {
    if (!config) {
        return null;
    }

    const { title, typo, tag, anchorId, justify } = config;

    if (!title) {
        return null;
    }

    const _tag = tag || 'h3';

    const typoStyle =
        typo?._selected === 'custom'
            ? typo.custom.typo
            : headingToTypoStyle[_tag];

    return (
        <Header
            text={title}
            tag={_tag}
            typoStyle={typoStyle}
            anchorId={anchorId}
            justify={justify}
            className={'header-part'}
        />
    );
};
