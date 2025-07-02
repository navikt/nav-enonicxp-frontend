import React from 'react';
import { translator } from 'translations';
import { ContentProps } from 'types/content-props/_content-common';
import { hasWhiteHeader } from 'utils/appearance';
import { PageWarning } from './pageWarning/PageWarning';

type Props = {
    content: Pick<
        ContentProps,
        | 'isFailover'
        | 'isPagePreview'
        | 'originalType'
        | 'language'
        | 'redirectToLayer'
        | 'editorView'
        | 'type'
        | 'data'
    >;
};

export const PageWarnings = ({ content }: Props) => {
    const { isFailover, isPagePreview, originalType, language, redirectToLayer } = content;

    const whiteBg = hasWhiteHeader({ type: content.type, data: content.data });

    const isEditorView = !!content.editorView;

    const warningLabels = translator('pageWarnings', language);
    const localeLabels = translator('localeNames', language);

    return (
        <>
            {isPagePreview && (
                <PageWarning whiteBg={whiteBg}>{warningLabels('draftWarning')}</PageWarning>
            )}
            {isFailover && (
                <PageWarning whiteBg={whiteBg}>{warningLabels('failoverWarning')}</PageWarning>
            )}
            {originalType && isEditorView && (
                <PageWarning whiteBg={whiteBg} size={'medium'}>
                    {warningLabels('contentTypeChangedWarning')(originalType)}
                </PageWarning>
            )}
            {redirectToLayer && isEditorView && (
                <PageWarning whiteBg={whiteBg} size={'medium'}>
                    {warningLabels('layerRedirectWarning')(localeLabels(redirectToLayer))}
                </PageWarning>
            )}
        </>
    );
};
