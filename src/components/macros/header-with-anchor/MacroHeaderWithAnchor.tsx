import React from 'react';
import { headingToLevel } from 'types/typo-style';
import { MacroHeaderWithAnchorProps } from '../../../types/macro-props/header-with-anchor';
import { Header } from '../../_common/headers/Header';

// type ValidTag = MacroHeaderWithAnchorProps['config']['header_with_anchor']['tag'];

export const MacroHeaderWithAnchor = ({
    config,
}: MacroHeaderWithAnchorProps) => {
    if (!config?.header_with_anchor) {
        return null;
    }

    const { id, tag, text, body } = config.header_with_anchor;

    const level = headingToLevel[tag] || 1;

    return (
        <Header
            level={level}
            size="xl"
            anchorId={id}
            hideCopyButton={true}
            justify={'left'}
        >
            {body || text}
        </Header>
    );
};
