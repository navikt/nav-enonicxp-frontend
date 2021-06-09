import React from 'react';
import { MacroHeaderWithAnchorProps } from '../../../types/macro-props/header-with-anchor';
import { Header } from '../../_common/header/Header';

export const MacroHeaderWithAnchor = ({
    config,
}: MacroHeaderWithAnchorProps) => {
    if (!config?.header_with_anchor) {
        return null;
    }

    const { id, tag, text } = config.header_with_anchor;

    return (
        <Header tag={tag} id={id} hideCopyButton={true} justify={'left'}>
            {text}
        </Header>
    );
};
