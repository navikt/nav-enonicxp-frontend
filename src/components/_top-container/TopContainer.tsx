import React from 'react';
import { classNames } from 'utils/classnames';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { getContentLanguages } from 'utils/languages';
import { VersionHistory } from './version-history/VersionHistory';
import { PageWarning } from './page-warning/PageWarning';
import { translator } from 'translations';

import style from './TopContainer.module.scss';

const contentTypesWithWhiteHeader = {
    [ContentType.ProductPage]: true,
    [ContentType.SituationPage]: true,
    [ContentType.NewsArticlePage]: true,
    [ContentType.GuidePage]: true,
    [ContentType.GenericPage]: true,
    [ContentType.ThemedArticlePage]: true,
    [ContentType.Overview]: true,
    [ContentType.FrontPage]: true,
    [ContentType.AreaPage]: true,
};

type Props = {
    content: ContentProps;
};

export const checkForWhiteHeader = (content: ContentProps) => {
    const { __typename } = content;

    if (
        __typename === ContentType.MainArticle &&
        (content.data.contentType === 'news' ||
            content.data.contentType === 'pressRelease')
    ) {
        return true;
    }

    return contentTypesWithWhiteHeader[__typename];
};

export const TopContainer = ({ content }: Props) => {
    const { breadcrumbs, isFailover, isPagePreview, originalType, language } =
        content;
    const hasDecoratorWidgets =
        breadcrumbs?.length > 0 || getContentLanguages(content)?.length > 0;
    const hasWhiteHeader = checkForWhiteHeader(content);

    // Should be shown in Content Studio only (except the edit view)
    const showVersionPicker =
        !!content.editorView && content.editorView !== 'edit';

    const warningLabels = translator('pageWarnings', language);

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
            {originalType && content.editorView && (
                <PageWarning
                    whiteBg={hasWhiteHeader}
                    size={'medium'}
                >{`${warningLabels(
                    'contentTypeChangedWarningPre'
                )}"${originalType}"${warningLabels(
                    'contentTypeChangedWarningPost'
                )}`}</PageWarning>
            )}
            <div
                className={classNames(
                    style.topContainer,
                    hasWhiteHeader && style.white,
                    hasDecoratorWidgets && style.widgetsOffset
                )}
            >
                {showVersionPicker && <VersionHistory content={content} />}
            </div>
        </>
    );
};
