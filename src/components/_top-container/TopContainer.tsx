import React from 'react';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWarning } from './page-warning/PageWarning';
import { EditorWidgets } from 'components/_editor-only/EditorWidgets';
import { hasWhiteHeader } from 'utils/appearance';

import style from './TopContainer.module.scss';

type Props = {
    content: ContentProps;
};

// For legacy reasons, this component is presently used for adjusting padding/margins at the top of
// the app container.
export const TopContainer = ({ content }: Props) => {
    const {
        isFailover,
        isPagePreview,
        originalType,
        language,
        redirectToLayer,
    } = content;

    const whiteBg = hasWhiteHeader(content);

    const isEditorView = !!content.editorView;

    const warningLabels = translator('pageWarnings', language);
    const localeLabels = translator('localeNames', language);

    return (
        <>
            {isPagePreview && (
                <PageWarning whiteBg={whiteBg}>
                    {warningLabels('draftWarning')}
                </PageWarning>
            )}
            {isFailover && (
                <PageWarning whiteBg={whiteBg}>
                    {warningLabels('failoverWarning')}
                </PageWarning>
            )}
            {originalType && isEditorView && (
                <PageWarning whiteBg={whiteBg} size={'medium'}>
                    {warningLabels('contentTypeChangedWarning')(originalType)}
                </PageWarning>
            )}
            {redirectToLayer && isEditorView && (
                <PageWarning whiteBg={whiteBg} size={'medium'}>
                    {warningLabels('layerRedirectWarning')(
                        localeLabels(redirectToLayer)
                    )}
                </PageWarning>
            )}
            <div
                className={classNames(
                    style.topContainer,
                    whiteBg && style.whiteBackground
                )}
            >
                <EditorWidgets content={content} />
            </div>
        </>
    );
};
