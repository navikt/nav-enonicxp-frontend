import React from 'react';
import { MacroHeaderWithAnchorProps } from '../../../types/macro-props/header-with-anchor';
import { Header } from '../../_common/headers/Header';

type ValidTag = MacroHeaderWithAnchorProps['config']['header_with_anchor']['tag'];

const getValidTag = (tag: string): ValidTag => {
    if (tag !== 'h3' && tag !== 'h4') {
        return 'h3';
    }
    return tag;
};

export const MacroHeaderWithAnchor = ({
    config,
}: MacroHeaderWithAnchorProps) => {
    if (!config?.header_with_anchor) {
        return null;
    }

    const { id, tag, text, body } = config.header_with_anchor;

    return (
        <Header
            tag={getValidTag(tag)}
            anchorId={id}
            hideCopyButton={true}
            justify={'left'}
        >
            {body || text}
        </Header>
    );
};
