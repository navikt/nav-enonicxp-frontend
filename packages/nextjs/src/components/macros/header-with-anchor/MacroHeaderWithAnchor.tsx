import React from 'react';
import { headingToLevel, headingToSize } from 'types/typo-style';
import { MacroHeaderWithAnchorProps } from 'types/macro-props/header-with-anchor';
import { Heading } from 'components/_common/headers/Heading';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

import style from './MacroheaderWithAnchor.module.scss';

export const MacroHeaderWithAnchor = ({ config }: MacroHeaderWithAnchorProps) => {
    if (!config?.header_with_anchor) {
        return null;
    }

    const { id, tag, text, body } = config.header_with_anchor;

    const level = headingToLevel[tag] || '3';
    const size = headingToSize[tag] || 'large';

    const headerText = body || text;

    if (!headerText) {
        return <EditorHelp type={'error'} text={'Header-macroen mangler tekst!'} />;
    }

    return (
        <Heading level={level} size={size} anchorId={id} className={style.headerWithAnchor}>
            {headerText}
        </Heading>
    );
};
