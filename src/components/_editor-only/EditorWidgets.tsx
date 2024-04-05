import React from 'react';

import { ContentProps } from 'types/content-props/_content-common';
import { EditorHacks } from 'components/_editor-only/editor-hacks/EditorHacks';
import { EditorGlobalWarnings } from 'components/_editor-only/global-warnings/EditorGlobalWarnings';
import { ReferencesInfo } from 'components/_editor-only/references-info/ReferencesInfo';
import { VersionHistory } from 'components/_editor-only/version-history/VersionHistory';
import { hasWhiteHeader } from 'utils/appearance';
import { classNames } from 'utils/classnames';

import style from './EditorWidgets.module.scss';

type Props = {
    content: ContentProps;
};

export const EditorWidgets = ({ content }: Props) => {
    const { editorView, liveId } = content;

    if (!editorView) {
        return null;
    }

    const whiteBg = hasWhiteHeader(content);

    return (
        <div className={classNames(style.outer, whiteBg && style.whiteBackground)}>
            <div className={style.inner}>
                <EditorHacks content={content} />
                {!liveId && (editorView === 'inline' || editorView === 'edit') && (
                    <ReferencesInfo content={content} />
                )}
                <EditorGlobalWarnings key={content._id} />
                {editorView !== 'edit' && <VersionHistory content={content} />}
            </div>
        </div>
    );
};
