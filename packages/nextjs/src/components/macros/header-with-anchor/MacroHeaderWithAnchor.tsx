import React from 'react';
import { headingToLevel, headingToSize } from 'types/typo-style';
import { MacroHeaderWithAnchorProps } from 'types/macro-props/header-with-anchor';
import { Header } from 'components/_common/headers/Header';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

import style from './MacroheaderWithAnchor.module.scss';

export const MacroHeaderWithAnchor = ({ config }: MacroHeaderWithAnchorProps) => {
    if (!config?.header_with_anchor) {
        return null;
    }

    const { id, tag, text, body } = config.header_with_anchor;

    const level = headingToLevel[tag] ?? '3';
    const size = headingToSize[tag] ?? 'large';

    const headerText = body ?? text;

    if (!headerText) {
        return <EditorHelp type={'error'} text={'Header-macroen mangler tekst!'} />;
    }

    return (
        <Header level={level} size={size} anchorId={id} className={style.headerWithAnchor}>
            {headerText}
        </Header>
    );
};
