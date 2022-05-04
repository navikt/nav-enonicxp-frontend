import React from 'react';
import { AnchorLink } from '../../../types/component-props/parts/page-navigation-menu';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

type Props = {
    dupes: AnchorLink[];
};

export const PageNavigationDupeLinkWarning = ({ dupes }: Props) => {
    if (dupes.length === 0) {
        return null;
    }

    const dupesString = dupes.map((dupe) => dupe.anchorId).join(', ');

    return (
        <EditorHelp
            text={`Obs! Siden har duplikate anker-id'er: "${dupesString}" - Kun det første menypunktet vil vises for dette ankeret`}
            type={'error'}
        />
    );
};
