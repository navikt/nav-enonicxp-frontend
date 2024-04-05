import React from 'react';
import { translator } from 'translations';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWarning } from './page-warning/PageWarning';
import { hasWhiteHeader } from 'utils/appearance';

type Props = {
    content: ContentProps;
};

export const PageWarnings = ({ content }: Props) => {
    const { isFailover, isPagePreview, originalType, language, redirectToLayer } = content;

    const whiteBg = hasWhiteHeader(content);

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
