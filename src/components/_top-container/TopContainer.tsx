import React from 'react';
import { classNames } from 'utils/classnames';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { getContentLanguages } from 'utils/languages';
import { VersionHistory } from './version-history/VersionHistory';
import { PageWarning } from './page-warning/PageWarning';
import { translator } from 'translations';
import { getAudience } from 'types/component-props/_mixins';

import style from './TopContainer.module.scss';

const contentTypesWithWhiteHeader = {
    [ContentType.ProductPage]: true,
    [ContentType.SituationPage]: true,
    [ContentType.CurrentTopicPage]: true,
    [ContentType.GuidePage]: true,
    [ContentType.GenericPage]: true,
    [ContentType.ThemedArticlePage]: true,
    [ContentType.Overview]: true,
    [ContentType.OfficeEditorialPage]: true,
    [ContentType.OfficeBranchPage]: true,
    [ContentType.FrontPage]: true,
    [ContentType.AreaPage]: true,
    [ContentType.PressLandingPage]: true,
    [ContentType.FormIntermediateStepPage]: true,
    [ContentType.FormsOverview]: true,
};

type Props = {
    content: ContentProps;
};

export const checkForWhiteHeader = (content: ContentProps) => {
    const { type } = content;

    if (
        type === ContentType.MainArticle &&
        (content.data?.contentType === 'news' ||
            content.data?.contentType === 'pressRelease')
    ) {
        return true;
    }

    return contentTypesWithWhiteHeader[type];
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

    const shouldCollapse =
        content.type === ContentType.FrontPage &&
        getAudience(content.data.audience) === 'employer';

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
