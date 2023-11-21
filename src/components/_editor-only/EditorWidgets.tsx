import React from 'react';

import { ContentProps } from 'types/content-props/_content-common';
import { EditorHacks } from 'components/_editor-only/editor-hacks/EditorHacks';
import { EditorGlobalWarnings } from 'components/_editor-only/global-warnings/EditorGlobalWarnings';
import { ReferencesInfo } from 'components/_editor-only/references-info/ReferencesInfo';
import { VersionHistory } from 'components/_editor-only/version-history/VersionHistory';

import style from './EditorWidgets.module.scss';
import { hasWhiteHeader } from 'utils/appearance';
import { classNames } from 'utils/classnames';

type Props = {
    content: ContentProps;
};

export const EditorWidgets = ({ content }: Props) => {
    const { editorView, liveId } = content;

    const whiteBg = hasWhiteHeader(content);

    if (!editorView) {
        return null;
    }

    return (
        <div
            className={classNames(
                style.editorWidgets,
                whiteBg && style.whiteBackground
            )}
        >
            <EditorHacks content={content} />
            {!liveId && (editorView === 'inline' || editorView === 'edit') && (
                <ReferencesInfo content={content} />
            )}
            <EditorGlobalWarnings key={content._id} />
            {editorView !== 'edit' && <VersionHistory content={content} />}
        </div>
    );
};
