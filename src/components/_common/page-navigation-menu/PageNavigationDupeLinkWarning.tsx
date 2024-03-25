import React from 'react';
import { AnchorLink } from 'types/component-props/parts/page-navigation-menu';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { usePageContentProps } from '../../../store/pageContext';

type Props = {
    anchorLinks: AnchorLink[];
};

export const PageNavigationDupeLinkWarning = ({ anchorLinks }: Props) => {
    const { editorView } = usePageContentProps();
    if (!editorView) {
        return null;
    }

    const dupes = anchorLinks.filter((link) => link.isDupe);
    if (dupes.length === 0) {
        return null;
    }

    const dupesString = dupes.map((dupe) => dupe.anchorId).join(', ');
    const msg = `Obs! Siden har duplikate anker-id'er: "${dupesString}" - Kun det første menypunktet vil vises for dette ankeret`;

    return <EditorHelp text={msg} type={'error'} globalWarningText={msg} />;
};
