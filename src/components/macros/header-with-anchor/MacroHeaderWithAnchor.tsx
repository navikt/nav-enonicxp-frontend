import React from 'react';
import { headingToLevel, headingToSize } from 'types/typo-style';
import { MacroHeaderWithAnchorProps } from '../../../types/macro-props/header-with-anchor';
import { Header } from '../../_common/headers/Header';

export const MacroHeaderWithAnchor = ({
    config,
}: MacroHeaderWithAnchorProps) => {
    if (!config?.header_with_anchor) {
        return null;
    }

    const { id, tag, text, body } = config.header_with_anchor;

    const level = headingToLevel[tag] || '3';
    const size = headingToSize[tag] || 'xlarge';

    return (
        <Header
            level={level}
            size={size}
            anchorId={id}
            hideCopyButton={true}
            justify={'left'}
        >
            {body || text}
        </Header>
    );
};
