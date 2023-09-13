import React from 'react';
import { classNames } from 'utils/classnames';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { getContentLanguages } from 'utils/languages';
import { VersionHistory } from './version-history/VersionHistory';
import { PageWarning } from './page-warning/PageWarning';
import { translator } from 'translations';
import { getAudience } from 'types/component-props/_mixins';

import style from './TopContainer.module.scss';
import { get } from 'http';

const contentTypesWithWhiteHeader: ReadonlySet<ContentType> = new Set([
    ContentType.ProductPage,
    ContentType.SituationPage,
    ContentType.CurrentTopicPage,
    ContentType.GuidePage,
    ContentType.GenericPage,
    ContentType.ThemedArticlePage,
    ContentType.Overview,
    ContentType.OfficeEditorialPage,
    ContentType.OfficeBranchPage,
    ContentType.FrontPage,
    ContentType.FrontPageNested,
    ContentType.AreaPage,
    ContentType.PressLandingPage,
    ContentType.FormIntermediateStepPage,
    ContentType.FormsOverview,
]);

type Props = {
    content: ContentProps;
};

const checkNoGap = (content: ContentProps) => {
    if (
        content.type === ContentType.FrontPage &&
        (getAudience(content.data.audience) === 'employer' ||
            getAudience(content.data.audience) === 'provider')
    ) {
        return true;
    }
    if (
        content.type === ContentType.FrontPageNested &&
        getAudience(content.data.audience) === 'provider'
    ) {
        return true;
    }

    return false;
};

export const checkForWhiteHeader = (content: ContentProps) => {
    const { type } = content;

    if (type === ContentType.MainArticle) {
        const contentType = content.data?.contentType;
        return contentType === 'news' || contentType === 'pressRelease';
    }

    return contentTypesWithWhiteHeader.has(type);
};

export const TopContainer = ({ content }: Props) => {
    const { breadcrumbs, isFailover, isPagePreview, originalType, language } =
        content;
    const hasDecoratorWidgets =
        (breadcrumbs && breadcrumbs.length > 0) ||
        getContentLanguages(content).length > 0;
    const hasWhiteHeader = checkForWhiteHeader(content);

    // Should be shown in Content Studio only (except the edit view)
    const showVersionPicker =
        !!content.editorView && content.editorView !== 'edit';

    const shouldCollapse = checkNoGap(content);

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
                    hasDecoratorWidgets && style.widgetsOffset,
                    shouldCollapse && style.collapse
                )}
            >
                {showVersionPicker && <VersionHistory content={content} />}
            </div>
        </>
    );
};
