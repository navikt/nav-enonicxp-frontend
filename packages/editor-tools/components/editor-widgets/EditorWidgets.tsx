import React from 'react';
import { ContentProps } from '@/nextjs/types/content-props/_content-common';
import { EditorHacks } from '@/editor-tools/components/editor-hacks/EditorHacks';
import { EditorGlobalWarnings } from '@/editor-tools/components/global-warnings/EditorGlobalWarnings';
import { ReferencesInfo } from '@/editor-tools/components/references-info/ReferencesInfo';
import { VersionHistory } from '@/editor-tools/components/version-history/VersionHistory';
import { hasWhiteHeader } from '@/nextjs/utils/appearance';
import { classNames } from '@/nextjs/utils/classnames';

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
