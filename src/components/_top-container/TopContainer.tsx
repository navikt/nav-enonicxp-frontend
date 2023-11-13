import React from 'react';
import { classNames } from 'utils/classnames';
import { ContentProps } from 'types/content-props/_content-common';
import { getContentLanguages } from 'utils/languages';
import { PageWarning } from './page-warning/PageWarning';
import { translator } from 'translations';
import { EditorWidgets } from 'components/_editor-only/EditorWidgets';

import style from './TopContainer.module.scss';
import { checkForNoGap, checkForWhiteHeader } from 'utils/appearance';

type Props = {
    content: ContentProps;
};

// For legacy reasons, this component is presently used for adjusting padding/margins at the top of
// the app container.
export const TopContainer = ({ content }: Props) => {
    const {
        breadcrumbs,
        isFailover,
        isPagePreview,
        originalType,
        language,
        redirectToLayer,
    } = content;

    const hasDecoratorWidgets =
        (breadcrumbs && breadcrumbs.length > 0) ||
        getContentLanguages(content).length > 0;
    const hasWhiteHeader = checkForWhiteHeader(content);

    const isEditorView = !!content.editorView;

    const shouldCollapse = checkForNoGap(content);

    const warningLabels = translator('pageWarnings', language);
    const localeLabels = translator('localeNames', language);

    return (
        <>
            {isPagePreview && (
                <PageWarning whiteBg={hasWhiteHeader}>
                    {warningLabels('draftWarning')}
                </PageWarning>
            )}
            {isFailover && (
                <PageWarning whiteBg={hasWhiteHeader}>
                    {warningLabels('failoverWarning')}
                </PageWarning>
            )}
            {originalType && isEditorView && (
                <PageWarning whiteBg={hasWhiteHeader} size={'medium'}>
                    {warningLabels('contentTypeChangedWarning')(originalType)}
                </PageWarning>
            )}
            {redirectToLayer && isEditorView && (
                <PageWarning whiteBg={hasWhiteHeader} size={'medium'}>
                    {warningLabels('layerRedirectWarning')(
                        localeLabels(redirectToLayer)
                    )}
                </PageWarning>
            )}
            <div
                className={classNames(
                    style.topContainer,
                    hasWhiteHeader && style.white,
                    hasDecoratorWidgets && style.widgetsOffset
                )}
            >
                <EditorWidgets content={content} />
            </div>
        </>
    );
};
