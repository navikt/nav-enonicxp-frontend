import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { EditorHacks } from 'components/_editor-only/editor-hacks/EditorHacks';
import { EditorGlobalWarnings } from 'components/_editor-only/global-warnings/EditorGlobalWarnings';
import { ReferencesInfo } from 'components/_editor-only/references-info/ReferencesInfo';
import { VersionHistory } from 'components/_top-container/version-history/VersionHistory';

import style from './EditorWidgets.module.scss';

type Props = {
    content: ContentProps;
};

export const EditorWidgets = ({ content }: Props) => {
    const { editorView } = content;

    if (!editorView) {
        return null;
    }

    return (
        <div className={style.editorWidgets}>
            <EditorHacks content={content} />
            {editorView !== 'preview' && <ReferencesInfo content={content} />}
            <EditorGlobalWarnings key={content._id} />
            {editorView !== 'edit' && <VersionHistory content={content} />}
        </div>
    );
};
